import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";

const UserList = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      toast.success("User updated");
      setEditableUserId(null);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto xl:ml-[2rem]">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800">User Management</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Admin</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  {/* ID */}
                  <td className="px-4 py-3 text-gray-800 truncate">{user._id}</td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    {editableUserId === user._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full border px-2 py-1 rounded-md"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{user.username}</span>
                        <button
                          onClick={() => toggleEdit(user._id, user.username, user.email)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    {editableUserId === user._id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full border px-2 py-1 rounded-md"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{user.email}</span>
                        <button
                          onClick={() => toggleEdit(user._id, user.username, user.email)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Admin */}
                  <td className="px-4 py-3">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
