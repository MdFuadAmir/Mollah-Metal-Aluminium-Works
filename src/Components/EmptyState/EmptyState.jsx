import { Link } from "react-router";

const EmptyState = ({ title, message, icon, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
      <div className="text-6xl mb-4">{icon}</div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

      <p className="max-w-md mb-6 text-sm">{message}</p>

      {actionText && (
        <Link
          to={actionLink}
          className="px-5 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
