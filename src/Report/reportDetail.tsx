import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "./components/auth/AuthProvider";
// import { hasPermission, PERMISSIONS } from "./components/utils/rbac";

const ReportDetail = ({ report, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{report.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Ministry</p>
              <p className="mt-1 text-sm text-gray-900">{report.ministry}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created By</p>
              <p className="mt-1 text-sm text-gray-900">{report.createdBy}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created Date</p>
              <p className="mt-1 text-sm text-gray-900">
                {formatDate(report.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === "published"
                      ? "bg-green-100 text-green-800"
                      : report.status === "draft"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {report.status.charAt(0).toUpperCase() +
                    report.status.slice(1)}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1 text-sm text-gray-900">{report.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500">Tags</p>
            <div className="mt-1 flex flex-wrap">
              {report.tags &&
                report.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mt-2"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-500">Content</p>
            <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div dangerouslySetInnerHTML={{ __html: report.content }} />
            </div>
          </div>

          {report.attachments && report.attachments.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Attachments
              </p>
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {report.attachments.map((attachment, index) => (
                  <li
                    key={index}
                    className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                  >
                    <div className="w-0 flex-1 flex items-center">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">
                        {attachment.name}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={attachment.url}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportDetail;
