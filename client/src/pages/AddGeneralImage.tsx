import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToyBackground from "../components/ToyBackground";

interface FormDataType {
  title: string;
  image: File | null;
}

const AddGeneralImage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Navigate back and trigger refetch
  const handleNavigate = () => {
    navigate("/admin/images", { state: { refetch: true } });
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change with preview
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  // Remove selected image
  const clearImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.image);

    try {
      await api.post("/images/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image added Successfully! 🎉");
      setFormData({ title: "", image: null });
      setImagePreview(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
      handleNavigate();
    } catch (error: any) {
      console.error("Error adding image:", error.response?.data || error);
      toast.error("Failed to add image. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg relative">
      <ToyBackground />
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 relative z-10">
        Add General Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Image Title"
          className="form-input w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
          required
        />

        {/* Image Upload Section */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-sm font-medium text-gray-700">
            General Image
          </label>
          <div
            className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()} // ⬅️ Trigger file input click
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <>
                <FiUploadCloud className="w-10 h-10 text-gray-500" />
                <p className="pt-2 text-sm text-gray-600">Upload image</p>
              </>
            )}
            <input
              type="file"
              accept="image/*" // ⬅️ Restrict to images only
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden" // ⬅️ Properly hides the input field
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black hover:scale-102 text-white font-semibold p-3 rounded-md transition-all"
        >
          Add Image
        </button>
      </form>
    </div>
  );
};

export default AddGeneralImage;
