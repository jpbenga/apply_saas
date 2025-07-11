import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../common/Header';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, TargetIcon, PlayIcon, CheckIcon, ChevronRightIcon, ArrowRightIcon, PauseIcon, ClockIcon, BarChartIcon, StarIcon, VolumeIcon, VolumeXIcon, MessageCircleIcon, BriefcaseIcon, LightbulbIcon, AlertCircleIcon, ThumbsUpIcon, ZapIcon, UserIcon, AwardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { PitchTrainingModule } from './PitchTrainingModule';
import { InterviewSimulation } from './InterviewSimulation';
import { PaywallModal } from '../pricing/PaywallModal';
export const PrepareUniverse = ({
  onBack,
  onShowPricing
}) => {
  const [currentMode, setCurrentMode] = useState(null); // null, 'pitch', 'simulation'
  const [progress, setProgress] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallTrigger, setPaywallTrigger] = useState('');
  const [hasDonePitch, setHasDonePitch] = useState(false);
  const [hasDoneSimulation, setHasDoneSimulation] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [backgroundPosition, setBackgroundPosition] = useState({
    x: 50,
    y: 30
  });
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const {
    subscriptionTier
  } = useUser();
  const audioRef = useRef(null);
  // Simulated job offers
  const jobOffers = [{
    id: 'job1',
    title: 'Développeur Frontend React',
    company: 'TechVision',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    location: 'Paris',
    match: 92
  }, {
    id: 'job2',
    title: 'UX/UI Designer',
    company: 'DesignCraft',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    skills: ['Figma', 'User Research', 'Prototyping'],
    location: 'Remote',
    match: 87
  }, {
    id: 'job3',
    title: 'Product Manager',
    company: 'InnovateCorp',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    skills: ['Agile', 'Product Strategy', 'User Stories'],
    location: 'Lyon',
    match: 78
  }];
  // Subtle background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition({
        x: 50 + Math.sin(Date.now() * 0.0001) * 20,
        y: 30 + Math.cos(Date.now() * 0.0001) * 15
      });
    }, 50);
    const breathingInterval = setInterval(() => {
      setBreathingPhase(prev => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);
    return () => {
      clearInterval(interval);
      clearInterval(breathingInterval);
    };
  }, []);
  // Calculate overall progress
  useEffect(() => {
    let newProgress = 0;
    if (hasDonePitch) newProgress += 50;
    if (hasDoneSimulation) newProgress += 50;
    setProgress(newProgress);
  }, [hasDonePitch, hasDoneSimulation]);
  const handlePitchComplete = () => {
    setHasDonePitch(true);
    setCurrentMode(null);
    // Play completion sound
    if (isAudioEnabled) {
      try {
        const audio = new Audio('/sounds/prepare-module-complete.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      } catch (e) {
        console.warn('Failed to create audio:', e);
      }
    }
  };
  const handleSimulationComplete = () => {
    setHasDoneSimulation(true);
    setCurrentMode(null);
    // Play completion sound
    if (isAudioEnabled) {
      try {
        const audio = new Audio('/sounds/prepare-simulation-complete.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      } catch (e) {
        console.warn('Failed to create audio:', e);
      }
    }
  };
  const startPitchTraining = () => {
    if (hasDonePitch && subscriptionTier === 'etincelle') {
      // Show paywall for free tier users who already used their free trial
      setPaywallTrigger('pitch');
      setShowPaywall(true);
      return;
    }
    // Play transition sound
    if (isAudioEnabled) {
      try {
        const audio = new Audio('/sounds/prepare-transition.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      } catch (e) {
        console.warn('Failed to create audio:', e);
      }
    }
    setCurrentMode('pitch');
  };
  const startInterviewSimulation = offer => {
    if (subscriptionTier === 'etincelle' && hasDoneSimulation) {
      // Show paywall for free tier users who already used their free trial
      setPaywallTrigger('simulation');
      setShowPaywall(true);
      return;
    }
    // Play transition sound
    if (isAudioEnabled) {
      try {
        const audio = new Audio('/sounds/prepare-transition.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      } catch (e) {
        console.warn('Failed to create audio:', e);
      }
    }
    setSelectedOffer(offer);
    setCurrentMode('simulation');
  };
  const handlePaywallAction = () => {
    setShowPaywall(false);
    onShowPricing('prepare');
  };
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Play toggle sound
    try {
      const audio = new Audio('/sounds/prepare-click.mp3');
      audio.volume = 0.1;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    } catch (e) {
      console.warn('Failed to create audio:', e);
    }
  };
  // Main render function for the home screen
  const renderHomeScreen = () => {
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
                <StarIcon className="w-3 h-3 mr-1 text-yellow-400" />
                <span>Feedback personnalisé</span>
              </div>
            </div>
            {/* Progress bar */}
            {(hasDonePitch || hasDoneSimulation) && <div className="mb-4 bg-[#1E3A60] rounded-full h-2.5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-prepare-accent to-prepare-highlight" initial={{
              width: '0%'
            }} animate={{
              width: `${progress}%`
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
            <Card variant="prepare" className="p-6 border-prepare-accent/30 hover:border-prepare-accent/50 cursor-pointer transition-all duration-300 h-full" onClick={startPitchTraining}>
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
            <Card variant="prepare" className="p-6 border-prepare-highlight/30 hover:border-prepare-highlight/50 cursor-pointer transition-all duration-300 h-full" onClick={() => {
            // Show offer selection modal
            setCurrentMode('offerSelection');
          }}>
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
                  entretien. Une pause de 2 secondes avant de répondre augmente
                  de 30% la perception de ton assurance.
                </p>
                <p className="text-xs text-prepare-text/70 mt-2">
                  Source: LinkedIn Insights, 2023
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
        {/* Completion status */}
        {progress === 100 && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.4
      }}>
            <Card variant="prepare" className="p-5 border-green-500/30 bg-green-500/10">
              <div className="flex items-center">
                <div className="p-2 bg-green-500/20 rounded-full mr-4 border border-green-500/30">
                  <AwardIcon className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    Préparation complète !
                  </h3>
                  <p className="text-sm text-prepare-text">
                    Tu as terminé les deux modules de préparation. Tu es
                    maintenant prêt à briller en entretien !
                  </p>
                </div>
                <div className="ml-auto">
                  <Button variant="prepare" size="small" className="flex items-center bg-green-500 hover:bg-green-600 text-white" onClick={() => onBack()}>
                    <span>Continuer</span>
                    <ArrowRightIcon className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>}
      </div>;
  };
  // Render job offer selection modal
  const renderOfferSelection = () => {
    return <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} exit={{
      opacity: 0,
      scale: 0.95
    }} transition={{
      duration: 0.3
    }} className="space-y-6">
        <Card variant="prepare" className="p-6 border-prepare-accent/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-highlight/30">
                <TargetIcon className="w-5 h-5 text-prepare-highlight" />
              </div>
              <h2 className="text-xl font-medium text-white">
                Sélectionne une offre
              </h2>
            </div>
            <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={() => setCurrentMode(null)}>
              Retour
            </Button>
          </div>
          <p className="text-prepare-text mb-6">
            Choisis une offre pour laquelle tu souhaites te préparer. Notre IA
            analysera l'offre et ton CV pour créer une simulation d'entretien
            personnalisée.
          </p>
          <div className="space-y-4 mb-6">
            {jobOffers.map(offer => <motion.div key={offer.id} whileHover={{
            scale: 1.01
          }} className="bg-[#1E3A60] rounded-lg p-4 border border-prepare-accent/20 cursor-pointer hover:border-prepare-highlight/40 transition-colors" onClick={() => startInterviewSimulation(offer)}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-prepare-accent/20">
                    <img src={offer.logo} alt={offer.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{offer.title}</h3>
                    <p className="text-sm text-prepare-text">
                      {offer.company} • {offer.location}
                    </p>
                    <div className="flex flex-wrap mt-2 gap-2">
                      {offer.skills.map((skill, i) => <span key={i} className="text-xs bg-prepare-accent/10 text-prepare-accent px-2 py-0.5 rounded-full">
                          {skill}
                        </span>)}
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <div className="px-2 py-1 bg-[#0E1B33] rounded-full text-xs flex items-center mb-2">
                      <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
                      <span className="text-white font-medium">
                        {offer.match}%
                      </span>
                      <span className="text-prepare-text ml-1">match</span>
                    </div>
                    <Button variant="prepare" size="small" className="flex items-center bg-prepare-highlight text-white hover:bg-prepare-highlight/90">
                      <span>Sélectionner</span>
                      <ChevronRightIcon className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>)}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-prepare-accent/20">
            <div className="flex items-center text-prepare-text text-sm">
              <BriefcaseIcon className="w-4 h-4 mr-2 text-prepare-accent" />
              <span>Tu peux aussi importer une offre depuis "Agir"</span>
            </div>
            <Button variant="prepare" size="small" onClick={() => setCurrentMode(null)}>
              Retour
            </Button>
          </div>
        </Card>
      </motion.div>;
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0E1B33] to-[#162440] text-prepare-text relative overflow-hidden" style={{
    backgroundImage: `radial-gradient(circle at ${backgroundPosition.x}% ${backgroundPosition.y}%, rgba(98, 195, 201, 0.1) 0%, transparent 50%)`
  }}>
      {/* Audio element for sounds */}
      <audio ref={audioRef} preload="auto" />
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-0 left-0 w-full h-full opacity-5" variants={{
        inhale: {
          scale: 1.05,
          opacity: 0.08,
          transition: {
            duration: 4,
            ease: 'easeInOut'
          }
        },
        hold: {
          scale: 1.05,
          opacity: 0.08,
          transition: {
            duration: 4,
            ease: 'easeInOut'
          }
        },
        exhale: {
          scale: 1,
          opacity: 0.05,
          transition: {
            duration: 4,
            ease: 'easeInOut'
          }
        }
      }} animate={breathingPhase}>
          <motion.div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-prepare-accent blur-3xl" animate={{
          x: [0, 20, 0],
          y: [0, -20, 0]
        }} transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse'
        }} />
          <motion.div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-prepare-highlight blur-3xl" animate={{
          x: [0, -30, 0],
          y: [0, 20, 0]
        }} transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 5
        }} />
        </motion.div>
      </div>
      {/* Header */}
      <Header title="Prépare ton entretien" onBack={onBack} variant="prepare" progress={progress} rightElement={<button onClick={toggleAudio} className="p-2 rounded-full bg-[#1E3A60] text-prepare-accent border border-prepare-accent/30 hover:bg-[#2A4A75] transition-colors" aria-label={isAudioEnabled ? "Désactiver l'audio" : "Activer l'audio"}>
            {isAudioEnabled ? <VolumeIcon className="w-5 h-5" /> : <VolumeXIcon className="w-5 h-5" />}
          </button>} />
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentMode === null && renderHomeScreen()}
            {currentMode === 'offerSelection' && renderOfferSelection()}
            {currentMode === 'pitch' && <PitchTrainingModule onComplete={handlePitchComplete} onBack={() => setCurrentMode(null)} isAudioEnabled={isAudioEnabled} />}
            {currentMode === 'simulation' && <InterviewSimulation offer={selectedOffer} onComplete={handleSimulationComplete} onBack={() => setCurrentMode(null)} isAudioEnabled={isAudioEnabled} />}
          </AnimatePresence>
        </div>
      </main>
      {/* Paywall Modal */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} onAction={handlePaywallAction} variant="prepare" type={paywallTrigger} />
    </div>;
};