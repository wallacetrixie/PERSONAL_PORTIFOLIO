import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, CheckCircle, AlertCircle, TrendingUp, Code, Zap } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-gray-600 dark:text-gray-300" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Header with Image */}
                  <div className="relative h-64 md:h-80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Project Title & Category */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          project.category === 'frontend'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-green-500/90 text-white'
                        }`}>
                          {project.category === 'frontend' ? 'Frontend' : 'Backend'}
                        </span>
                        {project.featured && (
                          <span className="px-3 py-1 text-sm font-bold rounded-full bg-gradient-to-r from-primary-500 to-accent-purple text-white">
                            Featured
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      <p className="text-white/90 text-lg">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Github size={20} />
                          View Code
                        </a>
                      )}
                    </div>

                    {/* Long Description */}
                    {project.longDescription && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Overview
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {project.longDescription}
                        </p>
                      </section>
                    )}

                    {/* Problem Solved */}
                    {project.problemSolved && (
                      <section className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" size={24} />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              Problem Solved
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {project.problemSolved}
                            </p>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Key Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Tech Stack Details */}
                    {project.detailedTechStack && project.detailedTechStack.length > 0 && (
                      <section className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Code className="text-primary-500" size={24} />
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Technology Stack
                          </h3>
                        </div>
                        <div className="space-y-4">
                          {project.detailedTechStack.map((tech, index) => (
                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                {tech.technology}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span className="font-semibold">Purpose:</span> {tech.purpose}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold">Why:</span> {tech.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Challenges */}
                    {project.challenges && project.challenges.length > 0 && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Challenges & Solutions
                        </h3>
                        <div className="space-y-4">
                          {project.challenges.map((item, index) => (
                            <div key={index} className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                Challenge: {item.challenge}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {item.solution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Trade-offs */}
                    {project.tradeOffs && project.tradeOffs.length > 0 && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Technical Trade-offs
                        </h3>
                        <div className="space-y-4">
                          {project.tradeOffs.map((tradeoff, index) => (
                            <div key={index} className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                {tradeoff.decision}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300">
                                {tradeoff.reasoning}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Architecture */}
                    {project.architecture && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Architecture
                        </h3>
                        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {project.architecture.description}
                          </p>
                          <div className="space-y-2">
                            {project.architecture.components.map((component, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{component}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Testing */}
                    {project.testing && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Testing Strategy
                        </h3>
                        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {project.testing.approach}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.testing.frameworks.map((framework, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full text-sm font-medium"
                              >
                                {framework}
                              </span>
                            ))}
                          </div>
                          {project.testing.coverage && (
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Code Coverage: {project.testing.coverage}
                            </p>
                          )}
                        </div>
                      </section>
                    )}

                    {/* Scaling Considerations */}
                    {project.scalingConsiderations && project.scalingConsiderations.length > 0 && (
                      <section className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="text-primary-500" size={24} />
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Scaling Considerations
                          </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.scalingConsiderations.map((consideration, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                              <Zap className="text-indigo-500 flex-shrink-0 mt-0.5" size={18} />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{consideration}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <section className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Performance Metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {project.metrics.map((metric, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gradient-to-br from-primary-50 to-accent-purple/10 dark:from-primary-900/20 dark:to-accent-purple/20 rounded-lg text-center border border-primary-200 dark:border-primary-800"
                            >
                              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Technologies */}
                    <section>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-purple text-white rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
