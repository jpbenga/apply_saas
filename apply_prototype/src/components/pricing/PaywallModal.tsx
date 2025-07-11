import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { XIcon, LockIcon, StarIcon, RocketIcon, ZapIcon, SparklesIcon } from 'lucide-react';
type PaywallModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  variant?: 'build' | 'prepare' | 'act';
  type?: string;
};
export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onAction,
  variant = 'build',
  type = 'default'
}) => {
  if (!isOpen) return null;
  const getContent = () => {
    switch (type) {
      case 'simulation':
        return {
          title: "Débloquez des simulations d'entretien illimitées",
          description: "Vous avez atteint la limite de simulations d'entretien du plan gratuit. Passez à La Transformation pour des simulations illimitées et un feedback détaillé.",
          features: ["Simulations d'entretien illimitées", 'Feedback IA détaillé sur vos performances', 'Coaching personnalisé pour améliorer vos réponses', 'Suivi de votre progression dans le temps'],
          icon: <RocketIcon className="w-6 h-6" />,
          ctaText: 'Découvrir les offres'
        };
      case 'coaching':
        return {
          title: 'Débloquez le coaching avancé',
          description: "Le module de coaching avancé est disponible exclusivement pour les membres de La Transformation et L'Agent.",
          features: ['Coaching IA personnalisé basé sur votre profil', 'Techniques avancées de préparation aux entretiens', 'Feedback détaillé sur votre communication verbale et non-verbale', 'Accès à tous les modules de formation'],
          icon: <StarIcon className="w-6 h-6" />,
          ctaText: 'Accéder au coaching avancé'
        };
      case 'act':
        return {
          title: "Débloquez l'Agent IA personnel",
          description: "L'univers Agir et votre agent personnel de recherche d'emploi sont disponibles exclusivement pour les membres du plan L'Agent.",
          features: ['Agent IA personnel qui recherche des offres pour vous', 'Candidatures automatisées et personnalisées', 'Suivi intelligent de vos candidatures', "Intégration avec LinkedIn et les sites d'emploi"],
          icon: <ZapIcon className="w-6 h-6" />,
          ctaText: 'Activer mon Agent'
        };
      default:
        return {
          title: 'Débloquez votre plein potentiel',
          description: "Passez à La Transformation pour accéder à toutes les fonctionnalités d'Apply et maximiser vos chances de succès.",
          features: ['CV et lettres de motivation illimités', 'Coaching IA personnalisé', "Simulations d'entretien avancées", 'Tableau de bord de suivi complet'],
          icon: <SparklesIcon className="w-6 h-6" />,
          ctaText: 'Découvrir les offres'
        };
    }
  };
  const content = getContent();
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          bgColor: 'bg-gradient-to-br from-cream/90 to-build-bg/90',
          borderColor: 'border-build-ui',
          textColor: 'text-build-text',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-700',
          featureBg: 'bg-amber-50',
          featureIcon: 'text-amber-600'
        };
      case 'prepare':
        return {
          bgColor: 'bg-gradient-to-br from-[#0D1B2A]/90 to-[#102135]/90',
          borderColor: 'border-[#7FB3D5]/30',
          textColor: 'text-white',
          iconBg: 'bg-[#7FB3D5]/20',
          iconColor: 'text-[#7FB3D5]',
          featureBg: 'bg-[#7FB3D5]/10',
          featureIcon: 'text-[#7FB3D5]'
        };
      case 'act':
        return {
          bgColor: 'bg-gradient-to-br from-[#1A0E21]/90 to-[#120818]/90',
          borderColor: 'border-[#CBA6F7]/30',
          textColor: 'text-white',
          iconBg: 'bg-[#CBA6F7]/20',
          iconColor: 'text-[#CBA6F7]',
          featureBg: 'bg-[#CBA6F7]/10',
          featureIcon: 'text-[#CBA6F7]'
        };
      default:
        return {
          bgColor: 'bg-white/90',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          featureBg: 'bg-blue-50',
          featureIcon: 'text-blue-600'
        };
    }
  };
  const styles = getVariantStyles();
  return <AnimatePresence>
      {isOpen && <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose}>
          <motion.div className="w-full max-w-lg" initial={{
        scale: 0.95,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.95,
        opacity: 0
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300
      }} onClick={e => e.stopPropagation()}>
            <Card className={`p-6 ${styles.bgColor} border ${styles.borderColor}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${styles.iconBg} mr-4`}>
                    <LockIcon className={`w-5 h-5 ${styles.iconColor}`} />
                  </div>
                  <div>
                    <h2 className={`text-xl font-medium mb-1 ${styles.textColor}`}>
                      {content.title}
                    </h2>
                    <p className={`${variant === 'act' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {content.description}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className={`p-1 rounded-full hover:bg-black/10 ${styles.textColor}`}>
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {content.features.map((feature, index) => <motion.div key={index} className={`p-3 rounded-lg ${styles.featureBg} flex items-start`} initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.1
            }}>
                    <div className={`p-1 rounded-full ${styles.featureBg} mr-3 mt-0.5`}>
                      <StarIcon className={`w-4 h-4 ${styles.featureIcon}`} />
                    </div>
                    <span className={styles.textColor}>{feature}</span>
                  </motion.div>)}
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" className="flex-1" onClick={onClose}>
                  Plus tard
                </Button>
                <Button variant={variant} className="flex-1" onClick={onAction}>
                  {content.ctaText}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
};