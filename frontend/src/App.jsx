import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserListPage from "./pages/UserListPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import ViewUserPage from "./pages/ViewUserPage";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * App - Root component with routing configuration
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          {/* Redirect root to /users */}
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
          <Route path="/users/view/:id" element={<ViewUserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
