import { useState, useEffect } from 'react';
import { Users, TrendingUp, Globe, Clock } from 'lucide-react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminVisitors = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      title: 'Total Visitors',
      value: '0',
      change: '+0%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Today',
      value: '0',
      change: '+0%',
      icon: Clock,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'This Month',
      value: '0',
      change: '+0%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Unique Visitors',
      value: '0',
      change: '+0%',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Visitors Analytics" subtitle="Track and analyze your portfolio visitors" />
        
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div
            className={`transform transition-all duration-700 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.title}
                  className="p-6 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border hover:shadow-lg dark:hover:shadow-glow-cyan transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                      <stat.icon className="w-6 h-6 text-current" />
                    </div>
                    <span className="text-sm font-medium text-green-500">
                      {stat.change}
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

            {/* Placeholder for Charts */}
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border p-6 mb-6">
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">
                Visitor Trends
              </h3>
              <div className="h-64 flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Analytics chart will be displayed here</p>
                  <p className="text-sm mt-2">Integration with analytics service coming soon</p>
                </div>
              </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-white dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
              <div className="p-6 border-b border-light-border dark:border-dark-border">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
                  Recent Visitors
                </h3>
              </div>
              <div className="p-6 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary opacity-50" />
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Visitor tracking will be displayed here
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVisitors;
