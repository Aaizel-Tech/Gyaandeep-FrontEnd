// Dashboard Layout Component for SAMVAD Dashboard
// File: /components/layout/DashboardLayout.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../auth/AuthProvider';
import { hasPermission, PERMISSIONS } from '../../utils/rbac';

// Icon components
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const PrintIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const TvIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const OnlineIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const SocialIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Main Layout Component
export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const router = useRouter();
  const { user, logout } = useAuth();
  
  // Get unread notifications
  useEffect(() => {
    // This would be an API call in production
    const fetchNotifications = async () => {
      try {
        // Mock data for demonstration
        setNotificationCount(3);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    if (user) {
      fetchNotifications();
      
      // Set up periodic polling for new notifications
      const intervalId = setInterval(fetchNotifications, 60000); // every minute
      
      return () => clearInterval(intervalId);
    }
  }, [user]);
  
  // Main navigation items based on permissions
  const navigationItems = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: HomeIcon,
      permission: PERMISSIONS.DASHBOARD_VIEW,
    },
    {
      name: 'Print Articles',
      href: '/dashboard/print',
      icon: PrintIcon,
      permission: PERMISSIONS.MEDIA_VIEW,
    },
    {
      name: 'TV Clips',
      href: '/dashboard/tv',
      icon: TvIcon,
      permission: PERMISSIONS.MEDIA_VIEW,
    },
    {
      name: 'Online Articles',
      href: '/dashboard/online',
      icon: OnlineIcon,
      permission: PERMISSIONS.MEDIA_VIEW,
    },
    {
      name: 'Social Post',
      href: '/dashboard/social',
      icon: SocialIcon,
      permission: PERMISSIONS.MEDIA_VIEW,
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: ReportIcon,
      permission: PERMISSIONS.REPORT_VIEW,
    },
    {
      name: 'Search',
      href: '/dashboard/search',
      icon: SearchIcon,
      permission: PERMISSIONS.MEDIA_VIEW,
    },
  ];
  
  // Secondary navigation (bottom of sidebar)
  const secondaryNavigation = [
    // {
    //   name: 'Support',
    //   href: '/dashboard/support',
    //   icon: SupportIcon,
    // },
    {
      name: 'Alerts',
      href: '/dashboard/alerts',
      icon: AlertIcon,
      permission: PERMISSIONS.ALERT_VIEW,
      badge: notificationCount > 0,
      badgeCount: notificationCount,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: SettingsIcon,
      permission: PERMISSIONS.CONFIG_VIEW,
    },
  ];
  
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setLanguageMenuOpen(false);
    
    // This would update the user's language preference in production
    // Also load translated content
  };
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    // Additional languages would be added here based on requirements
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 flex z-40 lg:hidden`} role="dialog" aria-modal="true">
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="SAMVAD Dashboard"
            />
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigationItems.map((item) => {
                // Check permission
                if (item.permission && !hasPermission(user, item.permission)) {
                  return null;
                }
                
                const isActive = router.pathname === item.href;
                
                return (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={`${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                      group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    >
                      <item.icon />
                      <span className="ml-3">{item.name}</span>
                    </a>
                  </Link>
                );
              })}
            </nav>
            
            {/* Secondary mobile navigation */}
            <nav className="mt-5 px-2 border-t border-gray-200 pt-5">
              {secondaryNavigation.map((item) => {
                // Check permission
                if (item.permission && !hasPermission(user, item.permission)) {
                  return null;
                }
                
                const isActive = router.pathname === item.href;
                
                return (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={`${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                      group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    >
                      <item.icon />
                      <span className="ml-3">{item.name}</span>
                      {item.badge && (
                        <span className="bg-red-100 text-red-800 ml-auto inline-block py-0.5 px-3 text-xs rounded-full">
                          {item.badgeCount}
                        </span>
                      )}
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </div>
      
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-700">
              <img
                className="h-8 w-auto"
                src="/logo-white.png"
                alt="SAMVAD Dashboard"
              />
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-white space-y-1">
                {navigationItems.map((item) => {
                  // Check permission
                  if (item.permission && !hasPermission(user, item.permission)) {
                    return null;
                  }
                  
                  const isActive = router.pathname === item.href;
                  
                  return (
                    <Link href={item.href} key={item.name}>
                      <a
                        className={`${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <item.icon />
                        <span className="ml-3">{item.name}</span>
                      </a>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Secondary desktop navigation */}
              <nav className="flex-shrink-0 px-2 py-4 border-t border-gray-200">
                {secondaryNavigation.map((item) => {
                  // Check permission
                  if (item.permission && !hasPermission(user, item.permission)) {
                    return null;
                  }
                  
                  const isActive = router.pathname === item.href;
                  
                  return (
                    <Link href={item.href} key={item.name}>
                      <a
                        className={`${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                      >
                        <item.icon />
                        <span className="ml-3">{item.name}</span>
                        {item.badge && (
                          <span className="bg-red-100 text-red-800 ml-auto inline-block py-0.5 px-3 text-xs rounded-full">
                            {item.badgeCount}
                          </span>
                        )}
                      </a>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Quick search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Language selector */}
              <div className="ml-3 relative">
                <button
                  type="button"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="language-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                >
                  <span className="sr-only">Open language menu</span>
                  <span className="px-2 py-1 rounded-md text-sm font-medium text-gray-700 bg-gray-100">
                    {languages.find(lang => lang.code === currentLanguage)?.name || 'English'}
                  </span>
                </button>

                {/* Language dropdown */}
                {languageMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`${
                          currentLanguage === language.code ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                        role="menuitem"
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Notification button */}
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs text-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.profileImage ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.profileImage}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </button>
                </div>
                
                {/* Profile dropdown panel */}
                {userMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-gray-500 truncate">{user?.email}</div>
                    </div>
                    <Link href="/dashboard/profile">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Your Profile
                      </a>
                    </Link>
                    <Link href="/dashboard/settings">
                      <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Settings
                      </a>
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Page Header Component
export const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex space-x-3">{actions}</div>}
      </div>
    </div>
  );
};

// Content Container Component
export const ContentContainer = ({ children, fullWidth = false }) => {
  return (
    <div className={`${fullWidth ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8'} py-4`}>
      {children}
    </div>
  );
};

// Dashboard Layout with Header
export const DashboardPage = ({ children, title, subtitle, actions, fullWidth = false }) => {
  return (
    <DashboardLayout>
      <PageHeader title={title} subtitle={subtitle} actions={actions} />
      <ContentContainer fullWidth={fullWidth}>
        {children}
      </ContentContainer>
    </DashboardLayout>
  );
};

// Export default for direct import
export default DashboardLayout;