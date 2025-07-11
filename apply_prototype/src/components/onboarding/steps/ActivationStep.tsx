import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, CheckIcon, ArrowRightIcon, FileTextIcon, MicIcon, BriefcaseIcon, LightbulbIcon, RocketIcon } from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
export const ActivationStep = ({
  userProfile,
  selectedUniverse,
  onComplete,
  onBack
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  // Define checklist items based on user profile and selected universe
  const getChecklist = () => {
    const baseChecklist = [{
      id: 'profile',
      title: 'Compléter votre profil',
      description: 'Ajoutez vos informations professionnelles pour personnaliser votre expérience',
      icon: <FileTextIcon className="w-5 h-5" />,
      completed: true,
      priority: 'high'
    }];
    const buildItems = [{
      id: 'create-cv',
      title: 'Créer votre CV',
      description: 'Créez un CV optimisé pour les ATS qui met en valeur vos compétences',
      icon: <FileTextIcon className="w-5 h-5" />,
      completed: false,
      priority: 'high',
      universe: 'build'
    }, {
      id: 'cover-letter',
      title: 'Générer une lettre de motivation',
      description: 'Créez une lettre personnalisée pour une offre spécifique',
      icon: <FileTextIcon className="w-5 h-5" />,
      completed: false,
      priority: 'medium',
      universe: 'build'
    }];
    const prepareItems = [{
      id: 'pitch-practice',
      title: "S'entraîner au pitch",
      description: 'Préparez votre présentation en 30 secondes',
      icon: <MicIcon className="w-5 h-5" />,
      completed: false,
      priority: userProfile.objective === 'better-interviews' ? 'high' : 'medium',
      universe: 'prepare'
    }, {
      id: 'interview-simulation',
      title: "Simulation d'entretien",
      description: 'Préparez-vous à un entretien avec des questions sur mesure',
      icon: <MicIcon className="w-5 h-5" />,
      completed: false,
      priority: userProfile.objective === 'better-interviews' ? 'high' : 'low',
      universe: 'prepare'
    }];
    const actItems = [{
      id: 'job-scan',
      title: "Scanner une offre d'emploi",
      description: 'Analysez une offre et adaptez votre candidature',
      icon: <BriefcaseIcon className="w-5 h-5" />,
      completed: false,
      priority: userProfile.objective === 'new-job' ? 'high' : 'medium',
      universe: 'act'
    }, {
      id: 'auto-apply',
      title: "Activer l'agent de candidature",
      description: 'Laissez notre IA rechercher et postuler pour vous',
      icon: <RocketIcon className="w-5 h-5" />,
      completed: false,
      priority: 'medium',
      universe: 'act'
    }];
    // Add items based on selected universe and priorities
    let result = [...baseChecklist];
    if (selectedUniverse === 'build' || userProfile.objective === 'career-change') {
      result = [...result, ...buildItems];
    }
    if (selectedUniverse === 'prepare' || userProfile.objective === 'better-interviews') {
      result = [...result, ...prepareItems];
    }
    if (selectedUniverse === 'act' || userProfile.objective === 'new-job') {
      result = [...result, ...actItems];
    }
    // Add remaining items with lower priority
    if (selectedUniverse === 'build') {
      result = [...result, ...prepareItems, ...actItems];
    } else if (selectedUniverse === 'prepare') {
      result = [...result, ...buildItems, ...actItems];
    } else if (selectedUniverse === 'act') {
      result = [...result, ...buildItems, ...prepareItems];
    }
    // Sort by priority
    return result.sort((a, b) => {
      const priorityValues = {
        high: 0,
        medium: 1,
        low: 2
      };
      return priorityValues[a.priority] - priorityValues[b.priority];
    });
  };
  const checklist = getChecklist();
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
  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: custom => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4
      }
    })
  };
  const toggleSection = sectionId => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  const getProgressPercentage = () => {
    const completedItems = checklist.filter(item => item.completed).length;
    return Math.round(completedItems / checklist.length * 100);
  };
  const getUniverseColor = universe => {
    switch (universe) {
      case 'build':
        return 'bg-build-accent/20 text-build-accent';
      case 'prepare':
        return 'bg-prepare-accent/20 text-prepare-accent';
      case 'act':
        return 'bg-act-accent/20 text-act-accent';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  return <div className="w-full max-w-3xl mx-auto">
      <motion.h2 className="text-2xl font-medium mb-2 text-center" variants={itemVariants}>
        Votre plan d'action personnalisé
      </motion.h2>
      <motion.p className="text-gray-600 mb-8 text-center" variants={itemVariants}>
        Suivez ces étapes pour maximiser vos chances de succès
      </motion.p>
      <motion.div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8" variants={itemVariants}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Votre progression
            </h3>
            <div className="text-sm font-medium text-gray-700">
              {getProgressPercentage()}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div className="h-2.5 rounded-full bg-global-cta" initial={{
            width: '0%'
          }} animate={{
            width: `${getProgressPercentage()}%`
          }} transition={{
            duration: 1,
            delay: 0.5
          }} />
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {checklist.map((item, index) => <motion.div key={item.id} custom={index} variants={listItemVariants} initial="hidden" animate="visible" className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center cursor-pointer" onClick={() => toggleSection(item.id)}>
                <div className={`p-2 rounded-full mr-3 ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {item.completed ? <CheckIcon className="w-5 h-5 text-green-600" /> : item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h4>
                    {item.universe && <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getUniverseColor(item.universe)}`}>
                        {item.universe === 'build' ? 'Construire' : item.universe === 'prepare' ? 'Se préparer' : 'Agir'}
                      </span>}
                    {item.priority === 'high' && !item.completed && <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                        Prioritaire
                      </span>}
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {item.description}
                  </p>
                </div>
                <motion.div animate={{
              rotate: expandedSection === item.id ? 90 : 0
            }} transition={{
              duration: 0.2
            }}>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
              {expandedSection === item.id && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.3
          }} className="mt-3 ml-12">
                  <Button className="flex items-center" variant={item.universe || 'primary'}>
                    {item.completed ? 'Voir les détails' : 'Commencer maintenant'}
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>}
            </motion.div>)}
        </div>
      </motion.div>
      <motion.div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6" variants={itemVariants}>
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-full mr-3 mt-0.5">
            <LightbulbIcon className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-1">
              Conseil personnalisé
            </h3>
            <p className="text-sm text-blue-700">
              {userProfile.objective === 'new-job' && 'Commencez par créer un CV optimisé, puis entraînez-vous à votre pitch pour maximiser vos chances lors des entretiens.'}
              {userProfile.objective === 'better-interviews' && "Pratiquez régulièrement votre pitch et participez à des simulations d'entretien pour gagner en confiance et en aisance."}
              {userProfile.objective === 'career-change' && 'Mettez en avant vos compétences transférables dans votre CV et préparez-vous à expliquer votre reconversion de façon convaincante.'}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div className="flex justify-between" variants={itemVariants}>
        <Button variant="secondary" onClick={onBack} className="flex items-center">
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button onClick={onComplete} className="flex items-center">
          Terminer
          <RocketIcon className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>;
};