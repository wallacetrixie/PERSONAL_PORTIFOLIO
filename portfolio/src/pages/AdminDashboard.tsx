import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Mail, 
  FolderKanban, 
  Settings, 
  BarChart3,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AdminSidebar } from '../components/admin/AdminSidebar';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('adminTheme');
    return saved === 'light' ? false : true; // Default to dark
  });
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('adminTheme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('adminTheme', 'light');
    }
  }, [isDark]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true);
      try {
        await logout();
        navigate('/admin/login');
      } catch (error) {
        console.error('Logout error:', error);
        setIsLoggingOut(false);
      }
    }
  };

  const stats = [
    {
      title: 'Total Messages',
      value: '0',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900/20'
    },
    {
      title: 'Projects',
      value: '0',
      icon: FolderKanban,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900/20'
    },
    {
      title: 'Analytics',
      value: '0',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900/20'
    }
  ];

  const quickActions = [
    {
      title: 'View Messages',
      description: 'Check contact form submissions',
      icon: Mail,
      color: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50',
      bgDark: 'bg-blue-900/20',
      action: () => alert('Messages feature coming soon!')
    },
    {
      title: 'Manage Projects',
      description: 'Add or edit portfolio projects',
      icon: FolderKanban,
      color: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50',
      bgDark: 'bg-purple-900/20',
      action: () => alert('Projects management coming soon!')
    },
    {
      title: 'Settings',
      description: 'Configure admin preferences',
      icon: Settings,
      color: 'text-gray-600 dark:text-gray-400',
      bgLight: 'bg-gray-50',
      bgDark: 'bg-gray-900/20',
      action: () => alert('Settings coming soon!')
    }
  ];

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Page Title */}
              <div>
                <h1 className="text-xl font-bold gradient-text-light dark:gradient-text-dark">
                  Dashboard Overview
                </h1>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Welcome back, {admin?.full_name || 'Admin'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Back to Portfolio */}
                <button
                  onClick={() => navigate('/')}
                  className="hidden sm:flex items-center px-4 py-2 rounded-lg bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text transition-colors duration-200"
                >
                  View Portfolio
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors duration-200 disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`transform transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Welcome Section */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-purple-500/10 dark:from-dark-accent1/10 dark:to-dark-accent2/10 border border-primary-200 dark:border-dark-border">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              Welcome to Your Admin Portal
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Manage your portfolio content, view messages, and track analytics all in one place.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className="p-6 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border hover:shadow-lg dark:hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgLight} dark:${stat.bgDark}`}>
                    <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} text-transparent bg-clip-text`} style={{ WebkitTextFillColor: 'currentColor' }} />
                  </div>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Last 30 days
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-light-text dark:text-dark-text mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <button
                  key={action.title}
                  onClick={action.action}
                  className="p-6 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border hover:shadow-lg dark:hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-105 text-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-lg ${action.bgLight} dark:${action.bgDark} mb-4`}>
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                    {action.title}
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Info Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
              Admin Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Email
                </p>
                <p className="text-light-text dark:text-dark-text font-medium">
                  {admin?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Username
                </p>
                <p className="text-light-text dark:text-dark-text font-medium">
                  {admin?.username}
                </p>
              </div>
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  Role
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {admin?.role}
                </span>
              </div>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};export default AdminDashboard;
