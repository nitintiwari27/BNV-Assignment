import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import userService from "../services/userService";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";

/**
 * EditUserPage - Page for editing an existing user
 * Fetches the user by ID and pre-populates the form
 */
const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(id);
        setUser(res.data.data);
      } catch (err) {
        toast.error(err.message);
        navigate("/users");
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await userService.updateUser(id, formData);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) return <Loader message="Loading user data..." />;

  // Map user data to form default values
  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    gender: user?.gender || "",
    status: user?.status || "",
    location: user?.location || "",
    profileImage: user?.profileImage || null,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Edit User Details
        </h2>
        <UserForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          loading={submitting}
        />
      </div>
    </div>
  );
};

export default EditUserPage;
