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

export default MediaFilters;
