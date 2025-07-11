import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { Button } from '../../common/Button';
export const WelcomeStep = ({
  onContinue
}) => {
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
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 15px -3px rgba(75, 184, 241, 0.2), 0 4px 6px -2px rgba(75, 184, 241, 0.1)'
    },
    tap: {
      scale: 0.95,
      boxShadow: '0 4px 6px -1px rgba(75, 184, 241, 0.1), 0 2px 4px -1px rgba(75, 184, 241, 0.06)'
    }
  };
  return <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <motion.div className="relative mb-8" variants={logoVariants} initial="hidden" animate={['visible', 'pulse']}>
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
      <motion.h1 className="text-4xl font-light mb-4 bg-gradient-to-r from-global-cta to-purple-500 bg-clip-text text-transparent" variants={itemVariants}>
        Bienvenue sur Apply
      </motion.h1>
      <motion.p className="text-xl text-gray-600 mb-6 max-w-lg" variants={itemVariants}>
        Transformez votre recherche d'emploi en voyage de découverte et
        d'accomplissement
      </motion.p>
      <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md border border-gray-100" variants={itemVariants}>
        <h3 className="font-medium text-gray-900 mb-3">
          Apply vous accompagne à chaque étape :
        </h3>
        <ul className="space-y-3 text-left">
          <li className="flex items-start">
            <div className="bg-build-accent/20 p-1 rounded-full mr-3 mt-0.5">
              <motion.div animate={{
              rotate: [0, 10, 0, -10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}>
                <span className="block w-4 h-4 text-build-accent">✓</span>
              </motion.div>
            </div>
            <span className="text-gray-700">
              Créez des CV et lettres de motivation qui se démarquent
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-prepare-accent/20 p-1 rounded-full mr-3 mt-0.5">
              <motion.div animate={{
              rotate: [0, 10, 0, -10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.3
            }}>
                <span className="block w-4 h-4 text-prepare-accent">✓</span>
              </motion.div>
            </div>
            <span className="text-gray-700">
              Préparez-vous aux entretiens avec un coach IA personnalisé
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-act-accent/20 p-1 rounded-full mr-3 mt-0.5">
              <motion.div animate={{
              rotate: [0, 10, 0, -10, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.6
            }}>
                <span className="block w-4 h-4 text-act-accent">✓</span>
              </motion.div>
            </div>
            <span className="text-gray-700">
              Déléguez vos candidatures à un agent IA qui travaille pour vous
            </span>
          </li>
        </ul>
      </motion.div>
      <motion.div className="w-full max-w-sm" variants={itemVariants}>
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button onClick={onContinue} size="large" className="w-full flex items-center justify-center group">
            <span>Commencer</span>
            <motion.div className="ml-2" animate={{
            x: [0, 5, 0]
          }} transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>;
};