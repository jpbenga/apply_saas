import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, FileTextIcon, UploadIcon, MicIcon, ScanSearchIcon, RocketIcon, ArrowRightIcon, ZapIcon, BriefcaseIcon, CheckIcon, ClockIcon, LightbulbIcon } from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
export const FirstActionStep = ({
  userProfile,
  selectedUniverse,
  onActionSelect,
  onBack
}) => {
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    // Show hint after a delay
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Define actions based on selected universe
  const getActions = () => {
    switch (selectedUniverse) {
      case 'build':
        return [{
          id: 'import-cv',
          icon: <UploadIcon className="w-6 h-6" />,
          title: 'Importer mon CV existant',
          description: 'Analysez et optimisez votre CV actuel',
          benefit: 'Gagnez du temps en partant de votre CV existant',
          timeEstimate: '2 min',
          color: 'build'
        }, {
          id: 'create-cv',
          icon: <FileTextIcon className="w-6 h-6" />,
          title: 'Créer un nouveau CV',
          description: 'Créez un CV optimisé à partir de votre profil',
          benefit: 'Créez un CV optimisé pour les ATS dès le départ',
          timeEstimate: '5 min',
          color: 'build'
        }];
      case 'prepare':
        return [{
          id: 'pitch-practice',
          icon: <MicIcon className="w-6 h-6" />,
          title: "S'entraîner au pitch",
          description: 'Préparez votre présentation en 30 secondes',
          benefit: 'Captivez les recruteurs dès les premières secondes',
          timeEstimate: '3 min',
          color: 'prepare'
        }, {
          id: 'interview-prep',
          icon: <BriefcaseIcon className="w-6 h-6" />,
          title: 'Préparer un entretien',
          description: "Entraînez-vous avec une offre d'emploi spécifique",
          benefit: 'Recevez des questions personnalisées pour votre entretien',
          timeEstimate: '5 min',
          color: 'prepare'
        }];
      case 'act':
        return [{
          id: 'job-scan',
          icon: <ScanSearchIcon className="w-6 h-6" />,
          title: "Scanner une offre d'emploi",
          description: 'Analysez une offre et adaptez votre candidature',
          benefit: 'Optimisez votre candidature pour cette offre spécifique',
          timeEstimate: '2 min',
          color: 'act'
        }, {
          id: 'autopilot',
          icon: <ZapIcon className="w-6 h-6" />,
          title: "Activer l'Autopilot",
          description: 'Laissez notre IA rechercher et postuler pour vous',
          benefit: 'Multipliez vos candidatures sans effort supplémentaire',
          timeEstimate: '3 min',
          color: 'act'
        }];
      default:
        return [];
    }
  };
  const actions = getActions();
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
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.1
      }
    }
  };
  const handleActionClick = actionId => {
    // Play sound effect
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    onActionSelect(actionId);
  };
  const getUniverseTitle = () => {
    switch (selectedUniverse) {
      case 'build':
        return 'Construire votre profil professionnel';
      case 'prepare':
        return 'Se préparer aux entretiens';
      case 'act':
        return "Agir sur votre recherche d'emploi";
      default:
        return 'Choisissez votre première action';
    }
  };
  const getUniverseDescription = () => {
    switch (selectedUniverse) {
      case 'build':
        return 'Valorisez vos compétences et expériences avec un CV optimisé';
      case 'prepare':
        return 'Développez votre aisance et votre confiance pour vos entretiens';
      case 'act':
        return 'Automatisez et optimisez vos candidatures pour maximiser vos chances';
      default:
        return "Choisissez l'action qui correspond le mieux à votre objectif actuel";
    }
  };
  return <div className="w-full max-w-3xl mx-auto">
      <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
        {getUniverseTitle()}
      </motion.h2>
      <motion.p className="text-gray-600 mb-8 text-center" variants={itemVariants}>
        {getUniverseDescription()}
      </motion.p>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" variants={itemVariants}>
        {actions.map((action, index) => <motion.div key={action.id} custom={index} variants={cardVariants} whileHover="hover" whileTap="tap" onClick={() => handleActionClick(action.id)} onMouseEnter={() => setHoveredAction(action.id)} onMouseLeave={() => setHoveredAction(null)}>
            <Card variant={action.color} className="cursor-pointer h-full transition-all relative overflow-hidden">
              <div className="flex items-center mb-4">
                <div className={`w-14 h-14 rounded-full bg-${action.color}-ui/50 flex items-center justify-center mr-4 border border-${action.color}-accent/30`}>
                  <motion.span className={`text-${action.color}-accent`} animate={hoveredAction === action.id ? {
                scale: [1, 1.2, 1]
              } : {
                scale: 1
              }} transition={{
                duration: 0.5,
                repeat: hoveredAction === action.id ? Infinity : 0,
                repeatDelay: 1
              }}>
                    {action.icon}
                  </motion.span>
                </div>
                <div>
                  <h3 className={`text-xl font-medium ${action.color === 'build' ? 'text-amber-900' : 'text-white'}`}>
                    {action.title}
                  </h3>
                  <div className="flex items-center">
                    <ClockIcon className={`w-3 h-3 mr-1 ${action.color === 'build' ? 'text-amber-700/70' : 'text-gray-300/70'}`} />
                    <p className={`text-xs ${action.color === 'build' ? 'text-amber-700/70' : 'text-gray-300/70'}`}>
                      Temps estimé : {action.timeEstimate}
                    </p>
                  </div>
                </div>
              </div>
              <p className={`${action.color === 'build' ? 'text-amber-800' : 'text-gray-100'} mb-4`}>
                {action.description}
              </p>
              <div className={`p-3 rounded-lg bg-${action.color}-accent/10 mb-4`}>
                <div className="flex items-start">
                  <div className={`p-1 rounded-full bg-${action.color}-accent/20 mr-2 mt-0.5`}>
                    <CheckIcon className={`w-3 h-3 text-${action.color}-accent`} />
                  </div>
                  <p className={`text-sm ${action.color === 'build' ? 'text-amber-800' : 'text-gray-100'}`}>
                    {action.benefit}
                  </p>
                </div>
              </div>
              <motion.div className="absolute bottom-4 right-4" animate={hoveredAction === action.id ? {
            x: [0, 5, 0]
          } : {
            x: 0
          }} transition={{
            duration: 0.5,
            repeat: hoveredAction === action.id ? Infinity : 0
          }}>
                <ArrowRightIcon className={`w-6 h-6 ${action.color === 'build' ? 'text-build-cta' : `text-${action.color}-accent`}`} />
              </motion.div>
            </Card>
          </motion.div>)}
      </motion.div>
      <AnimatePresence>
        {showHint && <motion.div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} transition={{
        duration: 0.5
      }} variants={itemVariants}>
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-3 mt-0.5">
                <LightbulbIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Conseil pour{' '}
                  {userProfile.experience === 'student' ? 'les étudiants' : 'votre profil'}
                </h3>
                <p className="text-sm text-blue-700">
                  {selectedUniverse === 'build' && (userProfile.experience === 'student' ? "En tant qu'étudiant, mettre en avant vos projets académiques et vos compétences techniques peut compenser votre manque d'expérience professionnelle." : "Votre CV doit mettre en avant vos réalisations concrètes et l'impact de votre travail, pas seulement vos responsabilités.")}
                  {selectedUniverse === 'prepare' && "93% des recruteurs décident dans les 90 premières secondes d'un entretien. Un pitch bien préparé peut faire toute la différence."}
                  {selectedUniverse === 'act' && "Les candidatures personnalisées ont 3 fois plus de chances d'aboutir à un entretien que les candidatures génériques."}
                </p>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
      <motion.div className="flex justify-between" variants={itemVariants}>
        <Button variant="secondary" onClick={onBack} className="flex items-center">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Retour aux univers
        </Button>
      </motion.div>
    </div>;
};