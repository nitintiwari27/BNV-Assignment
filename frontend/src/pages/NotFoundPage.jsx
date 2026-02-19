import { useNavigate } from "react-router-dom";

/**
 * NotFoundPage - 404 page for unknown routes
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-8xl font-bold text-gray-200">404</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/users")}
        className="btn-primary px-8"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
