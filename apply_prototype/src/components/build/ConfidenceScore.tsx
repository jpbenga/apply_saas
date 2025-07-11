import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { BarChartIcon, TrendingUpIcon, StarIcon, ShieldIcon, ArrowRightIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
export const ConfidenceScore = ({
  score,
  completedSections,
  totalSections
}) => {
  const [prevScore, setPrevScore] = useState(score);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [showCta, setShowCta] = useState(false);
  useEffect(() => {
    if (score > prevScore) {
      setIsIncreasing(true);
      // Play score increase sound
      const audio = new Audio('/sounds/score-up.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      setTimeout(() => {
        setIsIncreasing(false);
      }, 2000);
    }
    setPrevScore(score);
    // Show CTA after 60% completion
    if (score >= 60 && !showCta) {
      setShowCta(true);
    }
  }, [score]);
  const getConfidenceMessage = () => {
    if (score < 30) return 'Votre CV commence à prendre forme';
    if (score < 50) return 'Vous gagnez en clarté et en impact';
    if (score < 70) return 'Votre profil inspire confiance';
    if (score < 90) return 'Votre CV est très convaincant';
    return 'Votre CV est excellent, prêt à impressionner';
  };
  const getEmotionalMessage = () => {
    if (score < 30) return 'Tu gagnes en assurance';
    if (score < 50) return 'Cette section te donne de la légitimité';
    if (score < 70) return 'Ton profil devient cohérent';
    if (score < 90) return 'Ta valeur professionnelle est claire';
    return 'Tu as créé un profil remarquable';
  };
  const getConfidenceColor = () => {
    if (score < 30) return 'text-gray-600';
    if (score < 50) return 'text-amber-600';
    if (score < 70) return 'text-amber-700';
    if (score < 90) return 'text-green-600';
    return 'text-green-700';
  };
  const getProgressDetails = () => {
    const remaining = totalSections - completedSections;
    if (remaining === 0) return 'Toutes les sections sont complétées';
    if (remaining === 1) return "Plus qu'une section à compléter";
    return `${remaining} sections restantes à compléter`;
  };
  const scoreVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      backgroundColor: ['rgba(251, 191, 36, 0.2)', 'rgba(251, 191, 36, 0.4)', 'rgba(251, 191, 36, 0.2)'],
      transition: {
        duration: 1.5,
        repeat: 0
      }
    }
  };
  const progressVariants = {
    initial: {
      width: `${prevScore}%`
    },
    animate: {
      width: `${score}%`,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    }
  };
  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      height: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.4
      }
    }
  };
  return <Card variant="build" className="p-5 border-amber-200 overflow-hidden relative">
      <motion.div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-100/20 rounded-full" animate={{
      scale: [1, 1.1, 1],
      opacity: [0.2, 0.1, 0.2]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse'
    }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 className="font-medium text-amber-900 flex items-center" whileHover={{
          x: 3
        }} transition={{
          type: 'spring',
          stiffness: 300
        }}>
            <BarChartIcon className="w-4 h-4 mr-2" />
            Score de confiance
          </motion.h3>
          <motion.div className="bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded-full" variants={scoreVariants} animate={isIncreasing ? 'pulse' : 'initial'}>
            {score}%
          </motion.div>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full mb-3 overflow-hidden">
          <motion.div className="h-3 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 relative" variants={progressVariants} initial="initial" animate="animate">
            {isIncreasing && <motion.div className="absolute inset-0 bg-white" initial={{
            opacity: 0.5
          }} animate={{
            opacity: [0.5, 0, 0.5, 0],
            x: ['0%', '100%']
          }} transition={{
            duration: 1
          }} />}
          </motion.div>
        </div>
        <motion.p className={`text-sm mb-4 font-medium ${getConfidenceColor()}`} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} key={getConfidenceMessage()} transition={{
        duration: 0.5
      }}>
          {getConfidenceMessage()}
        </motion.p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <TrendingUpIcon className="w-4 h-4 mr-2" />
              <span>Progression</span>
            </div>
            <motion.span className="text-amber-700" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} key={getProgressDetails()} transition={{
            duration: 0.5
          }}>
              {getProgressDetails()}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <StarIcon className="w-4 h-4 mr-2" />
              <span>Impact visuel</span>
            </div>
            <motion.span className="text-amber-700" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} key={score < 50 ? 'Moyen' : score < 80 ? 'Bon' : 'Excellent'} transition={{
            duration: 0.5
          }}>
              {score < 50 ? 'Moyen' : score < 80 ? 'Bon' : 'Excellent'}
            </motion.span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <ShieldIcon className="w-4 h-4 mr-2" />
              <span>Compatibilité ATS</span>
            </div>
            <motion.span className="text-amber-700" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} key={score < 40 ? 'À améliorer' : score < 70 ? 'Bonne' : 'Excellente'} transition={{
            duration: 0.5
          }}>
              {score < 40 ? 'À améliorer' : score < 70 ? 'Bonne' : 'Excellente'}
            </motion.span>
          </div>
        </div>
        <motion.div className="mt-4 pt-3 border-t border-amber-100" whileHover={{
        scale: 1.01,
        x: 3
      }} transition={{
        type: 'spring',
        stiffness: 300
      }}>
          <p className="text-xs text-gray-600 italic">
            "{getEmotionalMessage()}. Continue sur cette lancée !"
          </p>
        </motion.div>
        <AnimatePresence>
          {showCta && <motion.div className="mt-4" variants={ctaVariants} initial="hidden" animate="visible" exit="hidden">
              <Button variant="build" className="w-full flex items-center justify-center group">
                <span>Passer à l'étape suivante</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                <motion.span className="absolute inset-0 bg-amber-400/20 rounded-lg" initial={{
              scale: 0,
              opacity: 0
            }} whileHover={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} />
              </Button>
            </motion.div>}
        </AnimatePresence>
      </div>
    </Card>;
};