import { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminMedia = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Media Library" subtitle="Manage images and media files" />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
              <div className="text-center py-12">
                <Image className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary opacity-50" />
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  Media Library
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Media management features coming soon.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMedia;
