import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { SparklesIcon, ArrowRightIcon, LockIcon } from 'lucide-react';
type PricingTriggerProps = {
  variant?: 'build' | 'prepare' | 'act';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  modalTitle: string;
  modalSubtitle: string;
  modalDescription: string;
  modalCtaText: string;
  onContinueFree: () => void;
  onUpgrade: () => void;
  highlightedTierId?: string;
};
export const PricingTrigger: React.FC<PricingTriggerProps> = ({
  variant = 'act',
  title,
  subtitle,
  description,
  ctaText,
  modalTitle,
  modalSubtitle,
  modalDescription,
  modalCtaText,
  onContinueFree,
  onUpgrade,
  highlightedTierId = 'pro'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'build':
        return {
          bgGradient: 'from-build-accent/20 to-build-accent/5',
          buttonVariant: 'build',
          accentColor: 'text-build-accent',
          borderColor: 'border-build-accent/30'
        };
      case 'prepare':
        return {
          bgGradient: 'from-[#0D1B2A] to-[#102135]',
          buttonVariant: 'prepare',
          accentColor: 'text-[#7FB3D5]',
          borderColor: 'border-[#7FB3D5]/30'
        };
      case 'act':
        return {
          bgGradient: 'from-[#1A0E21] to-[#120818]',
          buttonVariant: 'act',
          accentColor: 'text-[#CBA6F7]',
          borderColor: 'border-[#CBA6F7]/30'
        };
      default:
        return {
          bgGradient: 'from-purple-500/20 to-purple-500/5',
          buttonVariant: 'primary',
          accentColor: 'text-purple-500',
          borderColor: 'border-purple-500/30'
        };
    }
  };
  const styles = getVariantStyles();
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <Card variant={variant} className={`p-5 bg-gradient-to-br ${styles.bgGradient} ${styles.borderColor}`}>
        <div className="flex items-start">
          <div className="p-2 bg-gray-800/50 rounded-full mr-3 flex-shrink-0">
            <SparklesIcon className={`w-5 h-5 ${styles.accentColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300 font-medium mb-2">{subtitle}</p>
            <p className="text-sm text-gray-400 mb-4">{description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <motion.div whileHover={{
              scale: 1.03
            }} whileTap={{
              scale: 0.97
            }}>
                <Button variant={styles.buttonVariant} className="w-full sm:w-auto flex items-center justify-center" onClick={onUpgrade}>
                  <LockIcon className="w-4 h-4 mr-2" />
                  <span>{ctaText}</span>
                </Button>
              </motion.div>
              <motion.button className="text-sm text-gray-400 hover:text-white flex items-center justify-center" whileHover={{
              x: 3
            }} onClick={onContinueFree}>
                <span>Continuer sans autopilot</span>
                <ArrowRightIcon className="w-3 h-3 ml-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>;
};