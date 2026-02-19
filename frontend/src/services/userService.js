import apiClient from "./axiosInstance";

/**
 * User API service - all user-related API calls
 */
const userService = {
  /**
   * Fetch paginated users with optional search
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {string} search - Search query
   */
  getUsers: (page = 1, limit = 10, search = "") =>
    apiClient.get("/users", { params: { page, limit, search } }),

  /**
   * Fetch a single user by ID
   * @param {string} id - User ID
   */
  getUserById: (id) => apiClient.get(`/users/${id}`),

  /**
   * Create a new user (multipart/form-data for image upload)
   * @param {FormData} formData - User data including profile image
   */
  createUser: (formData) =>
    apiClient.post("/users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Update an existing user
   * @param {string} id - User ID
   * @param {FormData} formData - Updated user data
   */
  updateUser: (id, formData) =>
    apiClient.put(`/users/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /**
   * Delete a user by ID
   * @param {string} id - User ID
   */
  deleteUser: (id) => apiClient.delete(`/users/${id}`),

  /**
   * Trigger CSV export download
   * Returns blob for browser download
   */
  exportCSV: () =>
    apiClient.get("/users/export/csv", { responseType: "blob" }),
};

export default userService;
