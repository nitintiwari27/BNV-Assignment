import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { getProfileImageUrl } from "../utils/helpers";

/**
 * UserTable - Renders the users list with action menus and status dropdowns
 * Matches the UI design: dark header, inline status dropdown, three-dot action menu
 */
const UserTable = ({ users, onStatusChange, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openStatusId, setOpenStatusId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toggle the three-dot action menu
  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
    setOpenStatusId(null);
  };

  // Toggle the status dropdown
  const toggleStatus = (id) => {
    setOpenStatusId((prev) => (prev === id ? null : id));
    setOpenMenuId(null);
  };

  // Handle status change inline
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const user = users.find((u) => u._id === userId);
      const formData = new FormData();
      Object.entries({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        location: user.location || "",
        status: newStatus,
      }).forEach(([k, v]) => formData.append(k, v));

      await userService.updateUser(userId, formData);
      toast.success("Status updated successfully");
      onStatusChange();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setOpenStatusId(null);
    }
  };

  // Confirm and execute delete
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await userService.deleteUser(deleteTarget._id);
      toast.success("User deleted successfully");
      onDeleteSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = () => {
    setOpenMenuId(null);
    setOpenStatusId(null);
  };

  if (!users.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        <svg className="mx-auto mb-3 w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-lg font-medium">No Data Found</p>
        <p className="text-sm">Try adjusting your search or add a new user.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto h-screen" onClick={handleOutsideClick}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="table-th rounded-tl-md">ID</th>
              <th className="table-th">FullName</th>
              <th className="table-th">Email</th>
              <th className="table-th">Gender</th>
              <th className="table-th">Status</th>
              <th className="table-th">Profile</th>
              <th className="table-th rounded-tr-md">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user, index) => {
              const profileUrl = getProfileImageUrl(user.profileImage);
              return (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  {/* ID */}
                  {/* <td className="table-td font-medium text-gray-900">{user._id}</td> */}
                  <td className="table-td font-medium text-gray-900">{user._id}</td>

                  {/* Full Name */}
                  <td className="table-td">
                    {user.firstName} {user.lastName}
                  </td>

                  {/* Email */}
                  <td className="table-td">{user.email}</td>

                  {/* Gender - abbreviated */}
                  <td className="table-td">{user.gender === "Male" ? "M" : user.gender === "Female" ? "F" : user.gender}</td>

                  {/* Status with inline dropdown */}
                  <td className="table-td">
                    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleStatus(user._id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium text-white ${
                          user.status === "Active" ? "bg-primary" : "bg-gray-500"
                        }`}
                      >
                        {user.status}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openStatusId === user._id && (
                        <div className="absolute left-0 top-8 z-20 bg-white border border-gray-200 rounded shadow-lg min-w-[120px]">
                          {["Active", "Inactive"].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleStatusChange(user._id, opt)}
                              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                user.status === opt ? "font-semibold text-primary" : "text-gray-700"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Profile Image */}
                  <td className="table-td">
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => { e.target.onerror = null; e.target.src = ""; e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                    ) : null}
                    <div
                      className={`w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 ${profileUrl ? "hidden" : "flex"}`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                  </td>

                  {/* Action Menu */}
                  <td className="table-td">
                    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleMenu(user._id)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-600 font-bold text-lg"
                        aria-label="Actions"
                      >
                        ⋮
                      </button>
                      {openMenuId === user._id && (
                        <div className="absolute right-0 z-20 bg-white border border-gray-200 rounded shadow-lg w-32">
                          <button
                            onClick={() => { navigate(`/users/view/${user._id}`); setOpenMenuId(null); }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-gray-50"
                          >
                            <span className="text-green-600">●</span> View
                          </button>
                          <button
                            onClick={() => { navigate(`/users/edit/${user._id}`); setOpenMenuId(null); }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-gray-50"
                          >
                            <span>✎</span> Edit
                          </button>
                          <button
                            onClick={() => { setDeleteTarget(user); setOpenMenuId(null); }}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          >
                            <span>🗑</span> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        userName={deleteTarget ? `${deleteTarget.firstName} ${deleteTarget.lastName}` : ""}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
};

export default UserTable;
