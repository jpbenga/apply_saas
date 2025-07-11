import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, BriefcaseIcon, GraduationCapIcon, LightbulbIcon, HeartIcon, ZapIcon, TargetIcon, UserIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
export const ProfileStep = ({
  userProfile,
  updateProfile,
  onContinue,
  onBack
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [attemptedContinue, setAttemptedContinue] = useState(false);
  const [highlightObjective, setHighlightObjective] = useState(false);
  const [highlightExperience, setHighlightExperience] = useState(false);
  const objectives = [{
    id: 'new-job',
    icon: <BriefcaseIcon className="w-6 h-6" />,
    title: 'Trouver un nouvel emploi',
    description: 'Je souhaite postuler à de nouvelles opportunités'
  }, {
    id: 'better-interviews',
    icon: <TargetIcon className="w-6 h-6" />,
    title: 'Réussir mes entretiens',
    description: 'Je décroche des entretiens mais je veux augmenter mon taux de succès'
  }, {
    id: 'career-change',
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'Changer de carrière',
    description: 'Je souhaite me reconvertir dans un nouveau domaine'
  }];
  const experienceLevels = [{
    id: 'student',
    icon: <GraduationCapIcon className="w-6 h-6" />,
    title: 'Étudiant / Jeune diplômé',
    description: 'Je recherche un stage, une alternance ou mon premier emploi'
  }, {
    id: 'junior',
    icon: <ZapIcon className="w-6 h-6" />,
    title: 'Junior (1-5 ans)',
    description: "J'ai quelques années d'expérience professionnelle"
  }, {
    id: 'senior',
    icon: <LightbulbIcon className="w-6 h-6" />,
    title: 'Senior (5+ ans)',
    description: "J'ai une expérience significative dans mon domaine"
  }];
  // Effet pour animer les sections non complétées si l'utilisateur tente de continuer
  useEffect(() => {
    if (attemptedContinue) {
      if (!userProfile.objective) {
        setHighlightObjective(true);
        setTimeout(() => setHighlightObjective(false), 1500);
      }
      if (!userProfile.experience) {
        setHighlightExperience(true);
        setTimeout(() => setHighlightExperience(false), 1500);
      }
    }
  }, [attemptedContinue, userProfile.objective, userProfile.experience]);
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
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    }),
    selected: {
      scale: 1.03,
      boxShadow: '0 10px 25px -5px rgba(75, 184, 241, 0.4), 0 8px 10px -6px rgba(75, 184, 241, 0.2)',
      borderColor: '#4BB8F1',
      backgroundColor: '#EFF9FF',
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: {
        duration: 0.1
      }
    },
    highlight: {
      boxShadow: '0 0 0 3px rgba(75, 184, 241, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      scale: [1, 1.03, 1],
      transition: {
        duration: 0.5,
        repeat: 2
      }
    }
  };
  const sectionVariants = {
    highlight: {
      boxShadow: '0 0 0 2px rgba(75, 184, 241, 0.5)',
      scale: [1, 1.01, 1],
      transition: {
        duration: 0.5,
        repeat: 2
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
  const handleObjectiveSelect = objectiveId => {
    updateProfile('objective', objectiveId);
    // Play selection sound
    const audio = new Audio('/sounds/soft-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    setShowHelp(false);
  };
  const handleExperienceSelect = experienceId => {
    updateProfile('experience', experienceId);
    // Play selection sound
    const audio = new Audio('/sounds/soft-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    setShowHelp(false);
  };
  const handleContinueClick = () => {
    if (isReadyToContinue) {
      onContinue();
    } else {
      setAttemptedContinue(true);
      setShowHelp(true);
    }
  };
  const isReadyToContinue = userProfile.objective && userProfile.experience;
  const objectiveCompleted = !!userProfile.objective;
  const experienceCompleted = !!userProfile.experience;
  return <div className="w-full max-w-3xl mx-auto">
      <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
        Parlez-nous de vous
      </motion.h2>
      <motion.p className="text-gray-600 mb-6 text-center" variants={itemVariants}>
        Ces informations nous permettront de personnaliser votre expérience
      </motion.p>

      <AnimatePresence>
        {showHelp && <motion.div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} transition={{
        duration: 0.3
      }}>
            <div className="flex items-start">
              <AlertCircleIcon className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-blue-700">
                <span className="font-medium">Attention :</span> Vous devez
                faire <span className="font-bold">deux sélections</span> pour
                continuer - choisissez à la fois un objectif principal{' '}
                <span className="font-bold">et</span> votre niveau d'expérience.
              </p>
            </div>
          </motion.div>}
      </AnimatePresence>

      <motion.div className="space-y-8" variants={itemVariants}>
        {/* Objectif principal */}
        <motion.div className="space-y-4 rounded-xl p-5 border border-gray-100" animate={highlightObjective ? 'highlight' : ''} variants={sectionVariants}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-global-cta text-white mr-3 text-sm font-bold">
                1
              </div>
              <span>Quel est votre objectif principal ?</span>
              <span className="text-red-500 ml-1">*</span>
            </h3>
            {objectiveCompleted ? <div className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircleIcon className="w-5 h-5 mr-1" />
                <span>Complété</span>
              </div> : <div className="text-orange-500 text-sm font-medium">
                Sélection requise
              </div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {objectives.map((objective, index) => <motion.div key={objective.id} custom={index} variants={cardVariants} whileHover="hover" whileTap="tap" animate={userProfile.objective === objective.id ? 'selected' : 'visible'} onClick={() => handleObjectiveSelect(objective.id)}>
                <Card className={`cursor-pointer h-full transition-all relative overflow-hidden
                    ${userProfile.objective === objective.id ? 'border-global-cta' : 'border-gray-200'}`}>
                  <div className={`p-3 rounded-full mr-4 mb-3 inline-flex ${userProfile.objective === objective.id ? 'bg-blue-100 text-global-cta' : 'bg-gray-100 text-gray-700'}`}>
                    {objective.icon}
                  </div>
                  <h3 className={`font-medium ${userProfile.objective === objective.id ? 'text-global-cta' : 'text-gray-900'}`}>
                    {objective.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {objective.description}
                  </p>
                  {userProfile.objective === objective.id && <motion.div className="absolute top-3 right-3 bg-global-cta text-white rounded-full p-1" variants={checkVariants} initial="hidden" animate="visible">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>}
                </Card>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Niveau d'expérience */}
        <motion.div className="space-y-4 rounded-xl p-5 border border-gray-100" animate={highlightExperience ? 'highlight' : ''} variants={sectionVariants}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-global-cta text-white mr-3 text-sm font-bold">
                2
              </div>
              <span>Où en êtes-vous dans votre parcours professionnel ?</span>
              <span className="text-red-500 ml-1">*</span>
            </h3>
            {experienceCompleted ? <div className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircleIcon className="w-5 h-5 mr-1" />
                <span>Complété</span>
              </div> : <div className="text-orange-500 text-sm font-medium">
                Sélection requise
              </div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experienceLevels.map((level, index) => <motion.div key={level.id} custom={index} variants={cardVariants} whileHover="hover" whileTap="tap" animate={userProfile.experience === level.id ? 'selected' : 'visible'} onClick={() => handleExperienceSelect(level.id)}>
                <Card className={`cursor-pointer h-full transition-all relative overflow-hidden
                    ${userProfile.experience === level.id ? 'border-global-cta' : 'border-gray-200'}`}>
                  <div className={`p-3 rounded-full mr-4 mb-3 inline-flex ${userProfile.experience === level.id ? 'bg-blue-100 text-global-cta' : 'bg-gray-100 text-gray-700'}`}>
                    {level.icon}
                  </div>
                  <h3 className={`font-medium ${userProfile.experience === level.id ? 'text-global-cta' : 'text-gray-900'}`}>
                    {level.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {level.description}
                  </p>
                  {userProfile.experience === level.id && <motion.div className="absolute top-3 right-3 bg-global-cta text-white rounded-full p-1" variants={checkVariants} initial="hidden" animate="visible">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>}
                </Card>
              </motion.div>)}
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="flex justify-between mt-8" variants={itemVariants}>
        <Button variant="secondary" onClick={onBack} className="flex items-center">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={handleContinueClick} className={`flex items-center ${!isReadyToContinue ? 'relative' : ''}`}>
          Continuer
          <ChevronRightIcon className="w-4 h-4 ml-2" />
          {!isReadyToContinue && <motion.span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" animate={{
          scale: [1, 1.2, 1]
        }} transition={{
          duration: 1,
          repeat: Infinity
        }} />}
        </Button>
      </motion.div>

      <div className="text-center mt-4 text-sm text-gray-500">
        * Les deux sélections sont nécessaires pour continuer
      </div>
    </div>;
};