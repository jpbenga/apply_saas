import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, PauseIcon, PlayIcon, ArrowRightIcon, CheckIcon, RefreshCwIcon, BarChartIcon, LightbulbIcon, ClockIcon, VolumeIcon, AlertCircleIcon, ThumbsUpIcon, ChevronRightIcon, ListIcon, HeartIcon, ZapIcon, SparklesIcon, StarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Situations possibles pour le pitch
const PITCH_SITUATIONS = [{
  id: 'interview',
  title: "Entretien d'embauche",
  description: 'Présente-toi de façon professionnelle à un recruteur',
  icon: <BriefcaseIcon className="w-5 h-5 text-prepare-accent" />,
  prompt: 'Parlez-moi de vous en quelques mots'
}, {
  id: 'networking',
  title: 'Événement networking',
  description: 'Présente-toi de manière concise et mémorable',
  icon: <UsersIcon className="w-5 h-5 text-prepare-accent" />,
  prompt: 'Bonjour, que faites-vous dans la vie ?'
}, {
  id: 'elevator',
  title: 'Pitch elevator',
  description: 'Présente-toi et ton projet en 30 secondes',
  icon: <RocketIcon className="w-5 h-5 text-prepare-accent" />,
  prompt: 'Vous avez 30 secondes pour me convaincre'
}, {
  id: 'team',
  title: "Présentation d'équipe",
  description: 'Présente-toi à ta nouvelle équipe',
  icon: <UserPlusIcon className="w-5 h-5 text-prepare-accent" />,
  prompt: "Bienvenue dans l'équipe ! Peux-tu te présenter rapidement ?"
}];
// Structure du pitch
const PITCH_STRUCTURE = [{
  id: 'hook',
  title: 'Accroche',
  description: "Une phrase percutante pour capter l'attention",
  tips: ['Pose une question provocante', 'Partage un fait surprenant', 'Évoque un problème que tu sais résoudre'],
  example: 'Saviez-vous que 75% des recruteurs prennent leur décision dans les 90 premières secondes ?'
}, {
  id: 'background',
  title: 'Parcours',
  description: 'Ton expérience et formation pertinentes',
  tips: ['Sélectionne 2-3 expériences clés seulement', 'Mentionne tes formations principales', 'Reste chronologique mais concis'],
  example: "Après une formation en design UX et 3 ans d'expérience chez TechCo, j'ai développé une expertise en recherche utilisateur et prototypage."
}, {
  id: 'strengths',
  title: 'Points forts',
  description: 'Tes compétences et qualités distinctives',
  tips: ['Mentionne 2-3 compétences techniques', 'Ajoute 1-2 soft skills qui te distinguent', 'Illustre par un exemple concret'],
  example: "Ma force est d'allier compétences techniques en React avec une approche centrée utilisateur, ce qui m'a permis d'améliorer de 30% la satisfaction client sur mon dernier projet."
}, {
  id: 'goal',
  title: 'Projet',
  description: 'Ton objectif et ce que tu recherches',
  tips: ['Exprime clairement ton objectif', 'Montre comment tu peux apporter de la valeur', 'Termine par une ouverture ou question'],
  example: "Aujourd'hui, je recherche un poste où je pourrai appliquer cette double expertise pour créer des produits à la fois performants et centrés sur l'humain. Comment votre équipe aborde-t-elle ces défis ?"
}];
// Import icons
import { BriefcaseIcon, UsersIcon, RocketIcon, UserPlusIcon } from 'lucide-react';
const PitchTrainingFlow = ({
  onComplete,
  onBack,
  isAudioEnabled
}) => {
  const [step, setStep] = useState('situation'); // situation, structure, practice, feedback, complete
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [pitchContent, setPitchContent] = useState({
    hook: '',
    background: '',
    strengths: '',
    goal: ''
  });
  const [currentStructureStep, setCurrentStructureStep] = useState('hook');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingData, setRecordingData] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const audioRef = useRef(null);
  // Show tip after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [step]);
  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          // Auto-stop at 60 seconds
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);
  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav'
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordingData(audioUrl);
        // Generate feedback (simulated)
        generateFeedback();
        // Close media stream
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      // Play start sound
      if (isAudioEnabled) {
        const audio = new Audio('/sounds/prepare-record-start.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert("Impossible d'accéder au microphone. Veuillez vérifier les permissions.");
    }
  };
  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Play stop sound
      if (isAudioEnabled) {
        const audio = new Audio('/sounds/prepare-record-stop.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.warn('Audio playback prevented:', e));
      }
    }
  };
  // Generate feedback (simulated)
  const generateFeedback = () => {
    // Simulate API call delay
    setTimeout(() => {
      const newConfidence = Math.min(confidence + Math.floor(Math.random() * 20) + 10, 100);
      setConfidence(newConfidence);
      setFeedback({
        overall: {
          score: Math.floor(Math.random() * 30) + 70,
          strengths: ['Bonne structure générale', 'Ton parcours est clairement présenté', 'Objectif professionnel bien défini'],
          improvements: ["Parle un peu plus lentement pour plus d'impact", 'Ajoute un exemple concret de réussite', 'Termine par une question pour engager la conversation']
        },
        metrics: {
          clarity: Math.floor(Math.random() * 20) + 70,
          impact: Math.floor(Math.random() * 30) + 60,
          structure: Math.floor(Math.random() * 15) + 75,
          authenticity: Math.floor(Math.random() * 10) + 80
        },
        sections: {
          hook: {
            feedback: 'Ton accroche est intéressante mais pourrait être plus percutante.',
            suggestion: 'Essaie de commencer par une question ou un fait surprenant.'
          },
          background: {
            feedback: 'Bon résumé de ton parcours, concis et pertinent.',
            suggestion: "Mentionne l'impact que tu as eu dans tes expériences précédentes."
          },
          strengths: {
            feedback: 'Tes compétences techniques sont bien mises en avant.',
            suggestion: 'Ajoute une ou deux soft skills qui te distinguent.'
          },
          goal: {
            feedback: 'Ton objectif est clair mais pourrait être plus spécifique.',
            suggestion: "Précise comment tu peux apporter de la valeur à l'entreprise."
          }
        }
      });
      setStep('feedback');
    }, 2000);
  };
  // Play recording
  const playRecording = () => {
    if (audioRef.current && recordingData) {
      audioRef.current.play();
    }
  };
  // Pause recording playback
  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  // Next structure step
  const nextStructureStep = () => {
    const currentIndex = PITCH_STRUCTURE.findIndex(s => s.id === currentStructureStep);
    if (currentIndex < PITCH_STRUCTURE.length - 1) {
      setCurrentStructureStep(PITCH_STRUCTURE[currentIndex + 1].id);
    } else {
      setStep('practice');
    }
  };
  // Handle situation selection
  const handleSelectSituation = situation => {
    setSelectedSituation(situation);
    // Play selection sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/prepare-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    }
    setTimeout(() => {
      setStep('structure');
    }, 300);
  };
  // Update pitch content
  const handlePitchContentChange = (section, value) => {
    setPitchContent(prev => ({
      ...prev,
      [section]: value
    }));
  };
  // Retry recording
  const handleRetry = () => {
    setRecordingData(null);
    setFeedback(null);
    setStep('practice');
    // Play click sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/prepare-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    }
  };
  // Complete training
  const handleComplete = () => {
    // Play completion sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/prepare-module-complete.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    }
    onComplete();
  };
  // Format time (seconds to MM:SS)
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // Get color based on score
  const getScoreColor = score => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-prepare-accent';
    return 'text-amber-500';
  };
  // Render situation selection
  const renderSituationSelection = () => <div className="space-y-6">
      <Card variant="prepare" className="p-6 border-prepare-accent/30">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#1E3A60] flex items-center justify-center mr-4 border border-prepare-accent/30">
            <MicIcon className="w-6 h-6 text-prepare-accent" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-white">
              Pitch de présentation
            </h2>
            <p className="text-sm text-prepare-text mt-1">
              Choisis une situation pour laquelle tu veux préparer ton pitch
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {PITCH_SITUATIONS.map(situation => <motion.div key={situation.id} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className={`p-4 rounded-lg border border-prepare-accent/20 bg-[#1E3A60] cursor-pointer hover:border-prepare-accent/50 transition-colors`} onClick={() => handleSelectSituation(situation)}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#0E1B33] flex items-center justify-center mr-3 border border-prepare-accent/20">
                  {situation.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{situation.title}</h3>
                  <p className="text-xs text-prepare-text mt-0.5">
                    {situation.description}
                  </p>
                </div>
              </div>
            </motion.div>)}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-prepare-accent/20">
          <div className="text-xs text-prepare-text flex items-center">
            <ClockIcon className="w-3.5 h-3.5 mr-1.5" />
            <span>Durée estimée: 15-20 minutes</span>
          </div>
          <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack}>
            Retour
          </Button>
        </div>
      </Card>
      {showTip && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <Card variant="prepare" className="p-5 border-prepare-accent/20">
            <div className="flex items-start">
              <div className="p-2 bg-[#1E3A60] rounded-full mr-4 mt-1 border border-prepare-accent/20">
                <LightbulbIcon className="w-4 h-4 text-prepare-accent" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Conseil pour ton pitch
                </h3>
                <p className="text-sm text-prepare-text">
                  Un pitch efficace dure entre 30 et 60 secondes et se compose
                  de 4 éléments clés : une accroche captivante, un résumé de ton
                  parcours, tes points forts, et ton objectif. Nous allons
                  t'aider à structurer chacun de ces éléments.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>}
    </div>;
  // Render structure builder
  const renderStructureBuilder = () => {
    const currentSection = PITCH_STRUCTURE.find(s => s.id === currentStructureStep);
    return <div className="space-y-6">
        <Card variant="prepare" className="p-6 border-prepare-accent/30">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
                <ListIcon className="w-5 h-5 text-prepare-accent" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white">
                  Structure ton pitch
                </h2>
                <p className="text-sm text-prepare-text mt-1">
                  {selectedSituation?.title} •{' '}
                  {PITCH_STRUCTURE.findIndex(s => s.id === currentStructureStep) + 1}
                  /4
                </p>
              </div>
            </div>
            <div className="text-sm text-prepare-text flex items-center">
              <div className="p-1.5 rounded-full bg-[#0E1B33] border border-prepare-accent/20 mr-2">
                <MicIcon className="w-4 h-4 text-prepare-accent" />
              </div>
              <span>Situation: {selectedSituation?.title}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#1E3A60] rounded-full mb-6 overflow-hidden">
            <motion.div className="h-full bg-prepare-accent" initial={{
            width: 0
          }} animate={{
            width: `${(PITCH_STRUCTURE.findIndex(s => s.id === currentStructureStep) + 1) * 25}%`
          }} transition={{
            duration: 0.5
          }} />
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <h3 className="text-lg font-medium text-white">
                {currentSection.title}
              </h3>
              <div className="ml-3 px-2 py-0.5 bg-[#0E1B33] rounded text-xs text-prepare-accent border border-prepare-accent/20">
                Étape{' '}
                {PITCH_STRUCTURE.findIndex(s => s.id === currentStructureStep) + 1}
              </div>
            </div>
            <p className="text-prepare-text mb-4">
              {currentSection.description}
            </p>
            <div className="bg-[#1E3A60] rounded-lg p-4 mb-4 border border-prepare-accent/20">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <SparklesIcon className="w-4 h-4 mr-2 text-prepare-accent" />
                Conseils
              </h4>
              <ul className="space-y-2">
                {currentSection.tips.map((tip, index) => <li key={index} className="flex items-start text-sm text-prepare-text">
                    <div className="p-0.5 rounded-full bg-prepare-accent/20 mr-2 mt-1">
                      <CheckIcon className="w-3 h-3 text-prepare-accent" />
                    </div>
                    <span>{tip}</span>
                  </li>)}
              </ul>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Ton {currentSection.title.toLowerCase()}
              </label>
              <textarea className="w-full p-3 bg-[#0E1B33] border border-prepare-accent/30 rounded-lg text-prepare-text focus:ring-2 focus:ring-prepare-accent focus:border-prepare-accent" rows={4} placeholder={`Écris ton ${currentSection.title.toLowerCase()} ici...`} value={pitchContent[currentSection.id]} onChange={e => handlePitchContentChange(currentSection.id, e.target.value)} />
            </div>
            <div className="bg-[#0E1B33] rounded-lg p-3 border border-prepare-accent/10">
              <h4 className="text-xs font-medium text-white mb-1 flex items-center">
                <LightbulbIcon className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Exemple
              </h4>
              <p className="text-xs italic text-prepare-text">
                {currentSection.example}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={() => setStep('situation')}>
              Retour
            </Button>
            <Button variant="prepare" onClick={nextStructureStep} className="flex items-center">
              <span>
                {PITCH_STRUCTURE.findIndex(s => s.id === currentStructureStep) < PITCH_STRUCTURE.length - 1 ? 'Continuer' : 'Passer à la pratique'}
              </span>
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>;
  };
  // Render practice screen
  const renderPracticeScreen = () => <div className="space-y-6">
      <Card variant="prepare" className="p-6 border-prepare-accent/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
              <MicIcon className="w-5 h-5 text-prepare-accent" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-white">
                Enregistre ton pitch
              </h2>
              <p className="text-sm text-prepare-text mt-1">
                Situation: {selectedSituation?.title}
              </p>
            </div>
          </div>
          <div className="text-sm text-prepare-text flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5 text-prepare-accent" />
            <span>Idéal: 30-60 secondes</span>
          </div>
        </div>
        <div className="bg-[#1E3A60] rounded-lg p-5 mb-6 border border-prepare-accent/20">
          <h3 className="text-lg font-medium text-white mb-3">
            Ton pitch complet
          </h3>
          <div className="space-y-4 mb-4">
            {PITCH_STRUCTURE.map(section => <div key={section.id} className="bg-[#0E1B33] rounded-lg p-3 border border-prepare-accent/10">
                <h4 className="text-sm font-medium text-white mb-1">
                  {section.title}
                </h4>
                <p className="text-sm text-prepare-text">
                  {pitchContent[section.id] || <span className="italic text-prepare-text/50">
                      Non renseigné
                    </span>}
                </p>
              </div>)}
          </div>
          <div className="bg-[#0E1B33] rounded-lg p-3 border border-amber-500/20">
            <div className="flex items-center mb-2">
              <AlertCircleIcon className="w-4 h-4 text-amber-400 mr-2" />
              <h4 className="text-sm font-medium text-white">
                Contexte de la situation
              </h4>
            </div>
            <p className="text-sm text-prepare-text">
              <span className="font-medium text-amber-400">
                Prompt du recruteur:{' '}
              </span>
              "{selectedSituation?.prompt}"
            </p>
          </div>
        </div>
        <div className="bg-[#0E1B33] rounded-lg p-5 mb-6 border border-prepare-accent/20 text-center">
          {!isRecording && !recordingData ? <div className="flex flex-col items-center">
              <motion.div className="w-16 h-16 rounded-full bg-[#1E3A60] flex items-center justify-center mb-4 border border-prepare-accent/30" whileHover={{
            scale: 1.05,
            boxShadow: '0 0 15px rgba(98, 195, 201, 0.3)'
          }} whileTap={{
            scale: 0.95
          }} onClick={startRecording}>
                <MicIcon className="w-8 h-8 text-prepare-accent" />
              </motion.div>
              <h3 className="text-lg font-medium text-white mb-1">
                Prêt à enregistrer ?
              </h3>
              <p className="text-sm text-prepare-text mb-4">
                Clique sur le microphone pour commencer l'enregistrement
              </p>
              <Button variant="prepare" onClick={startRecording} className="flex items-center">
                <span>Commencer l'enregistrement</span>
                <MicIcon className="w-4 h-4 ml-2" />
              </Button>
            </div> : isRecording ? <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <motion.div className="w-16 h-16 rounded-full bg-red-500/90 flex items-center justify-center border border-red-400" animate={{
              scale: [1, 1.05, 1],
              boxShadow: ['0 0 0px rgba(255, 0, 0, 0)', '0 0 15px rgba(255, 0, 0, 0.5)', '0 0 0px rgba(255, 0, 0, 0)']
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }} onClick={stopRecording}>
                  <div className="w-8 h-8 text-white" />
                </motion.div>
                {/* Recording animation */}
                <motion.div className="absolute inset-0 rounded-full border-2 border-red-400" animate={{
              scale: [1, 1.4],
              opacity: [1, 0]
            }} transition={{
              duration: 1,
              repeat: Infinity
            }} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                Enregistrement en cours...
              </h3>
              <div className="text-2xl font-mono text-red-400 mb-4">
                {formatTime(recordingTime)}
              </div>
              <Button variant="danger" onClick={stopRecording} className="flex items-center">
                <span>Arrêter l'enregistrement</span>
                <div className="w-4 h-4 ml-2" />
              </Button>
            </div> : recordingData ? <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1E3A60] flex items-center justify-center mb-4 border border-prepare-accent/30">
                <VolumeIcon className="w-8 h-8 text-prepare-accent" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">
                Enregistrement terminé!
              </h3>
              <p className="text-sm text-prepare-text mb-4">
                Durée: {formatTime(recordingTime)}
              </p>
              <audio ref={audioRef} src={recordingData} className="hidden" />
              <div className="flex space-x-3 mb-4">
                <Button variant="secondary" size="small" className="flex items-center bg-[#1E3A60] text-white border-prepare-accent/20" onClick={playRecording}>
                  <PlayIcon className="w-4 h-4 mr-1.5" />
                  <span>Écouter</span>
                </Button>
                <Button variant="secondary" size="small" className="flex items-center bg-[#1E3A60] text-white border-prepare-accent/20" onClick={pauseRecording}>
                  <PauseIcon className="w-4 h-4 mr-1.5" />
                  <span>Pause</span>
                </Button>
                <Button variant="secondary" size="small" className="flex items-center bg-[#1E3A60] text-white border-prepare-accent/20" onClick={() => {
              setRecordingData(null);
              setRecordingTime(0);
            }}>
                  <RefreshCwIcon className="w-4 h-4 mr-1.5" />
                  <span>Réessayer</span>
                </Button>
              </div>
              <div className="flex justify-center">
                <Button variant="prepare" onClick={generateFeedback} className="flex items-center">
                  <span>Obtenir mon feedback</span>
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div> : null}
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" size="small" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={() => {
          setCurrentStructureStep('hook');
          setStep('structure');
        }}>
            Modifier mon pitch
          </Button>
          {!isRecording && !recordingData && <Button variant="prepare" onClick={startRecording} className="flex items-center">
              <span>Commencer</span>
              <MicIcon className="w-4 h-4 ml-2" />
            </Button>}
        </div>
      </Card>
      {showTip && !isRecording && !recordingData && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <Card variant="prepare" className="p-5 border-prepare-accent/20">
            <div className="flex items-start">
              <div className="p-2 bg-[#1E3A60] rounded-full mr-4 mt-1 border border-prepare-accent/20">
                <LightbulbIcon className="w-4 h-4 text-prepare-accent" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Conseils avant d'enregistrer
                </h3>
                <p className="text-sm text-prepare-text">
                  Prends une grande respiration avant de commencer. Parle à un
                  rythme modéré, en articulant clairement. N'hésite pas à faire
                  plusieurs essais - les meilleurs pitchs sont souvent le
                  résultat de plusieurs tentatives !
                </p>
              </div>
            </div>
          </Card>
        </motion.div>}
    </div>;
  // Render feedback screen
  const renderFeedbackScreen = () => <div className="space-y-6">
      <Card variant="prepare" className="p-6 border-prepare-accent/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#1E3A60] flex items-center justify-center mr-3 border border-prepare-accent/30">
              <BarChartIcon className="w-5 h-5 text-prepare-accent" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-white">
                Analyse de ton pitch
              </h2>
              <p className="text-sm text-prepare-text mt-1">
                Situation: {selectedSituation?.title} • Durée:{' '}
                {formatTime(recordingTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <audio ref={audioRef} src={recordingData} className="hidden" />
            <Button variant="secondary" size="small" className="flex items-center bg-[#1E3A60] text-white border-prepare-accent/20 mr-2" onClick={playRecording}>
              <PlayIcon className="w-3.5 h-3.5 mr-1" />
              <span>Réécouter</span>
            </Button>
          </div>
        </div>
        {/* Overall score */}
        <div className="bg-[#1E3A60] rounded-lg p-5 mb-6 border border-prepare-accent/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Score global</h3>
            <div className="text-2xl font-bold text-prepare-accent">
              {feedback?.overall.score}/100
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <ThumbsUpIcon className="w-4 h-4 mr-2 text-green-400" />
                Points forts
              </h4>
              <ul className="space-y-2">
                {feedback?.overall.strengths.map((strength, index) => <li key={index} className="flex items-start text-sm text-prepare-text">
                    <div className="p-0.5 rounded-full bg-green-500/20 mr-2 mt-1">
                      <CheckIcon className="w-3 h-3 text-green-400" />
                    </div>
                    <span>{strength}</span>
                  </li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <ZapIcon className="w-4 h-4 mr-2 text-amber-400" />
                Axes d'amélioration
              </h4>
              <ul className="space-y-2">
                {feedback?.overall.improvements.map((improvement, index) => <li key={index} className="flex items-start text-sm text-prepare-text">
                    <div className="p-0.5 rounded-full bg-amber-500/20 mr-2 mt-1">
                      <ArrowRightIcon className="w-3 h-3 text-amber-400" />
                    </div>
                    <span>{improvement}</span>
                  </li>)}
              </ul>
            </div>
          </div>
          {/* Metrics */}
          <div className="pt-4 border-t border-prepare-accent/10">
            <h4 className="text-sm font-medium text-white mb-3">
              Métriques détaillées
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(feedback?.metrics || {}).map(([key, value]) => <div key={key} className="bg-[#0E1B33] rounded-lg p-3 border border-prepare-accent/10">
                  <div className="text-xs text-prepare-text mb-1 capitalize">
                    {key}
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(value)}`}>
                    {value}%
                  </div>
                  <div className="w-full h-1.5 bg-[#1A2C4D] rounded-full mt-1 overflow-hidden">
                    <motion.div className={`h-full ${value >= 80 ? 'bg-green-400' : value >= 60 ? 'bg-prepare-accent' : 'bg-amber-500'}`} initial={{
                  width: 0
                }} animate={{
                  width: `${value}%`
                }} transition={{
                  duration: 0.8
                }} />
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Section feedback */}
        <div className="bg-[#1E3A60] rounded-lg p-5 mb-6 border border-prepare-accent/20">
          <h3 className="text-lg font-medium text-white mb-4">
            Analyse par section
          </h3>
          <div className="space-y-4">
            {PITCH_STRUCTURE.map(section => <div key={section.id} className="bg-[#0E1B33] rounded-lg p-3 border border-prepare-accent/10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-white">
                    {section.title}
                  </h4>
                  <div className="px-2 py-0.5 bg-[#1E3A60] rounded text-xs text-prepare-accent border border-prepare-accent/20">
                    Section{' '}
                    {PITCH_STRUCTURE.findIndex(s => s.id === section.id) + 1}
                  </div>
                </div>
                <p className="text-xs text-prepare-text mb-2">
                  <span className="font-medium text-white">Ton contenu: </span>
                  {pitchContent[section.id] || <span className="italic">Non renseigné</span>}
                </p>
                <div className="pt-2 border-t border-prepare-accent/10">
                  <p className="text-xs text-prepare-text mb-1">
                    <span className="font-medium text-prepare-accent">
                      Feedback:{' '}
                    </span>
                    {feedback?.sections[section.id]?.feedback}
                  </p>
                  <p className="text-xs text-amber-400">
                    <span className="font-medium">Suggestion: </span>
                    {feedback?.sections[section.id]?.suggestion}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
        {/* Confidence progress */}
        <div className="bg-[#1E3A60] rounded-lg p-5 mb-6 border border-prepare-accent/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-white">
              Progression de ta confiance
            </h3>
            <div className="text-sm font-medium text-prepare-accent">
              {confidence}%
            </div>
          </div>
          <div className="w-full h-2.5 bg-[#0E1B33] rounded-full mb-2 overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-prepare-accent to-prepare-highlight" initial={{
            width: 0
          }} animate={{
            width: `${confidence}%`
          }} transition={{
            duration: 1
          }} />
          </div>
          <p className="text-sm text-prepare-text">
            {confidence < 30 ? "Continue à t'entraîner pour développer ta confiance!" : confidence < 60 ? 'Tu progresses bien! Quelques exercices supplémentaires renforceront encore ta confiance.' : confidence < 80 ? 'Très bon niveau de confiance! Tu es presque prêt pour les entretiens réels.' : 'Excellent! Tu as développé une confiance solide pour tes entretiens.'}
          </p>
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={handleRetry} className="flex items-center">
            <RefreshCwIcon className="w-4 h-4 mr-2" />
            <span>Réessayer</span>
          </Button>
          <Button variant="prepare" onClick={handleComplete} className="flex items-center">
            <span>Terminer l'entraînement</span>
            <CheckIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
      {showTip && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
          <Card variant="prepare" className="p-5 border-prepare-accent/20">
            <div className="flex items-start">
              <div className="p-2 bg-[#1E3A60] rounded-full mr-4 mt-1 border border-prepare-accent/20">
                <StarIcon className="w-4 h-4 text-prepare-accent" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Comment utiliser ce feedback
                </h3>
                <p className="text-sm text-prepare-text">
                  Concentre-toi sur 1 ou 2 points d'amélioration à la fois.
                  Réessaye ton pitch en incorporant ces changements. Les
                  meilleurs communicateurs s'améliorent par itérations
                  successives - chaque tentative te rapproche de l'excellence!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>}
    </div>;
  // Main render
  return <div>
      {step === 'situation' && renderSituationSelection()}
      {step === 'structure' && renderStructureBuilder()}
      {step === 'practice' && renderPracticeScreen()}
      {step === 'feedback' && renderFeedbackScreen()}
    </div>;
};
export default PitchTrainingFlow;