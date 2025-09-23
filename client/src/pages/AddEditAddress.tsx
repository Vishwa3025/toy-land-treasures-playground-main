import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { generalApi } from "../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UseUser from "../hooks/UseUser";
import { FaRegAddressCard, FaCity, FaFlag, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn, MdOutlineLocalPostOffice, MdPerson } from "react-icons/md";

interface Address {
  id?: string;
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

interface AddEditAddressProps { 
  setActiveSection?: (section: string) => void;
}

const AddEditAddress: React.FC<AddEditAddressProps> = ({ setActiveSection }) => {
  const [address, setAddress] = useState<Address>({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = UseUser();

  useEffect(() => {
    if (!user?.id) return;

    const fetchAddress = async () => {
      setLoading(true);
      try {
        const res = await generalApi.get<{ address: Address }>(`/address/${user.id}`);
        if (res.data?.address) setAddress(res.data.address);
      } catch {
        console.warn("No address found, allowing user to enter one.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user?.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.id) return toast.error("User not authenticated.");

    if (address.phone && !/^[0-9]{10,15}$/.test(address.phone)) {
      return toast.error("Invalid phone number format.");
    }

    setLoading(true);
    const method = address.id ? "put" : "post";

    try {
      const res = await generalApi[method]("/address/upsert", {
        user_id: user.id,
        ...address,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          `Address ${method === "post" ? "added" : "updated"} successfully!`,
          {
            onClose: () => {
              if (typeof setActiveSection === "function") {
                setActiveSection("address");
              } else {
                navigate("/checkout");
              }
            },
          }
        );
      } else {
        toast.error("Failed to save address.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 flex justify-center items-center min-h-[60vh]">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-pink-50 p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          {address.id ? "Edit Address" : "Add Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Full Name", key: "full_name", icon: <MdPerson /> },
            { label: "Address Line 1", key: "address_line1", icon: <FaRegAddressCard /> },
            { label: "Address Line 2 (Optional)", key: "address_line2", icon: <FaRegAddressCard /> },
            { label: "City", key: "city", icon: <FaCity /> },
            { label: "State", key: "state", icon: <MdLocationOn /> },
            { label: "Postal Code", key: "postal_code", icon: <MdOutlineLocalPostOffice /> },
            { label: "Country", key: "country", icon: <FaFlag /> },
            { label: "Phone", key: "phone", icon: <FaPhoneAlt /> },
          ].map(({ label, key, icon }) => (
            <div key={key} className="relative">
              {icon && <span className="absolute left-3 top-4 text-pink-400">{icon}</span>}
              <input
                type="text"
                placeholder={label}
                className="w-full p-3 pl-10 border border-pink-200 rounded-lg 
                           focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
                value={(address as any)[key] || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress({ ...address, [key]: e.target.value })
                }
                required={!label.includes("Optional")}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg 
                       hover:bg-pink-600 hover:scale-105 transition-all disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Saving..." : address.id ? "Update Address" : "Add Address"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEditAddress;
