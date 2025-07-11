import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, BellIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
export const MobileNotification = ({
  notification,
  onClose,
  onAction
}) => {
  useEffect(() => {
    if (notification) {
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
      }
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);
  if (!notification) return null;
  const getIcon = () => {
    switch (notification.type) {
      case 'view':
        return <EyeIcon className="w-5 h-5 text-purple-600" />;
      case 'followUp':
        return <BellIcon className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircleIcon className="w-5 h-5 text-blue-600" />;
    }
  };
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'view':
        return 'bg-purple-50 border-purple-200';
      case 'followUp':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  return <AnimatePresence>
      {notification && <motion.div className={`fixed top-4 left-4 right-4 z-50 rounded-xl shadow-lg border ${getBackgroundColor()} overflow-hidden`} initial={{
      opacity: 0,
      y: -50
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -50
    }} transition={{
      type: 'spring',
      damping: 20,
      stiffness: 300
    }}>
          <motion.div className="absolute bottom-0 left-0 h-1 bg-blue-500" initial={{
        width: '100%'
      }} animate={{
        width: '0%'
      }} transition={{
        duration: 5,
        ease: 'linear'
      }} />
          <div className="p-4 flex items-start">
            <div className="p-2 rounded-full bg-white mr-3">{getIcon()}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-700">{notification.message}</p>
              {notification.action && <button className="mt-2 text-sm font-medium text-blue-600" onClick={() => {
            onAction(notification);
            onClose();
          }}>
                  {notification.actionText}
                </button>}
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 -mt-1 -mr-1" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>}
    </AnimatePresence>;
};