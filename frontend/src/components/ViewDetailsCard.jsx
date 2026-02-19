import { useNavigate } from "react-router-dom";
import { getProfileImageUrl, formatDate } from "../utils/helpers";

/**
 * ViewDetailsCard - Card-style user profile viewer
 * Displays all user information in a clean, creative layout
 */
const ViewDetailsCard = ({ user }) => {
  const navigate = useNavigate();
  const profileUrl = getProfileImageUrl(user.profileImage);

  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 sm:w-40 shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium mt-1 sm:mt-0">{value || "—"}</span>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center text-white mb-6 shadow-lg">
        {/* Profile Image */}
        <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 bg-gray-600 flex items-center justify-center shadow-xl">
          {profileUrl ? (
            <img src={profileUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          )}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-400 text-sm mt-1">{user.email}</p>

        {/* Status Badge */}
        <div className="mt-3">
          <span
            className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
              user.status === "Active"
                ? "bg-green-500/20 text-green-300 border border-green-500/40"
                : "bg-gray-500/20 text-gray-300 border border-gray-500/40"
            }`}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
          Personal Information
        </h3>
        <InfoRow label="First Name" value={user.firstName} />
        <InfoRow label="Last Name" value={user.lastName} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Mobile" value={user.mobile} />
        <InfoRow label="Gender" value={user.gender} />
        <InfoRow label="Location" value={user.location} />
        <InfoRow label="Status" value={user.status} />
        <InfoRow label="Member Since" value={formatDate(user.createdAt)} />
        <InfoRow label="Last Updated" value={formatDate(user.updatedAt)} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate("/users")}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
        >
          ← Back to List
        </button>
        <button
          onClick={() => navigate(`/users/edit/${user._id}`)}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          ✎ Edit User
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsCard;
