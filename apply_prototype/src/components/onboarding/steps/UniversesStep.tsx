import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, FileTextIcon, MicIcon, CheckIcon, RocketIcon, ZapIcon, SearchIcon, BriefcaseIcon, LightbulbIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
export const UniversesStep = ({
  userProfile,
  selectedUniverse,
  onSelectUniverse,
  onContinue,
  onBack
}) => {
  const [hoveredUniverse, setHoveredUniverse] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  // Recommend universe based on user profile
  useEffect(() => {
    const getRecommendedUniverse = () => {
      if (userProfile.objective === 'better-interviews') return 'prepare';
      if (userProfile.objective === 'career-change') return 'build';
      if (userProfile.experience === 'student') return 'build';
      return 'act'; // Default for experienced job seekers
    };
    setRecommendation(getRecommendedUniverse());
  }, [userProfile]);
  const universes = [{
    id: 'build',
    name: 'Construire',
    icon: <FileTextIcon className="w-8 h-8" />,
    color: 'bg-build-bg',
    borderColor: 'border-build-accent',
    textColor: 'text-build-text',
    accentColor: 'text-build-accent',
    bgGradient: 'from-cream to-build-bg',
    description: 'Créez des CV et lettres de motivation qui se démarquent',
    tagline: 'Pour valoriser votre profil',
    benefits: ['CV optimisé pour les systèmes ATS', 'Lettres de motivation personnalisées', 'Mise en valeur de vos compétences clés'],
    firstAction: 'Créer ou importer votre CV',
    idealFor: ['new-job', 'career-change'],
    cta: 'Créer mon CV'
  }, {
    id: 'prepare',
    name: 'Se préparer',
    icon: <MicIcon className="w-8 h-8" />,
    color: 'bg-prepare-bg',
    borderColor: 'border-prepare-accent',
    textColor: 'text-prepare-text',
    accentColor: 'text-prepare-accent',
    bgGradient: 'from-[#0D1B2A] to-[#102135]',
    description: 'Préparez-vous aux entretiens avec un coach IA personnalisé',
    tagline: 'Pour briller en entretien',
    benefits: ['Entraînement au pitch personnel', "Simulation d'entretien sur mesure", "Feedback détaillé et conseils d'amélioration"],
    firstAction: "S'entraîner au pitch de présentation",
    idealFor: ['better-interviews', 'new-job'],
    cta: "M'entraîner au pitch"
  }, {
    id: 'act',
    name: 'Agir',
    icon: <ZapIcon className="w-8 h-8" />,
    color: 'bg-act-bg',
    borderColor: 'border-act-accent',
    textColor: 'text-act-text',
    accentColor: 'text-act-accent',
    bgGradient: 'from-[#1E0F24] to-[#1A0E21]',
    description: 'Déléguez vos candidatures à un agent IA qui travaille pour vous',
    tagline: 'Pour postuler efficacement',
    benefits: ["Recherche automatique d'offres pertinentes", 'Candidatures personnalisées et envoyées pour vous', 'Suivi et relances automatisées'],
    firstAction: "Scanner une offre d'emploi",
    idealFor: ['new-job'],
    cta: "Scanner une offre d'emploi"
  }];
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
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };
  const handleUniverseSelect = universeId => {
    onSelectUniverse(universeId);
    // Play selection sound
    const audio = new Audio('/sounds/soft-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  };
  const handleEnterUniverse = () => {
    if (selectedUniverse) {
      onContinue();
    }
  };
  return <div className="w-full max-w-4xl mx-auto">
      <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
        Choisissez votre univers
      </motion.h2>
      <motion.p className="text-gray-600 mb-8 text-center" variants={itemVariants}>
        Chaque univers répond à un besoin spécifique de votre recherche d'emploi
      </motion.p>
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={itemVariants}>
        {universes.map((universe, index) => <motion.div key={universe.id} custom={index} variants={cardVariants} whileHover="hover" whileTap="tap" animate={selectedUniverse === universe.id ? 'selected' : 'visible'} onClick={() => handleUniverseSelect(universe.id)} onMouseEnter={() => setHoveredUniverse(universe.id)} onMouseLeave={() => setHoveredUniverse(null)} className="relative">
            {recommendation === universe.id && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-global-cta text-white text-xs font-medium py-1 px-3 rounded-full z-10">
                Recommandé pour vous
              </div>}
            <Card variant={universe.id} className={`cursor-pointer h-full transition-all relative overflow-hidden ${selectedUniverse === universe.id ? `border-${universe.id}-accent/70` : `border-${universe.id}-accent/30`}`}>
              <div className="flex items-center mb-4">
                <div className={`w-14 h-14 rounded-full bg-${universe.id}-ui flex items-center justify-center mr-4 border border-${universe.id}-accent/30`}>
                  <span className={`text-${universe.id}-accent`}>
                    {universe.icon}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xl font-medium ${universe.id === 'build' ? 'text-amber-900' : 'text-white'}`}>
                    {universe.name}
                  </h3>
                  <p className={`text-sm ${universe.id === 'build' ? 'text-amber-700' : 'text-gray-200'}`}>
                    {universe.tagline}
                  </p>
                </div>
              </div>
              <p className={`${universe.id === 'build' ? 'text-amber-800' : 'text-gray-100'} mb-4`}>
                {universe.description}
              </p>
              <div className="space-y-2 mb-5">
                {universe.benefits.map((benefit, i) => <motion.div key={i} className="flex items-start" initial={{
              x: 0
            }} animate={{
              x: hoveredUniverse === universe.id || selectedUniverse === universe.id ? 5 : 0
            }} transition={{
              duration: 0.2,
              delay: i * 0.1
            }}>
                    <div className={`p-1 rounded-full bg-${universe.id}-accent/20 mr-2 mt-0.5`}>
                      <CheckIcon className={`w-3 h-3 text-${universe.id}-accent`} />
                    </div>
                    <span className={`text-sm ${universe.id === 'build' ? 'text-amber-800' : 'text-gray-200'}`}>
                      {benefit}
                    </span>
                  </motion.div>)}
              </div>
              <div className="mt-auto">
                <div className={`p-3 rounded-lg bg-${universe.id}-accent/10 mb-4`}>
                  <div className="flex items-center">
                    <ArrowRightIcon className={`w-4 h-4 mr-2 ${universe.id === 'build' ? 'text-amber-700' : `text-${universe.id}-accent`}`} />
                    <p className={`text-sm font-medium ${universe.id === 'build' ? 'text-amber-800' : 'text-gray-100'}`}>
                      Première action : {universe.firstAction}
                    </p>
                  </div>
                </div>
              </div>
              {selectedUniverse === universe.id && <motion.div className={`absolute bottom-0 left-0 right-0 py-2 text-center bg-${universe.id === 'build' ? 'amber-100' : `${universe.id}-accent/20`} ${universe.id === 'build' ? 'text-amber-800' : 'text-white'} font-medium`} initial={{
            y: 30
          }} animate={{
            y: 0
          }} transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}>
                  Sélectionné
                </motion.div>}
            </Card>
          </motion.div>)}
      </motion.div>
      {selectedUniverse && <motion.div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }}>
          <p className="text-gray-700">
            <strong>Conseil personnalisé :</strong>{' '}
            {selectedUniverse === 'build' && 'Commencez par créer un CV optimisé pour les ATS qui mettra en valeur vos compétences clés.'}
            {selectedUniverse === 'prepare' && "L'entraînement au pitch vous aidera à faire une excellente première impression lors de vos entretiens."}
            {selectedUniverse === 'act' && "Laissez notre agent IA rechercher et postuler aux offres pertinentes pendant que vous vous concentrez sur d'autres aspects de votre recherche."}
          </p>
        </motion.div>}
      <motion.div className="flex justify-between" variants={itemVariants}>
        <Button variant="secondary" onClick={onBack} className="flex items-center">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={handleEnterUniverse} disabled={!selectedUniverse} className="flex items-center group">
          <span>Entrer dans cet univers</span>
          <motion.div className="ml-2" animate={{
          x: [0, 5, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}>
            <ArrowRightIcon className="w-4 h-4" />
          </motion.div>
        </Button>
      </motion.div>
    </div>;
};