import { useState } from "react";
import { LineChart, BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from "recharts";

// Sample analytics data
const analyticsData = {
  sentimentOverTime: [
    { date: 'Jan', positive: 65, negative: 25, neutral: 10 },
    { date: 'Feb', positive: 70, negative: 20, neutral: 10 },
    { date: 'Mar', positive: 60, negative: 30, neutral: 10 },
    { date: 'Apr', positive: 75, negative: 15, neutral: 10 },
    { date: 'May', positive: 80, negative: 10, neutral: 10 },
    { date: 'Jun', positive: 65, negative: 25, neutral: 10 },
    { date: 'Jul', positive: 55, negative: 35, neutral: 10 },
  ],
  channelBreakdown: [
    { channel: 'CNN', count: 120 },
    { channel: 'Fox News', count: 95 },
    { channel: 'MSNBC', count: 85 },
    { channel: 'ABC', count: 65 },
    { channel: 'CBS', count: 55 },
    { channel: 'NBC', count: 50 },
    { channel: 'BBC', count: 35 },
    { channel: 'Al Jazeera', count: 25 },
  ],
  topicDistribution: [
    { name: 'Politics', value: 40 },
    { name: 'Economy', value: 25 },
    { name: 'Healthcare', value: 15 },
    { name: 'Environment', value: 10 },
    { name: 'Technology', value: 7 },
    { name: 'Sports', value: 3 },
  ],
  viewsOverTime: [
    { date: 'Jan', views: 12000 },
    { date: 'Feb', views: 13500 },
    { date: 'Mar', views: 15000 },
    { date: 'Apr', views: 14200 },
    { date: 'May', views: 16500 },
    { date: 'Jun', views: 17800 },
    { date: 'Jul', views: 16200 },
  ],
};

// Sample TV clips data
const clipsData = [
  {
    id: 1,
    thumbnailUrl: "/api/placeholder/300/180",
    title: "Economic Growth Analysis",
    sentiment: "positive",
    channel: "CNN",
    airDate: "Apr 15, 2025",
    duration: "2:35",
    program: "Economic Update",
    transcription: "The national economy has shown significant growth in the last quarter, exceeding all expectations. Analysts attribute this growth to the new policies implemented earlier this year. Several sectors have reported increased activity, particularly in technology and renewable energy.",
    tags: ["Economy", "Growth", "Analysis"]
  },
  {
    id: 2,
    thumbnailUrl: "/api/placeholder/300/180",
    title: "Healthcare Reform Debate",
    sentiment: "neutral",
    channel: "Fox News",
    airDate: "Apr 12, 2025",
    duration: "3:42",
    program: "Policy Hour",
    transcription: "The healthcare reform bill continues to be debated in Congress with representatives from both parties expressing their views. While some argue for expanded coverage, others express concerns about the fiscal implications of such reforms.",
    tags: ["Healthcare", "Policy", "Debate"]
  },
  {
    id: 3,
    thumbnailUrl: "/api/placeholder/300/180",
    title: "Climate Change Report",
    sentiment: "negative",
    channel: "MSNBC",
    airDate: "Apr 10, 2025",
    duration: "4:15",
    program: "Environmental Focus",
    transcription: "The latest climate report indicates faster than expected warming trends across several regions. Scientists warn that without immediate intervention, we could see severe consequences within the next decade. The report calls for urgent action from governments worldwide.",
    tags: ["Climate", "Environment", "Crisis"]
  }
];

// TV Media Card Component from original code
const TVMediaCard = ({ clip }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 relative">
          <img
            src={clip.thumbnailUrl}
            alt={clip.title}
            className="h-32 w-full md:w-56 object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition-opacity">
              <svg
                className="h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium text-gray-900">{clip.title}</h3>
            {clip.sentiment && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  clip.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : clip.sentiment === "negative"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {clip.sentiment.charAt(0).toUpperCase() +
                  clip.sentiment.slice(1)}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center">
            <span className="mr-3">{clip.channel}</span>
            <span className="mr-3">{clip.airDate}</span>
            <span className="mr-3">Duration: {clip.duration}</span>
            <span>Program: {clip.program}</span>
          </div>

          <p
            className={`mt-2 text-sm text-gray-600 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {clip.transcription}
          </p>

          {clip.transcription.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-3 flex flex-wrap">
            {clip.tags &&
              clip.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                View Clip
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Add to Report
              </button>
            </div>
            <div>
              <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TVAnalyticsDashboard = () => {
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterSentiment, setFilterSentiment] = useState("All");
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Filter clips based on selected filters
  const filteredClips = clipsData.filter(clip => {
    return (filterChannel === "All" || clip.channel === filterChannel) &&
           (filterSentiment === "All" || clip.sentiment === filterSentiment);
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">TV Media Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sentiment Distribution Over Time */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Sentiment Analysis Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={analyticsData.sentimentOverTime}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#00C49F" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="negative" stroke="#FF8042" />
              <Line type="monotone" dataKey="neutral" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Channel Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Coverage by Channel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={analyticsData.channelBreakdown}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Topic Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Topic Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.topicDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {analyticsData.topicDistribution.map((entry, index) => (
                  <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Viewership Over Time */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Viewership Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={analyticsData.viewsOverTime}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Filters for clips */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Filter Clips</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
            <select
              className="border rounded-md py-1 px-3"
              value={filterChannel}
              onChange={(e) => setFilterChannel(e.target.value)}
            >
              <option value="All">All Channels</option>
              <option value="CNN">CNN</option>
              <option value="Fox News">Fox News</option>
              <option value="MSNBC">MSNBC</option>
              <option value="ABC">ABC</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
            <select
              className="border rounded-md py-1 px-3"
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
            >
              <option value="All">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Media clips in table format */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Media Clips</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Air Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClips.map((clip) => (
                <tr key={clip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{clip.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clip.channel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clip.airDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        clip.sentiment === "positive"
                          ? "bg-green-100 text-green-800"
                          : clip.sentiment === "negative"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {clip.sentiment.charAt(0).toUpperCase() + clip.sentiment.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{clip.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                    <a href="#" className="text-blue-600 hover:text-blue-900">Report</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Individual media cards */}
      <h2 className="text-xl font-medium mb-4">Featured Media Clips</h2>
      <div className="space-y-4">
        {filteredClips.map((clip) => (
          <TVMediaCard key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
};

export default TVAnalyticsDashboard;