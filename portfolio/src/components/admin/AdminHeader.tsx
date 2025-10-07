import { LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader = ({ title, subtitle }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('adminTheme');
    return saved === 'light' ? false : true;
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-bold gradient-text-light dark:gradient-text-dark">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                {subtitle}
              </p>
            )}
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
  );
};

export default AdminHeader;
