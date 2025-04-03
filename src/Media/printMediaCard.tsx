import { useState } from "react";

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
export default PrintMediaCard;
