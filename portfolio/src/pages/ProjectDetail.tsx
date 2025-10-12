import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, CheckCircle, AlertCircle, TrendingUp, Code, Zap } from 'lucide-react';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project: Project | undefined = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h2>
          <button
            onClick={() => navigate('/#projects')}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Header with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Project Title & Category */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                project.category === 'frontend'
                  ? 'bg-blue-500/90 text-white'
                  : 'bg-green-500/90 text-white'
              }`}>
                {project.category === 'frontend' ? 'Frontend' : 'Backend'}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-primary-500 to-accent-purple text-white">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Github size={18} />
              View Code
            </a>
          )}
        </motion.div>

        {/* Long Description */}
        {project.longDescription && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {project.longDescription}
            </p>
          </motion.section>
        )}

        {/* Problem Solved */}
        {project.problemSolved && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Problem Solved
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {project.problemSolved}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Key Features
            </h3>
            <div className="space-y-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tech Stack Details */}
        {project.detailedTechStack && project.detailedTechStack.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Code className="text-primary-500" size={20} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Technology Stack
              </h3>
            </div>
            <div className="space-y-3">
              {project.detailedTechStack.map((tech, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                    {tech.technology}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                    <span className="font-semibold">Purpose:</span> {tech.purpose}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Why:</span> {tech.reason}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Challenges & Solutions
            </h3>
            <div className="space-y-3">
              {project.challenges.map((item, index) => (
                <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">
                    Challenge: {item.challenge}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Trade-offs */}
        {project.tradeOffs && project.tradeOffs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Technical Trade-offs
            </h3>
            <div className="space-y-3">
              {project.tradeOffs.map((tradeoff, index) => (
                <div key={index} className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">
                    {tradeoff.decision}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {tradeoff.reasoning}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Architecture
            </h3>
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {project.architecture.description}
              </p>
              <div className="space-y-1.5">
                {project.architecture.components.map((component, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Testing */}
        {project.testing && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Testing Strategy
            </h3>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {project.testing.approach}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.testing.frameworks.map((framework, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full text-xs font-medium"
                  >
                    {framework}
                  </span>
                ))}
              </div>
              {project.testing.coverage && (
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Code Coverage: {project.testing.coverage}
                </p>
              )}
            </div>
          </motion.section>
        )}

        {/* Scaling Considerations */}
        {project.scalingConsiderations && project.scalingConsiderations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-primary-500" size={20} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Scaling Considerations
              </h3>
            </div>
            <div className="space-y-2">
              {project.scalingConsiderations.map((consideration, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                  <Zap className="text-indigo-500 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-700 dark:text-gray-300 text-xs">{consideration}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-br from-primary-50 to-accent-purple/10 dark:from-primary-900/20 dark:to-accent-purple/20 rounded-lg text-center border border-primary-200 dark:border-primary-800"
                >
                  <div className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gradient-to-r from-primary-500 to-accent-purple text-white rounded-lg text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Back Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="pt-6 pb-8"
        >
          <button
            onClick={() => navigate('/#projects')}
            className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Back to All Projects
          </button>
        </motion.div>
      </div>
    </div>
  );
};
