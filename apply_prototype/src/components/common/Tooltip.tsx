import React from 'react';
import { motion } from 'framer-motion';
export const Tooltip = ({
  text,
  position = 'top'
}) => {
  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };
  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-black border-r-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-t-transparent border-r-transparent border-b-black border-l-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-r-transparent border-b-transparent border-l-black',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-r-black border-b-transparent border-l-transparent'
  };
  return <motion.div className={`absolute z-50 ${positionStyles[position]}`} initial={{
    opacity: 0,
    scale: 0.8
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.8
  }} transition={{
    duration: 0.2
  }}>
      <div className="bg-black text-white text-xs rounded py-1 px-2 max-w-xs text-center">
        {text}
        <div className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`} />
      </div>
    </motion.div>;
};