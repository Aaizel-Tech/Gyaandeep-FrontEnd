import { useState, useEffect } from "react";

// Sample data for alerts
const sampleAlerts = [
  {
    id: 1,
    title: "Negative coverage on healthcare initiative",
    message:
      "Multiple news outlets reporting critical stories about the recent healthcare initiative launch.",
    createdAt: "2023-07-28T08:32:00",
    status: "new",
    priority: "high",
    ministry: "Health",
    source: "News Today",
    sourceType: "print",
    tags: ["Healthcare", "Policy"],
    assignedTo: null,
    read: false,
  },
  {
    id: 2,
    title: "Trending hashtag about budget allocation",
    message:
      "A hashtag criticizing the recent budget allocation is trending on Twitter with over 10,000 mentions.",
    createdAt: "2023-07-28T09:15:00",
    status: "in-progress",
    priority: "medium",
    ministry: "Finance",
    source: "Twitter",
    sourceType: "social",
    tags: ["Budget", "Twitter"],
    assignedTo: "user123",
    read: true,
  },
  {
    id: 3,
    title: "Misleading information about education policy",
    message:
      "Several online portals are sharing misleading information about the new education policy.",
    createdAt: "2023-07-28T10:45:00",
    status: "resolved",
    priority: "low",
    ministry: "Education",
    source: "Online News",
    sourceType: "online",
    tags: ["Education", "Misinformation"],
    assignedTo: "user456",
    read: true,
  },
  {
    id: 4,
    title: "TV debate on infrastructure project",
    message:
      "A prime-time TV debate is scheduled tonight focusing on the delays in the infrastructure project.",
    createdAt: "2023-07-28T11:20:00",
    status: "new",
    priority: "medium",
    ministry: "Infrastructure",
    source: "Channel News",
    sourceType: "tv",
    tags: ["Infrastructure", "Debate"],
    assignedTo: null,
    read: false,
  },
  {
    id: 5,
    title: "Positive coverage on environmental initiative",
    message:
      "Major newspapers are featuring positive stories about the new environmental protection initiative.",
    createdAt: "2023-07-28T12:10:00",
    status: "new",
    priority: "low",
    ministry: "Environment",
    source: "Multiple Sources",
    sourceType: "print",
    tags: ["Environment", "Positive"],
    assignedTo: null,
    read: false,
  },
];

// Mock user data
const currentUser = {
  id: "user123",
  name: "John Doe",
  role: "Media Analyst",
  ministry: "All",
};

