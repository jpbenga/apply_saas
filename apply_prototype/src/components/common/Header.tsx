import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const Header = ({
  title,
  onBack,
  variant = 'default',
  progress = null,
  progressPulse = false,
  children
}) => {
  const variantStyles = {
    default: 'bg-white text-gray-900 border-b border-gray-200',
    build: 'bg-gradient-to-r from-cream to-build-bg text-build-text border-b border-build-ui',
    prepare: 'bg-prepare-bg text-prepare-text border-b border-prepare-accent/30',
    act: 'bg-[#1A0E21] text-white border-b border-[#CBA6F7]/30'
  };
  const progressColors = {
    default: 'bg-global-cta',
    build: 'bg-build-cta',
    prepare: 'bg-prepare-accent',
    act: 'bg-[#FF6B6B]'
  };
  return <header className={`sticky top-0 z-10 w-full ${variantStyles[variant]}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {onBack && <motion.button onClick={() => {
          // Play back button sound
          const audio = new Audio('/sounds/back-click.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.log('Audio playback prevented:', e));
          onBack();
        }} className="mr-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Go back" whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
              <ArrowLeftIcon className="w-5 h-5" />
            </motion.button>}
          <motion.h1 className="text-xl font-semibold" initial={{
          opacity: 0,
          x: -10
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.3
        }}>
            {title}
          </motion.h1>
          {children}
        </div>
        {progress !== null && <div className="w-32 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <motion.div className={`h-2.5 rounded-full ${progressColors[variant]} relative`} initial={{
          width: 0
        }} animate={{
          width: `${progress}%`
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
              {progressPulse && <motion.div className="absolute inset-0 bg-white" initial={{
            opacity: 0.5
          }} animate={{
            opacity: [0.5, 0, 0.5, 0],
            x: ['0%', '100%']
          }} transition={{
            duration: 1.5
          }} />}
            </motion.div>
          </div>}
      </div>
    </header>;
};