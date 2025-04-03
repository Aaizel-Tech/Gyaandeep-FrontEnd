import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../components/auth/AuthProvider";
// import { hasPermission, PERMISSIONS } from "../components/utils/rbac";

import MediaTypeTabs from "../Media/mediaTypeTabs";
import MediaFilters from "../Media/mediaFilters";
import PrintMediaCard from "../Media/printMediaCard";
import TVMediaCard from "../Media/tvMediaCard";
import OnlineMediaCard from "../Media/onlineMediaCard";
import SocialMediaCard from "../Media/socialMediaCard";

// Media Type Tabs Component

// Filter Component for Media Monitoring

// Print Media Card Component

// TV Media Card Component

// Online Media Card Component

// Social Media Card Component

// Sample data for demo purposes
const samplePrintArticles = [
  {
    id: 1,
    title: "Government Launches New Healthcare Initiative",
    publication: "Times of India",
    publishedDate: "2024-04-01",
    pageNumber: "3",
    edition: "Delhi",
    content:
      "The government has launched a new healthcare initiative aimed at providing affordable healthcare to all citizens. The initiative, which was announced by the Health Minister yesterday, will focus on improving access to healthcare in rural areas and reducing the cost of treatment for common diseases.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?healthcare",
    sentiment: "positive",
    tags: ["Healthcare", "Government", "Policy"],
  },
  {
    id: 2,
    title:
      "Budget Allocation for Infrastructure Development Falls Short of Expectations",
    publication: "Hindustan Times",
    publishedDate: "2024-04-01",
    pageNumber: "5",
    edition: "Mumbai",
    content:
      "The recent budget allocation for infrastructure development has fallen short of industry expectations. Experts have expressed concern that the allocated funds may not be sufficient to meet the country's growing infrastructure needs. The opposition has criticized the government for not prioritizing infrastructure development in the budget.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?infrastructure",
    sentiment: "negative",
    tags: ["Economy", "Budget", "Infrastructure"],
  },
];

const sampleTVClips = [
  {
    id: 1,
    title: "Panel Discussion on New Education Policy",
    channel: "News24",
    airDate: "2024-04-01",
    duration: "15:30",
    program: "Prime Time Debate",
    transcription:
      "In this panel discussion, experts debated the merits and challenges of the new education policy. The education minister defended the policy, emphasizing its focus on skill development and employability. Opposition representatives raised concerns about the implementation timeline and funding allocation.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?education",
    sentiment: "neutral",
    tags: ["Education", "Policy", "Debate"],
  },
  {
    id: 2,
    title: "Report on Digital India Progress",
    channel: "India Today",
    airDate: "2024-04-01",
    duration: "08:45",
    program: "Tech Today",
    transcription:
      "This report highlights the progress made under the Digital India initiative. The segment covers the increasing internet penetration in rural areas, the growth of digital payments, and the success of e-governance services. Experts praise the government's efforts in digitalizing various services.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?digital",
    sentiment: "positive",
    tags: ["Digital India", "Technology", "Governance"],
  },
];

const sampleOnlineArticles = [
  {
    id: 1,
    title: "Digital India Initiative Reaches New Milestone",
    source: "TechNews.com",
    author: "Prakash Sharma",
    publishedDate: "2024-04-01",
    content:
      "The Digital India initiative has reached a new milestone with over 100 million citizens now having access to digital services. The initiative, launched by the government to transform India into a digitally empowered society, has made significant progress in connecting rural areas to the internet and providing digital literacy training.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?digital",
    sentiment: "positive",
    tags: ["Digital India", "Technology", "Governance"],
  },
  {
    id: 2,
    title: "Agricultural Reforms Face Implementation Challenges",
    source: "AgriPortal.in",
    author: "Meera Patel",
    publishedDate: "2024-04-01",
    content:
      "The recent agricultural reforms introduced by the government are facing implementation challenges in several states due to varying infrastructure capabilities. Farmers in some regions have reported difficulties in accessing the digital platforms required for the new marketing systems. State governments have requested additional support for streamlining the implementation process.",
    thumbnailUrl: "https://source.unsplash.com/random/300x200?agriculture",
    sentiment: "negative",
    tags: ["Agriculture", "Reforms", "Implementation"],
  },
];

