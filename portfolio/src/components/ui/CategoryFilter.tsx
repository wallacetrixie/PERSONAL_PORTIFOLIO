import { motion } from 'framer-motion';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={activeCategory === category.id ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Active background */}
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            />
          )}
          
          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            {category.label}
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {category.count}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};
