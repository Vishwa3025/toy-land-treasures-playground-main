import React from "react";

interface Product {
  name: string;
  color?: string;
  price: number;
  image1?: string;
}

interface OrderItemProps {
  item: {
    Product?: Product;
    quantity: number;
    subtotal?: number;
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const productImage = item.Product?.image1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col xl:flex-row gap-4 items-start w-full">
      {/* Image Section */}
      <div className="shrink-0 w-full xl:w-32">
        <img
          src={productImage}
          alt="Product"
          className="w-full xl:w-32 h-32 object-contain rounded"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 w-full">
        <>
          <h4 className="font-semibold text-gray-800">{item.Product.name}</h4>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Quantity:</span> {item.quantity}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Color: </span>
            {item.Product.color}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Price: ₹ </span>
            {item.Product.price}
          </p>
        </>
      </div>
    </div>
  );
};

export default OrderItem;
