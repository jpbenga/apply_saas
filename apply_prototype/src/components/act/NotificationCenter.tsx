import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, XIcon, CheckCircleIcon, AlertCircleIcon, InfoIcon, BriefcaseIcon, CalendarIcon } from 'lucide-react';
export const NotificationCenter = ({
  notifications,
  onRemove
}) => {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  // Mettre à jour le compteur de notifications non lues
  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications.length]);
  // Réinitialiser le compteur quand le panneau est ouvert
  useEffect(() => {
    if (showNotificationPanel) {
      setUnreadCount(0);
    }
  }, [showNotificationPanel]);
  // Obtenir l'icône du type de notification
  const getNotificationIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircleIcon className="w-5 h-5 text-red-500" />;
      case 'info':
        return <InfoIcon className="w-5 h-5 text-blue-500" />;
      case 'application':
        return <BriefcaseIcon className="w-5 h-5 text-act-accent" />;
      case 'interview':
        return <CalendarIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <InfoIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  // Obtenir la couleur de fond du type de notification
  const getNotificationBgColor = type => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-900/30';
      case 'error':
        return 'bg-red-900/20 border-red-900/30';
      case 'info':
        return 'bg-blue-900/20 border-blue-900/30';
      case 'application':
        return 'bg-act-accent/10 border-act-accent/30';
      case 'interview':
        return 'bg-yellow-900/20 border-yellow-900/30';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };
  // Formater la date
  const formatNotificationTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    if (diffSec < 60) return "À l'instant";
    if (diffMin < 60) return `Il y a ${diffMin} min`;
    if (diffHour < 24) return `Il y a ${diffHour}h`;
    if (diffDay < 7) return `Il y a ${diffDay}j`;
    return date.toLocaleDateString();
  };
  return <>
      {/* Bouton de notification */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.button className="relative p-3 bg-gray-800 rounded-full shadow-lg border border-gray-700 hover:bg-gray-700 transition-colors" onClick={() => setShowNotificationPanel(!showNotificationPanel)} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <BellIcon className="w-6 h-6 text-white" />
          {/* Badge de compteur */}
          <AnimatePresence>
            {unreadCount > 0 && <motion.div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                {unreadCount}
              </motion.div>}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Panneau de notifications */}
      <AnimatePresence>
        {showNotificationPanel && <>
            {/* Overlay */}
            <motion.div className="fixed inset-0 bg-black/50 z-40" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowNotificationPanel(false)} />
            {/* Panneau */}
            <motion.div className="fixed right-6 bottom-20 w-80 sm:w-96 max-h-[70vh] bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col" initial={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }} transition={{
          duration: 0.2
        }}>
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="text-white font-medium flex items-center">
                  <BellIcon className="w-5 h-5 mr-2 text-act-accent" />
                  Notifications
                </h3>
                <button className="p-1 rounded-full hover:bg-gray-800" onClick={() => setShowNotificationPanel(false)}>
                  <XIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow">
                {notifications.length === 0 ? <div className="p-6 text-center text-gray-400">
                    <BellIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Aucune notification</p>
                  </div> : <div className="p-2 space-y-2">
                    <AnimatePresence initial={false}>
                      {notifications.map(notification => <motion.div key={notification.id} className={`p-3 rounded-lg border ${getNotificationBgColor(notification.type)} relative`} initial={{
                  opacity: 0,
                  x: 50
                }} animate={{
                  opacity: 1,
                  x: 0
                }} exit={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  padding: 0,
                  overflow: 'hidden'
                }} transition={{
                  duration: 0.2
                }} layout>
                          <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800/50" onClick={() => onRemove(notification.id)}>
                            <XIcon className="w-3 h-3 text-gray-400" />
                          </button>
                          <div className="flex items-start pr-5">
                            <div className="p-2 rounded-full mr-3 flex-shrink-0 bg-gray-800">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <div className="text-xs text-gray-500 mt-2">
                                {formatNotificationTime(notification.timestamp)}
                              </div>
                            </div>
                          </div>
                        </motion.div>)}
                    </AnimatePresence>
                  </div>}
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Notifications toast */}
      <div className="fixed right-6 bottom-20 z-30 space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification, index) => <motion.div key={notification.id} className={`p-3 rounded-lg shadow-lg ${getNotificationBgColor(notification.type)} max-w-sm pointer-events-auto`} initial={{
          opacity: 0,
          x: 50,
          scale: 0.8
        }} animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          x: 50,
          scale: 0.8
        }} transition={{
          duration: 0.3,
          delay: index * 0.1
        }} style={{
          marginBottom: index * 4
        }}>
              <div className="flex items-start">
                <div className="p-2 rounded-full mr-3 flex-shrink-0 bg-gray-800">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1 truncate">
                    {notification.message}
                  </p>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-800/50 ml-2 flex-shrink-0" onClick={() => onRemove(notification.id)}>
                  <XIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </>;
};