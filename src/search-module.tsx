import React, { useState, useEffect } from 'react';

// Sample data for search results
const sampleSearchResults = {
  print: [
    {
      id: 1,
      title: 'New Healthcare Initiative Shows Promising Results',
      publication: 'Times of India',
      publishedDate: '2023-07-28',
      excerpt: 'The government\'s new healthcare initiative has shown promising early results, with more than 5,000 patients receiving treatment in the first month.',
      type: 'print',
      sentiment: 'positive',
      source: 'Times of India',
      ministry: 'Health',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?healthcare'
    },
    {
      id: 2,
      title: 'Budget Allocation for Infrastructure Under Scrutiny',
      publication: 'Hindustan Times',
      publishedDate: '2023-07-27',
      excerpt: 'Opposition leaders have raised concerns about the recent budget allocation for infrastructure projects, claiming it falls short of needs.',
      type: 'print',
      sentiment: 'negative',
      source: 'Hindustan Times',
      ministry: 'Finance',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?budget'
    }
  ],
  tv: [
    {
      id: 3,
      title: 'Panel Discussion on Education Policy',
      channel: 'News24',
      airDate: '2023-07-28',
      excerpt: 'A panel of experts discussed the implications of the new education policy and its impact on students across the country.',
      type: 'tv',
      sentiment: 'neutral',
      source: 'News24',
      ministry: 'Education',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?education'
    }
  ],
  online: [
    {
      id: 4,
      title: 'Digital India Initiative Reaches New Milestone',
      website: 'TechNews.com',
      publishedDate: '2023-07-28',
      excerpt: 'The Digital India initiative has reached a new milestone with over 100 million citizens now having access to digital services.',
      type: 'online',
      sentiment: 'positive',
      source: 'TechNews.com',
      ministry: 'Electronics & IT',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?digital'
    },
    {
      id: 5,
      title: 'Agricultural Reforms Face Implementation Challenges',
      website: 'AgriPortal.in',
      publishedDate: '2023-07-27',
      excerpt: 'The new agricultural reforms are facing implementation challenges in several states due to varying infrastructure capabilities.',
      type: 'online',
      sentiment: 'negative',
      source: 'AgriPortal.in',
      ministry: 'Agriculture',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?agriculture'
    }
  ],
  social: [
    {
      id: 6,
      title: 'Trending Hashtag: #DigitalIndia',
      platform: 'Twitter',
      date: '2023-07-28',
      excerpt: 'The #DigitalIndia hashtag is trending with citizens sharing their positive experiences with digital government services.',
      type: 'social',
      sentiment: 'positive',
      source: 'Twitter',
      ministry: 'Electronics & IT',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?social'
    },
    {
      id: 7,
      title: 'Public Reaction to Healthcare Initiative',
      platform: 'Facebook',
      date: '2023-07-28',
      excerpt: 'Public reactions to the new healthcare initiative have been predominantly positive, with many sharing stories of improved access to medical services.',
      type: 'social',
      sentiment: 'positive',
      source: 'Facebook',
      ministry: 'Health',
      thumbnailUrl: 'https://source.unsplash.com/random/300x200?patient'
    }
  ]
};

