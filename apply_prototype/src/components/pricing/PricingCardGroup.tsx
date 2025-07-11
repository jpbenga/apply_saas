import React from 'react';
import { PricingCard, PricingCardProps } from './PricingCard';
import { motion } from 'framer-motion';
type PricingCardGroupProps = {
  plans: Omit<PricingCardProps, 'onClick'>[];
  variant?: 'build' | 'prepare' | 'act';
  onSelectPlan: (planId: string) => void;
  currentPlanId?: string;
  className?: string;
};
export const PricingCardGroup: React.FC<PricingCardGroupProps> = ({
  plans,
  variant = 'build',
  onSelectPlan,
  currentPlanId,
  className = ''
}) => {
  return <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {plans.map((plan, index) => {
      const isCurrentPlan = currentPlanId === plan.name.toLowerCase();
      return <motion.div key={plan.name} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.1 * index
      }} className={`${plan.recommended ? 'md:scale-105 md:z-10' : ''}`}>
            <PricingCard {...plan} variant={variant} isCurrentPlan={isCurrentPlan} onClick={() => onSelectPlan(plan.name.toLowerCase())} />
          </motion.div>;
    })}
    </div>;
};