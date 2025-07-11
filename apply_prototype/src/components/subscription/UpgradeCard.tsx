import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, StarIcon, FileTextIcon, ZapIcon, BrainIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
type UpgradeCardType = 'progress' | 'applications' | 'coaching';
type SubscriptionTier = 'free' | 'starter' | 'pro' | 'premium';
type UpgradeCardProps = {
  type: UpgradeCardType;
  currentTier: SubscriptionTier;
  onUpgrade: () => void;
  className?: string;
};
export const UpgradeCard: React.FC<UpgradeCardProps> = ({
  type,
  currentTier,
  onUpgrade,
  className = ''
}) => {
  // Only show upgrade cards for free and starter tiers
  if (currentTier === 'premium' || currentTier === 'pro' && type !== 'coaching') {
    return null;
  }
  const getCardContent = () => {
    switch (type) {
      case 'progress':
        return {
          title: 'Boostez votre recherche avec Apply Pro',
          description: 'Maximisez vos chances avec des outils avancés et un accompagnement personnalisé',
          benefits: ['CV et lettres de motivation illimités', 'Feedback IA avancé sur vos candidatures', 'AutoPilot pour postuler automatiquement'],
          icon: <RocketIcon className="w-6 h-6 text-blue-500" />,
          cta: 'Voir les options',
          bgGradient: 'from-blue-50 to-blue-50/30',
          borderColor: 'border-blue-100'
        };
      case 'applications':
        return {
          title: 'Vous avez atteint la limite gratuite',
          description: "Débloquez l'AutoPilot illimité et le coaching avancé pour multiplier vos chances",
          benefits: ["Candidatures illimitées avec l'AutoPilot", 'Relances automatiques intelligentes', 'Suivi avancé de vos candidatures'],
          icon: <ZapIcon className="w-6 h-6 text-amber-500" />,
          cta: 'Passer à Pro',
          bgGradient: 'from-amber-50 to-amber-50/30',
          borderColor: 'border-amber-100'
        };
      case 'coaching':
        return {
          title: "Envie d'un vrai feedback IA sur ton entretien ?",
          description: currentTier === 'pro' ? 'Passez à Premium pour un coaching personnalisé avec notre mentor IA' : 'Découvre Apply Pro pour un feedback détaillé et des conseils personnalisés',
          benefits: currentTier === 'pro' ? ['Mentor IA simulant les recruteurs réels', 'Préparation orale premium avec feedback vidéo', 'Accès prioritaire aux offres exclusives'] : ['Feedback IA détaillé sur vos performances', "Conseils personnalisés d'amélioration", "Accès illimité aux simulations d'entretien"],
          icon: <BrainIcon className="w-6 h-6 text-purple-500" />,
          cta: currentTier === 'pro' ? 'Découvrir Premium' : 'Essayer Pro',
          bgGradient: 'from-purple-50 to-purple-50/30',
          borderColor: 'border-purple-100'
        };
    }
  };
  const content = getCardContent();
  return <motion.div className={className} initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} whileHover={{
    y: -2
  }}>
      <Card className={`p-4 border ${content.borderColor} bg-gradient-to-r ${content.bgGradient}`}>
        <div className="flex items-start">
          <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
            {content.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">{content.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{content.description}</p>
            <div className="space-y-1.5 mb-4">
              {content.benefits.map((benefit, index) => <div key={index} className="flex items-start">
                  <StarIcon className="w-3.5 h-3.5 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700">{benefit}</span>
                </div>)}
            </div>
            <Button variant="primary" size="small" className="w-full" onClick={onUpgrade}>
              {content.cta}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>;
};