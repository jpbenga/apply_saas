import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingMatrix } from './PricingMatrix';
import { XIcon } from 'lucide-react';
export const PricingMatrixModal = ({
  isOpen,
  onClose,
  variant = 'build',
  onSelectPlan,
  onSelectAlternative,
  highlightedTierId = 'transformation'
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-7xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 z-20 ${variant === 'act' ? 'text-[#D8D4E8] hover:text-white' : 'text-gray-400 hover:text-gray-200'}`} aria-label="Fermer">
          <XIcon className="w-5 h-5" />
        </button>
        <PricingMatrix onSelectPlan={onSelectPlan} variant={variant} highlightedTierId={highlightedTierId} />
      </div>
    </div>;
};