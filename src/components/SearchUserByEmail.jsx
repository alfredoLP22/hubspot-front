import { useState } from "react";
import { deleteUser, getUserByEmail } from "../services/contacts";
import Modal from "./Modal";

const SearchUserByEmail = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await getUserByEmail(email);
      if (response.total > 0) {
        setUserData(response.results[0]);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
      setUserData(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userData.id);
      setUserData(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Search User by Email
      </h3>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="searchEmail"
        >
          Email
        </label>
        <input
          type="email"
          id="searchEmail"
          name="searchEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Search
      </button>

      {isModalOpen && userData && (
        <Modal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SearchUserByEmail;
