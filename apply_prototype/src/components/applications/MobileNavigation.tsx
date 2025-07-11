import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon, ClipboardListIcon, TargetIcon, UserIcon, PlusIcon } from 'lucide-react';
export const MobileNavigation = ({
  currentTab,
  onChangeTab,
  onNewApplication
}) => {
  const tabs = [{
    id: 'home',
    label: 'Accueil',
    icon: <HomeIcon className="w-5 h-5" />
  }, {
    id: 'applications',
    label: 'Candidatures',
    icon: <ClipboardListIcon className="w-5 h-5" />
  }, {
    id: 'new',
    label: '',
    icon: <PlusIcon className="w-6 h-6" />
  }, {
    id: 'universes',
    label: 'Univers',
    icon: <TargetIcon className="w-5 h-5" />
  }, {
    id: 'profile',
    label: 'Profil',
    icon: <UserIcon className="w-5 h-5" />
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => <motion.button key={tab.id} className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl ${currentTab === tab.id ? 'text-blue-600' : 'text-gray-500'} ${tab.id === 'new' ? '-mt-8' : ''}`} whileTap={{
        scale: 0.9
      }} onClick={() => tab.id === 'new' ? onNewApplication() : onChangeTab(tab.id)}>
            {tab.id === 'new' ? <div className="w-14 h-14 bg-global-cta rounded-full flex items-center justify-center shadow-lg">
                {tab.icon}
              </div> : <>
                <div className={`${currentTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {tab.icon}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>
                {currentTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-1 w-6 h-1 bg-blue-600 rounded-full" transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
              </>}
          </motion.button>)}
      </div>
    </div>;
};