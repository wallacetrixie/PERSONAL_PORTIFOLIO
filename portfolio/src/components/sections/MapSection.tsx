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
    <section id={id} className="relative py-24 lg:py-32 bg-[#121212] overflow-hidden">
      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/></filter><rect width="100" height="100" fill="%23fff" filter="url(%23noise)" opacity="0.05"/></svg>')`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-[#8B5E3C] font-semibold text-sm uppercase tracking-[0.2em] mb-6"
            >
              Find Me
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-[#F5F5F5]"
            >
              My <span className="text-[#8B5E3C]">Location</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-[#E8E8E8] max-w-2xl mx-auto leading-[1.8]"
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
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#8B5E3C] shadow-2xl">
              <div className="p-6 md:p-8 border-b border-[#8B5E3C]/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#8B5E3C]">
                      <MapPin className="w-6 h-6 text-[#121212]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-playfair text-[#F5F5F5] mb-1">
                        {location.name}
                      </h3>
                      <p className="text-sm text-[#B0B0B0] leading-[1.8]">
                        Available for in-person meetings and remote work.
                      </p>
                    </div>
                  </div>

                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#8B5E3C] text-[#F5F5F5] bg-transparent transition-all duration-300 hover:bg-[#8B5E3C] hover:text-[#121212]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              <div className="relative w-full h-[380px] sm:h-[450px] md:h-[500px] lg:h-[520px] bg-[#121212]">
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

              <div className="p-6 border-t border-[#8B5E3C]/30 bg-[#121212]">
                <p className="text-sm text-[#B0B0B0] text-center leading-[1.8]">
                  Based in Nairobi, Kenya and open to remote collaborations worldwide.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
