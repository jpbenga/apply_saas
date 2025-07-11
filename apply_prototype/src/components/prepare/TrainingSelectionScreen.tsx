import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, TargetIcon, BookOpenIcon, BriefcaseIcon, CheckIcon, ArrowRightIcon, LightbulbIcon, StarIcon, HeartIcon, BarChartIcon, ClockIcon, ZapIcon, SparklesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const TrainingSelectionScreen = ({
  onSelectTraining,
  userProfile
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedBackground, setAnimatedBackground] = useState({
    x: 50,
    y: 30
  });
  const [showTip, setShowTip] = useState(false);
  // Subtle background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBackground({
        x: 50 + Math.sin(Date.now() * 0.0001) * 20,
        y: 30 + Math.cos(Date.now() * 0.0001) * 15
      });
    }, 50);
    // Show tip after a delay
    const tipTimer = setTimeout(() => {
      setShowTip(true);
    }, 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(tipTimer);
    };
  }, []);
  // Play sound on selection
  const handleSelect = trainingType => {
    // Play transition sound
    try {
      const audio = new Audio('/sounds/prepare-transition.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    } catch (e) {
      console.warn('Failed to create audio:', e);
    }
    onSelectTraining(trainingType);
  };
  return <div className="space-y-8">
      {/* Welcome card */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }}>
        <Card variant="prepare" className="p-6 border-prepare-accent/30 bg-[#0E1B33] shadow-lg relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-20 z-0" style={{
          backgroundImage: `radial-gradient(circle at ${animatedBackground.x}% ${animatedBackground.y}%, rgba(98, 195, 201, 0.3) 0%, transparent 70%)`
        }} />
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-2xl font-light mb-3 text-white">
                Choisis ton mode d'entraînement
              </h2>
              <p className="text-prepare-text max-w-lg">
                Deux parcours complémentaires pour maximiser ton impact en
                entretien. Quelle compétence souhaites-tu développer aujourd'hui
                ?
              </p>
            </div>
            <div className="flex items-center justify-center text-xs text-prepare-text space-x-4 mb-2">
              <div className="flex items-center">
                <MicIcon className="w-3 h-3 mr-1 text-prepare-accent" />
                <span>Feedback audio</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <TargetIcon className="w-3 h-3 mr-1 text-prepare-highlight" />
                <span>Coaching personnalisé</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <StarIcon className="w-3 h-3 mr-1 text-yellow-400" />
                <span>Progression mesurable</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Training options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pitch training card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.1
      }} whileHover={{
        scale: 1.02
      }} onHoverStart={() => setHoveredCard('pitch')} onHoverEnd={() => setHoveredCard(null)}>
          <Card variant="prepare" className="p-6 border-prepare-accent/30 hover:border-prepare-accent/50 cursor-pointer transition-all duration-300 h-full relative overflow-hidden" onClick={() => handleSelect('pitch')}>
            {/* Hover effect */}
            {hoveredCard === 'pitch' && <motion.div className="absolute inset-0 bg-gradient-to-br from-prepare-accent/5 to-transparent z-0" initial={{
            opacity: 0
          }} animate={{
            opacity: [0, 0.2, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity
          }} />}
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <motion.div className="w-14 h-14 rounded-full bg-[#1E3A60] flex items-center justify-center mr-4 border border-prepare-accent/30" animate={hoveredCard === 'pitch' ? {
                boxShadow: ['0 0 0px rgba(98, 195, 201, 0)', '0 0 15px rgba(98, 195, 201, 0.5)', '0 0 0px rgba(98, 195, 201, 0)']
              } : {}} transition={{
                duration: 1.5,
                repeat: Infinity
              }}>
                  <MicIcon className="w-7 h-7 text-prepare-accent" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-medium text-white">
                    Pitch de présentation
                  </h3>
                  <p className="text-sm text-prepare-text">
                    Captive dès les premières secondes
                  </p>
                </div>
              </div>
              <p className="text-prepare-text mb-5">
                Développe un pitch percutant de 60 secondes qui met en valeur
                ton parcours et ta personnalité. Notre IA t'aide à structurer
                ton discours et à améliorer ton impact.
              </p>
              <div className="space-y-2 mb-6">
                {['Structure ton pitch en 4 temps forts', 'Enregistre-toi et reçois un feedback instantané', 'Améliore ton ton, rythme et clarté', 'Adapte ton pitch à différents contextes'].map((item, index) => <motion.div key={index} className="flex items-start" initial={{
                x: 0
              }} animate={hoveredCard === 'pitch' ? {
                x: 5
              } : {
                x: 0
              }} transition={{
                duration: 0.2,
                delay: index * 0.1
              }}>
                    <div className="p-1 rounded-full bg-prepare-accent/20 mr-2 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-prepare-accent" />
                    </div>
                    <span className="text-sm text-prepare-text">{item}</span>
                  </motion.div>)}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-prepare-text">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>15-20 minutes</span>
                </div>
                <motion.div variants={{
                initial: {
                  scale: 1
                },
                hover: {
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(98, 195, 201, 0.6)'
                }
              }} initial="initial" animate={hoveredCard === 'pitch' ? 'hover' : 'initial'} transition={{
                duration: 0.3,
                repeat: hoveredCard === 'pitch' ? Infinity : 0,
                repeatType: 'reverse'
              }}>
                  <Button variant="prepare" size="small" className="flex items-center">
                    <span>Commencer</span>
                    <motion.div animate={hoveredCard === 'pitch' ? {
                    x: [0, 5, 0]
                  } : {}} transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}>
                      <ArrowRightIcon className="w-3 h-3 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>
            {/* Tag */}
            <motion.div className="absolute top-3 right-3 bg-blue-900 text-prepare-accent text-xs px-2 py-1 rounded-full flex items-center" initial={{
            scale: 0
          }} animate={hoveredCard === 'pitch' ? {
            scale: 1
          } : {
            scale: 0
          }} transition={{
            duration: 0.3
          }}>
              <ZapIcon className="w-3 h-3 mr-1" />
              <span>Idéal pour débuter</span>
            </motion.div>
          </Card>
        </motion.div>

        {/* Job offer preparation card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.2
      }} whileHover={{
        scale: 1.02
      }} onHoverStart={() => setHoveredCard('jobOffer')} onHoverEnd={() => setHoveredCard(null)}>
          <Card variant="prepare" className="p-6 border-prepare-highlight/30 hover:border-prepare-highlight/50 cursor-pointer transition-all duration-300 h-full relative overflow-hidden" onClick={() => handleSelect('jobOffer')}>
            {/* Hover effect */}
            {hoveredCard === 'jobOffer' && <motion.div className="absolute inset-0 bg-gradient-to-br from-prepare-highlight/5 to-transparent z-0" initial={{
            opacity: 0
          }} animate={{
            opacity: [0, 0.2, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity
          }} />}
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <motion.div className="w-14 h-14 rounded-full bg-[#1E3A60] flex items-center justify-center mr-4 border border-prepare-highlight/30" animate={hoveredCard === 'jobOffer' ? {
                boxShadow: ['0 0 0px rgba(146, 155, 255, 0)', '0 0 15px rgba(146, 155, 255, 0.5)', '0 0 0px rgba(146, 155, 255, 0)']
              } : {}} transition={{
                duration: 1.5,
                repeat: Infinity
              }}>
                  <BriefcaseIcon className="w-7 h-7 text-prepare-highlight" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-medium text-white">
                    Simulation d'entretien
                  </h3>
                  <p className="text-sm text-prepare-text">
                    Préparation sur mesure pour ton offre
                  </p>
                </div>
              </div>
              <p className="text-prepare-text mb-5">
                Prépare-toi à un entretien spécifique en analysant une offre
                d'emploi réelle. Notre IA identifie les attentes clés et te pose
                des questions ciblées.
              </p>
              <div className="space-y-2 mb-6">
                {["Analyse des compétences recherchées dans l'offre", 'Questions personnalisées basées sur ton profil', 'Feedback détaillé sur tes réponses', "Suggestions d'amélioration concrètes"].map((item, index) => <motion.div key={index} className="flex items-start" initial={{
                x: 0
              }} animate={hoveredCard === 'jobOffer' ? {
                x: 5
              } : {
                x: 0
              }} transition={{
                duration: 0.2,
                delay: index * 0.1
              }}>
                    <div className="p-1 rounded-full bg-prepare-highlight/20 mr-2 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-prepare-highlight" />
                    </div>
                    <span className="text-sm text-prepare-text">{item}</span>
                  </motion.div>)}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-xs text-prepare-text">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>20-30 minutes</span>
                </div>
                <motion.div variants={{
                initial: {
                  scale: 1
                },
                hover: {
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(146, 155, 255, 0.6)'
                }
              }} initial="initial" animate={hoveredCard === 'jobOffer' ? 'hover' : 'initial'} transition={{
                duration: 0.3,
                repeat: hoveredCard === 'jobOffer' ? Infinity : 0,
                repeatType: 'reverse'
              }}>
                  <Button variant="prepare" size="small" className="flex items-center bg-prepare-highlight text-white hover:bg-prepare-highlight/90">
                    <span>Commencer</span>
                    <motion.div animate={hoveredCard === 'jobOffer' ? {
                    x: [0, 5, 0]
                  } : {}} transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}>
                      <ArrowRightIcon className="w-3 h-3 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>
            {/* Tag */}
            <motion.div className="absolute top-3 right-3 bg-blue-900 text-prepare-highlight text-xs px-2 py-1 rounded-full flex items-center" initial={{
            scale: 0
          }} animate={hoveredCard === 'jobOffer' ? {
            scale: 1
          } : {
            scale: 0
          }} transition={{
            duration: 0.3
          }}>
              <StarIcon className="w-3 h-3 mr-1" />
              <span>Préparation avancée</span>
            </motion.div>
          </Card>
        </motion.div>
      </div>

      {/* Tip card */}
      <AnimatePresence>
        {showTip && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.7
      }}>
            <Card variant="prepare" className="p-5 border-prepare-accent/20 relative overflow-hidden">
              {/* Subtle background animation */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-prepare-accent/5 to-blue-900/0 z-0" animate={{
            x: ['-100%', '200%']
          }} transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }} />
              <div className="flex items-start relative z-10">
                <motion.div className="p-2 bg-[#1E3A60] rounded-full mr-4 mt-1 border border-prepare-accent/20" animate={{
              scale: [1, 1.1, 1],
              boxShadow: ['0 0 0px rgba(98, 195, 201, 0)', '0 0 10px rgba(98, 195, 201, 0.3)', '0 0 0px rgba(98, 195, 201, 0)']
            }} transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse'
            }}>
                  <LightbulbIcon className="w-4 h-4 text-prepare-accent" />
                </motion.div>
                <div>
                  <h3 className="font-medium text-white mb-2">
                    Conseil personnalisé
                  </h3>
                  <p className="text-sm text-prepare-text">
                    Pour ton profil{' '}
                    <span className="text-lavender-200 font-medium">
                      {userProfile || 'Candidat'}
                    </span>
                    , nous recommandons de commencer par le pitch de
                    présentation pour renforcer ta confiance, puis d'enchaîner
                    avec une simulation d'entretien pour te mettre en situation
                    réelle.
                  </p>
                  <div className="mt-3 flex items-center text-xs text-prepare-text/70">
                    <HeartIcon className="w-3 h-3 mr-1 text-prepare-highlight" />
                    <span>
                      93% des recruteurs décident dans les 90 premières secondes
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export default TrainingSelectionScreen;