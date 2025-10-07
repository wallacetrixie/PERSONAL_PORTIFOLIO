import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, Eye, Archive } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { API_ENDPOINTS, apiClient, getAuthToken } from '../../utils/api';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  read_at: string | null;
}

export const AdminMessages = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const data = await apiClient.get(API_ENDPOINTS.CONTACTS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (data.success) {
        setContacts(data.data);
      } else {
        setError(data.message || 'Failed to fetch contacts');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to server. Please ensure the backend is running.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: number, status: Contact['status']) => {
    try {
      const token = getAuthToken();
      const data = await apiClient.patch(
        API_ENDPOINTS.CONTACT_STATUS(id),
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (data.success) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        ));
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(err.message || 'Failed to update status');
    }
  };

  const deleteContact = async (id: number) => {
    try {
      const token = getAuthToken();
      const data = await apiClient.delete(
        API_ENDPOINTS.CONTACT_BY_ID(id),
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (data.success) {
        setContacts(contacts.filter(contact => contact.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        setDeleteConfirm(null);
      } else {
        alert(data.message || 'Failed to delete contact');
      }
    } catch (err: any) {
      console.error('Error deleting contact:', err);
      alert(err.message || 'Failed to delete contact');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Contact['status']) => {
    const statusConfig = {
      new: { label: 'Pending', color: 'bg-yellow-500 text-white' },
      read: { label: 'Read', color: 'bg-blue-500 text-white' },
      replied: { label: 'Cleared', color: 'bg-green-500 text-white' },
      archived: { label: 'Archived', color: 'bg-gray-500 text-white' },
    };
    
    const config = statusConfig[status];
    return (
      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    filterStatus === 'all'
                      ? 'bg-primary-500 text-white dark:bg-dark-accent1'
                      : 'bg-white dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('new')}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    filterStatus === 'new'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilterStatus('replied')}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    filterStatus === 'replied'
                      ? 'bg-green-500 text-white'
                      : 'bg-white dark:bg-dark-card text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary'
                  }`}
                >
                  Cleared
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">Loading messages...</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary opacity-50" />
                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                      {contacts.length === 0 ? 'No messages yet' : 'No messages found'}
                    </h3>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                      {contacts.length === 0
                        ? 'When visitors contact you, their messages will appear here.'
                        : 'Try adjusting your search or filter criteria.'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-light-border dark:divide-dark-border">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-6 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-light-text dark:text-dark-text">
                                {contact.name}
                              </h4>
                              {getStatusBadge(contact.status)}
                            </div>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                              {contact.email}
                            </p>
                            <p className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                              {contact.subject}
                            </p>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                              {contact.message}
                            </p>
                            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                              {formatDate(contact.created_at)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {/* View Details */}
                            <button
                              onClick={() => setSelectedContact(contact)}
                              className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-colors duration-200"
                              title="View details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            
                            {/* Mark as Cleared */}
                            {contact.status !== 'replied' && (
                              <button
                                onClick={() => updateContactStatus(contact.id, 'replied')}
                                className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-green-500 transition-colors duration-200"
                                title="Mark as cleared"
                              >
                                <Archive className="w-5 h-5" />
                              </button>
                            )}
                            
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirm(contact.id)}
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
            )}
          </div>
        </main>
      </div>

      {/* View Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-light-border dark:border-dark-border">
            <div className="p-6 border-b border-light-border dark:border-dark-border">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                    {selectedContact.name}
                  </h2>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    {selectedContact.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary"
                >
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Status
                </label>
                <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Subject
                </label>
                <p className="mt-1 text-light-text dark:text-dark-text font-medium">
                  {selectedContact.subject}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Message
                </label>
                <p className="mt-1 text-light-text dark:text-dark-text whitespace-pre-wrap">
                  {selectedContact.message}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  Received
                </label>
                <p className="mt-1 text-light-text dark:text-dark-text">
                  {formatDate(selectedContact.created_at)}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-light-border dark:border-dark-border flex gap-3">
              <button
                onClick={() => updateContactStatus(selectedContact.id, 'read')}
                disabled={selectedContact.status === 'read'}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                disabled={selectedContact.status === 'replied'}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Cleared
              </button>
              <button
                onClick={() => updateContactStatus(selectedContact.id, 'archived')}
                disabled={selectedContact.status === 'archived'}
                className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-xl max-w-md w-full p-6 border border-light-border dark:border-dark-border">
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
              Delete Message
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-medium hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteContact(deleteConfirm)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
