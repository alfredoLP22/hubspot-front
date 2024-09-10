import { useState } from "react";
import { updateUser } from "../services/contacts";

const Modal = ({ userData, onClose, onDelete }) => {
  const [editData, setEditData] = useState(userData.properties);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const { hs_object_id, createdate, lastmodifieddate, ...filteredData } =
      editData;
    try {
      await updateUser(userData.id, { properties: filteredData });
      setMessage("User updated successfully");
      setIsError(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.error || "Error updating user");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">User Information</h2>

        {message && (
          <div
            className={`text-center my-4 p-2 rounded ${
              isError
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={editData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={editData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Update
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
