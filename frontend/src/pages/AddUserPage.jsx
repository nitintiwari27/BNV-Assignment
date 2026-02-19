import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import userService from "../services/userService";
import UserForm from "../components/UserForm";

/**
 * AddUserPage - Page for creating a new user
 */
const AddUserPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await userService.createUser(formData);
      toast.success("User created successfully!");
      navigate("/users");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Register Your Details
        </h2>
        <UserForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default AddUserPage;
