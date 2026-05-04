import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { PERSONAL_INFO } from '../../constants';

interface ContactSectionProps {
  showHeader?: boolean;
  id?: string;
}

const CONTACT_INFO = {
  email: PERSONAL_INFO.email,
  phones: ['+254705103864', '+254771532464'],
  location: PERSONAL_INFO.location,
};

export const ContactSection = ({ 
  showHeader = true,
  id = 'contact-section'
}: ContactSectionProps) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id={id} className="py-20 bg-[#121212] relative overflow-hidden">
      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
        backgroundSize: '100px 100px'
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#8B5E3C] font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Get In Touch
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-[#F5F5F5]"
            >
              Let's <span className="text-[#8B5E3C]">Connect</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-[#E8E8E8] max-w-2xl mx-auto"
            >
              Have a project in mind or just want to say hi? Feel free to reach out through any of the channels below!
            </motion.p>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-lg bg-[#1a1a1a] border border-[#8B5E3C] hover:border-[#D4AF8C] transition-all duration-300 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-[#8B5E3C] rounded-lg shadow-lg">
                    <Mail className="w-8 h-8 text-[#121212]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-playfair mb-2 text-[#F5F5F5]">Email</h3>
                    <p className="text-sm text-[#B0B0B0] mb-4">Send me an email anytime</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="block text-lg font-medium text-[#8B5E3C] hover:text-[#D4AF8C] transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <button
                    onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                    className="flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-[#8B5E3C] transition-colors group/btn"
                  >
                    {copiedItem === 'email' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-lg bg-[#1a1a1a] border border-[#8B5E3C] hover:border-[#D4AF8C] transition-all duration-300 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-[#8B5E3C] rounded-lg shadow-lg">
                    <Phone className="w-8 h-8 text-[#121212]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-playfair mb-2 text-[#F5F5F5]">Phone</h3>
                    <p className="text-sm text-[#B0B0B0] mb-4">Give me a call</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {CONTACT_INFO.phones.map((phone, index) => (
                    <div key={phone} className="space-y-2">
                      <a
                        href={`tel:${phone}`}
                        className="block text-lg font-medium text-[#8B5E3C] hover:text-[#D4AF8C] transition-colors"
                      >
                        {phone}
                      </a>
                      <button
                        onClick={() => handleCopy(phone, `phone-${index}`)}
                        className="flex items-center gap-2 text-sm text-[#B0B0B0] hover:text-[#8B5E3C] transition-colors group/btn"
                      >
                        {copiedItem === `phone-${index}` ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span>Copy number</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Location Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.01, y: -3 }}
            className="group relative"
          >
            <div className="relative p-8 rounded-lg bg-[#1a1a1a] border border-[#8B5E3C] hover:border-[#D4AF8C] transition-all duration-300 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 bg-[#8B5E3C] rounded-lg shadow-lg">
                  <MapPin className="w-8 h-8 text-[#121212]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-playfair mb-2 text-[#F5F5F5]">Location</h3>
                  <p className="text-lg text-[#E8E8E8]">{CONTACT_INFO.location}</p>
                  <p className="text-sm text-[#B0B0B0] mt-2">Available for remote collaborations worldwide</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-block p-6 rounded-lg bg-[#1a1a1a] border border-[#8B5E3C] ">
              <p className="text-lg font-medium text-[#E8E8E8] italic">
                "Building digital experiences that make a difference."
              </p>
              <p className="text-sm text-[#B0B0B0] mt-2">
                Let's create something amazing together! 🚀
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
