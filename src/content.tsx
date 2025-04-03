import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/auth/AuthProvider';
import { hasPermission, PERMISSIONS } from '../utils/rbac';

// Content Item Card Component
const ContentCard = ({ content, onView, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    };
    
    // Sample data for demonstration
const sampleContentItems = [
  {
    id: 1,
    title: 'New Healthcare Initiative Shows Promising Results',
    summary: 'The government\'s new healthcare initiative has shown promising early results, with more than 5,000 patients receiving treatment in the first month.',
    content: `
      <p>The government's new healthcare initiative has shown promising early results, with more than 5,000 patients receiving treatment in the first month.</p>
      
      <p>The initiative, launched on March 15, 2024, aims to provide affordable healthcare services to citizens across the country, with a special focus on underserved rural areas.</p>
      
      <p>"We are extremely pleased with the initial response," said the Health Minister at a press conference. "The numbers exceed our projections and demonstrate the significant need for these services."</p>
      
      <p>Key features of the initiative include:</p>
      
      <ul>
        <li>Mobile healthcare units that can reach remote villages</li>
        <li>Subsidized treatment costs for essential services</li>
        <li>Integration with existing healthcare infrastructure</li>
        <li>Digital health records for continuity of care</li>
      </ul>
      
      <p>The Ministry plans to expand the program to additional districts in the coming months, with a target of reaching 50,000 patients by the end of the year.</p>
    `,
    contentType: 'article',
    author: 'Admin',
    languages: ['English', 'Hindi'],
    status: 'published',
    createdAt: '2024-04-01T09:00:00Z',
    updatedAt: '2024-04-01T14:30:00Z',
    tags: ['Healthcare', 'Initiative', 'Rural Development'],
    featured: true,
    targetAudience: 'General Public',
    media: [
      {
        id: 'm1',
        filename: 'healthcare_initiative.jpg',
        type: 'image/jpeg',
        url: 'https://source.unsplash.com/random/800x600?healthcare',
        altText: 'Healthcare professionals attending to patients'
      }
    ]
  },
  {
    id: 2,
    title: 'Digital India Initiative Reaches New Milestone',
    summary: 'The Digital India initiative has reached a new milestone with over 100 million citizens now having access to digital services.',
    content: `
      <p>The Digital India initiative has reached a significant milestone, with over 100 million citizens now having access to digital government services across the country.</p>
      
      <p>This achievement marks a major step forward in the government's efforts to digitize public services and improve accessibility for all citizens, particularly those in remote and rural areas.</p>
      
      <p>"Digital India is transforming the way citizens interact with the government," said the Minister for Electronics & IT. "We are seeing tremendous adoption across all demographics, which is exceeding our most optimistic projections."</p>
      
      <p>The initiative has seen particular success in the following areas:</p>
      
      <ul>
        <li>Online application and processing of government documents</li>
        <li>Digital payment systems for government services</li>
        <li>Rural internet connectivity</li>
        <li>Digital literacy programs</li>
      </ul>
      
      <p>The government plans to build on this success by introducing additional digital services and expanding connectivity infrastructure to reach the goal of connecting all citizens by 2026.</p>
    `,
    contentType: 'news',
    author: 'Priya Singh',
    languages: ['English', 'Hindi', 'Tamil'],
    status: 'published',
    createdAt: '2024-03-28T10:15:00Z',
    updatedAt: '2024-03-28T15:45:00Z',
    tags: ['Digital India', 'Technology', 'Government Services'],
    featured: false,
    targetAudience: 'Tech-savvy citizens',
    media: [
      {
        id: 'm2',
        filename: 'digital_india.jpg',
        type: 'image/jpeg',
        url: 'https://source.unsplash.com/random/800x600?technology',
        altText: 'Person using digital services on a tablet'
      }
    ]
  },
  {
    id: 3,
    title: 'Upcoming Press Conference: Budget Allocation for Education',
    summary: 'The Ministry of Education will hold a press conference on April 5, 2024, to discuss the new budget allocation for educational initiatives.',
    content: `
      <p>The Ministry of Education announces a press conference to be held on April 5, 2024, at 11:00 AM at the Ministry headquarters.</p>
      
      <p>The Education Minister will present details of the new budget allocation for educational initiatives across the country for the fiscal year 2024-2025.</p>
      
      <p>The press conference will cover:</p>
      
      <ul>
        <li>Allocation breakdown by educational sector</li>
        <li>New initiatives for improving educational quality</li>
        <li>Infrastructure development plans for schools and universities</li>
        <li>Scholarships and financial aid programs</li>
        <li>Digital learning integration strategies</li>
      </ul>
      
      <p>Media representatives are invited to attend. Please register your interest by April 3, 2024, by contacting the Ministry's press office.</p>
      
      <p>A livestream of the press conference will be available on the Ministry's official website and social media channels.</p>
    `,
    contentType: 'announcement',
    author: 'Ministry of Education',
    languages: ['English'],
    status: 'draft',
    createdAt: '2024-04-01T11:30:00Z',
    tags: ['Education', 'Budget', 'Press Conference'],
    featured: false,
    targetAudience: 'Media, Educational Institutions',
    expiryDate: '2024-04-06T00:00:00Z'
  }
];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'published': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
    };
    

