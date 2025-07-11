import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { CheckIcon, SparklesIcon, StarIcon } from 'lucide-react';
export type PricingPlanBenefit = {
  text: string;
  highlighted?: boolean;
};
export type PricingCardProps = {
  name: string;
  price: string;
  description?: string;
  benefits: PricingPlanBenefit[] | string[];
  ctaText: string;
  variant?: 'build' | 'prepare' | 'act';
  recommended?: boolean;
  isCurrentPlan?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  iconComponent?: React.ReactNode;
};
export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  benefits,
  ctaText,
  variant = 'build',
  recommended = false,
  isCurrentPlan = false,
  disabled = false,
  onClick,
  className = '',
  iconComponent
}) => {
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
          cardBg: 'bg-[#11263B]',
          cardBorder: 'border-[#7FB3D5]/20',
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
  const cardClasses = `relative rounded-xl border p-6 transition-all duration-200 ${styles.cardBg} ${styles.cardBorder} ${styles.hoverBorder} ${className}`;
  const getIcon = () => {
    if (iconComponent) return iconComponent;
    switch (name.toLowerCase()) {
      case "l'étincelle":
        return <SparklesIcon className={`w-5 h-5 ${styles.accentTextColor}`} />;
      case 'la transformation':
        return <StarIcon className={`w-5 h-5 ${styles.accentTextColor}`} />;
      default:
        return <SparklesIcon className={`w-5 h-5 ${styles.accentTextColor}`} />;
    }
  };
  return <motion.div className={cardClasses} whileHover={!disabled ? {
    scale: 1.02,
    y: -5,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  } : {}}>
      {/* Recommended Badge */}
      {recommended && <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <motion.span initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.3
      }} className={`px-3 py-1 text-xs font-bold rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
            Recommandé
          </motion.span>
        </div>}
      {/* Current Plan Badge */}
      {isCurrentPlan && <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <motion.span initial={{
        scale: 0.8,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.3
      }} className={`px-3 py-1 text-xs font-bold rounded-full ${styles.currentBadgeBg} ${styles.currentBadgeText}`}>
            Plan actuel
          </motion.span>
        </div>}
      {/* Plan Name and Icon */}
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full ${styles.checkBg} mr-3`}>
          {getIcon()}
        </div>
        <h3 className={`text-xl font-semibold ${styles.textColor}`}>{name}</h3>
      </div>
      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold ${styles.textColor}`}>
            {price}
          </span>
          {price.includes('€/mois') && <span className={`ml-1 text-sm ${styles.descriptionColor}`}>
              {price.includes('0€') ? 'Pour toujours' : ''}
            </span>}
        </div>
        {description && <p className={`mt-2 text-sm ${styles.descriptionColor}`}>
            {description}
          </p>}
      </div>
      {/* Benefits */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => {
        const benefitText = typeof benefit === 'string' ? benefit : benefit.text;
        const isHighlighted = typeof benefit === 'object' && benefit.highlighted;
        return <div key={index} className="flex items-start">
              <div className={`p-1 rounded-full ${styles.checkBg} mr-2 mt-0.5 flex-shrink-0`}>
                <CheckIcon className={`w-3 h-3 ${styles.checkColor}`} />
              </div>
              <span className={`text-sm ${isHighlighted ? `font-medium ${styles.textColor}` : styles.descriptionColor}`}>
                {benefitText}
              </span>
            </div>;
      })}
      </div>
      {/* CTA Button */}
      <div className="mt-auto">
        <Button variant={styles.buttonVariant} className="w-full justify-center py-3 font-medium" onClick={onClick} disabled={disabled || isCurrentPlan}>
          {isCurrentPlan ? 'Votre plan actuel' : ctaText}
        </Button>
      </div>
    </motion.div>;
};