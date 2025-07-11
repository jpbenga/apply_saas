import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { SparklesIcon, RocketIcon, CheckIcon, StarIcon, ArrowRightIcon, LightbulbIcon, ZapIcon, BriefcaseIcon, UserIcon, BookOpenIcon, FileTextIcon, MessageSquareIcon, BarChartIcon, SearchIcon, SendIcon, BellIcon, MailIcon, PieChartIcon, XIcon } from 'lucide-react';
type PricingMatrixProps = {
  onSelectPlan: (plan: string) => void;
  onClose?: () => void;
  variant?: 'build' | 'prepare' | 'act';
  className?: string;
  highlightedTierId?: string;
};
export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  onSelectPlan,
  onClose,
  variant = 'build',
  className = '',
  highlightedTierId = 'transformation'
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(highlightedTierId);
  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    // Play selection sound
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    // Call the parent handler after a brief delay to allow the animation to complete
    setTimeout(() => {
      onSelectPlan(plan);
    }, 300);
  };
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          bgGradient: 'from-cream to-build-bg',
          accentColor: 'text-build-cta',
          accentBg: 'bg-build-accent/10',
          accentBorder: 'border-build-accent',
          headingColor: 'text-build-text',
          descriptionColor: 'text-gray-600',
          checkBg: 'bg-amber-100',
          checkColor: 'text-amber-700',
          popularBadgeBg: 'bg-amber-500',
          popularBadgeText: 'text-white',
          cardShadow: 'shadow-amber-100/30',
          buttonVariant: 'build',
          secondaryButtonVariant: 'secondary',
          closeButtonColor: 'text-gray-400 hover:text-gray-600'
        };
      case 'prepare':
        return {
          bgGradient: 'from-[#0D1B2A] to-[#102135]',
          accentColor: 'text-[#7FB3D5]',
          accentBg: 'bg-[#7FB3D5]/10',
          accentBorder: 'border-[#7FB3D5]/30',
          headingColor: 'text-white',
          descriptionColor: 'text-[#D0E3F0]',
          checkBg: 'bg-[#7FB3D5]/10',
          checkColor: 'text-[#7FB3D5]',
          popularBadgeBg: 'bg-[#7FB3D5]',
          popularBadgeText: 'text-[#0D1B2A]',
          cardShadow: 'shadow-[#7FB3D5]/10',
          buttonVariant: 'prepare',
          secondaryButtonVariant: 'secondary',
          closeButtonColor: 'text-[#D0E3F0] hover:text-white',
          customButtonStyle: 'bg-[#7FB3D5] text-[#0D1B2A] hover:bg-[#6AA1C5]'
        };
      case 'act':
        return {
          bgGradient: 'from-[#1A0E21] to-[#120818]',
          accentColor: 'text-[#CBA6F7]',
          accentBg: 'bg-[#CBA6F7]/10',
          accentBorder: 'border-[#CBA6F7]/30',
          headingColor: 'text-white',
          descriptionColor: 'text-[#D8D4E8]',
          checkBg: 'bg-[#CBA6F7]/10',
          checkColor: 'text-[#CBA6F7]',
          popularBadgeBg: 'bg-[#CBA6F7]',
          popularBadgeText: 'text-white',
          cardShadow: 'shadow-[#CBA6F7]/10',
          buttonVariant: 'act',
          secondaryButtonVariant: 'secondary',
          closeButtonColor: 'text-[#D8D4E8] hover:text-white',
          customButtonStyle: 'bg-[#CBA6F7] text-[#1A0E21] hover:bg-[#BF95F0]'
        };
      default:
        return {
          bgGradient: 'from-gray-50 to-gray-100',
          accentColor: 'text-global-cta',
          accentBg: 'bg-global-cta/10',
          accentBorder: 'border-global-cta',
          headingColor: 'text-gray-900',
          descriptionColor: 'text-gray-600',
          checkBg: 'bg-blue-100',
          checkColor: 'text-blue-700',
          popularBadgeBg: 'bg-blue-500',
          popularBadgeText: 'text-white',
          cardShadow: 'shadow-blue-100/30',
          buttonVariant: 'primary',
          secondaryButtonVariant: 'secondary',
          closeButtonColor: 'text-gray-400 hover:text-gray-600'
        };
    }
  };
  const styles = getVariantStyles();
  return <div className={`w-full py-6 sm:py-8 px-3 sm:px-4 md:px-8 bg-gradient-to-br ${styles.bgGradient} ${className} max-h-[90vh] overflow-y-auto pb-20 relative`} role="dialog" aria-modal="true" aria-labelledby="pricing-title">
      {onClose && <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 z-20 ${styles.closeButtonColor}`} aria-label="Fermer">
          <XIcon className="w-5 h-5" />
        </button>}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 id="pricing-title" className={`text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3 ${styles.headingColor}`}>
            Choisissez votre niveau d'autonomie
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${styles.descriptionColor}`}>
            Apply s'adapte à votre besoin de contrôle et d'assistance dans votre
            recherche d'emploi
          </p>
        </div>
        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          {/* L'Étincelle */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} whileHover={{
          y: -5,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 10
          }
        }} onHoverStart={() => setHoveredCard('etincelle')} onHoverEnd={() => setHoveredCard(null)} className="relative">
            <Card variant={variant} className={`flex flex-col h-full p-4 sm:p-6 transition-all duration-300 ${hoveredCard === 'etincelle' ? `shadow-lg ${styles.cardShadow}` : 'shadow-md'}`}>
              <div className="flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`p-2 rounded-full ${styles.accentBg} mr-2 sm:mr-3 flex-shrink-0`}>
                    <SparklesIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.accentColor}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-medium ${styles.headingColor}`}>
                    L'Étincelle
                  </h3>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-2xl sm:text-3xl font-bold ${styles.headingColor}`}>
                      0€
                    </span>
                    <span className={`ml-1 text-xs sm:text-sm ${styles.descriptionColor}`}>
                      Pour toujours
                    </span>
                  </div>
                  <p className={`mt-1 sm:mt-2 text-sm ${styles.descriptionColor}`}>
                    La première impulsion pour matérialiser votre valeur
                    professionnelle.
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Construction :</span>{' '}
                      Matérialisez votre proposition de valeur avec un CV
                      ATS-compliant.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Ciblage IA :</span> Générez
                      une lettre de motivation ciblée pour une offre.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Introspection :</span>{' '}
                      Révélez vos talents latents via le test de positionnement.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Amorçage :</span> Éprouvez
                      la mécanique du coaching via un module d'initiation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <Button variant={styles.secondaryButtonVariant} className="w-full justify-center text-sm sm:text-base py-2 sm:py-3" onClick={() => handleSelectPlan('etincelle')}>
                  Commencer gratuitement
                </Button>
              </div>
            </Card>
          </motion.div>
          {/* La Transformation */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0,
          scale: [null, highlightedTierId === 'transformation' ? 1.05 : 1],
          zIndex: highlightedTierId === 'transformation' ? 10 : 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} whileHover={{
          y: -8,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 10
          }
        }} onHoverStart={() => setHoveredCard('transformation')} onHoverEnd={() => setHoveredCard(null)} className={`relative sm:col-span-2 lg:col-span-1 ${highlightedTierId === 'transformation' ? 'lg:scale-105 lg:z-10' : ''}`}>
            <div className="absolute -top-3 sm:-top-4 left-0 right-0 flex justify-center">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${styles.popularBadgeBg} ${styles.popularBadgeText}`}>
                {highlightedTierId === 'transformation' ? 'Le plus choisi' : 'Recommandé'}
              </div>
            </div>
            <Card variant={variant} className={`flex flex-col h-full p-4 sm:p-6 transition-all duration-300 ${hoveredCard === 'transformation' || highlightedTierId === 'transformation' && !hoveredCard ? `shadow-lg ${styles.cardShadow}` : 'shadow-md'}`}>
              <div className="flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`p-2 rounded-full ${styles.accentBg} mr-2 sm:mr-3 flex-shrink-0`}>
                    <RocketIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.accentColor}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-medium ${styles.headingColor}`}>
                    La Transformation
                  </h3>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-2xl sm:text-3xl font-bold ${styles.headingColor}`}>
                      19€
                    </span>
                    <span className={`ml-1 text-xs sm:text-sm ${styles.descriptionColor}`}>
                      /mois
                    </span>
                  </div>
                  <p className={`mt-1 sm:mt-2 text-sm ${styles.descriptionColor}`}>
                    La suite d'outils complète pour piloter votre succès.
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Fondations de "L'Étincelle" incluses.
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Maîtrise de l'Univers 1 (Construire) :
                      </span>{' '}
                      Itérations illimitées de CV et lettres.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Maîtrise de l'Univers 2 (Se préparer) :
                      </span>{' '}
                      Accès total au framework de coaching IA.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Intelligence Augmentée :
                      </span>{' '}
                      Feedback IA continu sur vos documents et cibles.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Tableau de Bord :</span>{' '}
                      Centralisation et suivi de votre pipeline de candidatures.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                {variant === 'prepare' && styles.customButtonStyle ? <button className={`w-full flex justify-center items-center text-sm sm:text-base py-2 sm:py-3 rounded-md transition-colors ${styles.customButtonStyle}`} onClick={() => handleSelectPlan('transformation')}>
                    Choisir La Transformation
                  </button> : <Button variant={styles.buttonVariant} className="w-full justify-center text-sm sm:text-base py-2 sm:py-3" onClick={() => handleSelectPlan('transformation')}>
                    Choisir La Transformation
                  </Button>}
              </div>
            </Card>
          </motion.div>
          {/* L'Agent */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0,
          scale: [null, highlightedTierId === 'agent' ? 1.05 : 1],
          zIndex: highlightedTierId === 'agent' ? 10 : 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} whileHover={{
          y: -5,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 10
          }
        }} onHoverStart={() => setHoveredCard('agent')} onHoverEnd={() => setHoveredCard(null)} className={`relative ${highlightedTierId === 'agent' ? 'lg:scale-105 lg:z-10 sm:col-span-2 lg:col-span-1' : ''}`}>
            {highlightedTierId === 'agent' && <div className="absolute -top-3 sm:-top-4 left-0 right-0 flex justify-center">
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${styles.popularBadgeBg} ${styles.popularBadgeText}`}>
                  Recommandé pour vous
                </div>
              </div>}
            <Card variant={variant} className={`flex flex-col h-full p-4 sm:p-6 transition-all duration-300 ${hoveredCard === 'agent' || highlightedTierId === 'agent' && !hoveredCard ? `shadow-lg ${styles.cardShadow}` : 'shadow-md'}`}>
              <div className="flex-1">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`p-2 rounded-full ${styles.accentBg} mr-2 sm:mr-3 flex-shrink-0`}>
                    <BriefcaseIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.accentColor}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-medium ${styles.headingColor}`}>
                    L'Agent
                  </h3>
                </div>
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-2xl sm:text-3xl font-bold ${styles.headingColor}`}>
                      79€
                    </span>
                    <span className={`ml-1 text-xs sm:text-sm ${styles.descriptionColor}`}>
                      /mois
                    </span>
                  </div>
                  <p className={`mt-1 sm:mt-2 text-sm ${styles.descriptionColor}`}>
                    Déléguez l'opérationnel. Ne vous concentrez que sur la
                    performance en entretien.
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Suite complète "La Transformation" incluse.
                      </span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Activation de l'Univers 3 (Agir) :
                      </span>{' '}
                      Déploiement de votre agent IA personnel.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Sourcing Autonome :</span>{' '}
                      Veille et identification d'opportunités par l'agent.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Exécution Déléguée :</span>{' '}
                      Génération et envoi des candidatures par l'agent.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">
                        Intelligence Ambiante :
                      </span>{' '}
                      Intégration à vos flux (Mail, LinkedIn) pour une détection
                      proactive.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-1 flex-shrink-0`}>
                      <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
                    </div>
                    <p className={`text-xs sm:text-sm ${styles.descriptionColor}`}>
                      <span className="font-medium">Reporting :</span> Analytics
                      de performance de l'activité de votre agent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <Button variant={styles.secondaryButtonVariant} className="w-full justify-center text-sm sm:text-base py-2 sm:py-3" onClick={() => handleSelectPlan('agent')}>
                  Activer mon Agent
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
        {/* Alternative Offer */}
        <motion.aside initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="max-w-2xl mx-auto px-2 sm:px-0">
          <Card variant={variant} className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h4 className={`font-medium text-sm sm:text-base ${styles.headingColor}`}>
                  Une approche sans abonnement ?
                </h4>
                <p className={`text-xs sm:text-sm mt-1 ${styles.descriptionColor}`}>
                  L'Impulsion : Accès perpétuel au créateur de CV (Univers 1).
                  25€ - Paiement unique.
                </p>
              </div>
              <motion.div whileHover={{
              x: 5
            }} transition={{
              type: 'spring',
              stiffness: 400,
              damping: 10
            }} className="flex justify-end">
                <button onClick={() => handleSelectPlan('impulsion')} className={`flex items-center text-sm font-medium ${styles.accentColor} mt-2 sm:mt-0`}>
                  <span>Découvrir cette option</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            </div>
          </Card>
        </motion.aside>
      </div>
    </div>;
};