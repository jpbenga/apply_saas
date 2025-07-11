import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, AlertCircleIcon, XIcon } from 'lucide-react';
export const Notification = ({
  type,
  message,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircleIcon className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircleIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  return <motion.div className={`fixed bottom-4 right-4 max-w-md rounded-lg shadow-lg border ${getColors()} p-4 z-50 flex items-center`} initial={{
    opacity: 0,
    y: 50,
    scale: 0.3
  }} animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }} exit={{
    opacity: 0,
    y: 20,
    scale: 0.5
  }} transition={{
    type: 'spring',
    damping: 20,
    stiffness: 300
  }}>
      <div className="mr-3">{getIcon()}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message}</p>
      </div>
      <button className="ml-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
        <XIcon className="w-5 h-5" />
      </button>
    </motion.div>;
};