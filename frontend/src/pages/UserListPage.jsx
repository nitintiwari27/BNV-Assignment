import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import userService from "../services/userService";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { downloadCSV } from "../utils/helpers";

/**
 * UserListPage - Main listing page
 * Features: search, pagination, status change inline, export CSV, add user
 */
const UserListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch users from API
  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await userService.getUsers(page, 10, search);
        setUsers(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  // Re-fetch when search or page changes
  useEffect(() => {
    fetchUsers(1);
  }, [search]);

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  // Trigger search on button click or Enter key
  const handleSearch = () => {
    setSearch(searchInput.trim());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Export CSV
  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      const res = await userService.exportCSV();
      downloadCSV(res.data, `users_${Date.now()}.csv`);
      toast.success("CSV exported successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Top Controls ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="input-field w-64"
          />
          <button onClick={handleSearch} className="btn-primary px-6">
            Search
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/users/add")}
            className="btn-primary flex items-center gap-1"
          >
            + Add User
          </button>
          <button
            onClick={handleExportCSV}
            disabled={exportLoading}
            className="btn-primary flex items-center gap-1"
          >
            {exportLoading ? "Exporting..." : "Export To Csv"}
          </button>
        </div>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <Loader />
        ) : (
          <>
            <UserTable
              users={users}
              onStatusChange={() => fetchUsers(pagination.currentPage)}
              onDeleteSuccess={() => fetchUsers(pagination.currentPage)}
            />
            {/* Pagination */}
            <div className="px-4 pb-4">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
