import { useEffect, useState } from "react";
import { generalApi } from "../utils/axiosInstance";

interface User {
  id: string | number;
  name: string;
  email: string;
  role: "admin" | "customer" | string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await generalApi.get<User[]>("/profile/all"); // typed API response
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section id="users" className="section">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          User Management
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Admin Users Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Admins
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        S.No
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        User ID
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((user) => user.role === "admin").length > 0 ? (
                      users
                        .filter((user) => user.role === "admin")
                        .map((user, index) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-50 border-b"
                          >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          No admins found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Users Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Customers
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        S.No
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        User ID
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((user) => user.role === "customer").length >
                    0 ? (
                      users
                        .filter((user) => user.role === "customer")
                        .map((user, index) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-50 border-b"
                          >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-2 text-center text-gray-500"
                        >
                          No customers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AllUsers;
