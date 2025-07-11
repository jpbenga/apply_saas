import React, { useEffect, useState, Children } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from './steps/WelcomeStep';
import { ProfileStep } from './steps/ProfileStep';
import { UniversesStep } from './steps/UniversesStep';
import { FirstActionStep } from './steps/FirstActionStep';
import { ActivationStep } from './steps/ActivationStep';
import { ProgressBar } from './ProgressBar';
import { ContextualHelp } from './ContextualHelp';
import { useUser } from '../../context/UserContext';
export const NewOnboarding = ({
  onComplete,
  onImportCV,
  onCreateNew
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    objective: null,
    autonomy: null,
    sector: null,
    experience: null // 'student', 'junior', 'senior'
  });
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [skipToAction, setSkipToAction] = useState(false);
  const {
    setSubscriptionTier
  } = useUser();
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  const totalSteps = 5;
  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      // Play transition sound
      const audio = new Audio('/sounds/soft-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    } else {
      handleComplete();
    }
  };
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const updateUserProfile = (key, value) => {
    setUserProfile({
      ...userProfile,
      [key]: value
    });
  };
  const selectUniverse = universe => {
    setSelectedUniverse(universe);
    if (skipToAction) {
      // Skip directly to the action step when coming from a previous step
      setCurrentStep(3);
    }
  };
  const handleComplete = () => {
    // Finalize onboarding and pass data to parent
    onComplete(userProfile, selectedUniverse);
  };
  const handleFirstAction = action => {
    // Handle first high-value action
    switch (action) {
      case 'import-cv':
        onImportCV();
        break;
      case 'create-cv':
        onCreateNew();
        break;
      case 'pitch-practice':
        // Navigate to pitch practice in Prepare universe
        onComplete(userProfile, 'prepare', 'pitch-practice');
        break;
      case 'interview-prep':
        // Navigate to interview prep in Prepare universe
        onComplete(userProfile, 'prepare', 'interview-prep');
        break;
      case 'job-scan':
        // Navigate to job scan in Act universe
        onComplete(userProfile, 'act', 'job-scan');
        break;
      case 'autopilot':
        // Navigate to autopilot in Act universe
        onComplete(userProfile, 'act', 'autopilot');
        break;
      default:
        goToNextStep();
    }
  };
  // Go back to universe selection from the action step
  const handleBackToUniverses = () => {
    setSkipToAction(true);
    setCurrentStep(2);
  };
  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };
  // Determine which step to render
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onContinue={goToNextStep} />;
      case 1:
        return <ProfileStep userProfile={userProfile} updateProfile={updateUserProfile} onContinue={goToNextStep} onBack={goToPrevStep} />;
      case 2:
        return <UniversesStep userProfile={userProfile} selectedUniverse={selectedUniverse} onSelectUniverse={selectUniverse} onContinue={goToNextStep} onBack={goToPrevStep} />;
      case 3:
        return <FirstActionStep userProfile={userProfile} selectedUniverse={selectedUniverse} onActionSelect={handleFirstAction} onBack={handleBackToUniverses} />;
      case 4:
        return <ActivationStep userProfile={userProfile} selectedUniverse={selectedUniverse} onComplete={handleComplete} onBack={goToPrevStep} />;
      default:
        return null;
    }
  };
  if (isLoading) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <motion.div className="w-16 h-16 relative" animate={{
        rotate: 360
      }} transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}>
          <motion.div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-global-cta" />
        </motion.div>
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Contextual help button */}
      <ContextualHelp isOpen={showHelp} onToggle={() => setShowHelp(!showHelp)} currentStep={currentStep} userProfile={userProfile} />
    </div>;
};