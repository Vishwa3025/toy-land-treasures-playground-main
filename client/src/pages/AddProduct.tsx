import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { MultiValue } from "react-select";

// Category type
interface Category {
  id: string;
  name: string;
}

// Form data type
interface FormDataType {
  name: string;
  description: string;
  strikedPrice: string;
  price: string;
  discount: string | number;
  size: string[];
  material: string | string[];
  color: string[];
  stock: string;
  isCombo: boolean;
  category_id: string;
  image1: File | null;
  image2: File | null;
  image3: File | null;
  image4: File | null;
}

// React Select option type
interface SelectOption {
  value: string;
  label: string;
}

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    strikedPrice: "",
    price: "",
    discount: "",
    size: [],
    material: "",
    color: [],
    stock: "",
    isCombo: false,
    category_id: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data as Category[]))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const updatedForm: FormDataType = {
      ...formData,
      [name]: value,
    };

    // Auto-calculate discount
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

  // Size change
  const handleSizeChange = (selectedOptions: MultiValue<SelectOption>) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, size: selectedSizes });
  };

  // Color change
  const handleColorChange = (selectedOptions: MultiValue<SelectOption>) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, color: selectedColors });
  };

  // Category change
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find((cat) => cat.id === e.target.value);
    setFormData({ ...formData, category_id: selected ? selected.id : "" });
  };

  // Image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreviews.length >= 4) {
      toast.error("You can upload a maximum of 4 images");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...imagePreviews, reader.result as string];
      const newFormData = { ...formData, [`image${newPreviews.length}`]: file } as FormDataType;

      setImagePreviews(newPreviews);
      setFormData(newFormData);
    };
    reader.readAsDataURL(file);
  };

  // Submit handler
  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.isCombo && !formData.category_id && !formData.color.length) {
      toast.error("Please select a category and color or mark the product as a combo.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      const { image1, image2, image3, image4, ...textFields } = formData;

      // Arrays as CSV
      formDataToSend.append("size", formData.size.join(","));
      formDataToSend.append("color", formData.color.join(","));

      Object.entries(textFields).forEach(([key, value]) => {
        if (key !== "color" && key !== "size" && value !== null && value !== "") {
          formDataToSend.append(key, value as string);
        }
      });

      [image1, image2, image3, image4].forEach((file) => {
        if (file) formDataToSend.append("image", file);
      });

      await api.post("/products/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!");

      // Reset
      setFormData({
        name: "",
        description: "",
        strikedPrice: "",
        price: "",
        discount: "",
        size: [],
        material: "",
        color: [],
        stock: "",
        isCombo: false,
        category_id: "",
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      });
      setImagePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="add-product" className="section">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleProductSubmit}
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Combo Checkbox */}
          <div className="mt-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="combo"
              checked={formData.isCombo}
              onChange={(e) =>
                setFormData({ ...formData, isCombo: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="combo" className="text-sm text-gray-700">
              Mark as combo product
            </label>
          </div>

          {/* Category Dropdown */}
          {!formData.isCombo && (
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleCategoryChange}
                className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
                required
              >
                <option value="">Select product category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg h-28 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          {/* Striked Price */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Striked Price (₹)
            </label>
            <input
              type="number"
              name="strikedPrice"
              value={formData.strikedPrice}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter Striked price"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              readOnly
              className="form-input p-3 bg-gray-100 border border-gray-300 rounded-lg outline-none"
              placeholder="Auto-calculated"
            />
          </div>

          {/* Material */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Material
            </label>
            <select
              name="material"
              value={formData.material as string}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Select material</option>
              <option value="Cotton">Cotton</option>
              <option value="Poly-Cotton">Poly-Cotton</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex flex-col md:col-span-1">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Size
            </label>
            <Select
              isMulti
              options={[
                { value: "S", label: "Small (S)" },
                { value: "M", label: "Medium (M)" },
                { value: "L", label: "Large (L)" },
                { value: "XL", label: "Extra Large (XL)" },
                { value: "2XL", label: "2X Large (2XL)" },
                { value: "3XL", label: "3X Large (3XL)" },
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
          {!formData.isCombo && (
            <div className="flex flex-col md:col-span-1">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Color
              </label>
              <Select
                isMulti
                options={[
                  { value: "White", label: "White" },
                  { value: "Black", label: "Black" },
                ]}
                value={formData.color.map((val) => ({
                  value: val,
                  label: val.charAt(0).toUpperCase() + val.slice(1),
                }))}
                onChange={handleColorChange}
                classNamePrefix="react-select"
                placeholder="Select colors"
              />
            </div>
          )}

          {/* Stock */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="form-input py-2 px-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter stock quantity"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Product Images (max 4)
            </label>
            <div
              className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreviews.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {imagePreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Preview ${i + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <FiUploadCloud className="w-10 h-10 text-gray-500" />
                  <p className="pt-2 text-sm text-gray-600 text-center">
                    Upload up to 4 product images
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:scale-102"
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
