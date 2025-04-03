import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "./components/auth/AuthProvider";
// import { hasPermission, PERMISSIONS } from "./components/utils/rbac";

import ReportCard from "./reportCard";
import ReportDetail from "./reportDetail";
import ReportForm from "./reportForm";

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
  // const { user } = useAuth();
  // const router = useRouter();

  const user = { name: "Test User", role: "admin" }; // Mock user
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
  // useEffect(() => {
  //   if (user && !hasPermission(user, PERMISSIONS.REPORT_VIEW)) {
  //     router.push("/");
  //   }
  // }, [user, router]);

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

    const newReport = {
      id: Date.now(), // Temporary ID generation
      createdAt: new Date().toISOString(),
      createdBy: user.name || "Anonymous User", // Add fallback
      ...reportData,
    };
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

          {/* Replace the permission-dependent button with this */}
          <button
            onClick={handleCreateNewReport}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Report
          </button>
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
