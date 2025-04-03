import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./components/auth/AuthProvider";
import { hasPermission, PERMISSIONS } from "./components/utils/rbac";

interface Report {
  title?: string;
  ministry?: string;
  description?: string;
  content?: string;
  tags?: string[];
  status?: string;
}

interface FormData {
  title: string;
  ministry: string;
  description: string;
  content: string;
  tags: string;
  status: string;
}

const ReportForm = ({ report = null, onSubmit, onCancel }) => {
  const defaultReport: Report = {
    title: "",
    ministry: "",
    description: "",
    content: "",
    tags: [],
    status: "draft",
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    ministry: "",
    description: "",
    content: "",
    tags: "",
    status: "draft",
  });

  const [attachments, setAttachments] = useState(report?.attachments || []);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {}; // Define errors as a string object

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.ministry.trim()) newErrors.ministry = "Ministry is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process tags string into array
      const processedTags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      onSubmit({
        ...formData,
        tags: processedTags,
        attachments,
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file, // Keep the file object for later upload
      url: URL.createObjectURL(file), // Preview URL
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = [...attachments];

    // If there's a URL from createObjectURL, revoke it
    if (newAttachments[index].url && !newAttachments[index].id) {
      URL.revokeObjectURL(newAttachments[index].url);
    }

    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {report ? "Edit Report" : "Create New Report"}
          </h2>
          <button
            onClick={onCancel}
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  errors.title ? "border-red-300" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="ministry"
                className="block text-sm font-medium text-gray-700"
              >
                Ministry <span className="text-red-500">*</span>
              </label>
              <select
                id="ministry"
                name="ministry"
                value={formData.ministry}
                onChange={handleChange}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.ministry ? "border-red-300" : ""
                }`}
              >
                <option value="">Select a ministry</option>
                <option value="Information & Broadcasting">
                  Information & Broadcasting
                </option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Home Affairs">Home Affairs</option>
                <option value="Defence">Defence</option>
                <option value="External Affairs">External Affairs</option>
              </select>
              {errors.ministry && (
                <p className="mt-1 text-sm text-red-600">{errors.ministry}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.description ? "border-red-300" : ""
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={formData.content}
              onChange={handleChange}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.content ? "border-red-300" : ""
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              HTML is supported for rich formatting. In production, this would
              use a WYSIWYG editor.
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="e.g. healthcare, policy, education"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="draft">Draft</option>
              <option value="review">Under Review</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1 text-sm text-gray-500">or drag and drop</p>
            </div>

            {attachments.length > 0 && (
              <ul className="mt-4 border border-gray-200 rounded-md divide-y divide-gray-200">
                {attachments.map((attachment, index) => (
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
                    <div className="ml-4 flex-shrink-0 flex">
                      {attachment.url && (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-500 mr-4"
                        >
                          View
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(index)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {report ? "Update Report" : "Create Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
