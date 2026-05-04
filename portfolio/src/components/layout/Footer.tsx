import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS } from '../../constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-[#121212] border-t border-white/5 overflow-hidden">
      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-playfair font-bold text-[#F5F5F5]">
              <span className="text-[#8B5E3C]">Wallace</span> Wambulwa
            </h3>
            <p className="text-[#E8E8E8] leading-[1.8] max-w-md">
              {PERSONAL_INFO.bio}
            </p>
            <div className="space-y-3 text-sm text-[#B0B0B0]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#8B5E3C] flex-shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-[#8B5E3C] flex-shrink-0" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#D4AF8C] transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <p className="text-[#8B5E3C] font-medium">{PERSONAL_INFO.availability}</p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm uppercase tracking-[0.2em] text-[#8B5E3C] mb-6 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="text-[#E8E8E8] hover:text-[#D4AF8C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm uppercase tracking-[0.2em] text-[#8B5E3C] mb-6 font-medium">
              Services
            </h4>
            <ul className="space-y-3 text-[#E8E8E8]">
              <li>Website Development</li>
              <li>Software Development & Maintenance</li>
              <li>Database Design & Optimization</li>
              <li>Mobile App Development</li>
              <li>DevOps & Cloud Services</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#8B5E3C]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#B0B0B0]">
          <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#D4AF8C] transition-colors">
              Privacy Policy
            </button>
            <span className="text-[#8B5E3C]/60">•</span>
            <button className="hover:text-[#D4AF8C] transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
