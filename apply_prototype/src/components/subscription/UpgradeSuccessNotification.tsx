import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XIcon } from 'lucide-react';
type SubscriptionTier = 'starter' | 'pro' | 'premium';
type UpgradeSuccessNotificationProps = {
  tier: SubscriptionTier;
  onClose: () => void;
};
export const UpgradeSuccessNotification: React.FC<UpgradeSuccessNotificationProps> = ({
  tier,
  onClose
}) => {
  useEffect(() => {
    // Play success sound
    const audio = new Audio('/sounds/upgrade-success.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const getTierStyles = () => {
    switch (tier) {
      case 'starter':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'pro':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500'
        };
      case 'premium':
        return {
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-100',
          textColor: 'text-purple-800',
          iconColor: 'text-purple-500'
        };
    }
  };
  const getTierMessage = () => {
    switch (tier) {
      case 'starter':
        return "Bienvenue dans Apply Starter 🎉 Vous avez maintenant accès à 3 CV personnalisables et à l'AutoPilot pour 3 offres par mois.";
      case 'pro':
        return 'Bienvenue dans Apply Pro 🎉 Ton AutoPilot est activé, ton coaching illimité aussi. On bosse pour toi.';
      case 'premium':
        return 'Bienvenue dans Apply Premium 🎉 Vous bénéficiez désormais de notre offre la plus complète avec mentor IA et préparation orale premium.';
    }
  };
  const styles = getTierStyles();
  return <motion.div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md" initial={{
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
      <div className={`${styles.bgColor} border ${styles.borderColor} rounded-lg shadow-lg p-4 flex items-start`}>
        <CheckCircleIcon className={`w-6 h-6 ${styles.iconColor} mr-3 flex-shrink-0`} />
        <div className="flex-1">
          <h3 className={`font-medium mb-1 ${styles.textColor}`}>
            Abonnement activé !
          </h3>
          <p className="text-sm text-gray-700">{getTierMessage()}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/50">
          <XIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </motion.div>;
};