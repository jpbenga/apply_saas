import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircleIcon, XIcon, MessageSquareIcon } from 'lucide-react';
export const ContextualHelp = ({
  isOpen,
  onToggle,
  currentStep,
  userProfile
}) => {
  // Help content based on current step and user profile
  const getHelpContent = () => {
    switch (currentStep) {
      case 0:
        return {
          title: 'Bienvenue sur Apply',
          content: "Apply est une plateforme complète qui vous accompagne dans toutes les étapes de votre recherche d'emploi, de la création de votre CV jusqu'à l'obtention de votre poste idéal."
        };
      case 1:
        return {
          title: 'Votre profil',
          content: 'Ces informations nous permettent de personnaliser votre parcours. Plus vous êtes précis, plus nous pourrons adapter nos recommandations à vos besoins spécifiques.'
        };
      case 2:
        return {
          title: 'Les univers Apply',
          content: "Chaque univers répond à un besoin spécifique de votre recherche d'emploi. Vous pouvez utiliser les trois univers ou vous concentrer sur celui qui correspond le mieux à votre objectif actuel."
        };
      case 3:
        return {
          title: 'Première action',
          content: 'Choisissez une première action qui vous apportera une valeur immédiate. Vous pourrez ensuite explorer les autres fonctionnalités à votre rythme.'
        };
      case 4:
        return {
          title: 'Votre tableau de bord',
          content: 'Cette checklist vous guidera à travers les étapes essentielles pour maximiser vos chances de succès. Chaque action complétée vous rapproche de votre objectif professionnel.'
        };
      default:
        return {
          title: "Besoin d'aide ?",
          content: "N'hésitez pas à explorer les différentes fonctionnalités d'Apply. Chaque élément a été conçu pour vous aider à atteindre vos objectifs professionnels."
        };
    }
  };
  const helpContent = getHelpContent();
  return <>
      {/* Help toggle button */}
      <motion.button className="fixed bottom-6 right-6 bg-global-cta text-white rounded-full p-3 shadow-lg z-50" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.95
    }} onClick={onToggle}>
        {isOpen ? <XIcon className="w-6 h-6" /> : <HelpCircleIcon className="w-6 h-6" />}
      </motion.button>
      {/* Help panel */}
      <AnimatePresence>
        {isOpen && <motion.div className="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs z-50 border border-gray-200" initial={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} transition={{
        duration: 0.2
      }}>
            <div className="flex items-start mb-3">
              <MessageSquareIcon className="w-5 h-5 text-global-cta mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {helpContent.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {helpContent.content}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <button className="text-sm text-global-cta hover:underline">
                Voir tous les conseils
              </button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
};