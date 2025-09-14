import React from "react";

interface Product {
  name: string;
  size?: string;
  color?: string;
  material?: string;
  price: number;
  image1?: string;
}

interface CustomizedProduct {
  description: string;
  size?: string;
  category?: string;
  material?: string;
  color?: string;
  design_image_url?: string;
}

interface OrderItemProps {
  item: {
    Product?: Product;
    CustomizedProduct?: CustomizedProduct;
    quantity: number;
    subtotal?: number;
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const productImage = item.Product?.image1;
  const designImage = item.CustomizedProduct?.design_image_url;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col xl:flex-row gap-4 items-start w-full">
      {/* Image Section */}
      <div className="shrink-0 w-full xl:w-32">
        {productImage ? (
          <img
            src={productImage}
            alt="Product"
            className="w-full xl:w-32 h-32 object-contain rounded"
          />
        ) : designImage ? (
          <a
            href={designImage}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={designImage}
              alt="Design"
              className="w-full xl:w-32 h-32 object-contain rounded hover:opacity-90"
            />
          </a>
        ) : (
          <div className="w-full xl:w-32 h-32 flex items-center justify-center rounded text-xs text-gray-500 border border-gray-200">
            No Image
          </div>
        )}
        {designImage && (
          <span className="block text-xs text-gray-500 mt-1 text-center">
            Click image to download
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 w-full">
        {item.Product ? (
          <>
            <h4 className="font-semibold text-gray-800">{item.Product.name}</h4>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Quantity:</span> {item.quantity}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Size: </span>
              {item.Product.size}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color: </span>
              {item.Product.color}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Material: </span>
              {item.Product.material || "-"}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Price: ₹ </span>
              {item.Product.price}
            </p>
          </>
        ) : item.CustomizedProduct ? (
          <>
            <h4 className="font-semibold text-gray-800">Customized T-shirt</h4>
            <p className="text-sm text-gray-900">
              {item.CustomizedProduct.description}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Quantity: </span>
              {item.quantity}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Size: </span>
              {item.CustomizedProduct.size}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Category: </span>
              {item.CustomizedProduct.category}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Material: </span>
              {item.CustomizedProduct.material}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Color: </span>
              {item.CustomizedProduct.color}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Price: ₹ </span>
              {item.subtotal}
            </p>
          </>
        ) : (
          <p className="text-gray-500">Product details not available</p>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
