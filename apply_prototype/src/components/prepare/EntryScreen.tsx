import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, TargetIcon, CheckIcon, ArrowRightIcon, LightbulbIcon, ThumbsUpIcon, ZapIcon, AlertCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
export const EntryScreen = ({
  onStartCoaching
}) => {
  const {
    subscriptionTier
  } = useUser();
  const [hasDonePitch, setHasDonePitch] = useState(false);
  const [hasDoneSimulation, setHasDoneSimulation] = useState(false);
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
        <Card variant="prepare" className="p-6 border-prepare-accent/30 bg-[#0E1B33] shadow-lg">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-2xl font-light mb-3 text-white">
              Prépare ton entretien
            </h2>
            <p className="text-prepare-text max-w-lg">
              Transforme ton anxiété en assurance et captive ton interlocuteur
              dès les premières secondes. Deux modules complémentaires pour
              maximiser tes chances.
            </p>
          </div>
          <div className="flex items-center justify-center text-xs text-prepare-text space-x-4 mb-6">
            <div className="flex items-center">
              <MicIcon className="w-3 h-3 mr-1 text-prepare-accent" />
              <span>Audio interactif</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <TargetIcon className="w-3 h-3 mr-1 text-prepare-highlight" />
              <span>Questions ciblées</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <CheckIcon className="w-3 h-3 mr-1 text-yellow-400" />
              <span>Feedback personnalisé</span>
            </div>
          </div>
          {/* Progress bar */}
          {(hasDonePitch || hasDoneSimulation) && <div className="mb-4 bg-[#1E3A60] rounded-full h-2.5 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-prepare-accent to-prepare-highlight" initial={{
            width: '0%'
          }} animate={{
            width: `${hasDonePitch && hasDoneSimulation ? 100 : 50}%`
          }} transition={{
            duration: 1
          }} />
            </div>}
        </Card>
      </motion.div>

      {/* Main modules */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pitch module card */}
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
      }}>
          <Card variant="prepare" className="p-6 border-prepare-accent/30 hover:border-prepare-accent/50 cursor-pointer transition-all duration-300 h-full" onClick={() => onStartCoaching('pitch')}>
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#1E3A60] flex items-center justify-center mr-4 border border-prepare-accent/30">
                <MicIcon className="w-7 h-7 text-prepare-accent" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  Pitch d'intro
                </h3>
                <p className="text-sm text-prepare-text">
                  Travaille ton 30 secondes pour faire bonne impression
                </p>
              </div>
            </div>
            <p className="text-prepare-text mb-5">
              Présente-toi efficacement avec un pitch percutant. Notre IA
              analyse ta présentation et te donne un feedback détaillé sur ton
              rythme, ton ton et ton contenu.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-accent/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-accent" />
                </div>
                <span className="text-sm text-prepare-text">
                  Analyse vocale en temps réel
                </span>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-accent/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-accent" />
                </div>
                <span className="text-sm text-prepare-text">
                  Feedback sur ton rythme et ton ton
                </span>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-accent/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-accent" />
                </div>
                <span className="text-sm text-prepare-text">
                  Suggestions de mots-clés impactants
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-prepare-text">
                {hasDonePitch && subscriptionTier === 'etincelle' ? <div className="flex items-center">
                    <AlertCircleIcon className="w-3 h-3 mr-1 text-prepare-highlight" />
                    <span>Essai gratuit utilisé</span>
                  </div> : !hasDonePitch && subscriptionTier === 'etincelle' ? <div className="flex items-center">
                    <ZapIcon className="w-3 h-3 mr-1 text-yellow-400" />
                    <span>1 essai gratuit</span>
                  </div> : <div className="flex items-center">
                    <CheckIcon className="w-3 h-3 mr-1 text-green-400" />
                    <span>Accès illimité</span>
                  </div>}
              </div>
              <Button variant="prepare" size="small" className="flex items-center">
                <span>{hasDonePitch ? 'Réessayer' : 'Démarrer'}</span>
                <ArrowRightIcon className="w-3 h-3 ml-2" />
              </Button>
            </div>
            {hasDonePitch && <div className="mt-4 pt-3 border-t border-prepare-accent/20">
                <div className="flex items-center text-prepare-accent text-sm">
                  <ThumbsUpIcon className="w-4 h-4 mr-2" />
                  <span>Pitch complété ! +50% de préparation</span>
                </div>
              </div>}
          </Card>
        </motion.div>

        {/* Interview simulation card */}
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
      }}>
          <Card variant="prepare" className="p-6 border-prepare-highlight/30 hover:border-prepare-highlight/50 cursor-pointer transition-all duration-300 h-full" onClick={() => onStartCoaching('jobOffer')}>
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#1E3A60] flex items-center justify-center mr-4 border border-prepare-highlight/30">
                <TargetIcon className="w-7 h-7 text-prepare-highlight" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  Simulation intelligente
                </h3>
                <p className="text-sm text-prepare-text">
                  Questions sur-mesure pour ton offre
                </p>
              </div>
            </div>
            <p className="text-prepare-text mb-5">
              Prépare-toi à un entretien réel avec des questions spécifiques à
              l'offre que tu vises. Notre IA analyse l'offre et ton CV pour
              créer une simulation personnalisée.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-highlight/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-highlight" />
                </div>
                <span className="text-sm text-prepare-text">
                  Questions adaptées à l'offre
                </span>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-highlight/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-highlight" />
                </div>
                <span className="text-sm text-prepare-text">
                  Feedback détaillé sur tes réponses
                </span>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-prepare-highlight/20 mr-2 mt-0.5">
                  <CheckIcon className="w-3 h-3 text-prepare-highlight" />
                </div>
                <span className="text-sm text-prepare-text">
                  Conseils d'amélioration personnalisés
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-prepare-text">
                {hasDoneSimulation && subscriptionTier === 'etincelle' ? <div className="flex items-center">
                    <AlertCircleIcon className="w-3 h-3 mr-1 text-prepare-highlight" />
                    <span>Essai gratuit utilisé</span>
                  </div> : !hasDoneSimulation && subscriptionTier === 'etincelle' ? <div className="flex items-center">
                    <ZapIcon className="w-3 h-3 mr-1 text-yellow-400" />
                    <span>1 essai gratuit</span>
                  </div> : <div className="flex items-center">
                    <CheckIcon className="w-3 h-3 mr-1 text-green-400" />
                    <span>Accès illimité</span>
                  </div>}
              </div>
              <Button variant="prepare" size="small" className="flex items-center bg-prepare-highlight text-white hover:bg-prepare-highlight/90">
                <span>Sélectionner une offre</span>
                <ArrowRightIcon className="w-3 h-3 ml-2" />
              </Button>
            </div>
            {hasDoneSimulation && <div className="mt-4 pt-3 border-t border-prepare-highlight/20">
                <div className="flex items-center text-prepare-highlight text-sm">
                  <ThumbsUpIcon className="w-4 h-4 mr-2" />
                  <span>Simulation complétée ! +50% de préparation</span>
                </div>
              </div>}
          </Card>
        </motion.div>
      </div>

      {/* Tip card */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.7,
      delay: 0.3
    }}>
        <Card variant="prepare" className="p-5 border-prepare-accent/20">
          <div className="flex items-start">
            <div className="p-2 bg-[#1E3A60] rounded-full mr-4 mt-1 border border-prepare-accent/20">
              <LightbulbIcon className="w-4 h-4 text-prepare-accent" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Le savais-tu ?</h3>
              <p className="text-sm text-prepare-text">
                93% des recruteurs affirment que la façon de communiquer est
                aussi importante que l'expérience professionnelle lors d'un
                entretien. Une pause de 2 secondes avant de répondre augmente de
                30% la perception de ton assurance.
              </p>
              <p className="text-xs text-prepare-text/70 mt-2">
                Source: LinkedIn Insights, 2023
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>;
};