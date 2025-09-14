import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { api } from "../utils/axiosInstance";
import { toast } from "react-toastify";

interface ImageItem {
  id: string;
  title: string;
  imageUrl: string;
}

const AdminGeneralImagesList: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [formData, setFormData] = useState<{ title: string }>({ title: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<ImageItem[]>("/images");
      setImages(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (img: ImageItem): void => {
    setSelectedImage(img);
    setFormData({ title: img.title });
    setPreview(img.imageUrl);
    setIsOpen(true);
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await api.delete(`/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Image deleted");
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      toast.error("Failed to delete image");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!selectedImage) return;

    const fd = new FormData();
    fd.append("title", formData.title);
    if (file) fd.append("image", file);

    try {
      await api.put(`/images/${selectedImage.id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image updated");
      fetchImages();
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to update image");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">General Images</h1>
      <h1 className="text-sm font-semibold mb-4">
        Only 3 Banner images and 1 Phone banner is allowed (banner1, banner2,
        banner3, phonebanner)
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white shadow rounded p-4">
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{img.title}</h3>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleEdit(img)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Image Title"
                className="w-full p-2 border rounded"
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              )}
              <input type="file" onChange={handleFileChange} />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGeneralImagesList;
