import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Eye, Archive, Star } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminMessages = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);


  const messages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hi, I would like to discuss a potential project...',
      date: '2025-10-07',
      read: false,
      starred: false,
    },
    // Add more placeholder messages as needed
  ];

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Messages" subtitle="View and manage contact form submissions" />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-accent1"
                />
              </div>
              <button className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 dark:bg-dark-accent1 dark:hover:bg-dark-accent1/80 text-white font-medium transition-colors duration-200">
                Filter
              </button>
            </div>

            {/* Messages List */}
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary opacity-50" />
                  <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                    No messages yet
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    When visitors contact you, their messages will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-light-border dark:divide-dark-border">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-6 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200 ${
                        !message.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-light-text dark:text-dark-text">
                              {message.name}
                            </h4>
                            {!message.read && (
                              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary-500 text-white">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                            {message.email}
                          </p>
                          <p className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            {message.subject}
                          </p>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                            {message.message}
                          </p>
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                            {message.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-yellow-500 transition-colors duration-200"
                            title="Star message"
                          >
                            <Star className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-colors duration-200"
                            title="View message"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-gray-500 transition-colors duration-200"
                            title="Archive message"
                          >
                            <Archive className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 transition-colors duration-200"
                            title="Delete message"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMessages;
