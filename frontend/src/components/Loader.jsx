/**
 * Loader - Full-page centered spinner shown during data fetching
 */
const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-3"></div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default Loader;
