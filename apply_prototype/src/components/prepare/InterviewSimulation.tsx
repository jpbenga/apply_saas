import React, { useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, ArrowRightIcon } from 'lucide-react';
export const InterviewSimulation = ({
  onComplete,
  onBack,
  isAudioEnabled,
  showPricing,
  onShowPricing
}) => {
  // Afficher la matrice de prix si demandé
  useEffect(() => {
    if (showPricing && onShowPricing) {
      onShowPricing('prepare');
    }
  }, [showPricing, onShowPricing]);
  return <div className="space-y-6">
      <Card variant="prepare" className="p-6">
        <h2 className="text-xl font-medium text-lavender-100 mb-6 flex items-center">
          <MicIcon className="w-5 h-5 mr-2 text-lavender-300" />
          Simulation d'entretien
        </h2>
        <p className="text-blue-100 mb-6">
          Préparez-vous à l'entretien avec une simulation interactive.
        </p>
        <div className="text-center py-8">
          <p className="text-lavender-200 mb-4">
            Simulation disponible dans la version complète
          </p>
          <Button variant="prepare" onClick={() => onShowPricing('prepare')} className="flex items-center mx-auto">
            <span>Débloquer cette fonctionnalité</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>;
};