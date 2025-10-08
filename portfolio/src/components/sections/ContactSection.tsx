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
    <section id={id} className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-primary-500 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4"
            >
              Get In Touch
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-gray-900 dark:text-white"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">Connect</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary-500 to-accent-purple rounded-xl shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-poppins mb-2 text-gray-900 dark:text-white">Email</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Send me an email anytime</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="block text-lg font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                  <button
                    onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group/btn"
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
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-accent-purple dark:hover:border-accent-purple transition-all duration-300 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-br from-accent-purple to-primary-500 rounded-xl shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-poppins mb-2 text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Give me a call</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {CONTACT_INFO.phones.map((phone, index) => (
                    <div key={phone} className="space-y-2">
                      <a
                        href={`tel:${phone}`}
                        className="block text-lg font-medium text-accent-purple dark:text-accent-purple hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {phone}
                      </a>
                      <button
                        onClick={() => handleCopy(phone, `phone-${index}`)}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-purple dark:hover:text-accent-purple transition-colors group/btn"
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-purple to-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 shadow-lg">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 bg-gradient-to-br from-primary-500 via-accent-purple to-primary-600 rounded-xl shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-poppins mb-2 text-gray-900 dark:text-white">Location</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{CONTACT_INFO.location}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Available for remote collaborations worldwide</p>
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
            <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-purple/10 dark:from-primary-900/20 dark:to-accent-purple/20 border border-primary-200 dark:border-primary-800">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">
                "Building digital experiences that make a difference."
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Let's create something amazing together! 🚀
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
