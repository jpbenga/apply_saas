import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, LightbulbIcon, ZapIcon } from 'lucide-react';
import { Button } from '../common/Button';
type SuggestionType = 'cv' | 'interview' | 'application';
type MicroSuggestionProps = {
  type: SuggestionType;
  onUpgrade: () => void;
  onDismiss: () => void;
  position?: 'top' | 'bottom-right';
};
export const MicroSuggestion: React.FC<MicroSuggestionProps> = ({
  type,
  onUpgrade,
  onDismiss,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };
  const getSuggestionContent = () => {
    switch (type) {
      case 'cv':
        return {
          message: 'Tu peux générer des CV illimités avec Apply Pro.',
          icon: <LightbulbIcon className="w-4 h-4 text-amber-500" />,
          color: 'bg-amber-50 border-amber-100'
        };
      case 'interview':
        return {
          message: "Envie d'un feedback IA avancé ? Disponible avec Pro.",
          icon: <ZapIcon className="w-4 h-4 text-purple-500" />,
          color: 'bg-purple-50 border-purple-100'
        };
      case 'application':
        return {
          message: "Active l'AutoPilot illimité pour multiplier tes chances.",
          icon: <LightbulbIcon className="w-4 h-4 text-blue-500" />,
          color: 'bg-blue-50 border-blue-100'
        };
    }
  };
  const content = getSuggestionContent();
  const positionClasses = position === 'top' ? 'w-full' : 'fixed bottom-4 right-4 max-w-xs z-50';
  if (!isVisible) return null;
  return <AnimatePresence>
      <motion.div className={`${positionClasses}`} initial={{
      opacity: 0,
      y: position === 'top' ? -20 : 20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: position === 'top' ? -20 : 20
    }} transition={{
      duration: 0.3
    }}>
        <div className={`flex items-center justify-between py-2 px-4 ${content.color} border rounded-lg shadow-sm`}>
          <div className="flex items-center">
            {content.icon}
            <span className="ml-2 text-sm">{content.message}</span>
          </div>
          <div className="flex items-center ml-4">
            <Button variant="link" size="small" className="text-blue-600 text-xs font-medium mr-2" onClick={onUpgrade}>
              Découvrir
            </Button>
            <button onClick={handleDismiss} className="p-1 rounded-full hover:bg-white/50">
              <XIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>;
};