// Search result item component
const SearchResultItem = ({ result, onSelect }) => {
  const renderSourceInfo = () => {
    switch (result.type) {
      case 'print':
        return `${result.publication} - ${result.publishedDate}`;
      case 'tv':
        return `${result.channel} - ${result.airDate}`;
      case 'online':
        return `${result.website} - ${result.publishedDate}`;
      case 'social':
        return `${result.platform} - ${result.date}`;
      default:
        return result.source;
    }
  };

  const getSentimentStyles = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'print':
        return 'bg-blue-100 text-blue-800';
      case 'tv':
        return 'bg-purple-100 text-purple-800';
      case 'online':
        return 'bg-yellow-100 text-yellow-800';
      case 'social':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onSelect(result)}
    >
      <div className="flex flex-col md:flex-row">
        {result.thumbnailUrl && (
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <img 
              src={result.thumbnailUrl} 
              alt={result.title}
              className="h-32 w-full md:w-32 object-cover rounded-md" 
            />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{result.title}</h3>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
            <div className="mr-4">{renderSourceInfo()}</div>
            <div className="flex space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyles(result.type)}`}>
                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentStyles(result.sentiment)}`}>
                {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">{result.excerpt}</p>
          
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {result.ministry}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search result detail component
const SearchResultDetail = ({ result, onClose }) => {
  if (!result) return null;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const renderSourceInfo = () => {
    switch (result.type) {
      case 'print':
        return (
          <>
            <div>
              <span className="font-medium text-gray-500">Publication:</span>
              <p>{result.publication}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Date:</span>
              <p>{formatDate(result.publishedDate)}</p>
            </div>
          </>
        );
      case 'tv':
        return (
          <>
            <div>
              <span className="font-medium text-gray-500">Channel:</span>
              <p>{result.channel}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Air Date:</span>
              <p>{formatDate(result.airDate)}</p>
            </div>
          </>
        );
      case 'online':
        return (
          <>
            <div>
              <span className="font-medium text-gray-500">Website:</span>
              <p>{result.website}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Date:</span>
              <p>{formatDate(result.publishedDate)}</p>
            </div>
          </>
        );
      case 'social':
        return (
          <>
            <div>
              <span className="font-medium text-gray-500">Platform:</span>
              <p>{result.platform}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Date:</span>
              <p>{formatDate(result.date)}</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getSentimentStyles = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Mock content based on the excerpt (in a real app, this would be fetched)
  const fullContent = result.excerpt.repeat(5);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{result.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {renderSourceInfo()}
        <div>
          <span className="font-medium text-gray-500">Ministry:</span>
          <p>{result.ministry}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Type:</span>
          <p className="capitalize">{result.type}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Sentiment:</span>
          <p className={getSentimentStyles(result.sentiment)}>
            {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
          </p>
        </div>
      </div>

      {result.thumbnailUrl && (
        <div className="mb-4">
          <img 
            src={result.thumbnailUrl} 
            alt={result.title}
            className="w-full h-48 object-cover rounded-lg" 
          />
        </div>
      )}

      <div className="prose max-w-none mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Content</h3>
        <p className="text-gray-700">{fullContent}</p>
      </div>

      <div className="flex space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Source
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Report
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Alert
        </button>
      </div>
    </div>
  );
};

// Advanced search filter panel
const AdvancedSearchFilters = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters, 
  expanded, 
  onToggleExpand 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Search Filters</h3>
        <button
          onClick={onToggleExpand}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none"
        >
          {expanded ? 'Collapse Filters' : 'Expand Filters'}
        </button>
      </div>

      <div className={`${expanded ? 'block' : 'hidden'} space-y-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.dateRange}
              onChange={e => onFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media Type
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.mediaType}
              onChange={e => onFilterChange('mediaType', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="print">Print</option>
              <option value="tv">TV</option>
              <option value="online">Online</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sentiment
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.sentiment}
              onChange={e => onFilterChange('sentiment', e.target.value)}
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ministry
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.ministry}
              onChange={e => onFilterChange('ministry', e.target.value)}
            >
              <option value="all">All Ministries</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Electronics & IT">Electronics & IT</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>
        </div>

        {filters.dateRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                className="block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.fromDate || ''}
                onChange={e => onFilterChange('fromDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                className="block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.toDate || ''}
                onChange={e => onFilterChange('toDate', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              type="text"
              placeholder="Enter source name"
              className="block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.source || ''}
              onChange={e => onFilterChange('source', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords
            </label>
            <input
              type="text"
              placeholder="Enter keywords (comma separated)"
              className="block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.keywords || ''}
              onChange={e => onFilterChange('keywords', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filters.sortBy}
              onChange={e => onFilterChange('sortBy', e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="sentiment">Sentiment</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-200">
          <button
            type="button"
            className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onResetFilters}
          >
            Reset Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Main search component
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    mediaType: 'all',
    sentiment: 'all',
    ministry: 'all',
    source: '',
    keywords: '',
    sortBy: 'relevance',
    fromDate: null,
    toDate: null
  });

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery.trim() && !Object.values(filters).some(value => value !== 'all' && value !== '' && value !== null)) {
      return; // Don't search with empty query and default filters
    }

    setIsSearching(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Flatten the sample data for searching
      const allResults = [
        ...sampleSearchResults.print,
        ...sampleSearchResults.tv,
        ...sampleSearchResults.online,
        ...sampleSearchResults.social
      ];

      // Apply filters
      let filteredResults = [...allResults];

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredResults = filteredResults.filter(
          result => 
            result.title.toLowerCase().includes(query) || 
            result.excerpt.toLowerCase().includes(query) ||
            (result.ministry && result.ministry.toLowerCase().includes(query))
        );
      }

      // Apply media type filter
      if (filters.mediaType !== 'all') {
        filteredResults = filteredResults.filter(result => result.type === filters.mediaType);
      }

      // Apply sentiment filter
      if (filters.sentiment !== 'all') {
        filteredResults = filteredResults.filter(result => result.sentiment === filters.sentiment);
      }

      // Apply ministry filter
      if (filters.ministry !== 'all') {
        filteredResults = filteredResults.filter(result => result.ministry === filters.ministry);
      }

      // Apply source filter
      if (filters.source) {
        const sourceQuery = filters.source.toLowerCase();
        filteredResults = filteredResults.filter(result => 
          (result.source && result.source.toLowerCase().includes(sourceQuery)) ||
          (result.publication && result.publication.toLowerCase().includes(sourceQuery)) ||
          (result.channel && result.channel.toLowerCase().includes(sourceQuery)) ||
          (result.website && result.website.toLowerCase().includes(sourceQuery)) ||
          (result.platform && result.platform.toLowerCase().includes(sourceQuery))
        );
      }

      // Apply sorting
      if (filters.sortBy === 'date-desc') {
        filteredResults.sort((a, b) => {
          const dateA = new Date(a.publishedDate || a.airDate || a.date);
          const dateB = new Date(b.publishedDate || b.airDate || b.date);
          return dateB - dateA;
        });
      } else if (filters.sortBy === 'date-asc') {
        filteredResults.sort((a, b) => {
          const dateA = new Date(a.publishedDate || a.airDate || a.date);
          const dateB = new Date(b.publishedDate || b.airDate || b.date);
          return dateA - dateB;
        });
      } else if (filters.sortBy === 'sentiment') {
        // Sort by sentiment: positive first, then neutral, then negative
        const sentimentOrder = { positive: 1, neutral: 2, negative: 3 };
        filteredResults.sort((a, b) => sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment]);
      }

      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const handleApplyFilters = () => {
    handleSearch();
  };

  const handleResetFilters = () => {
    setFilters({
      dateRange: 'last30days',
      mediaType: 'all',
      sentiment: 'all',
      ministry: 'all',
      source: '',
      keywords: '',
      sortBy: 'relevance',
      fromDate: null,
      toDate: null
    });
  };

  const handleToggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  const handleSelectResult = (result) => {
    setSelectedResult(result);
  };

  const handleCloseDetail = () => {
    setSelectedResult(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Search</h1>
        
        {/* Search box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search across all media sources..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-10 pr-12 py-3 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
        </div>
        
        {/* Advanced filters */}
        <AdvancedSearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          expanded={filtersExpanded}
          onToggleExpand={handleToggleFilters}
        />
        
        {/* Search results */}
        <div className="space-y-6">
          {isSearching ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Results list */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">{searchResults.length} Results Found</h2>
                  <div className="flex flex-wrap">
                    <div className="mr-4 mb-2">
                      <span className="font-medium">Print:</span> {searchResults.filter(r => r.type === 'print').length}
                    </div>
                    <div className="mr-4 mb-2">
                      <span className="font-medium">TV:</span> {searchResults.filter(r => r.type === 'tv').length}
                    </div>
                    <div className="mr-4 mb-2">
                      <span className="font-medium">Online:</span> {searchResults.filter(r => r.type === 'online').length}
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Social:</span> {searchResults.filter(r => r.type === 'social').length}
                    </div>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[70vh]">
                  {searchResults.map((result) => (
                    <SearchResultItem 
                      key={result.id} 
                      result={result} 
                      onSelect={handleSelectResult} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Result detail */}
              <div className="lg:col-span-2">
                {selectedResult ? (
                  <SearchResultDetail 
                    result={selectedResult} 
                    onClose={handleCloseDetail} 
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Select an item to view details</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Click on any search result to view the full details.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : searchQuery || Object.values(filters).some(value => value !== 'all' && value !== '' && value !== null) ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Ready to search</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter a search term or apply filters to find results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;