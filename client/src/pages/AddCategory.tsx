import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryFormData {
  name: string;
  description: string;
  image: File | null;
}

const AddCategory: React.FC = () => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Navigate after adding category
  const handleAddCategory = () => {
    navigate("/admin", { state: { refetch: true } });
  };

  // Handle form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change & preview
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await api.post("/categories/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Category added Successfully!");
      setFormData({
        name: "",
        description: "",
        image: null,
      });
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      handleAddCategory();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add Category!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="add-category" className="section">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Category
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Category Name */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter category description"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Category Image
            </label>
            <div
              className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              ) : (
                <>
                  <FiUploadCloud className="w-10 h-10 text-gray-500" />
                  <p className="pt-2 text-sm text-gray-600">
                    Upload category image
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
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
              {loading ? "Adding..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
