import React, { useEffect, useState, Children } from 'react';
import { Button } from '../common/Button';
import { ChevronRightIcon, UserIcon, BriefcaseIcon, GraduationCapIcon, HeartIcon, CheckIcon, ArrowRightIcon, SparklesIcon, StarIcon, RocketIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EntryScreen } from '../build/EntryScreen';
export const Onboarding = ({
  onComplete,
  onImportCV,
  onCreateNew
}) => {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading time for initial animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  const steps = [{
    title: 'Bienvenue sur Apply',
    subtitle: "Transforme ta recherche d'emploi en voyage de découverte et d'accomplissement"
  }, {
    title: 'Qui es-tu ?',
    subtitle: 'Nous adapterons ton parcours selon ta situation'
  }, {
    title: "Ton potentiel t'attend",
    subtitle: "Apply va t'aider à le révéler et à le concrétiser"
  }, {
    title: 'Commençons par ton profil',
    subtitle: 'Choisissons le moyen le plus rapide de créer ton profil professionnel'
  }];
  const userTypes = [{
    id: 'student',
    icon: <GraduationCapIcon className="w-6 h-6" />,
    title: 'Étudiant',
    description: 'Je cherche un stage, une alternance ou mon premier emploi',
    personalization: "Nous t'aiderons à transformer tes expériences académiques en atouts professionnels."
  }, {
    id: 'professional',
    icon: <BriefcaseIcon className="w-6 h-6" />,
    title: 'Professionnel',
    description: "Je souhaite évoluer dans ma carrière ou changer d'entreprise",
    personalization: "Nous mettrons en valeur ton expertise et t'aiderons à te démarquer dans un marché compétitif."
  }, {
    id: 'career-change',
    icon: <HeartIcon className="w-6 h-6" />,
    title: 'En reconversion',
    description: "Je veux changer de métier ou de secteur d'activité",
    personalization: 'Apply te proposera des suggestions spécifiques pour mettre en avant tes compétences transférables.'
  }];
  const handleNext = () => {
    // Play sound effect
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };
  const selectUserType = type => {
    // Play selection sound
    const audio = new Audio('/sounds/soft-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
    setUserType(type);
    setTimeout(() => setStep(step + 1), 500);
  };
  const getProgressPercentage = () => {
    return Math.round(step / (steps.length - 1) * 100);
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
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut'
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      filter: ['drop-shadow(0 0 0px rgba(75, 184, 241, 0))', 'drop-shadow(0 0 8px rgba(75, 184, 241, 0.5))', 'drop-shadow(0 0 0px rgba(75, 184, 241, 0))'],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
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
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 15px -3px rgba(75, 184, 241, 0.2), 0 4px 6px -2px rgba(75, 184, 241, 0.1)',
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: '0 4px 6px -1px rgba(75, 184, 241, 0.1), 0 2px 4px -1px rgba(75, 184, 241, 0.06)',
      transition: {
        duration: 0.1
      }
    },
    initial: {
      scale: 1
    }
  };
  const progressVariants = {
    initial: {
      width: '0%'
    },
    animate: {
      width: `${getProgressPercentage()}%`,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <motion.div key="welcome" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center">
            <motion.div className="relative mb-8" variants={logoVariants} animate={['visible', 'pulse']}>
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                <motion.div className="absolute inset-0 rounded-full bg-blue-100/50" animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }} transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }} />
                <SparklesIcon className="w-12 h-12 text-global-cta" />
              </div>
            </motion.div>
            <motion.h2 className="text-3xl font-light mb-4 bg-gradient-to-r from-global-cta to-purple-500 bg-clip-text text-transparent" variants={itemVariants}>
              {steps[0].title}
            </motion.h2>
            <motion.p className="text-gray-600 mb-10 max-w-md" variants={itemVariants}>
              {steps[0].subtitle}
            </motion.p>
            <motion.div className="w-full max-w-sm" variants={itemVariants}>
              <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                <Button onClick={handleNext} size="large" className="w-full flex items-center justify-center group">
                  <span>Continuer</span>
                  <motion.div className="ml-2" animate={{
                  x: [0, 5, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}>
                    <ArrowRightIcon className="w-5 h-5" />
                  </motion.div>
                  <motion.span className="absolute inset-0 rounded-lg bg-white/20" initial={{
                  scale: 0,
                  opacity: 0
                }} whileHover={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.3
                  }
                }} />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>;
      case 1:
        return <motion.div key="profile" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
            <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
              {steps[1].title}
            </motion.h2>
            <motion.p className="text-gray-600 mb-8 text-center" variants={itemVariants}>
              {steps[1].subtitle}
            </motion.p>
            <motion.div className="space-y-4 mb-6" variants={itemVariants}>
              {userTypes.map((type, index) => <motion.div key={type.id} custom={index} variants={cardVariants} whileHover="hover" whileTap="tap" animate={userType === type.id ? 'selected' : 'visible'} onClick={() => selectUserType(type.id)} className={`p-5 border rounded-xl flex items-center cursor-pointer transition-all relative overflow-hidden
                    ${userType === type.id ? 'border-global-cta' : 'border-gray-200'}`}>
                  <div className={`p-3 rounded-full mr-4 ${userType === type.id ? 'bg-blue-100 text-global-cta' : 'bg-gray-100 text-gray-700'}`}>
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${userType === type.id ? 'text-global-cta' : 'text-gray-900'}`}>
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {type.description}
                    </p>
                  </div>
                  {userType === type.id && <motion.div className="absolute top-3 right-3 bg-global-cta text-white rounded-full p-1" variants={checkVariants} initial="hidden" animate="visible">
                      <CheckIcon className="w-4 h-4" />
                    </motion.div>}
                  {/* Subtle background animation on hover/selected */}
                  {userType === type.id && <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/80 to-blue-50/0 z-0" animate={{
                x: ['-100%', '100%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'linear'
              }} />}
                </motion.div>)}
            </motion.div>
          </motion.div>;
      case 2:
        return <motion.div key="confirmation" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center text-center">
            <motion.div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 relative" variants={itemVariants}>
              <motion.div className="absolute inset-0 rounded-full border-4 border-blue-200" animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.3, 0.7]
            }} transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse'
            }} />
              <UserIcon className="w-12 h-12 text-global-cta" />
              <motion.div className="absolute -right-2 -bottom-2 bg-green-100 rounded-full p-2 border-2 border-white" initial={{
              scale: 0,
              rotate: -45
            }} animate={{
              scale: 1,
              rotate: 0
            }} transition={{
              type: 'spring',
              stiffness: 500,
              damping: 15,
              delay: 0.5
            }}>
                <CheckIcon className="w-4 h-4 text-green-600" />
              </motion.div>
            </motion.div>
            <motion.h2 className="text-2xl font-medium mb-4" variants={itemVariants}>
              {steps[2].title}
            </motion.h2>
            <motion.p className="text-gray-700 mb-5" variants={itemVariants}>
              Nous avons compris ta situation et tes besoins.
            </motion.p>
            {userType && <motion.div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-md" variants={itemVariants} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.5
            }
          }}>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-1.5 rounded-full text-global-cta mr-3 mt-0.5">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-blue-800">
                      {userTypes.find(t => t.id === userType)?.personalization}
                    </p>
                  </div>
                </div>
              </motion.div>}
            <motion.p className="text-gray-700 mb-8" variants={itemVariants}>
              Apply va te guider pas à pas pour révéler ton potentiel et
              transformer ta recherche d'emploi en succès.
            </motion.p>
            <motion.div className="w-full max-w-sm" variants={itemVariants}>
              <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
                <Button onClick={handleNext} size="large" className="w-full flex items-center justify-center group">
                  <span>Continuer</span>
                  <motion.div className="ml-2" animate={{
                  rotate: [0, 15, 0, -15, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 1
                }}>
                    <RocketIcon className="w-5 h-5" />
                  </motion.div>
                  <motion.span className="absolute inset-0 rounded-lg bg-white/20" initial={{
                  scale: 0,
                  opacity: 0
                }} whileHover={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 0.3
                  }
                }} />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>;
      case 3:
        return <motion.div key="profile-creation" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
            <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
              {steps[3].title}
            </motion.h2>
            <motion.p className="text-gray-600 mb-8 text-center" variants={itemVariants}>
              {steps[3].subtitle}
            </motion.p>
            <motion.div className="space-y-4 mb-6" variants={itemVariants}>
              <EntryScreen onImport={onImportCV} onCreateNew={onCreateNew} />
            </motion.div>
          </motion.div>;
      default:
        return null;
    }
  };
  return <AnimatePresence>
      {isLoading ? <motion.div key="loading" className="min-h-screen flex flex-col items-center justify-center bg-cream p-6" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }}>
          <motion.div className="w-16 h-16 relative" animate={{
        rotate: 360
      }} transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}>
            <motion.div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-global-cta" />
          </motion.div>
        </motion.div> : <motion.div key="onboarding" className="min-h-screen flex flex-col bg-gradient-to-br from-cream to-gray-50" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5
    }}>
          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-1.5">
            <motion.div className="h-full bg-global-cta relative" variants={progressVariants} initial="initial" animate="animate">
              <motion.div className="absolute inset-0 bg-white/30" animate={{
            x: ['-100%', '100%']
          }} transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }} />
            </motion.div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 max-w-xl mx-auto">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </div>
          {/* Step indicators */}
          <div className="pb-8 flex justify-center">
            <div className="flex space-x-2">
              {steps.map((_, index) => <motion.div key={index} className={`w-2 h-2 rounded-full ${step === index ? 'bg-global-cta' : 'bg-gray-300'}`} animate={{
            scale: step === index ? [1, 1.3, 1] : 1
          }} transition={{
            duration: 1,
            repeat: step === index ? Infinity : 0,
            repeatType: 'reverse'
          }} />)}
            </div>
          </div>
        </motion.div>}
    </AnimatePresence>;
};