const sampleSocialPosts = [
  {
    id: 1,
    displayName: "Digital India",
    username: "digitalindia",
    verified: true,
    profileImageUrl: "https://source.unsplash.com/random/100x100?logo",
    platform: "Twitter",
    postDate: "2024-04-01",
    content:
      "Proud to announce that #DigitalIndia has enabled over 100 million citizens to access digital services! This milestone reflects our commitment to creating a digitally empowered society. #TransformingIndia",
    mediaUrl: "https://source.unsplash.com/random/500x300?digital",
    hashtags: ["DigitalIndia", "TransformingIndia"],
    likes: 1250,
    comments: 89,
    shares: 432,
    sentiment: "positive",
  },
  {
    id: 2,
    displayName: "Health Ministry",
    username: "healthministry",
    verified: true,
    profileImageUrl: "https://source.unsplash.com/random/100x100?health",
    platform: "Twitter",
    postDate: "2024-04-01",
    content:
      "Today we launched a new healthcare initiative to provide affordable healthcare to all citizens. This program will focus on improving access in rural areas and reducing treatment costs. #HealthForAll",
    hashtags: ["HealthForAll", "Healthcare"],
    likes: 876,
    comments: 54,
    shares: 290,
    sentiment: "positive",
  },
];

// Main Media Monitoring Component
const MediaMonitoring = () => {
  // const { user } = useAuth();
  // const router = useRouter();

  const user = { name: "Test User", role: "admin" }; // Mock user
  const [activeTab, setActiveTab] = useState("print");
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: "week",
    fromDate: null,
    toDate: null,
    ministry: "all",
    language: "all",
    sentiment: "all",
    topic: "all",
    keywords: "",
  });

  const [results, setResults] = useState({
    print: [],
    tv: [],
    online: [],
    social: [],
  });

  // Check if user has permission to view this module
  // useEffect(() => {
  //   if (user && !hasPermission(user, PERMISSIONS.MEDIA_VIEW)) {
  //     router.push("/dashboard");
  //   }
  // }, [user, router]);

  // Fetch data based on filters
  useEffect(() => {
    // This would be an API call in a real application
    setLoading(true);

    // Simulate API call with a delay
    setTimeout(() => {
      setResults({
        print: samplePrintArticles,
        tv: sampleTVClips,
        online: sampleOnlineArticles,
        social: sampleSocialPosts,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const applyFilters = () => {
    setLoading(true);

    // This would be an API call in production
    // For now, just simulate a loading state
    setTimeout(() => {
      // For demo, we're not actually filtering the data
      setLoading(false);
    }, 1000);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "print":
        return (
          <div>
            {results.print.length > 0 ? (
              results.print.map((article) => (
                <PrintMediaCard key={article.id} article={article} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  No print media articles found with the selected filters.
                </p>
              </div>
            )}
          </div>
        );
      case "tv":
        return (
          <div>
            {results.tv.length > 0 ? (
              results.tv.map((clip) => (
                <TVMediaCard key={clip.id} clip={clip} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  No TV clips found with the selected filters.
                </p>
              </div>
            )}
          </div>
        );
      case "online":
        return (
          <div>
            {results.online.length > 0 ? (
              results.online.map((article) => (
                <OnlineMediaCard key={article.id} article={article} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  No online articles found with the selected filters.
                </p>
              </div>
            )}
          </div>
        );
      case "social":
        return (
          <div>
            {results.social.length > 0 ? (
              results.social.map((post) => (
                <SocialMediaCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">
                  No social media posts found with the selected filters.
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Media Monitoring
          </h1>

          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create Report
            </button>
            <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Export Results
            </button>
          </div>
        </div>

        <MediaFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          applyFilters={applyFilters}
        />

        <MediaTypeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default MediaMonitoring;
