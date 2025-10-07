import { useInView } from 'framer-motion';
import { SkillCard } from '../../components/ui/SkillCard';
import type { SkillCategory } from '../../constants/skills';

interface SkillsSectionProps {
  categories: SkillCategory[];
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const SkillsSection = ({ categories, sectionRef }: SkillsSectionProps) => {
  // Faster triggering with lower threshold
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Desktop staircase positions
  const positions = [
    { top: '0px', left: '5%' },           // Top left
    { top: '140px', left: '35%' },        // Middle center
    { top: '280px', right: '5%' }         // Bottom right
  ];

  return (
    <div ref={sectionRef} className="relative min-h-[700px] mb-32">
      {/* Desktop Layout - Staircase */}
      <div className="hidden lg:block relative" role="list" aria-label="Skill categories">
        {categories.map((category, index) => (
          <div key={category.id} role="listitem">
            <SkillCard
              category={category}
              index={index}
              isInView={isInView}
              style={{
                position: 'absolute',
                ...positions[index],
                transform: `rotate(${category.rotation}deg)`,
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Layout - Stacked Grid */}
      <div 
        className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-4"
        role="list"
        aria-label="Skill categories"
      >
        {categories.map((category, index) => (
          <div key={category.id} role="listitem">
            <SkillCard
              category={category}
              index={index}
              isInView={isInView}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
