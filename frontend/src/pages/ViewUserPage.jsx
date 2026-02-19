import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import userService from "../services/userService";
import ViewDetailsCard from "../components/ViewDetailsCard";
import Loader from "../components/Loader";

/**
 * ViewUserPage - Displays all details of a single user in a card layout
 */
const ViewUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userService.getUserById(id);
        setUser(res.data.data);
      } catch (err) {
        toast.error(err.message);
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        User Details
      </h2>
      {loading ? (
        <Loader message="Loading user details..." />
      ) : user ? (
        <ViewDetailsCard user={user} />
      ) : null}
    </div>
  );
};

export default ViewUserPage;
