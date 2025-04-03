// Report Card Component
const ReportCard = ({ report, onView, onEdit, onDelete }: any) => {
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium text-lg text-gray-900 mb-1">
              {report.title}
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {report.ministry} | {formatDate(report.createdAt)}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              report.status === "published"
                ? "bg-green-100 text-green-800"
                : report.status === "draft"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {report.description}
        </p>

        <div className="mt-4 flex flex-wrap">
          {report.tags &&
            report.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-3 flex justify-between items-center bg-gray-50">
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="h-4 w-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {report.createdBy}
        </div>

        <div className="flex">
          <button
            onClick={() => onView(report.id)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mr-4"
          >
            <svg
              className="h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </button>

          <button
            onClick={() => onEdit(report.id)}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mr-4"
          >
            <svg
              className="h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(report.id)}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
          >
            <svg
              className="h-4 w-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportCard;
