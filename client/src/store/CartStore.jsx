import { create } from "zustand";
import { api } from "../utils/axiosInstance";

const useCartStore = create((set, get) => ({
  cart: [], // Make sure this is initialized as an empty array by default
  loading: true,

  // Fetch Cart from API (handles both Product and CustomizedProduct)
  fetchCart: async () => {
    try {
      const response = await api.get("/cart", { withCredentials: true });
      set((state) => ({
        cart: response.data || [], // Fallback to empty array if response is empty
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ loading: false });
    }
  },

  // Add item to Cart (handling customized product or regular product)
  addToCart: async (product, selectedColor) => {
    try {
      if (!product || !selectedColor) {
        console.error(
          "Error: product or selectedColor is undefined",
          product,
          selectedColor
        );
        return;
      }

      set((state) => {
        const cartItems = state.cart || [];
        const existingItem = cartItems.find((item) => {
          const idMatch = item.product_id === product.id;

          return idMatch && item.selectedColor === selectedColor;
        });

        let newCart;
        if (existingItem) {
          newCart = {
            ...state,
            cart: cartItems.map((item) => {
              const idMatch = item.product_id === product.id;

              return idMatch && item.selectedColor === selectedColor
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            }),
          };
        } else {
          newCart = {
            ...state,
            cart: [
              ...cartItems,
              {
                ...product,
                product_id: product.id,
                selectedColor,
                quantity: 1,
              },
            ],
          };
        }

        return { cart: newCart.cart };
      });

      // Sync to backend with product_id or customized_product_id
      const endpoint = "/cart/add";
      await api.post(endpoint, {
        product_id: product.id,
        selectedColor,
        quantity: 1,
      });

      // Fetch the updated cart data
      await get().fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  subtractFromCart: async (product) => {
    try {
      if (!product) {
        console.error("Error: product is undefined", product);
        return;
      }

      set((state) => {
        const cartItems = state.cart || [];
        // Check if we can find the correct item
        const existingItem = cartItems.find(
          (item) => item.product_id === product.id
        );

        let newCart;
        if (existingItem) {
          if (existingItem.quantity > 1) {
            // If quantity is greater than 1, decrement it
            newCart = {
              ...state,
              cart: cartItems.map((item) =>
                item.product_id === product.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          } else {
            // If quantity is 1, remove the item from cart
            newCart = {
              ...state,
              cart: cartItems.filter(
                (item) =>
                  !(
                    (item.product_id === product.id)
                  )
              ),
            };
          }
        }

        return { cart: newCart?.cart || cartItems }; // Ensure cart is set correctly
      });

      // Sync to backend with product_id or customized_product_id
      const endpoint = "/cart/subtract";
      await api.post(endpoint, {
        product_id: product.id,
        quantity: 1,
      });

      // Fetch the updated cart data
      await get().fetchCart();
    } catch (error) {
      console.error("Error subtracting from cart:", error);
    }
  },

  // Remove item from Cart
  removeFromCart: async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      }));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },

  clearCart: async () => {
    try {
      await api.delete("/cart/clear");
      set({ cart: [] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },

  // Get Cart Count for Navbar
  getCartCount: () => get().cart.length,
}));

export default useCartStore;
