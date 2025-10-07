import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Send,
  Code2,
  Briefcase,
  FileText,
  ArrowUp
} from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO, NAV_LINKS } from '../../constants';
import { useState } from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getSocialIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Github: <Github className="w-5 h-5" />,
      Linkedin: <Linkedin className="w-5 h-5" />,
      Twitter: <Twitter className="w-5 h-5" />,
      Mail: <Mail className="w-5 h-5" />,
    };
    return icons[iconName] || null;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    if (email) {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { icon: <Code2 className="w-4 h-4" />, name: 'Web Development', link: '/projects' },
    { icon: <Briefcase className="w-4 h-4" />, name: 'UI/UX Design', link: '/projects' },
    { icon: <FileText className="w-4 h-4" />, name: 'Backend Solutions', link: '/projects' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold font-poppins mb-4">
            
              <span className="text-gray-900 dark:text-white">Wallace</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-1 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {PERSONAL_INFO.availability}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.link}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">
                Follow Me
              </h4>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-all hover:scale-110 hover:-translate-y-1"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get notified about new projects and blog posts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 pr-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400 animate-fade-in">
                  ✓ Successfully subscribed!
                </p>
              )}
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
     
        </div>
      </div>
    </footer>
  );
};
