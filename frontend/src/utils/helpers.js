/**
 * Trigger a CSV file download from a Blob response
 * @param {Blob} blob - The CSV blob from Axios
 * @param {string} filename - The desired filename
 */
export const downloadCSV = (blob, filename = "users.csv") => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Format an ISO date string to a readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Get the full URL for a profile image
 * @param {string|null} imagePath - Relative image path from server
 * @returns {string} Full URL or default avatar path
 */
export const getProfileImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
};
