import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock auth hook - in production, this would be replaced with your actual auth implementation
const useAuth = () => {
  return {
    user: {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      roles: ["admin"],
      permissions: ["dashboard:view", "media:view", "report:view"],
    },
  };
};

// Modern DashboardPage component with updated styling
const DashboardPage = ({ children, title, subtitle, actions }) => {
  return (
    <div className="bg-gray-50 min-h-screen w-full pb-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="mt-4 md:mt-0 flex space-x-3">{actions}</div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

// Sample data - would be fetched from API in production
const mediaCoverageData = [
  { name: "Jan", print: 400, tv: 240, online: 320, social: 180 },
  { name: "Feb", print: 300, tv: 139, online: 380, social: 210 },
  { name: "Mar", print: 200, tv: 190, online: 400, social: 230 },
  { name: "Apr", print: 278, tv: 390, online: 320, social: 290 },
  { name: "May", print: 189, tv: 340, online: 290, social: 270 },
  { name: "Jun", print: 239, tv: 370, online: 310, social: 250 },
];

const sentimentData = [
  { name: "Jan", positive: 65, neutral: 25, negative: 10 },
  { name: "Feb", positive: 60, neutral: 30, negative: 10 },
  { name: "Mar", positive: 55, neutral: 28, negative: 17 },
  { name: "Apr", positive: 52, neutral: 30, negative: 18 },
  { name: "May", positive: 58, neutral: 27, negative: 15 },
  { name: "Jun", positive: 63, neutral: 25, negative: 12 },
];

const topTopicsData = [
  { name: "Economy", value: 32 },
  { name: "Healthcare", value: 28 },
  { name: "Education", value: 22 },
  { name: "Infrastructure", value: 18 },
  { name: "Foreign Policy", value: 14 },
  { name: "Sports", value: 8 },
];

const topMinistryData = [
  { name: "Information & Broadcasting", articles: 1245 },
  { name: "Finance", articles: 968 },
  { name: "Health", articles: 754 },
  { name: "Home Affairs", articles: 532 },
  { name: "Education", articles: 489 },
];

// Modern color palette
const colors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
];

// Modernized Stat Card Component
const StatCard = ({ title, value, change, changeType, icon: Icon }) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl w-full transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                changeType === "increase"
                  ? "bg-green-50"
                  : changeType === "decrease"
                  ? "bg-red-50"
                  : "bg-blue-50"
              }`}
            >
              <Icon
                className={`h-7 w-7 ${
                  changeType === "increase"
                    ? "text-green-500"
                    : changeType === "decrease"
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              />
            </div>
          </div>
          <div className="ml-5 w-full flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-2xl font-semibold text-gray-800">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change && (
        <div className="bg-gray-50 px-6 py-3">
          <div className="text-sm">
            <span
              className={`font-medium ${
                changeType === "increase"
                  ? "text-green-600"
                  : changeType === "decrease"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {change}
            </span>{" "}
            <span className="text-gray-500">from previous period</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Modernized Chart Card Component
const ChartCard = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-sm rounded-xl transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="px-6 pt-6">
        <h3 className="text-lg font-semibold leading-6 text-gray-800">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

// Enhanced Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-lg rounded-lg">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="font-medium">{entry.name}:</span> {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Modern Icons for stat cards
const NewspaperIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const TvIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const MessageIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// Main Dashboard Component with modern styling
const HomeDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("week");
  const [mediaType, setMediaType] = useState("all");

  // This would fetch actual data in production
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dateRange, mediaType]);

  // Modern date range action buttons
  const dateRangeActions = (
    <div className="flex space-x-2">
      <button
        onClick={() => setDateRange("day")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          dateRange === "day"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => setDateRange("week")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          dateRange === "week"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        This Week
      </button>
      <button
        onClick={() => setDateRange("month")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          dateRange === "month"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }`}
      >
        This Month
      </button>
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        className="block bg-white pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="all">All Media</option>
        <option value="print">Print Only</option>
        <option value="tv">TV Only</option>
        <option value="online">Online Only</option>
        <option value="social">Social Only</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <DashboardPage
        title="Dashboard"
        subtitle="Overview of media monitoring and analytics"
        actions={dateRangeActions}
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title="Dashboard"
      subtitle="Overview of media monitoring and analytics"
      actions={dateRangeActions}
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6 w-full">
        <StatCard
          title="Print Articles"
          value="1,562"
          change="12% ↑"
          changeType="increase"
          icon={NewspaperIcon}
        />
        <StatCard
          title="TV Clips"
          value="345"
          change="7% ↑"
          changeType="increase"
          icon={TvIcon}
        />
        <StatCard
          title="Online Articles"
          value="2,845"
          change="3% ↓"
          changeType="decrease"
          icon={GlobeIcon}
        />
        <StatCard
          title="Social Media Posts"
          value="12,456"
          change="18% ↑"
          changeType="increase"
          icon={MessageIcon}
        />
      </div>

      {/* Media Coverage Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <ChartCard title="Media Coverage Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mediaCoverageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar
                  dataKey="print"
                  stackId="a"
                  fill={colors[0]}
                  name="Print"
                />
                <Bar dataKey="tv" stackId="a" fill={colors[1]} name="TV" />
                <Bar
                  dataKey="online"
                  stackId="a"
                  fill={colors[2]}
                  name="Online"
                />
                <Bar
                  dataKey="social"
                  stackId="a"
                  fill={colors[3]}
                  name="Social"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Sentiment Analysis */}
        <ChartCard title="Sentiment Analysis">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sentimentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                <YAxis tick={{ fill: "#6b7280" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#10b981"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Positive"
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="#6b7280"
                  strokeWidth={2}
                  name="Neutral"
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Negative"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Topics and Ministry Coverage */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        {/* Top Topics */}
        <ChartCard title="Top Topics">
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topTopicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topTopicsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} articles`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Ministry Coverage */}
        <ChartCard title="Top Ministries by Coverage">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topMinistryData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fill: "#6b7280" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#6b7280" }}
                  width={120}
                />
                <Tooltip formatter={(value) => `${value} articles`} />
                <Bar
                  dataKey="articles"
                  fill={colors[0]}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Latest Alerts Section */}
      <div className="mb-6">
        <ChartCard title="Latest Alerts">
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-700"
                  >
                    Alert
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
                  >
                    Ministry
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700"
                  >
                    Time
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  {
                    id: 1,
                    title: "Negative coverage on healthcare initiative",
                    ministry: "Health",
                    source: "News Today",
                    time: "2 hours ago",
                    severity: "high",
                  },
                  {
                    id: 2,
                    title: "Misleading information about budget allocation",
                    ministry: "Finance",
                    source: "Metro Journal",
                    time: "4 hours ago",
                    severity: "medium",
                  },
                  {
                    id: 3,
                    title: "Critical feedback on new education policy",
                    ministry: "Education",
                    source: "Daily Chronicle",
                    time: "6 hours ago",
                    severity: "low",
                  },
                  {
                    id: 4,
                    title: "Viral social media post about transportation",
                    ministry: "Transport",
                    source: "Twitter",
                    time: "8 hours ago",
                    severity: "medium",
                  },
                ].map((alert) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-3 ${
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></span>
                        {alert.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                      {alert.ministry}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                      {alert.source}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                      {alert.time}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </DashboardPage>
  );
};

export default HomeDashboard;
