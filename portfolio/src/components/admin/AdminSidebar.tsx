import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

export const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: Mail,
      badge: 0, // Will be updated with actual count
    },
    {
      name: 'Projects',
      path: '/admin/projects',
      icon: FolderKanban,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-white dark:bg-dark-card border-r border-light-border dark:border-dark-border flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 z-40`}
    >
      {/* Logo Section */}
      <div className="h-16 border-b border-light-border dark:border-dark-border flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 dark:from-dark-accent1 dark:to-dark-accent2 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-light-text dark:text-dark-text">
                Admin Portal
              </h2>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 dark:from-dark-accent1 dark:to-dark-accent2 flex items-center justify-center mx-auto">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-between'
              } px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                active
                  ? 'bg-gradient-to-r from-primary-500/10 to-purple-500/10 dark:from-dark-accent1/20 dark:to-dark-accent2/20 text-primary-600 dark:text-dark-accent1 border border-primary-200 dark:border-dark-accent1/30'
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary hover:text-light-text dark:hover:text-dark-text'
              }`}
              title={isCollapsed ? item.name : ''}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-5 h-5 ${
                    active ? 'text-primary-600 dark:text-dark-accent1' : ''
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
              </div>

              {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}

              {/* Active Indicator */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-purple-600 dark:from-dark-accent1 dark:to-dark-accent2 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <div className="border-t border-light-border dark:border-dark-border p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
