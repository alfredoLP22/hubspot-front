import { useState } from "react";
import { postData } from "./services/contacts";
import SearchUserByEmail from "./components/SearchUserByEmail";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    try {
      await postData({ properties: formData });
      setMessage("Contact created successfully");
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error submitting form");
      setIsError(true);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Form</h2>

        <SearchUserByEmail />

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

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
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
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
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
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
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
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