// Alert detail component
const AlertDetail = ({ alert, onClose, onStatusChange, onAssign }) => {
  const [status, setStatus] = useState(alert.status);
  const [responseText, setResponseText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(alert.id, newStatus);
  };

  const handleSubmitResponse = () => {
    if (!responseText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Clear response text after submission
      setResponseText("");
      // Change status to resolved
      handleStatusChange("resolved");
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleAssignToMe = () => {
    onAssign(alert.id, currentUser.id);
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <svg
            className="h-6 w-6"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Created</p>
          <p className="text-sm text-gray-900">{formatDate(alert.createdAt)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Ministry</p>
          <p className="text-sm text-gray-900">{alert.ministry}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Source</p>
          <p className="text-sm text-gray-900">
            {alert.source} ({alert.sourceType})
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Assigned To</p>
          <p className="text-sm text-gray-900">
            {alert.assignedTo
              ? alert.assignedTo === currentUser.id
                ? "You"
                : alert.assignedTo
              : "Unassigned"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Priority</p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyles(
              alert.priority
            )}`}
          >
            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
              status
            )}`}
          >
            {status === "in-progress"
              ? "In Progress"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-500">Tags</p>
        <div className="flex flex-wrap mt-1">
          {alert.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 mb-1">Alert Message</p>
        <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-900">
          {alert.message}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusChange("new")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                status === "new"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              New
            </button>
            <button
              onClick={() => handleStatusChange("in-progress")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                status === "in-progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleStatusChange("resolved")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Resolved
            </button>
          </div>

          {!alert.assignedTo && (
            <button
              onClick={handleAssignToMe}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Assign to Me
            </button>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="response"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Response / Action Taken
          </label>
          <textarea
            id="response"
            rows={4}
            className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
            placeholder="Enter your response or action taken..."
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmitResponse}
            disabled={!responseText.trim() || isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              !responseText.trim() || isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Response"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Alert list item component
const AlertListItem = ({ alert, onSelect, isSelected }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`${
        isSelected
          ? "border-2 border-indigo-500 bg-indigo-50"
          : "border border-gray-200 bg-white hover:bg-gray-50"
      } rounded-lg p-4 mb-3 cursor-pointer transition-colors duration-150`}
      onClick={() => onSelect(alert.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div
            className={`w-3 h-3 mt-1.5 rounded-full ${
              !alert.read ? "bg-indigo-500" : "bg-gray-200"
            }`}
          ></div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
            <div className="mt-1 flex flex-wrap">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 mb-1 ${getPriorityStyles(
                  alert.priority
                )}`}
              >
                {alert.priority.charAt(0).toUpperCase() +
                  alert.priority.slice(1)}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 mb-1 ${getStatusStyles(
                  alert.status
                )}`}
              >
                {alert.status === "in-progress"
                  ? "In Progress"
                  : alert.status.charAt(0).toUpperCase() +
                    alert.status.slice(1)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-1">
                {alert.ministry}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-1">
                {alert.sourceType.charAt(0).toUpperCase() +
                  alert.sourceType.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {formatTime(alert.createdAt)}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600 line-clamp-2 ml-6">
        {alert.message}
      </div>
    </div>
  );
};

// Main Alerts component
const AlertsManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    ministry: "all",
    sourceType: "all",
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch alerts data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlerts(sampleAlerts);
      setFilteredAlerts(sampleAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...alerts];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (alert) =>
          alert.title.toLowerCase().includes(query) ||
          alert.message.toLowerCase().includes(query) ||
          alert.ministry.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((alert) => alert.status === filters.status);
    }

    // Apply priority filter
    if (filters.priority !== "all") {
      result = result.filter((alert) => alert.priority === filters.priority);
    }

    // Apply ministry filter
    if (filters.ministry !== "all") {
      result = result.filter((alert) => alert.ministry === filters.ministry);
    }

    // Apply source type filter
    if (filters.sourceType !== "all") {
      result = result.filter(
        (alert) => alert.sourceType === filters.sourceType
      );
    }

    setFilteredAlerts(result);
  }, [alerts, filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSelectAlert = (alertId) => {
    setSelectedAlertId(alertId);

    // Mark the alert as read
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const handleCloseDetail = () => {
    setSelectedAlertId(null);
  };

  const handleStatusChange = (alertId, newStatus) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    );
  };

  const handleAssignAlert = (alertId, userId) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, assignedTo: userId } : alert
      )
    );
  };

  const selectedAlert = alerts.find((alert) => alert.id === selectedAlertId);

  const unreadCount = alerts.filter((alert) => !alert.read).length;
  const highPriorityCount = alerts.filter(
    (alert) => alert.priority === "high"
  ).length;

  // Get unique ministries for the filter
  const ministries = ["all", ...new Set(alerts.map((alert) => alert.ministry))];

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Alert Management
          </h1>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {unreadCount} Unread
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {highPriorityCount} High Priority
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters and alerts list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="mb-4">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Alerts
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by title, content, ministry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="status-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.priority}
                    onChange={(e) =>
                      handleFilterChange("priority", e.target.value)
                    }
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ministry-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ministry
                  </label>
                  <select
                    id="ministry-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.ministry}
                    onChange={(e) =>
                      handleFilterChange("ministry", e.target.value)
                    }
                  >
                    {ministries.map((ministry, index) => (
                      <option key={index} value={ministry}>
                        {ministry === "all" ? "All Ministries" : ministry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="source-filter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Source Type
                  </label>
                  <select
                    id="source-filter"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.sourceType}
                    onChange={(e) =>
                      handleFilterChange("sourceType", e.target.value)
                    }
                  >
                    <option value="all">All Sources</option>
                    <option value="print">Print</option>
                    <option value="tv">TV</option>
                    <option value="online">Online</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[65vh]">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <AlertListItem
                    key={alert.id}
                    alert={alert}
                    onSelect={handleSelectAlert}
                    isSelected={selectedAlertId === alert.id}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg p-4 text-center text-gray-500">
                  No alerts match your filters.
                </div>
              )}
            </div>
          </div>

          {/* Alert detail or stats */}
          <div className="lg:col-span-2">
            {selectedAlert ? (
              <AlertDetail
                alert={selectedAlert}
                onClose={handleCloseDetail}
                onStatusChange={handleStatusChange}
                onAssign={handleAssignAlert}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Alert Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-indigo-600 mb-1">
                      Total Alerts
                    </p>
                    <p className="text-2xl font-bold text-indigo-900">
                      {alerts.length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-yellow-600 mb-1">
                      Unread Alerts
                    </p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {unreadCount}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-600 mb-1">
                      High Priority
                    </p>
                    <p className="text-2xl font-bold text-red-900">
                      {highPriorityCount}
                    </p>
                  </div>
                </div>

                {/* Status breakdown */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Status Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-blue-600">New</p>
                        <p className="text-lg font-bold text-blue-900">
                          {alerts.filter((a) => a.status === "new").length}
                        </p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-yellow-600">
                          In Progress
                        </p>
                        <p className="text-lg font-bold text-yellow-900">
                          {
                            alerts.filter((a) => a.status === "in-progress")
                              .length
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-green-600">
                          Resolved
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          {alerts.filter((a) => a.status === "resolved").length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source breakdown */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Source Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">
                          Print
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {
                            alerts.filter((a) => a.sourceType === "print")
                              .length
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">TV</p>
                        <p className="text-lg font-bold text-gray-900">
                          {alerts.filter((a) => a.sourceType === "tv").length}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">
                          Online
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {
                            alerts.filter((a) => a.sourceType === "online")
                              .length
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-600">
                          Social
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {
                            alerts.filter((a) => a.sourceType === "social")
                              .length
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Recent Activity
                  </h3>
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {[
                        {
                          user: "John Doe",
                          action: "resolved an alert",
                          time: "10 minutes ago",
                          target: "Budget allocation misinformation",
                        },
                        {
                          user: "Jane Smith",
                          action: "created a new alert",
                          time: "35 minutes ago",
                          target: "TV debate on infrastructure project",
                        },
                        {
                          user: "Mike Johnson",
                          action: "assigned an alert to themselves",
                          time: "1 hour ago",
                          target: "Negative coverage on healthcare initiative",
                        },
                        {
                          user: "Sarah Williams",
                          action: 'changed alert status to "In Progress"',
                          time: "2 hours ago",
                          target: "Trending hashtag about budget allocation",
                        },
                      ].map((activity, i) => (
                        <li key={i} className="py-3">
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  {activity.user}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {activity.time}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600">
                                {activity.action} -{" "}
                                <span className="font-medium">
                                  {activity.target}
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsManagement;
