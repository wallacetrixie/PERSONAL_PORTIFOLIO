import { useState, useEffect } from 'react';
import { FolderKanban, Plus } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminProjects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Projects Management" subtitle="Manage your portfolio projects" />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Add Project Button */}
            <div className="mb-6">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 dark:bg-dark-accent1 dark:hover:bg-dark-accent1/80 text-white font-medium transition-colors duration-200">
                <Plus className="w-5 h-5" />
                Add New Project
              </button>
            </div>

            {/* Projects Grid */}
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6">
              <div className="text-center py-12">
                <FolderKanban className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary opacity-50" />
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  No projects yet
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  Start by adding your first project to showcase your work.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 dark:bg-dark-accent1 dark:hover:bg-dark-accent1/80 text-white font-medium transition-colors duration-200">
                  <Plus className="w-5 h-5" />
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProjects;
