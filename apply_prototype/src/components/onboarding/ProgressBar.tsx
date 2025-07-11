import React from 'react';
import { motion } from 'framer-motion';
export const ProgressBar = ({
  currentStep,
  totalSteps
}) => {
  const progressPercentage = currentStep / (totalSteps - 1) * 100;
  return <div className="w-full bg-gray-100 h-1.5">
      <motion.div className="h-full bg-global-cta relative" initial={{
      width: '0%'
    }} animate={{
      width: `${progressPercentage}%`
    }} transition={{
      duration: 0.5,
      ease: 'easeOut'
    }}>
        <motion.div className="absolute inset-0 bg-white/30" animate={{
        x: ['-100%', '100%']
      }} transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear'
      }} />
      </motion.div>
    </div>;
};