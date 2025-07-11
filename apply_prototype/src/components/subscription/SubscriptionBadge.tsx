import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsIcon, CrownIcon, RocketIcon, CheckIcon, StarIcon } from 'lucide-react';
import { SubscriptionPanel } from './SubscriptionPanel';
type SubscriptionTier = 'free' | 'starter' | 'pro' | 'premium';
type SubscriptionBadgeProps = {
  tier: SubscriptionTier;
  className?: string;
};
export const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({
  tier = 'free',
  className = ''
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const getBadgeStyles = () => {
    switch (tier) {
      case 'free':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          hoverGlow: 'shadow-gray-300/50',
          icon: <StarIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />,
          label: 'Free — Fonctions de base'
        };
      case 'starter':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          hoverGlow: 'shadow-green-300/50',
          icon: <StarIcon className="w-3.5 h-3.5 mr-1.5 text-green-500" />,
          label: 'Starter — Essai actif'
        };
      case 'pro':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          hoverGlow: 'shadow-blue-300/50',
          icon: <RocketIcon className="w-3.5 h-3.5 mr-1.5 text-blue-500" />,
          label: 'Pro — Accès complet activé'
        };
      case 'premium':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          hoverGlow: 'shadow-purple-300/50',
          icon: <CrownIcon className="w-3.5 h-3.5 mr-1.5 text-purple-500" />,
          label: 'Premium — Transition Pro Max'
        };
    }
  };
  const styles = getBadgeStyles();
  return <>
      <motion.button className={`flex items-center py-1.5 px-3 rounded-full border ${styles.bg} ${styles.text} ${styles.border} transition-all ${className}`} whileHover={{
      scale: 1.02,
      boxShadow: isHovered ? '0 0 8px rgba(0, 0, 0, 0.2)' : 'none'
    }} onClick={() => setShowPanel(true)} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <div className="flex items-center">
          {styles.icon}
          <span className="text-xs font-medium">{styles.label}</span>
        </div>
        <AnimatePresence>
          {isHovered && <motion.div initial={{
          opacity: 0,
          width: 0,
          marginLeft: 0
        }} animate={{
          opacity: 1,
          width: 'auto',
          marginLeft: 4
        }} exit={{
          opacity: 0,
          width: 0,
          marginLeft: 0
        }} transition={{
          duration: 0.2
        }} className="flex items-center overflow-hidden">
              <SettingsIcon className="w-3.5 h-3.5 text-current opacity-70" />
            </motion.div>}
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {showPanel && <SubscriptionPanel currentTier={tier} onClose={() => setShowPanel(false)} />}
      </AnimatePresence>
    </>;
};