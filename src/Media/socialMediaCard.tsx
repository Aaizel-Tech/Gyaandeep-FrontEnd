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
export default SocialMediaCard;
