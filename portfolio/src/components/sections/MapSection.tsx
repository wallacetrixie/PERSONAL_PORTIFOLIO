import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

interface MapSectionProps {
  showHeader?: boolean;
  id?: string;
}

export const MapSection = ({ 
  showHeader = true,
  id = 'map-section'
}: MapSectionProps) => {
  // Nairobi, Kenya Karen coordinates
  const location = {
    name: 'Nairobi, Kenya (Karen)',
    latitude: -1.3196,
    longitude: 36.7073,
    zoom: 13
  };

  // Google Maps embed URL (no API key needed for basic embed)
  const mapUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=${location.zoom}&output=embed`;

  // Google Maps link for opening in new tab
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;

  return (
    <section id={id} className="py-20 bg-gray-50 dark:bg-gray-900">
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
              Find Me
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-gray-900 dark:text-white"
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">Location</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Based in Nairobi, Kenya, but available for remote collaborations worldwide.
            </motion.p>
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-purple to-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            
            {/* Map container */}
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 shadow-2xl">
              {/* Location info banner */}
              <div className="relative z-10 bg-gradient-to-r from-primary-500 to-accent-purple p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold font-poppins text-white">
                        {location.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        Available for in-person meetings and remote work
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Google Maps iframe */}
              <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="w-full h-full"
                />
              </div>

              {/* Additional info footer */}
              <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-sm">
                      Available for meetings in Nairobi area
                    </span>
                  </div>
                  <div className="hidden sm:block w-1 h-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Navigation className="w-5 h-5 text-accent-purple" />
                    <span className="text-sm">
                      Open to remote collaborations globally
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info cards below map */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Local Presence
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based in Karen, Nairobi. Available for face-to-face meetings and local project collaborations.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-purple/10 dark:bg-accent-purple/20 rounded-lg">
                  <Navigation className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Global Reach
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Work remotely with clients worldwide. Flexible timezone availability for international collaborations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
