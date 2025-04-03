import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./components/auth/AuthProvider";
import { hasPermission, PERMISSIONS } from "./components/utils/rbac";

// Media Type Tabs Component
const MediaTypeTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "print", label: "Print Media" },
    { id: "tv", label: "TV Media" },
    { id: "online", label: "Online Media" },
    { id: "social", label: "Social Media" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Filter Component for Media Monitoring
const MediaFilters = ({ filters, onFilterChange, applyFilters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.dateRange}
            onChange={(e) => onFilterChange("dateRange", e.target.value)}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {filters.dateRange === "custom" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.fromDate || ""}
                onChange={(e) => onFilterChange("fromDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.toDate || ""}
                onChange={(e) => onFilterChange("toDate", e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ministry
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.ministry}
            onChange={(e) => onFilterChange("ministry", e.target.value)}
          >
            <option value="all">All Ministries</option>
            <option value="information-broadcasting">
              Information & Broadcasting
            </option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="home-affairs">Home Affairs</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.language}
            onChange={(e) => onFilterChange("language", e.target.value)}
          >
            <option value="all">All Languages</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sentiment
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.sentiment}
            onChange={(e) => onFilterChange("sentiment", e.target.value)}
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filters.topic}
            onChange={(e) => onFilterChange("topic", e.target.value)}
          >
            <option value="all">All Topics</option>
            <option value="economy">Economy</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="foreign-policy">Foreign Policy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Keywords
          </label>
          <input
            type="text"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            placeholder="Enter keywords"
            value={filters.keywords || ""}
            onChange={(e) => onFilterChange("keywords", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={applyFilters}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Print Media Card Component
const PrintMediaCard = ({ article }) => {
  const [expanded, setExpanded] = useState(false);

  const getSentimentBadge = (sentiment) => {
    const sentimentClasses = {
      positive: "bg-green-100 text-green-800",
      neutral: "bg-gray-100 text-gray-800",
      negative: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentClasses[sentiment]}`}
      >
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        {article.thumbnailUrl && (
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="h-32 w-full md:w-32 object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {article.title}
            </h3>
            {article.sentiment && getSentimentBadge(article.sentiment)}
          </div>

          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center">
            <span className="mr-3">{article.publication}</span>
            <span className="mr-3">{article.publishedDate}</span>
            <span className="mr-3">Page: {article.pageNumber}</span>
            <span>Edition: {article.edition}</span>
          </div>

          <p
            className={`mt-2 text-sm text-gray-600 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {article.content}
          </p>

          {article.content.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-3 flex flex-wrap">
            {article.tags &&
              article.tags.map((tag, index) => (
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
                View Original
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

// TV Media Card Component
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

// Online Media Card Component
const OnlineMediaCard = ({ article }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow transition-shadow duration-200">
      <div className="flex flex-col md:flex-row">
        {article.thumbnailUrl && (
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="h-32 w-full md:w-32 object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {article.title}
            </h3>
            {article.sentiment && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  article.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : article.sentiment === "negative"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {article.sentiment.charAt(0).toUpperCase() +
                  article.sentiment.slice(1)}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center">
            <span className="mr-3">{article.source}</span>
            <span>{article.publishedDate}</span>
            {article.author && (
              <span className="ml-3">By: {article.author}</span>
            )}
          </div>

          <p
            className={`mt-2 text-sm text-gray-600 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {article.content}
          </p>

          {article.content.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-3 flex flex-wrap">
            {article.tags &&
              article.tags.map((tag, index) => (
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
                Read Original
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

// Social Media Card Component
const SocialMediaCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow transition-shadow duration-200">
      <div className="flex items-start mb-3">
        <img
          src={post.profileImageUrl || "/placeholder-avatar.png"}
          alt={post.username}
          className="h-10 w-10 rounded-full mr-3"
        />
        <div>
          <div className="flex items-center">
            <p className="font-medium text-gray-900">{post.displayName}</p>
            {post.verified && (
              <svg
                className="h-4 w-4 ml-1 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-sm text-gray-500">@{post.username}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-gray-500">{post.postDate}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className="flex items-center mr-2">
              <svg
                className="h-3 w-3 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                />
              </svg>
              {post.platform}
            </span>
            {post.sentiment && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  post.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : post.sentiment === "negative"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {post.sentiment.charAt(0).toUpperCase() +
                  post.sentiment.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-900 mb-3">{post.content}</p>

      {post.mediaUrl && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img src={post.mediaUrl} alt="Post media" className="w-full h-auto" />
        </div>
      )}

      <div className="flex flex-wrap mb-3">
        {post.hashtags &&
          post.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="inline-flex items-center mr-2 mb-1 text-blue-600 hover:underline text-sm"
            >
              #{hashtag}
            </span>
          ))}
      </div>

      <div className="mt-3 flex border-t border-gray-200 pt-3">
        <div className="flex items-center text-gray-500 mr-4">
          <svg
            className="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          {post.likes}
        </div>
        <div className="flex items-center text-gray-500 mr-4">
          <svg
            className="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          {post.comments}
        </div>
        <div className="flex items-center text-gray-500">
          <svg
            className="h-5 w-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          {post.shares}
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
            View Original
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Add to Report
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const { user } = useAuth();
  const router = useRouter();
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
  useEffect(() => {
    if (user && !hasPermission(user, PERMISSIONS.MEDIA_VIEW)) {
      router.push("/dashboard");
    }
  }, [user, router]);

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
