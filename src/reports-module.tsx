import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./components/auth/AuthProvider";
import { hasPermission, PERMISSIONS } from "./components/utils/rbac";

// Report Card Component
const ReportCard = ({ report, onView, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
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

// Report Detail Component
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

// Report Create/Edit Form Component
const ReportForm = ({ report = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: report?.title || "",
    ministry: report?.ministry || "",
    description: report?.description || "",
    content: report?.content || "",
    tags: report?.tags?.join(", ") || "",
    status: report?.status || "draft",
  });
  const [attachments, setAttachments] = useState(report?.attachments || []);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
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

// Sample data for demo purposes
const sampleReports = [
  {
    id: 1,
    title: "Monthly Media Analysis - March 2024",
    ministry: "Information & Broadcasting",
    description:
      "Comprehensive analysis of media coverage across print, TV, online, and social media platforms for the month of March 2024.",
    createdAt: "2024-04-01T09:00:00Z",
    createdBy: "Arun Kumar",
    status: "published",
    tags: ["Monthly Report", "Media Analysis", "Coverage"],
    content: `
      <h2>Monthly Media Analysis - March 2024</h2>
      <p>This report presents a comprehensive analysis of media coverage across various platforms for the month of March 2024.</p>
      
      <h3>Executive Summary</h3>
      <p>The month of March saw a significant increase in positive media coverage of government initiatives, particularly related to healthcare and digital governance. There was a 15% increase in overall coverage compared to February, with print media showing the highest growth at 23%.</p>
      
      <h3>Key Highlights</h3>
      <ul>
        <li>The Digital India initiative received substantial positive coverage across all media platforms.</li>
        <li>Healthcare initiatives dominated the print media coverage with 28% of total coverage.</li>
        <li>Budget allocations and infrastructure projects received mixed coverage, with more critical analysis in editorial sections.</li>
        <li>Social media sentiment showed a positive trend with a 12% increase in positive engagements.</li>
      </ul>
      
      <h3>Recommendations</h3>
      <p>Based on the analysis, the following communication priorities are recommended:</p>
      <ol>
        <li>Enhance messaging on the tangible benefits of infrastructure projects to counter critical narratives.</li>
        <li>Leverage the positive momentum around digital initiatives to highlight cross-ministry achievements.</li>
        <li>Address concerns raised in editorial pieces about budget allocations with data-driven communications.</li>
      </ol>
    `,
    attachments: [
      {
        id: 1,
        name: "March-2024-Media-Data.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: 2540032,
        url: "#",
      },
      {
        id: 2,
        name: "Media-Coverage-Charts.pdf",
        type: "application/pdf",
        size: 1458765,
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "Healthcare Initiative Media Response Analysis",
    ministry: "Health",
    description:
      "Analysis of media response to the new healthcare initiative launched in March 2024.",
    createdAt: "2024-03-25T14:30:00Z",
    createdBy: "Priya Singh",
    status: "review",
    tags: ["Healthcare", "Initiative", "Response Analysis"],
    content: `
      <h2>Healthcare Initiative Media Response Analysis</h2>
      <p>This report analyzes the media response to the new healthcare initiative launched on March 15, 2024.</p>
      
      <h3>Coverage Overview</h3>
      <p>The initiative received widespread coverage across all media platforms, with particularly strong presence in print and TV media. The coverage peaked on March 16-17, followed by sustained discussions in opinion pieces and social media.</p>
      
      <h3>Sentiment Analysis</h3>
      <p>Overall sentiment has been largely positive (68%), with neutral coverage at 22% and negative at 10%. The negative coverage primarily focused on implementation challenges in rural areas.</p>
      
      <h3>Key Narratives</h3>
      <ul>
        <li>Affordability and accessibility were highlighted as major strengths of the initiative.</li>
        <li>Questions about long-term sustainability featured in editorial opinions.</li>
        <li>Comparisons with international healthcare models appeared in specialized publications.</li>
        <li>Personal stories of potential beneficiaries received high engagement on social media.</li>
      </ul>
      
      <h3>Recommendations</h3>
      <p>To maintain positive momentum:</p>
      <ol>
        <li>Share early success stories and testimonials from beneficiaries.</li>
        <li>Address implementation concerns with concrete action plans for rural areas.</li>
        <li>Engage healthcare experts to speak about long-term sustainability aspects.</li>
      </ol>
    `,
    attachments: [
      {
        id: 3,
        name: "Healthcare-Initiative-Media-Data.pptx",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        size: 3245678,
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Digital India Quarterly Report - Q1 2024",
    ministry: "Electronics & IT",
    description:
      "Quarterly analysis of media coverage and public perception of Digital India initiatives for Q1 2024.",
    createdAt: "2024-04-02T11:15:00Z",
    createdBy: "Vikram Mehta",
    status: "draft",
    tags: ["Digital India", "Quarterly Report", "Technology"],
    content: `
      <h2>Digital India Quarterly Report - Q1 2024</h2>
      <p>This report provides a comprehensive analysis of media coverage and public perception of Digital India initiatives during the first quarter of 2024.</p>
      
      <h3>Executive Summary</h3>
      <p>Digital India initiatives continued to receive strong positive coverage across media platforms in Q1 2024. The digital payment ecosystem and rural internet connectivity projects garnered the most attention.</p>
      
      <h3>Key Metrics</h3>
      <ul>
        <li>Total media mentions: 12,458 (up 18% from Q4 2023)</li>
        <li>Positive sentiment: 72% (up 5% from Q4 2023)</li>
        <li>Social media engagement: 2.3M interactions (up 28% from Q4 2023)</li>
        <li>Top discussed initiatives: UPI transactions, rural broadband, digital literacy</li>
      </ul>
      
      <h3>Regional Analysis</h3>
      <p>Coverage varied significantly by region, with urban centers focusing on innovation aspects while rural-focused media emphasized access and literacy components.</p>
      
      <h3>Recommendations</h3>
      <ol>
        <li>Highlight success stories from rural digital adoption to maintain momentum.</li>
        <li>Address security and privacy concerns proactively, as these were emerging themes in critical coverage.</li>
        <li>Create specialized content for regional media to address local digital priorities.</li>
      </ol>
      
      <h3>Next Steps</h3>
      <p>The communications team will develop targeted messaging based on these insights for Q2 2024 campaigns.</p>
    `,
    attachments: [],
  },
];

// Main Reports Component
const Reports = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    ministry: "all",
    status: "all",
    dateRange: "all",
  });

  // Check if user has permission to view this module
  useEffect(() => {
    if (user && !hasPermission(user, PERMISSIONS.REPORT_VIEW)) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Fetch reports
  useEffect(() => {
    // This would be an API call in a real application
    setLoading(true);

    // Simulate API call with a delay
    setTimeout(() => {
      setReports(sampleReports);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredReports = reports.filter((report) => {
    // Apply search filter
    if (
      filters.search &&
      !report.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !report.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Apply ministry filter
    if (filters.ministry !== "all" && report.ministry !== filters.ministry) {
      return false;
    }

    // Apply status filter
    if (filters.status !== "all" && report.status !== filters.status) {
      return false;
    }

    // Apply date range filter
    if (filters.dateRange !== "all") {
      const reportDate = new Date(report.createdAt);
      const now = new Date();

      if (filters.dateRange === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        if (reportDate < weekAgo) return false;
      } else if (filters.dateRange === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        if (reportDate < monthAgo) return false;
      } else if (filters.dateRange === "quarter") {
        const quarterAgo = new Date();
        quarterAgo.setMonth(now.getMonth() - 3);
        if (reportDate < quarterAgo) return false;
      }
    }

    return true;
  });

  const handleViewReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      setSelectedReport(report);
      setShowReportDetail(true);
    }
  };

  const handleEditReport = (reportId) => {
    const report = reports.find((r) => r.id === reportId);
    if (report) {
      setEditingReport(report);
      setShowReportForm(true);
    }
  };

  const handleDeleteReport = (reportId) => {
    // In a real application, this would be an API call
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((r) => r.id !== reportId));
    }
  };

  const handleSubmitReport = (reportData) => {
    if (editingReport) {
      // Update existing report
      setReports(
        reports.map((r) =>
          r.id === editingReport.id ? { ...r, ...reportData } : r
        )
      );
    } else {
      // Create new report
      const newReport = {
        id: Date.now(), // Temporary ID generation
        createdAt: new Date().toISOString(),
        createdBy: user.name,
        ...reportData,
      };
      setReports([newReport, ...reports]);
    }

    setShowReportForm(false);
    setEditingReport(null);
  };

  const handleCreateNewReport = () => {
    setEditingReport(null);
    setShowReportForm(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>

          {hasPermission(user, PERMISSIONS.REPORT_CREATE) && (
            <button
              onClick={handleCreateNewReport}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Report
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by title or description"
              />
            </div>

            <div>
              <label
                htmlFor="ministry"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Ministry
              </label>
              <select
                id="ministry"
                name="ministry"
                value={filters.ministry}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Ministries</option>
                <option value="Information & Broadcasting">
                  Information & Broadcasting
                </option>
                <option value="Health">Health</option>
                <option value="Electronics & IT">Electronics & IT</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Time</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onView={handleViewReport}
                onEdit={handleEditReport}
                onDelete={handleDeleteReport}
              />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">
                No reports found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {showReportDetail && selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setShowReportDetail(false)}
        />
      )}

      {/* Report Form Modal */}
      {showReportForm && (
        <ReportForm
          report={editingReport}
          onSubmit={handleSubmitReport}
          onCancel={() => {
            setShowReportForm(false);
            setEditingReport(null);
          }}
        />
      )}
    </div>
  );
};

export default Reports;
