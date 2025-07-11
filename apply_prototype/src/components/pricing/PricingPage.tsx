import React, { useState } from 'react';
import { PricingMatrix } from './PricingMatrix';
import { PaymentScreen } from '../payment/PaymentScreen';
import { SuccessScreen } from '../payment/SuccessScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { ArrowLeftIcon } from 'lucide-react';
type PricingPageProps = {
  onBack: () => void;
  variant?: 'build' | 'prepare' | 'act';
};
export const PricingPage: React.FC<PricingPageProps> = ({
  onBack,
  variant = 'build'
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const handleSelectPlan = (plan: string) => {
    if (plan === 'etincelle') {
      // Free plan - no payment needed
      onBack();
      return;
    }
    setSelectedPlan(plan);
    setShowPayment(true);
  };
  const handlePaymentComplete = () => {
    setShowPayment(false);
    setShowSuccess(true);
  };
  const handleSuccessContinue = () => {
    setShowSuccess(false);
    onBack();
  };
  return <div className="min-h-screen flex flex-col">
      <header className={`p-4 ${variant === 'act' ? 'bg-gradient-to-br from-[#1A0E21] to-[#120818]' : variant === 'prepare' ? 'bg-gradient-to-br from-[#0D1B2A] to-[#102135]' : 'bg-build-bg'}`}>
        <div className="max-w-7xl mx-auto flex items-center">
          <Button variant={variant === 'act' || variant === 'prepare' ? 'secondary' : 'secondary'} size="small" className={`flex items-center ${variant === 'act' ? 'bg-[#1E0F24] text-white border-[#CBA6F7]/30 hover:bg-[#CBA6F7]/10' : variant === 'prepare' ? 'bg-[#11263B] text-white border-[#7FB3D5]/30 hover:bg-[#7FB3D5]/10' : ''}`} onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Retour
          </Button>
          <h1 className={`ml-4 text-xl font-medium ${variant === 'act' || variant === 'prepare' ? 'text-white' : 'text-build-text'}`}>
            Choisir votre offre Apply
          </h1>
        </div>
      </header>
      <main className="flex-1">
        <PricingMatrix onSelectPlan={handleSelectPlan} variant={variant} />
      </main>
      {/* Payment Screen */}
      <AnimatePresence>
        {showPayment && <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}>
              <PaymentScreen onComplete={handlePaymentComplete} onBack={() => setShowPayment(false)} selectedPlan={selectedPlan || 'transformation'} variant={variant} />
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      {/* Success Screen */}
      <AnimatePresence>
        {showSuccess && <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <SuccessScreen onContinue={handleSuccessContinue} onExplore={handleSuccessContinue} selectedPlan={selectedPlan || 'transformation'} variant={variant} />
          </motion.div>}
      </AnimatePresence>
    </div>;
};