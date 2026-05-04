import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Always navigate to detail page for all screen sizes
    navigate(`/projects/${project.id}`);
  };

  return (
    <div 
      className="group relative bg-[#121212] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full cursor-pointer border border-[#8B5E3C]/20"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          decoding="async"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          } as React.CSSProperties}
        />
        
        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6"
        >
          {/* Read More Button */}
          <div className="flex justify-center">
            <div className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-colors duration-200 font-medium border border-white/30 text-center">
              Read More About Project
            </div>
          </div>
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#8B5E3C] text-[#121212] text-xs font-bold rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            project.category === 'frontend' 
              ? 'bg-[#8B5E3C]/20 text-[#D4AF8C]'
              : 'bg-[#8B5E3C]/20 text-[#D4AF8C]'
          }`}>
            {project.category === 'frontend' ? 'Frontend' : 'Backend'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-playfair mb-3 text-[#F5F5F5] group-hover:text-[#D4AF8C] transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#B0B0B0] line-clamp-3 mb-4">
          {project.description}
        </p>
      </div>
    </div>
  );
};
