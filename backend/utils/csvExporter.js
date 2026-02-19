const { Parser } = require("json2csv");

/**
 * Converts an array of user objects to CSV format
 * @param {Array} users - Array of user documents
 * @returns {string} CSV string
 */
const exportUsersToCSV = (users) => {
  const fields = [
    { label: "ID", value: "_id" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Email", value: "email" },
    { label: "Mobile", value: "mobile" },
    { label: "Gender", value: "gender" },
    { label: "Status", value: "status" },
    { label: "Location", value: "location" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
  ];

  const opts = { fields };
  const parser = new Parser(opts);
  return parser.parse(users);
};

module.exports = { exportUsersToCSV };
