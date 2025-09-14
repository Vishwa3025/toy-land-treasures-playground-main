import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define Category type
interface Category {
  id: string | number;
  name: string;
  description: string;
  image?: string;
}

const AdminCategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAddCategory = () => {
    navigate("/admin/category/add");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (location.state?.refetch) {
      fetchCategories();
    }
  }, [location.state]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get<Category[]>("/categories");
      setCategories(response.data || []); // fallback to empty array
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setPreview(category.image ? category.image : "/placeholder.jpg");
    setIsOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Category deleted successfully.");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete the category. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (image) {
        formDataToSend.append("image", image);
      }

      await api.put(`/categories/${selectedCategory.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchCategories();
      setIsOpen(false);
      toast.success("Category updated successfully.");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Categories List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-red-500 text-center">No Categories Found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition"
            >
              <img
                src={category.image || "/placeholder.jpg"}
                alt={category.name}
                className="w-full h-40 md:h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-medium mt-3">{category.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => openEditModal(category)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Category Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-90 bg-black/10 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Edit Category</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name Input */}
              <label className="text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                required
              />

              {/* Description Input */}
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                required
                rows={3}
              />

              {/* Image Preview */}
              {preview && (
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-500">Current Image</span>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg shadow-md mt-2 border"
                  />
                </div>
              )}

              {/* File Upload */}
              <label className="text-sm font-medium text-gray-700">Upload New Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border border-gray-300 p-2 rounded-lg w-full cursor-pointer transition hover:bg-gray-100"
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 bg-black text-white rounded-lg transition shadow-md"
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

export default AdminCategoriesList;
