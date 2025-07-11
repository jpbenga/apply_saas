import React, { useEffect, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckCircleIcon, RocketIcon, SparklesIcon, StarIcon, BoltIcon, BarChartIcon, ArrowRightIcon, LayoutGridIcon } from 'lucide-react';
export const SuccessScreen = ({
  onContinue,
  onExplore,
  selectedPlan = 'pro',
  variant = 'act'
}) => {
  useEffect(() => {
    // Play success sound on mount
    const audio = new Audio('/sounds/section-complete.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 100]);
    }
  }, []);
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          bgGradient: 'bg-gradient-to-r from-cream to-build-bg',
          borderColor: 'border-build-ui',
          textColor: 'text-build-text',
          accentColor: 'text-build-cta',
          checkColor: 'text-amber-500',
          primaryButton: 'bg-build-cta hover:bg-build-cta/90 text-white',
          secondaryButton: 'bg-white border border-build-ui text-build-text hover:bg-gray-50',
          glowColor: 'from-amber-200/20 via-amber-400/20 to-amber-200/20'
        };
      case 'prepare':
        return {
          bgGradient: 'bg-gradient-to-r from-prepare-bg to-prepare-bg/90',
          borderColor: 'border-prepare-accent/30',
          textColor: 'text-prepare-text',
          accentColor: 'text-prepare-accent',
          checkColor: 'text-prepare-accent',
          primaryButton: 'bg-prepare-accent hover:bg-prepare-accent/90 text-white',
          secondaryButton: 'bg-prepare-bg/50 border border-prepare-accent/30 text-prepare-text hover:bg-prepare-bg/70',
          glowColor: 'from-prepare-accent/0 via-prepare-accent/20 to-prepare-accent/0'
        };
      case 'act':
        return {
          bgGradient: 'bg-gradient-to-r from-act-bg to-act-bg/90',
          borderColor: 'border-act-accent/30',
          textColor: 'text-white',
          accentColor: 'text-act-accent',
          checkColor: 'text-green-400',
          primaryButton: 'bg-act-cta hover:bg-act-cta/90 text-act-bg',
          secondaryButton: 'bg-act-bg/50 border border-act-accent/30 text-white hover:bg-act-bg/70',
          glowColor: 'from-act-accent/0 via-act-accent/20 to-act-accent/0'
        };
      default:
        return {
          bgGradient: 'bg-white',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          accentColor: 'text-global-cta',
          checkColor: 'text-green-500',
          primaryButton: 'bg-global-cta hover:bg-global-cta/90 text-white',
          secondaryButton: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
          glowColor: 'from-blue-200/20 via-blue-400/20 to-blue-200/20'
        };
    }
  };
  const styles = getVariantStyles();
  const getPlanIcon = () => {
    switch (selectedPlan) {
      case 'starter':
        return <RocketIcon className="w-8 h-8" />;
      case 'pro':
        return <SparklesIcon className="w-8 h-8" />;
      case 'premium':
        return <StarIcon className="w-8 h-8" />;
      default:
        return <SparklesIcon className="w-8 h-8" />;
    }
  };
  const getPlanName = () => {
    switch (selectedPlan) {
      case 'starter':
        return 'Starter';
      case 'pro':
        return 'Pro';
      case 'premium':
        return 'Premium';
      default:
        return 'Pro';
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const checkVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
        delay: 0.2
      }
    }
  };
  return <motion.div className={`w-full max-w-md mx-auto rounded-xl shadow-lg ${styles.bgGradient} border ${styles.borderColor} p-6 overflow-hidden relative`} variants={containerVariants} initial="hidden" animate="visible">
      {/* Background glow effect */}
      <motion.div className={`absolute inset-0 bg-gradient-to-r ${styles.glowColor} opacity-50`} animate={{
      x: ['-100%', '100%']
    }} transition={{
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 8
    }} />
      {/* Success icon */}
      <motion.div className="flex justify-center mb-6 relative z-10" initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: 'spring',
      stiffness: 400,
      damping: 10,
      delay: 0.2
    }}>
        <div className={`w-20 h-20 rounded-full bg-black/10 flex items-center justify-center relative`}>
          <motion.div className="absolute inset-0 rounded-full border-4 border-green-500" initial={{
          pathLength: 0
        }} animate={{
          pathLength: 1
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} />
          <div className={`w-16 h-16 rounded-full ${styles.accentColor} bg-black/20 flex items-center justify-center`}>
            {getPlanIcon()}
          </div>
        </div>
      </motion.div>
      {/* Success message */}
      <motion.div className="text-center mb-8 relative z-10" variants={itemVariants}>
        <h2 className={`text-2xl font-bold mb-2 ${styles.textColor}`}>
          Bienvenue dans Apply {getPlanName()} 🎉
        </h2>
        <p className={`${variant === 'act' ? 'text-gray-300' : 'text-gray-600'}`}>
          Tes outils avancés sont maintenant débloqués. Tu es prêt à maximiser
          tes chances.
        </p>
      </motion.div>
      {/* Features list */}
      <motion.div className="space-y-3 mb-8 relative z-10">
        <h3 className={`font-medium mb-2 ${styles.textColor}`}>
          Avantages déverrouillés :
        </h3>
        <motion.div className="flex items-start" variants={itemVariants}>
          <motion.div className={`p-1 rounded-full ${styles.checkColor} mr-3 mt-0.5`} variants={checkVariants}>
            <CheckCircleIcon className="w-4 h-4" />
          </motion.div>
          <div>
            <p className={`font-medium ${styles.textColor}`}>CV illimités</p>
            <p className={`text-sm ${variant === 'act' ? 'text-gray-400' : 'text-gray-500'}`}>
              Crée autant de versions que tu veux pour chaque offre
            </p>
          </div>
        </motion.div>
        <motion.div className="flex items-start" variants={itemVariants}>
          <motion.div className={`p-1 rounded-full ${styles.checkColor} mr-3 mt-0.5`} variants={checkVariants}>
            <CheckCircleIcon className="w-4 h-4" />
          </motion.div>
          <div>
            <p className={`font-medium ${styles.textColor}`}>
              Lettres IA avancées
            </p>
            <p className={`text-sm ${variant === 'act' ? 'text-gray-400' : 'text-gray-500'}`}>
              Génération personnalisée pour chaque entreprise
            </p>
          </div>
        </motion.div>
        <motion.div className="flex items-start" variants={itemVariants}>
          <motion.div className={`p-1 rounded-full ${styles.checkColor} mr-3 mt-0.5`} variants={checkVariants}>
            <CheckCircleIcon className="w-4 h-4" />
          </motion.div>
          <div>
            <p className={`font-medium ${styles.textColor}`}>
              Coaching complet avec feedback émotionnel
            </p>
            <p className={`text-sm ${variant === 'act' ? 'text-gray-400' : 'text-gray-500'}`}>
              Préparation aux entretiens et conseils personnalisés
            </p>
          </div>
        </motion.div>
        <motion.div className="flex items-start" variants={itemVariants}>
          <motion.div className={`p-1 rounded-full ${styles.checkColor} mr-3 mt-0.5`} variants={checkVariants}>
            <CheckCircleIcon className="w-4 h-4" />
          </motion.div>
          <div>
            <p className={`font-medium ${styles.textColor}`}>
              AutoPilot illimité + relances automatiques
            </p>
            <p className={`text-sm ${variant === 'act' ? 'text-gray-400' : 'text-gray-500'}`}>
              Apply postule et relance pour toi en continu
            </p>
          </div>
        </motion.div>
        <motion.div className="flex items-start" variants={itemVariants}>
          <motion.div className={`p-1 rounded-full ${styles.checkColor} mr-3 mt-0.5`} variants={checkVariants}>
            <CheckCircleIcon className="w-4 h-4" />
          </motion.div>
          <div>
            <p className={`font-medium ${styles.textColor}`}>
              Tracking intelligent des candidatures
            </p>
            <p className={`text-sm ${variant === 'act' ? 'text-gray-400' : 'text-gray-500'}`}>
              Suivi détaillé et statistiques de progression
            </p>
          </div>
        </motion.div>
      </motion.div>
      {/* Action buttons */}
      <motion.div className="flex flex-col gap-3 relative z-10" variants={itemVariants}>
        <motion.div whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <Button className="w-full" variant={variant} onClick={onContinue}>
            <div className="flex items-center justify-center">
              <BoltIcon className="w-5 h-5 mr-2" />
              <span>Retourner à l'offre pour postuler</span>
              <motion.div className="ml-2" animate={{
              x: [0, 5, 0]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}>
                <ArrowRightIcon className="w-5 h-5" />
              </motion.div>
            </div>
          </Button>
        </motion.div>
        <motion.div whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          <Button variant="secondary" className="w-full" onClick={onExplore}>
            <div className="flex items-center justify-center">
              <LayoutGridIcon className="w-5 h-5 mr-2" />
              <span>Explorer mes nouveaux outils</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>
      {/* Toast notification */}
      <motion.div className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg border ${styles.borderColor} ${styles.bgGradient} z-50 max-w-xs`} initial={{
      opacity: 0,
      y: 50,
      x: 0
    }} animate={{
      opacity: 1,
      y: 0,
      x: 0
    }} transition={{
      delay: 1,
      duration: 0.5
    }}>
        <div className="flex items-start">
          <div className={`p-1.5 rounded-full bg-black/10 ${styles.accentColor} mr-3`}>
            <RocketIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`font-medium text-sm ${styles.textColor}`}>
              Ton AutoPilot est désormais actif
            </h4>
            <p className={`text-xs ${variant === 'act' ? 'text-gray-300' : 'text-gray-600'}`}>
              Apply postule pour toi en continu.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>;
};