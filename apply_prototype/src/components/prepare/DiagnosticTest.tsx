import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, CheckIcon, ArrowRightIcon, UserIcon, BrainIcon, MessageSquareIcon, StarIcon, AlertCircleIcon, InfoIcon, BarChartIcon, VolumeIcon, PauseIcon, HeartIcon } from 'lucide-react';
import { PricingTrigger } from '../pricing/PricingTrigger';
import { motion, AnimatePresence } from 'framer-motion';
export const DiagnosticTest = ({
  onComplete,
  coachingType
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  const [showPricingTrigger, setShowPricingTrigger] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [breathingMode, setBreathingMode] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
  const [breathingCount, setBreathingCount] = useState(0);
  const audioRef = useRef(null);
  const questions = [{
    id: 'stress',
    text: 'Comment te sens-tu généralement avant un entretien ?',
    options: [{
      value: 1,
      text: "Très anxieux(se), j'ai du mal à dormir la veille"
    }, {
      value: 2,
      text: 'Nerveux(se), mais je parviens à me contrôler'
    }, {
      value: 3,
      text: 'Un peu de stress, mais plutôt stimulant'
    }, {
      value: 4,
      text: 'Calme et confiant(e)'
    }]
  }, {
    id: 'preparation',
    text: 'Comment prépares-tu habituellement tes entretiens ?',
    options: [{
      value: 1,
      text: 'Je ne prépare pas vraiment, je préfère être spontané(e)'
    }, {
      value: 2,
      text: "Je relis rapidement l'offre et mon CV"
    }, {
      value: 3,
      text: "Je recherche l'entreprise et prépare quelques réponses"
    }, {
      value: 4,
      text: "Je fais des recherches approfondies et m'entraîne à répondre"
    }]
  }, {
    id: 'weakness',
    text: 'Quel aspect des entretiens te semble le plus difficile ?',
    options: [{
      value: 'stress',
      text: 'Gérer mon stress et mes émotions'
    }, {
      value: 'questions',
      text: 'Répondre aux questions difficiles ou inattendues'
    }, {
      value: 'personal',
      text: 'Parler de moi et mettre en avant mes réalisations'
    }, {
      value: 'salary',
      text: 'Négocier mon salaire et mes conditions'
    }]
  }, {
    id: 'strength',
    text: 'Quel est ton plus grand atout en entretien ?',
    options: [{
      value: 'technical',
      text: 'Ma maîtrise technique et mon expertise'
    }, {
      value: 'communication',
      text: "Ma facilité à communiquer et m'exprimer"
    }, {
      value: 'adaptability',
      text: "Ma capacité d'adaptation et ma réactivité"
    }, {
      value: 'preparation',
      text: 'Ma préparation et ma connaissance du sujet'
    }]
  }, {
    id: 'feedback',
    text: 'Quel retour as-tu souvent reçu après tes entretiens ?',
    options: [{
      value: 'positive',
      text: 'Généralement positif, mais pas toujours de suite'
    }, {
      value: 'mixed',
      text: 'Mitigé, parfois bon, parfois à améliorer'
    }, {
      value: 'negative',
      text: 'Souvent négatif ou pas de retour du tout'
    }, {
      value: 'none',
      text: "Je n'ai pas fait beaucoup d'entretiens jusqu'à présent"
    }]
  }];
  useEffect(() => {
    // Show pricing trigger after completing the test
    if (testComplete) {
      setTimeout(() => {
        setShowPricingTrigger(true);
      }, 1500);
    }
  }, [testComplete]);
  useEffect(() => {
    // Breathing exercise effect
    if (breathingMode) {
      const interval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          // Count completed breath cycles
          if (prev === 'exhale') {
            setBreathingCount(count => count + 1);
            // Exit breathing mode after 3 cycles
            if (breathingCount >= 2) {
              clearInterval(interval);
              setBreathingMode(false);
              setBreathingCount(0);
              return 'inhale';
            }
          }
          return 'inhale';
        });
      }, 4000); // 4s per phase
      return () => clearInterval(interval);
    }
  }, [breathingMode, breathingCount]);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsAudioPlaying(true);
      // Auto-stop after audio completes
      audioRef.current.onended = () => {
        setIsAudioPlaying(false);
      };
    }
  };
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  };
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedOption(answer);
    // Play selection sound
    const audio = new Audio('/sounds/prepare-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Delayed setting of answer to allow for animation
    setTimeout(() => {
      setAnswers({
        ...answers,
        [questionId]: answer
      });
      // Move to next question or complete test after a short delay
      setTimeout(() => {
        setSelectedOption(null);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          // If user seems stressed (based on first question), offer breathing exercise
          if (questionId === 'stress' && answer <= 2 && !breathingMode) {
            setBreathingMode(true);
          }
        } else {
          setTestComplete(true);
        }
      }, 300);
    }, 500);
  };
  const handleTestComplete = () => {
    // Calculate results based on answers
    const results = {
      confidence: calculateConfidenceScore(),
      communicationStyle: determineCommunicationStyle(),
      areasToImprove: determineAreasToImprove(),
      strengths: determineStrengths()
    };
    onComplete(results);
  };
  const calculateConfidenceScore = () => {
    // Simple algorithm to calculate confidence score
    let score = 0;
    if (answers.stress) score += answers.stress;
    if (answers.preparation) score += answers.preparation;
    // Convert to percentage
    return Math.min(Math.round(score / 8 * 100), 100);
  };
  const determineCommunicationStyle = () => {
    // Simplified logic to determine communication style
    const styles = ['Le stratège calme', 'Le passionné expressif', 'Le narrateur inspirant', "L'expert méthodique"];
    const index = Math.min(Math.floor((answers.stress || 2) + (answers.preparation || 2) / 4), styles.length - 1);
    return styles[index];
  };
  const determineAreasToImprove = () => {
    // Based on weakness answer
    const areas = {
      stress: 'Gestion du stress et des émotions',
      questions: 'Préparation aux questions difficiles',
      personal: 'Mise en valeur de ton parcours',
      salary: 'Techniques de négociation'
    };
    return areas[answers.weakness] || 'Structure du discours';
  };
  const determineStrengths = () => {
    // Based on strength answer
    const strengths = {
      technical: 'Expertise technique',
      communication: 'Communication claire',
      adaptability: 'Adaptabilité',
      preparation: 'Préparation approfondie'
    };
    return strengths[answers.strength] || 'Authenticité';
  };
  const handleContinueFree = () => {
    setShowPricingTrigger(false);
    handleTestComplete();
  };
  const handleUpgrade = () => {
    // Handle upgrade logic
    setShowPricingTrigger(false);
    handleTestComplete();
  };
  const startBreathingExercise = () => {
    setBreathingMode(true);
    setBreathingCount(0);
    setBreathingPhase('inhale');
    // Play breathing guidance sound
    const audio = new Audio('/sounds/prepare-breathing.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  };
  const skipBreathingExercise = () => {
    setBreathingMode(false);
    setBreathingCount(0);
  };
  return <div className="space-y-6">
      <audio ref={audioRef} src="/sounds/prepare-diagnostic.mp3" preload="auto" />
      {!testComplete ? <Card variant="prepare" className="p-6 relative overflow-hidden">
          {/* Audio control */}
          <motion.button className="absolute top-4 right-4 p-2 bg-blue-800 rounded-full border border-lavender-300/30 z-20" whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }} onClick={isAudioPlaying ? stopAudio : playAudio}>
            {isAudioPlaying ? <PauseIcon className="w-4 h-4 text-lavender-200" /> : <VolumeIcon className="w-4 h-4 text-lavender-200" />}
          </motion.button>
          {/* Breathing exercise overlay */}
          <AnimatePresence>
            {breathingMode && <motion.div className="absolute inset-0 bg-blue-900/95 z-30 flex flex-col items-center justify-center p-6" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.5
        }}>
                <motion.div className="w-32 h-32 bg-prepare-accent/20 rounded-full flex items-center justify-center mb-8 relative" animate={{
            scale: breathingPhase === 'inhale' ? [1, 1.3] : breathingPhase === 'hold' ? 1.3 : [1.3, 1],
            boxShadow: breathingPhase === 'hold' ? ['0 0 0 0 rgba(98, 195, 201, 0.3)', '0 0 0 20px rgba(98, 195, 201, 0)'] : '0 0 0 0 rgba(98, 195, 201, 0)'
          }} transition={{
            duration: 4,
            ease: 'easeInOut'
          }}>
                  <HeartIcon className="w-16 h-16 text-prepare-accent/70" />
                </motion.div>
                <motion.h3 className="text-xl font-light text-lavender-100 mb-4 text-center" animate={{
            opacity: [0.7, 1, 0.7]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
                  {breathingPhase === 'inhale' ? 'Inspire lentement...' : breathingPhase === 'hold' ? 'Retiens...' : 'Expire doucement...'}
                </motion.h3>
                <p className="text-blue-200 text-center mb-6">
                  Cet exercice rapide va t'aider à te recentrer avant de
                  continuer.
                  <br />
                  Concentre-toi sur ta respiration.
                </p>
                <div className="flex gap-4">
                  <Button variant="secondary" size="small" onClick={skipBreathingExercise}>
                    Passer
                  </Button>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${breathingCount >= 0 ? 'bg-prepare-accent' : 'bg-blue-800'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${breathingCount >= 1 ? 'bg-prepare-accent' : 'bg-blue-800'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${breathingCount >= 2 ? 'bg-prepare-accent' : 'bg-blue-800'}`}></div>
                  </div>
                </div>
              </motion.div>}
          </AnimatePresence>
          <div className="flex items-center mb-6">
            <motion.div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mr-4 border border-lavender-300/30" whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.2
        }}>
              <BrainIcon className="w-6 h-6 text-lavender-200" />
            </motion.div>
            <div>
              <h2 className="text-xl font-medium text-lavender-100">
                Diagnostic de communication
              </h2>
              <p className="text-sm text-blue-200 mt-1">
                {coachingType === 'express' ? 'Réponds à ces quelques questions pour un coaching express personnalisé' : 'Réponds à ces questions pour découvrir ton profil de communication'}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm text-blue-200 mb-2">
              <span>
                Question {currentQuestionIndex + 1} sur {questions.length}
              </span>
              <span>
                {Math.round((currentQuestionIndex + 1) / questions.length * 100)}
                %
              </span>
            </div>
            <div className="w-full h-2 bg-blue-800 rounded-full overflow-hidden">
              <motion.div className="h-2 rounded-full bg-gradient-to-r from-lavender-200 to-lavender-400" initial={{
            width: `${currentQuestionIndex / questions.length * 100}%`
          }} animate={{
            width: `${(currentQuestionIndex + 1) / questions.length * 100}%`
          }} transition={{
            duration: 0.5
          }} />
            </div>
          </div>
          <motion.div className="mb-6" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} key={currentQuestionIndex}>
            <h3 className="text-lg text-lavender-100 mb-4">
              {questions[currentQuestionIndex].text}
            </h3>
            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => <motion.div key={index} className={`p-4 border rounded-lg transition-all cursor-pointer ${selectedOption === option.value ? 'border-lavender-300 bg-lavender-400/20' : answers[questions[currentQuestionIndex].id] === option.value ? 'border-lavender-300/40 bg-blue-800/50' : 'border-lavender-300/20 hover:border-lavender-300/40 hover:bg-blue-800/50'}`} onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, option.value)} whileHover={{
            scale: 1.02,
            x: 5
          }} whileTap={{
            scale: 0.98
          }} animate={selectedOption === option.value ? {
            scale: [1, 1.05, 1],
            transition: {
              duration: 0.3
            }
          } : {}}>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border border-lavender-300/40 flex items-center justify-center mr-3 flex-shrink-0">
                      {(selectedOption === option.value || answers[questions[currentQuestionIndex].id] === option.value) && <motion.div className="w-3 h-3 rounded-full bg-lavender-300" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  duration: 0.2
                }} />}
                    </div>
                    <span className="text-blue-100">{option.text}</span>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
          {/* Breathing exercise trigger */}
          {currentQuestionIndex === 0 && !breathingMode && <motion.div className="mb-4 mt-6 bg-blue-800/50 rounded-lg p-3 border border-lavender-300/20 flex items-center justify-between" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1,
        duration: 0.5
      }}>
              <div className="flex items-center">
                <div className="p-1.5 bg-blue-900 rounded-full mr-2">
                  <HeartIcon className="w-4 h-4 text-lavender-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">
                    Besoin de te recentrer avant de continuer ?
                  </p>
                </div>
              </div>
              <Button variant="prepare" size="small" onClick={startBreathingExercise} className="flex items-center">
                <span>Respirer</span>
                <ArrowRightIcon className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>}
        </Card> : showPricingTrigger ? <PricingTrigger variant="prepare" title="Voici tes résultats..." subtitle="Tu as un potentiel énorme. Et si on allait plus loin pour le révéler ?" description="Ton diagnostic révèle des points forts à exploiter et des axes d'amélioration. Accède à un coaching personnalisé pour transformer tes entretiens en opportunités." ctaText="Débloquer le coaching complet" modalTitle="Maximise ton impact en entretien" modalSubtitle="Transforme ta communication professionnelle" modalDescription="Nos utilisateurs premium sont 2,5x plus confiants en entretien et obtiennent 40% plus d'offres. Débloque un coaching personnalisé pour révéler ton plein potentiel." modalCtaText="Commencer mon coaching personnalisé" onContinueFree={handleContinueFree} onUpgrade={handleUpgrade} highlightedTierId="pro" /> : <Card variant="prepare" className="p-6">
          <div className="flex items-center mb-6">
            <motion.div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mr-4 border border-lavender-300/30" animate={{
          scale: [1, 1.05, 1],
          boxShadow: ['0 0 0px rgba(98, 195, 201, 0)', '0 0 15px rgba(98, 195, 201, 0.3)', '0 0 0px rgba(98, 195, 201, 0)']
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
              <BarChartIcon className="w-6 h-6 text-lavender-200" />
            </motion.div>
            <div>
              <h2 className="text-xl font-medium text-lavender-100">
                Analyse de ton profil
              </h2>
              <p className="text-sm text-blue-200 mt-1">
                Voici ce que nous avons découvert sur ta communication
              </p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <motion.div className="bg-blue-800/50 rounded-lg p-4 border border-lavender-300/20" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
              <h3 className="text-lavender-200 font-medium mb-2 flex items-center">
                <StarIcon className="w-4 h-4 mr-2" />
                Niveau de confiance
              </h3>
              <div className="w-full h-3 bg-blue-800 rounded-full mb-2 overflow-hidden">
                <motion.div className="h-3 rounded-full bg-gradient-to-r from-lavender-200 to-lavender-400" initial={{
              width: 0
            }} animate={{
              width: `${calculateConfidenceScore()}%`
            }} transition={{
              duration: 1,
              delay: 0.3
            }} />
              </div>
              <p className="text-sm text-blue-100">
                {calculateConfidenceScore() < 40 ? 'Tu peux gagner beaucoup en confiance avec les bonnes techniques' : calculateConfidenceScore() < 70 ? 'Tu as déjà une bonne base, mais il y a encore de la marge de progression' : 'Tu as un excellent niveau de confiance, continuons à le renforcer'}
              </p>
            </motion.div>
            <motion.div className="bg-blue-800/50 rounded-lg p-4 border border-lavender-300/20" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
              <h3 className="text-lavender-200 font-medium mb-2 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                Ton style de communication
              </h3>
              <motion.p className="text-lg text-lavender-100 mb-2" initial={{
            opacity: 0,
            x: -10
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.5
          }}>
                {determineCommunicationStyle()}
              </motion.p>
              <p className="text-sm text-blue-100">
                Ce style est caractérisé par une approche{' '}
                {answers.preparation >= 3 ? 'structurée' : 'spontanée'} et une
                expression{' '}
                {answers.stress >= 3 ? 'confiante' : 'qui peut gagner en assurance'}
                .
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div className="bg-blue-800/50 rounded-lg p-4 border border-lavender-300/20" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
                <h3 className="text-lavender-200 font-medium mb-2 flex items-center">
                  <AlertCircleIcon className="w-4 h-4 mr-2" />
                  Axe d'amélioration principal
                </h3>
                <p className="text-blue-100">{determineAreasToImprove()}</p>
              </motion.div>
              <motion.div className="bg-blue-800/50 rounded-lg p-4 border border-lavender-300/20" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
                <h3 className="text-lavender-200 font-medium mb-2 flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Ton point fort
                </h3>
                <p className="text-blue-100">{determineStrengths()}</p>
              </motion.div>
            </div>
          </div>
          <motion.div className="flex justify-end" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }}>
            <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
              <Button variant="prepare" className="flex items-center" onClick={handleTestComplete}>
                <span>Continuer</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </Card>}
    </div>;
};