// Content Form Component for Create/Edit
const ContentForm = ({ content = null, onSubmit, onCancel }) => {
  const initialFormState = {
    title: content?.title || '',
    summary: content?.summary || '',
    content: content?.content || '',
    contentType: content?.contentType || 'article',
    languages: content?.languages || ['English'],
    status: content?.status || 'draft',
    tags: content?.tags?.join(', ') || '',
    targetAudience: content?.targetAudience || '',
    expiryDate: content?.expiryDate ? new Date(content.expiryDate).toISOString().split('T')[0] : '',
    featured: content?.featured || false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [media, setMedia] = useState(content?.media || []);
  const [errors, setErrors] = useState({});
  const [availableLanguages] = useState(['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi']);

  const contentTypeOptions = [
    { value: 'article', label: 'Article' },
    { value: 'news', label: 'News' },
    { value: 'pressRelease', label: 'Press Release' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'event', label: 'Event' },
    { value: 'faq', label: 'FAQ' },
    { value: 'infographic', label: 'Infographic' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (formData.languages.length === 0) newErrors.languages = 'At least one language must be selected';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLanguageChange = (language) => {
    setFormData(prev => {
      const currentLanguages = [...prev.languages];
      
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(lang => lang !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Process tags string into array
      const processedTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const submissionData = {
        ...formData,
        tags: processedTags,
        media
      };
      
      onSubmit(submissionData);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filename: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      file // Keep the actual file for upload
    }));
    
    setMedia([...media, ...newMedia]);
  };

  const handleRemoveMedia = (mediaId) => {
    const mediaItem = media.find(item => item.id === mediaId);
    
    // If it's a temporary URL created with createObjectURL, revoke it
    if (mediaItem && mediaItem.url && !mediaItem.url.startsWith('http')) {
      URL.revokeObjectURL(mediaItem.url);
    }
    
    setMedia(media.filter(item => item.id !== mediaId));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {content ? 'Edit Content' : 'Create New Content'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                  errors.title ? 'border-red-300' : ''
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">
                Content Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {contentTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={2}
              value={formData.summary}
              onChange={handleChange}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.summary ? 'border-red-300' : ''
              }`}
              placeholder="Brief summary of the content"
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={formData.content}
              onChange={handleChange}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                errors.content ? 'border-red-300' : ''
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              HTML is supported for rich formatting. In production, this would use a WYSIWYG editor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Files
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            
            {media.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {media.map(mediaItem => (
                  <div key={mediaItem.id} className="relative border border-gray-200 rounded-md overflow-hidden group">
                    {mediaItem.type.startsWith('image/') ? (
                      <img 
                        src={mediaItem.url} 
                        alt={mediaItem.filename}
                        className="w-full h-32 object-cover" 
                      />
                    ) : (
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{mediaItem.filename}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(mediaItem.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {content ? 'Update Content' : 'Create Content'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Content Detail View Component
const ContentDetail = ({ content, onClose, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'published': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between mb-6">
            <div className="flex items-center mb-2 mr-4">
              <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">Created: {formatDate(content.createdAt)}</span>
            </div>
            
            {content.updatedAt && (
              <div className="flex items-center mb-2 mr-4">
                <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm text-gray-700">Updated: {formatDate(content.updatedAt)}</span>
              </div>
            )}
            
            <div className="flex items-center mb-2 mr-4">
              <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-700">Author: {content.author}</span>
            </div>
            
            <div className="flex items-center mb-2">
              <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-sm text-gray-700">Status: {getStatusBadge(content.status)}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Summary</p>
            <p className="text-sm text-gray-600">{content.summary}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Content</p>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Content Type</p>
              <p className="text-sm text-gray-600">{content.contentType}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Languages</p>
              <div className="flex flex-wrap">
                {content.languages.map((language, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            {content.targetAudience && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Target Audience</p>
                <p className="text-sm text-gray-600">{content.targetAudience}</p>
              </div>
            )}
            
            {content.expiryDate && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Expiry Date</p>
                <p className="text-sm text-gray-600">{formatDate(content.expiryDate)}</p>
              </div>
            )}
          </div>
          
          {content.tags && content.tags.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
              <div className="flex flex-wrap">
                {content.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {content.media && content.media.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Media</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.media.map((mediaItem, index) => (
                  <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                    {mediaItem.type.startsWith('image/') ? (
                      <img 
                        src={mediaItem.url} 
                        alt={mediaItem.altText || 'Content media'}
                        className="w-full h-32 object-cover" 
                      />
                    ) : mediaItem.type.startsWith('video/') ? (
                      <div className="relative h-32 bg-gray-900 flex items-center justify-center">
                        <svg className="h-12 w-12 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{mediaItem.filename}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {content.relatedContent && content.relatedContent.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Related Content</p>
              <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                {content.relatedContent.map((relatedItem, index) => (
                  <li key={index} className="px-4 py-3">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      {relatedItem.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">{relatedItem.type}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            onClick={() => onEdit(content.id)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Content
          </button>
        </div>
      </div>
    </div>
  );
};

    
    // Main Content Management Component
const ContentManagement = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [contentItems, setContentItems] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showContentDetail, setShowContentDetail] = useState(false);
  const [showContentForm, setShowContentForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    contentType: 'all',
    status: 'all',
    language: 'all',
    featured: 'all'
  });

  // Check if user has permission to view this module
  useEffect(() => {
    if (user && !hasPermission(user, PERMISSIONS.MEDIA_VIEW)) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Fetch content items
  useEffect(() => {
    // This would be an API call in a real application
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setContentItems(sampleContentItems);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredContent = contentItems.filter(content => {
    // Apply search filter
    if (filters.search && !content.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !content.summary.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Apply content type filter
    if (filters.contentType !== 'all' && content.contentType !== filters.contentType) {
      return false;
    }
    
    // Apply status filter
    if (filters.status !== 'all' && content.status !== filters.status) {
      return false;
    }
    
    // Apply language filter
    if (filters.language !== 'all' && !content.languages.includes(filters.language)) {
      return false;
    }
    
    // Apply featured filter
    if (filters.featured !== 'all') {
      const isFeatured = filters.featured === 'featured';
      if (content.featured !== isFeatured) {
        return false;
      }
    }
    
    return true;
  });

  const handleViewContent = (contentId) => {
    const content = contentItems.find(c => c.id === contentId);
    if (content) {
      setSelectedContent(content);
      setShowContentDetail(true);
    }
  };

  const handleEditContent = (contentId) => {
    const content = contentItems.find(c => c.id === contentId);
    if (content) {
      setEditingContent(content);
      setShowContentForm(true);
    }
  };

  const handleDeleteContent = (contentId) => {
    // In a real application, this would be an API call
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContentItems(contentItems.filter(c => c.id !== contentId));
    }
  };

  const handleSubmitContent = (contentData) => {
    if (editingContent) {
      // Update existing content
      setContentItems(contentItems.map(c => 
        c.id === editingContent.id ? { ...c, ...contentData, updatedAt: new Date().toISOString() } : c
      ));
    } else {
      // Create new content
      const newContent = {
        id: Date.now(), // Temporary ID generation
        createdAt: new Date().toISOString(),
        author: user.name,
        ...contentData
      };
      setContentItems([newContent, ...contentItems]);
    }
    
    setShowContentForm(false);
    setEditingContent(null);
  };

  const handleCreateNewContent = () => {
    setEditingContent(null);
    setShowContentForm(true);
  };

  const contentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Article' },
    { value: 'news', label: 'News' },
    { value: 'pressRelease', label: 'Press Release' },
    { value: 'announcement', label: 'Announcement' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'event', label: 'Event' },
    { value: 'faq', label: 'FAQ' },
    { value: 'infographic', label: 'Infographic' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Content Management</h1>
          
          {hasPermission(user, PERMISSIONS.MEDIA_CREATE) && (
            <button
              onClick={handleCreateNewContent}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Content
            </button>
          )}
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search title or summary"
              />
            </div>
            
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                Content Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={filters.contentType}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {contentTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Languages</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="featured" className="block text-sm font-medium text-gray-700 mb-1">
                Featured
              </label>
              <select
                id="featured"
                name="featured"
                value={filters.featured}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Content</option>
                <option value="featured">Featured Only</option>
                <option value="notFeatured">Not Featured</option>
              </select>
            </div>
          </div>
              </div>
              <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                id="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g. General Public, Youth, Rural Communities"
              />
              
              <div className="mt-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. healthcare, policy, education"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="review">Under Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date (optional)
              </label>
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave blank if the content does not expire
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Feature this content (will be highlighted across the platform)
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">  Languages <span className="text-red-500">*</span>
            </label>
              <div className="space-y-2">
                {availableLanguages.map(language => (
                  <div key={language} className="flex items-center">
                    <input
                      id={`language-${language}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.languages.includes(language)}
                      onChange={() => handleLanguageChange(language)}
                    />
                    <label htmlFor={`language-${language}`} className="ml-2 block text-sm text-gray-700">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
              {errors.languages && (
                <p className="mt-1 text-sm text-red-600">{errors.languages}</p>
              )}
            </div>
        
        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredContent.length > 0 ? (
            filteredContent.map(content => (
              <ContentCard
                key={content.id}
                content={content}
                onView={handleViewContent}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
              />
            ))
          ) : (
            <div className="col-span-full bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">No content found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Detail Modal */}
      {showContentDetail && selectedContent && (
        <ContentDetail
          content={selectedContent}
          onClose={() => setShowContentDetail(false)}
          onEdit={handleEditContent}
        />
      )}
      
      {/* Content Form Modal */}
      {showContentForm && (
        <ContentForm
          content={editingContent}
          onSubmit={handleSubmitContent}
          onCancel={() => {
            setShowContentForm(false);
            setEditingContent(null);
          }}
        />
      )}
    </div>
  );
};

export default ContentManagement;