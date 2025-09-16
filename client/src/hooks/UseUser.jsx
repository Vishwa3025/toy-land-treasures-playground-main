import { useState, useEffect } from "react";
import { generalApi } from "../utils/axiosInstance";

const UseUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await generalApi.get("/profile");
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // console.log("user from useUser hook:", user);
  

  return { user, loading, error };
};

export default UseUser;