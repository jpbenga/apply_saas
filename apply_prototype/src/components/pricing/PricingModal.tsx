import React, { useState, Component } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { XIcon, CreditCardIcon, ArrowRightIcon, SparklesIcon, RocketIcon, BriefcaseIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PricingCardGroup } from './PricingCardGroup';
export type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  color?: string;
};
type PricingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onContinueFree: () => void;
  variant?: 'build' | 'prepare' | 'act';
  highlightedTierId?: string;
  onSelectPlan?: (planId: string) => void;
};
export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  ctaText,
  onContinueFree,
  variant = 'build',
  highlightedTierId,
  onSelectPlan
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(highlightedTierId || 'transformation');
  if (!isOpen) return null;
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          cardBg: 'bg-[#FAF7F1]',
          cardBorder: 'border-[#E6E2D8]',
          textColor: 'text-[#2C2C2C]',
          descriptionColor: 'text-[#4E4E4E]',
          accentColor: '#F4D35E',
          accentTextColor: 'text-amber-700',
          checkBg: 'bg-amber-100',
          checkColor: 'text-amber-700',
          badgeBg: 'bg-amber-500',
          badgeText: 'text-white',
          currentBadgeBg: 'bg-amber-100',
          currentBadgeText: 'text-amber-800',
          shadow: 'shadow-amber-100/30',
          hoverBorder: 'hover:border-amber-300',
          buttonVariant: 'build'
        };
      case 'prepare':
        return {
          cardBg: 'bg-[#0D1B2A]',
          cardBorder: 'border-[#7FB3D5]/30',
          textColor: 'text-white',
          descriptionColor: 'text-[#D0E3F0]',
          accentColor: '#7FB3D5',
          accentTextColor: 'text-[#7FB3D5]',
          checkBg: 'bg-[#7FB3D5]/10',
          checkColor: 'text-[#7FB3D5]',
          badgeBg: 'bg-[#7FB3D5]',
          badgeText: 'text-[#0D1B2A]',
          currentBadgeBg: 'bg-[#7FB3D5]/20',
          currentBadgeText: 'text-white',
          shadow: 'shadow-[#7FB3D5]/10',
          hoverBorder: 'hover:border-[#7FB3D5]/50',
          buttonVariant: 'prepare'
        };
      case 'act':
        return {
          cardBg: 'bg-[#1E0F24]',
          cardBorder: 'border-[#CBA6F7]/30',
          textColor: 'text-white',
          descriptionColor: 'text-[#D8D4E8]',
          accentColor: '#CBA6F7',
          accentTextColor: 'text-[#CBA6F7]',
          checkBg: 'bg-[#CBA6F7]/10',
          checkColor: 'text-[#CBA6F7]',
          badgeBg: 'bg-[#FF6B6B]',
          badgeText: 'text-white',
          currentBadgeBg: 'bg-[#CBA6F7]/20',
          currentBadgeText: 'text-white',
          shadow: 'shadow-[#CBA6F7]/10',
          hoverBorder: 'hover:border-[#CBA6F7]/60',
          buttonVariant: 'act'
        };
      default:
        return {
          cardBg: 'bg-white',
          cardBorder: 'border-gray-200',
          textColor: 'text-gray-900',
          descriptionColor: 'text-gray-600',
          accentColor: '#4BB8F1',
          accentTextColor: 'text-blue-600',
          checkBg: 'bg-blue-100',
          checkColor: 'text-blue-700',
          badgeBg: 'bg-blue-500',
          badgeText: 'text-white',
          currentBadgeBg: 'bg-blue-100',
          currentBadgeText: 'text-blue-800',
          shadow: 'shadow-blue-100/30',
          hoverBorder: 'hover:border-blue-300',
          buttonVariant: 'primary'
        };
    }
  };
  const styles = getVariantStyles();
  const handleSelectPlan = (tierId: string) => {
    if (tierId === 'free' || tierId === "l'étincelle") {
      onContinueFree();
      return;
    }
    // Play sound effect
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    // Fermer la modal et passer au paiement
    if (onSelectPlan) {
      const planId = tierId === 'la transformation' ? 'transformation' : tierId === "l'agent" ? 'agent' : tierId;
      onSelectPlan(planId);
    } else {
      // Si onSelectPlan n'est pas défini, on ferme simplement la modal
      onClose();
    }
  };
  const pricingPlans = [{
    name: "L'Étincelle",
    price: '0€',
    description: 'La première impulsion pour matérialiser votre valeur professionnelle',
    benefits: ['Construction : CV ATS-compliant', 'Ciblage IA : Lettre de motivation ciblée', 'Introspection : Test de positionnement', "Amorçage : Module d'initiation au coaching"],
    ctaText: 'Commencer gratuitement',
    iconComponent: <SparklesIcon className={`w-5 h-5 ${styles.accentTextColor}`} />
  }, {
    name: 'La Transformation',
    price: '19€/mois',
    description: "La suite d'outils complète pour piloter votre succès",
    benefits: ['Fondations de "L\'Étincelle" incluses', "Maîtrise de l'Univers 1 (Construire) : Itérations illimitées de CV et lettres", "Maîtrise de l'Univers 2 (Se préparer) : Accès total au framework de coaching IA", 'Intelligence Augmentée : Feedback IA continu sur vos documents et cibles', 'Tableau de Bord : Centralisation et suivi de votre pipeline de candidatures'],
    ctaText: 'Choisir La Transformation',
    recommended: true,
    iconComponent: <RocketIcon className={`w-5 h-5 ${styles.accentTextColor}`} />
  }, {
    name: "L'Agent",
    price: '79€/mois',
    description: "Déléguez l'opérationnel et concentrez-vous sur les entretiens",
    benefits: ['Suite complète "La Transformation" incluse', "Activation de l'Univers 3 (Agir) : Déploiement de votre agent IA personnel", "Sourcing Autonome : Veille et identification d'opportunités par l'agent", "Exécution Déléguée : Génération et envoi des candidatures par l'agent", 'Intelligence Ambiante : Intégration à vos flux (Mail, LinkedIn)'],
    ctaText: 'Activer mon Agent',
    iconComponent: <BriefcaseIcon className={`w-5 h-5 ${styles.accentTextColor}`} />
  }];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <Card className={`p-0 overflow-hidden ${styles.bgColor} border ${styles.borderColor} rounded-xl shadow-xl`}>
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${styles.textColor}`}>
                  {title}
                </h2>
                <p className={`text-lg font-medium ${styles.textColor}`}>
                  {subtitle}
                </p>
                <p className={`mt-3 max-w-xl ${styles.descriptionColor}`}>
                  {description}
                </p>
              </div>
              <motion.button onClick={onClose} className={`p-2 rounded-full hover:bg-black/10 ${styles.textColor}`} aria-label="Fermer" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                <XIcon className="w-6 h-6" />
              </motion.button>
            </div>
            {/* Pricing Cards */}
            <PricingCardGroup plans={pricingPlans} variant={variant} onSelectPlan={handleSelectPlan} className="mb-8" />
            {/* Alternative Payment Option */}
            <motion.div className={`rounded-xl border p-5 ${variant === 'act' ? 'bg-[#1E0F24] border-[#CBA6F7]/30' : variant === 'prepare' ? 'bg-white border-gray-200' : 'bg-white border-gray-200'}`} whileHover={{
            scale: 1.01
          }} transition={{
            type: 'spring',
            stiffness: 400,
            damping: 17
          }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${variant === 'act' ? 'bg-[#CBA6F7]/10 text-[#CBA6F7]' : variant === 'prepare' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    <CreditCardIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-medium ${styles.textColor}`}>
                      Tu préfères un paiement unique ?
                    </h3>
                    <p className={`text-sm ${styles.descriptionColor}`}>
                      {variant === 'act' ? 'Boost de candidature - 39€ (paiement unique)' : variant === 'prepare' ? 'Session de coaching - 29€ (paiement unique)' : "L'Impulsion - 25€ (paiement unique)"}
                    </p>
                  </div>
                </div>
                <motion.div whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <Button variant={styles.buttonVariant} className="flex items-center justify-center" onClick={() => handleSelectPlan('onetime')}>
                    <span>Découvrir cette option</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            {/* Footer Info */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 mr-1 ${styles.accentTextColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className={styles.descriptionColor}>
                  Paiement sécurisé • Annulation à tout moment
                </span>
              </div>
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 mr-1 ${styles.accentTextColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className={styles.descriptionColor}>
                  Essai gratuit de 3 jours
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>;
};