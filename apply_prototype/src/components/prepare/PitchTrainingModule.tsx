import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, PlayIcon, PauseIcon, RefreshCwIcon, BarChartIcon, CheckIcon, ArrowRightIcon, MessageCircleIcon, LightbulbIcon, ThumbsUpIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const PitchTrainingModule = ({
  onComplete,
  onBack,
  isAudioEnabled
}) => {
  const [step, setStep] = useState('intro'); // intro, recording, feedback, complete
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [pitchText, setPitchText] = useState('');
  // Simule l'enregistrement du pitch
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          // Calculer la progression (60 secondes max)
          setRecordingProgress(Math.min(newTime / 60 * 100, 100));
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);
  // Démarrer/arrêter l'enregistrement
  const toggleRecording = () => {
    if (!isRecording) {
      // Démarrer l'enregistrement
      setRecordingTime(0);
      setRecordingProgress(0);
      setIsRecording(true);
      // Jouer un son de démarrage si l'audio est activé
      if (isAudioEnabled) {
        try {
          const audio = new Audio('/sounds/prepare-start-recording.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.warn('Audio playback prevented:', e));
        } catch (e) {
          console.warn('Failed to create audio:', e);
        }
      }
    } else {
      // Arrêter l'enregistrement
      setIsRecording(false);
      // Jouer un son d'arrêt si l'audio est activé
      if (isAudioEnabled) {
        try {
          const audio = new Audio('/sounds/prepare-stop-recording.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.warn('Audio playback prevented:', e));
        } catch (e) {
          console.warn('Failed to create audio:', e);
        }
      }
      // Si l'enregistrement a duré au moins 10 secondes, passer à l'étape suivante
      if (recordingTime >= 10) {
        generateFeedback();
      }
    }
  };
  // Générer un feedback fictif
  const generateFeedback = () => {
    setStep('feedback');
    // Simuler un délai d'analyse
    setTimeout(() => {
      setFeedback({
        overall: 78,
        clarity: 82,
        confidence: 75,
        structure: 76,
        keywords: ['expérience', 'compétences', 'résultats', 'passion'],
        strengths: ['Bonne articulation et débit de parole', 'Présentation claire de votre parcours', 'Mention pertinente de vos compétences clés'],
        improvements: ['Essayez de réduire les hésitations ("euh", "donc")', 'Terminez par une conclusion plus percutante', 'Ajoutez un exemple concret de réalisation'],
        transcription: "Bonjour, je m'appelle Jean Dupont. J'ai une expérience de 5 ans dans le développement web, particulièrement avec React et Node.js. J'ai travaillé sur plusieurs projets d'envergure, notamment une plateforme e-commerce qui a augmenté les ventes de 30%. Je suis passionné par la création d'interfaces utilisateur intuitives et performantes. Je recherche maintenant un nouveau défi où je pourrai appliquer mes compétences et continuer à évoluer professionnellement."
      });
      // Définir le texte du pitch (simulé)
      setPitchText("Bonjour, je m'appelle Jean Dupont. J'ai une expérience de 5 ans dans le développement web, particulièrement avec React et Node.js. J'ai travaillé sur plusieurs projets d'envergure, notamment une plateforme e-commerce qui a augmenté les ventes de 30%. Je suis passionné par la création d'interfaces utilisateur intuitives et performantes. Je recherche maintenant un nouveau défi où je pourrai appliquer mes compétences et continuer à évoluer professionnellement.");
      // Jouer un son de feedback complet si l'audio est activé
      if (isAudioEnabled) {
        try {
          const audio = new Audio('/sounds/prepare-analysis-complete.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.warn('Audio playback prevented:', e));
        } catch (e) {
          console.warn('Failed to create audio:', e);
        }
      }
    }, 2000);
  };
  // Recommencer l'enregistrement
  const resetRecording = () => {
    setStep('recording');
    setIsRecording(false);
    setRecordingTime(0);
    setRecordingProgress(0);
    setFeedback(null);
  };
  // Terminer le module
  const finishTraining = () => {
    // Jouer un son de complétion si l'audio est activé
    if (isAudioEnabled) {
      try {
        const audio = new Audio('/sounds/prepare-module-complete.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      } catch (e) {
        console.warn('Failed to create audio:', e);
      }
    }
    onComplete();
  };
  // Afficher l'écran d'introduction
  const renderIntroScreen = () => <Card variant="prepare" className="p-6 border-prepare-accent/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
            <MicIcon className="w-5 h-5 text-prepare-accent" />
          </div>
          <h2 className="text-xl font-medium text-white">
            Pitch d'introduction
          </h2>
        </div>
        <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack}>
          Retour
        </Button>
      </div>
      <p className="text-prepare-text mb-6">
        Prépare un pitch de présentation percutant en 60 secondes. Ce pitch te
        permettra de te présenter efficacement lors d'un entretien d'embauche ou
        d'un événement de networking.
      </p>
      <div className="bg-[#1E3A60] rounded-lg p-5 mb-6 border border-prepare-accent/20">
        <h3 className="font-medium text-white mb-3 flex items-center">
          <LightbulbIcon className="w-4 h-4 text-prepare-accent mr-2" />
          Structure recommandée pour ton pitch
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-prepare-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-medium text-prepare-accent">1</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Qui tu es</h4>
              <p className="text-xs text-prepare-text">
                Ton nom, ton parcours, ton domaine d'expertise
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-prepare-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-medium text-prepare-accent">2</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Ton expérience</h4>
              <p className="text-xs text-prepare-text">
                Tes réalisations significatives, tes compétences clés
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-prepare-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-medium text-prepare-accent">3</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">
                Ta valeur ajoutée
              </h4>
              <p className="text-xs text-prepare-text">
                Ce qui te distingue, ta passion, ton approche unique
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 rounded-full bg-prepare-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-xs font-medium text-prepare-accent">4</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Ton objectif</h4>
              <p className="text-xs text-prepare-text">
                Ce que tu recherches, le type d'opportunité qui t'intéresse
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="prepare" className="flex items-center" onClick={() => setStep('recording')}>
          <span>Commencer l'enregistrement</span>
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>;
  // Afficher l'écran d'enregistrement
  const renderRecordingScreen = () => <Card variant="prepare" className="p-6 border-prepare-accent/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
            <MicIcon className="w-5 h-5 text-prepare-accent" />
          </div>
          <h2 className="text-xl font-medium text-white">
            Enregistre ton pitch
          </h2>
        </div>
        <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack} disabled={isRecording}>
          Retour
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full bg-[#1E3A60] border border-prepare-accent/30 flex items-center justify-center">
            {isRecording ? <motion.div initial={{
            scale: 1
          }} animate={{
            scale: [1, 1.1, 1]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
                <PauseIcon className="w-12 h-12 text-prepare-accent" />
              </motion.div> : <PlayIcon className="w-12 h-12 text-prepare-accent" />}
          </div>
          {/* Cercle de progression */}
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#162440" strokeWidth="8" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#62C3C9" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={283 - 283 * recordingProgress / 100} />
          </svg>
          {/* Temps écoulé */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {Math.floor(recordingTime / 60)}:
              {(recordingTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <p className="text-prepare-text mb-6 text-center max-w-md">
          {isRecording ? 'Parle clairement et à un rythme modéré. Essaie de rester sous 60 secondes.' : "Appuie sur le bouton pour commencer l'enregistrement. Présente-toi comme si tu étais en entretien."}
        </p>
        <Button variant={isRecording ? 'secondary' : 'prepare'} size="large" className={`flex items-center ${isRecording ? 'bg-red-500 hover:bg-red-600 border-red-400 text-white' : ''}`} onClick={toggleRecording}>
          {isRecording ? <>
              <span>Arrêter l'enregistrement</span>
              <PauseIcon className="w-4 h-4 ml-2" />
            </> : <>
              <span>Démarrer l'enregistrement</span>
              <MicIcon className="w-4 h-4 ml-2" />
            </>}
        </Button>
      </div>
      <div className="bg-[#1E3A60] rounded-lg p-4 mt-4 border border-prepare-accent/20">
        <div className="flex items-start">
          <MessageCircleIcon className="w-5 h-5 text-prepare-accent mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Conseil</h4>
            <p className="text-xs text-prepare-text">
              Commence par une phrase d'accroche qui capte l'attention. Évite
              les formules génériques comme "Je m'appelle... et je suis...".
              Préfère une approche qui met en avant ta valeur ajoutée dès le
              début.
            </p>
          </div>
        </div>
      </div>
    </Card>;
  // Afficher l'écran de feedback
  const renderFeedbackScreen = () => <Card variant="prepare" className="p-6 border-prepare-accent/30">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
            <BarChartIcon className="w-5 h-5 text-prepare-accent" />
          </div>
          <h2 className="text-xl font-medium text-white">
            Analyse de ton pitch
          </h2>
        </div>
        <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack}>
          Retour
        </Button>
      </div>
      {!feedback ? <div className="flex flex-col items-center justify-center py-12">
          <motion.div className="w-16 h-16 border-4 border-prepare-accent border-t-transparent rounded-full mb-6" animate={{
        rotate: 360
      }} transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }} />
          <p className="text-prepare-text">Analyse de ton pitch en cours...</p>
        </div> : <div className="space-y-6">
          {/* Score global */}
          <div className="bg-[#1E3A60] rounded-lg p-5 border border-prepare-accent/20">
            <h3 className="font-medium text-white mb-4 text-center">
              Score global
            </h3>
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#162440" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#62C3C9" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" initial={{
                strokeDashoffset: 283
              }} animate={{
                strokeDashoffset: 283 - 283 * feedback.overall / 100
              }} transition={{
                duration: 1.5,
                ease: 'easeOut'
              }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {feedback.overall}%
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{
            label: 'Clarté',
            value: feedback.clarity
          }, {
            label: 'Confiance',
            value: feedback.confidence
          }, {
            label: 'Structure',
            value: feedback.structure
          }].map((metric, index) => <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-prepare-text mb-1">
                    {metric.label}
                  </div>
                  <div className="w-full bg-blue-900/50 h-2 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-prepare-accent" initial={{
                width: 0
              }} animate={{
                width: `${metric.value}%`
              }} transition={{
                duration: 1,
                delay: 0.2 * index
              }} />
                  </div>
                  <div className="text-xs text-white mt-1">{metric.value}%</div>
                </div>)}
            </div>
          </div>
          {/* Transcription */}
          <div className="bg-[#1E3A60] rounded-lg p-5 border border-prepare-accent/20">
            <h3 className="font-medium text-white mb-3">Transcription</h3>
            <div className="bg-blue-900/30 p-3 rounded-md text-sm text-prepare-text">
              {pitchText}
            </div>
          </div>
          {/* Points forts et à améliorer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1E3A60] rounded-lg p-5 border border-prepare-accent/20">
              <h3 className="font-medium text-white mb-3 flex items-center">
                <ThumbsUpIcon className="w-4 h-4 text-green-400 mr-2" />
                Points forts
              </h3>
              <ul className="space-y-2">
                {feedback.strengths.map((strength, index) => <li key={index} className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    <span className="text-sm text-prepare-text">
                      {strength}
                    </span>
                  </li>)}
              </ul>
            </div>
            <div className="bg-[#1E3A60] rounded-lg p-5 border border-prepare-accent/20">
              <h3 className="font-medium text-white mb-3 flex items-center">
                <ArrowRightIcon className="w-4 h-4 text-prepare-highlight mr-2" />
                Points à améliorer
              </h3>
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => <li key={index} className="flex items-start">
                    <ArrowRightIcon className="w-4 h-4 text-prepare-highlight mr-2 mt-0.5" />
                    <span className="text-sm text-prepare-text">
                      {improvement}
                    </span>
                  </li>)}
              </ul>
            </div>
          </div>
          {/* Mots-clés */}
          <div className="bg-[#1E3A60] rounded-lg p-5 border border-prepare-accent/20">
            <h3 className="font-medium text-white mb-3">
              Mots-clés identifiés
            </h3>
            <div className="flex flex-wrap gap-2">
              {feedback.keywords.map((keyword, index) => <span key={index} className="px-3 py-1 bg-prepare-accent/20 text-prepare-accent rounded-full text-sm">
                  {keyword}
                </span>)}
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="secondary" className="flex items-center bg-[#1E3A60] text-white border-prepare-accent/20" onClick={resetRecording}>
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              <span>Réessayer</span>
            </Button>
            <Button variant="prepare" className="flex items-center" onClick={finishTraining}>
              <span>Terminer l'entraînement</span>
              <CheckIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>}
    </Card>;
  // Afficher l'écran approprié en fonction de l'étape
  return <div className="space-y-6">
      {step === 'intro' && renderIntroScreen()}
      {step === 'recording' && renderRecordingScreen()}
      {step === 'feedback' && renderFeedbackScreen()}
    </div>;
};