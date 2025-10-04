import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO, NAV_LINKS } from '../../constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Github: <Github className="w-5 h-5" />,
      Linkedin: <Linkedin className="w-5 h-5" />,
      Twitter: <Twitter className="w-5 h-5" />,
      Mail: <Mail className="w-5 h-5" />,
    };
    return icons[iconName] || null;
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold font-poppins mb-4">
              <span className="text-primary-600 dark:text-primary-400">W</span>
              <span className="text-gray-900 dark:text-white">allace Wambulwa</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {PERSONAL_INFO.bio}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {PERSONAL_INFO.availability}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-all"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> using React
              & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
