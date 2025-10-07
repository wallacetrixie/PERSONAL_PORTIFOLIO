import { useState, useEffect } from 'react';
import { Save, User, Lock, Bell, Palette, Globe } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useAuth } from '../../contexts/AuthContext';

export const AdminSettings = () => {
  const [mounted, setMounted] = useState(false);
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: Globe },
  ];

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Settings" subtitle="Manage your admin preferences and configuration" />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-500 dark:bg-dark-accent1 text-white'
                      : 'bg-white dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-6">
                  Profile Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={admin?.full_name || ''}
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={admin?.email || ''}
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue={admin?.username || ''}
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 dark:bg-dark-accent1 dark:hover:bg-dark-accent1/80 text-white font-medium transition-colors duration-200">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-6">
                  Security Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 dark:bg-dark-accent1 dark:hover:bg-dark-accent1/80 text-white font-medium transition-colors duration-200">
                    <Lock className="w-4 h-4" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Other Tabs Placeholder */}
            {(activeTab === 'notifications' || activeTab === 'appearance' || activeTab === 'general') && (
              <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
                  {tabs.find(t => t.id === activeTab)?.label} Settings
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Settings for this section are coming soon.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
