import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  strikedPrice: number;
  price: number;
  discount: number;
  size: string; // stored as CSV in DB
  color: string; // stored as CSV in DB
  material: string;
  stock: number;
  description: string;
  image1?: string;
}

interface FormDataType {
  name: string;
  strikedPrice: string;
  price: string;
  discount: string | number;
  size: string[];
  color: string[];
  material: string;
  stock: string;
  description: string;
}

const AdminProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    strikedPrice: "",
    price: "",
    discount: "",
    size: [],
    color: [],
    material: "",
    stock: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if ((location.state as { refetch?: boolean })?.refetch) {
      fetchProducts();
    }
  }, [location.state]);

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/products");
      setProducts(response.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      strikedPrice: String(product.strikedPrice),
      price: String(product.price),
      discount: String(product.discount),
      stock: String(product.stock),
      description: product.description,
      size: product.size ? product.size.split(",") : [],
      color: product.color ? product.color.split(",") : [],
      material: product.material,
    });
    setPreview(product.image1 || "/placeholder.jpg");
    setIsOpen(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updatedForm: FormDataType = {
      ...formData,
      [name]: value,
    };

    const striked = parseFloat(updatedForm.strikedPrice);
    const price = parseFloat(updatedForm.price);

    if (!isNaN(striked) && !isNaN(price) && striked > 0 && price >= 0) {
      const discount = Math.round(((striked - price) / striked) * 100);
      updatedForm.discount = discount;
    } else {
      updatedForm.discount = "";
    }

    setFormData(updatedForm);
  };

  const handleSizeChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, size: selectedSizes });
  };

  const handleColorChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, color: selectedColors });
  };

  const handleMaterialChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, material: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete the product. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("strikedPrice", formData.strikedPrice);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discount", String(formData.discount));
      formDataToSend.append("size", formData.size.join(","));
      formDataToSend.append("color", formData.color.join(","));
      formDataToSend.append("material", formData.material);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("description", formData.description);
      if (image) formDataToSend.append("image", image);

      await api.put(`/products/${selectedProduct.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchProducts();
      setIsOpen(false);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update the product.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4 text-center md:text-left">
        Products List
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-red-500 text-center">No Products Found.</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg p-3 shadow-md bg-white hover:shadow-lg transition"
            >
              <img
                src={product.image1 || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-medium mt-2">{product.name}</h2>
              <p className="text-sm text-gray-600">Price: ₹ {product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500 truncate">
                Material: {product.material}
              </p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-90 bg-black/10 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl transform transition-all scale-100 overflow-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Edit Product
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
              />

              {/* Description */}
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                required
                rows={3}
              />

              {/* Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Striked Price
                  </label>
                  <input
                    type="number"
                    name="strikedPrice"
                    value={formData.strikedPrice}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    required
                  />
                </div>
              </div>

              {/* Discount & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Discount
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    required
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-sm font-medium text-gray-700">Size</h3>
                <Select
                  isMulti
                  options={[
                    { value: "S", label: "Small (S)" },
                    { value: "M", label: "Medium (M)" },
                    { value: "L", label: "Large (L)" },
                    { value: "XL", label: "Extra Large (XL)" },
                    { value: "XXL", label: "2X Large (XXL)" },
                    { value: "XXXL", label: "3X Large (XXXL)" },
                  ]}
                  value={formData.size.map((val) => ({
                    value: val,
                    label: val,
                  }))}
                  onChange={handleSizeChange}
                  classNamePrefix="react-select"
                  placeholder="Select sizes"
                />
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-medium text-gray-700">Color</h3>
                <Select
                  isMulti
                  options={[
                    { value: "White", label: "White" },
                    { value: "Black", label: "Black" },
                    { value: "Red", label: "Red" },
                    { value: "Blue", label: "Blue" },
                    { value: "Green", label: "Green" },
                    { value: "Yellow", label: "Yellow" },
                  ]}
                  value={formData.color.map((val) => ({
                    value: val,
                    label: val,
                  }))}
                  onChange={handleColorChange}
                  classNamePrefix="react-select"
                  placeholder="Select colors"
                />
              </div>

              {/* Material */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Material
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleMaterialChange}
                  className="form-input p-2 mx-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  required
                >
                  <option value="">Select material</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Poly-Cotton">Poly-Cotton</option>
                  <option value="Linen">Linen</option>
                  <option value="Polyester">Polyester</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-lg transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsList;
