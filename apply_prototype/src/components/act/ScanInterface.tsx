import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MailIcon, LinkedinIcon, SearchIcon, CheckIcon, LoaderIcon, AlertCircleIcon, PlusIcon, LockIcon, GlobeIcon, ArrowRightIcon, BarChartIcon, BriefcaseIcon, ZapIcon, ShieldIcon, WifiIcon, CheckCircleIcon, XCircleIcon, RotateCwIcon, ScanIcon, TerminalIcon } from 'lucide-react';
import { PricingTrigger } from '../pricing/PricingTrigger';
import { motion, AnimatePresence } from 'framer-motion';
export const ScanInterface = ({
  onConnect,
  connectedPlatforms,
  onComplete,
  scanComplete,
  onUpgrade
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStats, setScanStats] = useState({
    totalOffers: 0,
    relevantOffers: 0,
    highMatchOffers: 0
  });
  const [showPricingTrigger, setShowPricingTrigger] = useState(false);
  const [scanPhase, setScanPhase] = useState(0); // 0: not started, 1: email, 2: linkedin, 3: analyzing
  const [scanMessages, setScanMessages] = useState([]);
  const [hoverPlatform, setHoverPlatform] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  // Platforms that can be connected
  const platforms = [{
    id: 'gmail',
    name: 'Gmail',
    icon: <MailIcon className="w-5 h-5" />,
    color: 'bg-red-600'
  }, {
    id: 'outlook',
    name: 'Outlook',
    icon: <MailIcon className="w-5 h-5" />,
    color: 'bg-blue-600'
  }, {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <LinkedinIcon className="w-5 h-5" />,
    color: 'bg-blue-700'
  }, {
    id: 'indeed',
    name: 'Indeed',
    icon: <BriefcaseIcon className="w-5 h-5" />,
    color: 'bg-blue-500'
  }, {
    id: 'welcometothejungle',
    name: 'Welcome to the Jungle',
    icon: <GlobeIcon className="w-5 h-5" />,
    color: 'bg-yellow-600'
  }];
  // Scan log messages
  const scanLogMessages = [
  // Phase 1: Email scanning
  ['Connexion aux serveurs de messagerie...', 'Authentification réussie', 'Scan des emails en cours...', 'Recherche des messages de recrutement...', 'Analyse des pièces jointes...', "Extraction des offres d'emploi...", '12 conversations avec recruteurs identifiées', "8 offres d'emploi extraites des emails"],
  // Phase 2: LinkedIn scanning
  ['Connexion à LinkedIn...', 'Authentification réussie', 'Analyse de votre réseau professionnel...', 'Identification des recruteurs actifs...', 'Extraction des offres recommandées...', 'Analyse des entreprises qui ont consulté votre profil...', '24 offres correspondant à votre profil identifiées', '15 entreprises ont consulté votre profil récemment'],
  // Phase 3: Analysis
  ["Démarrage de l'analyse croisée...", 'Calcul des scores de correspondance...', 'Évaluation des compétences requises...', 'Comparaison avec votre profil...', 'Priorisation des offres...', 'Analyse des conditions et avantages...', "Évaluation de la culture d'entreprise...", 'Génération du rapport final...', 'Scan complété avec succès!']];
  // Start scanning effect
  useEffect(() => {
    if (scanning && !scanComplete) {
      // Play scan sound
      if (isAudioEnabled && audioRef.current) {
        audioRef.current.volume = 0.2;
        audioRef.current.play().catch(e => console.log('Audio playback prevented:', e));
      }
      let messageIndex = 0;
      let currentPhase = 1;
      setScanPhase(currentPhase);
      const messageInterval = setInterval(() => {
        if (messageIndex < scanLogMessages[currentPhase - 1].length) {
          setScanMessages(prev => [...prev, {
            text: scanLogMessages[currentPhase - 1][messageIndex],
            timestamp: new Date(),
            phase: currentPhase
          }]);
          messageIndex++;
          // Scroll to bottom of messages
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
              behavior: 'smooth'
            });
          }
        } else {
          // Move to next phase or complete
          if (currentPhase < 3) {
            currentPhase++;
            setScanPhase(currentPhase);
            messageIndex = 0;
          } else {
            clearInterval(messageInterval);
            // Play completion sound
            if (isAudioEnabled) {
              const audio = new Audio('/sounds/scan-complete.mp3');
              audio.volume = 0.3;
              audio.play().catch(e => console.log('Audio playback prevented:', e));
            }
            // Update scan stats when complete
            setScanStats({
              totalOffers: 47,
              relevantOffers: 18,
              highMatchOffers: 5
            });
            // Show pricing trigger after scan is complete
            setShowPricingTrigger(true);
            setScanning(false);
            setScanProgress(100);
          }
        }
      }, 800);
      // Progress bar update
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // Calculate progress based on current phase and message index
          const phaseProgress = (currentPhase - 1) * 33.3;
          const messageProgress = messageIndex / scanLogMessages[currentPhase - 1].length * 33.3;
          return Math.min(Math.round(phaseProgress + messageProgress), 99);
        });
      }, 200);
      return () => {
        clearInterval(messageInterval);
        clearInterval(progressInterval);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [scanning, scanComplete, isAudioEnabled]);
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [scanMessages]);
  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    setScanMessages([]);
    setScanPhase(0);
  };
  const isPlatformConnected = platformId => {
    return connectedPlatforms.includes(platformId);
  };
  const getRequiredPlatforms = () => {
    return platforms.filter(p => ['gmail', 'linkedin'].includes(p.id));
  };
  const canStartScan = () => {
    // Check if at least one email platform and LinkedIn are connected
    return (isPlatformConnected('gmail') || isPlatformConnected('outlook')) && isPlatformConnected('linkedin');
  };
  const handleContinueFree = () => {
    setShowPricingTrigger(false);
    onComplete();
  };
  const handleUpgrade = () => {
    // Call the onUpgrade function passed from parent component
    if (onUpgrade) {
      onUpgrade();
    }
    setShowPricingTrigger(false);
  };
  const handleConnectPlatform = platformId => {
    // Play connect sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/connect-platform.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    }
    onConnect(platformId);
  };
  // Animation variants
  const platformCardVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 25px -5px rgba(203, 166, 247, 0.4), 0 8px 10px -6px rgba(203, 166, 247, 0.2)'
    },
    connected: {
      scale: 1,
      boxShadow: '0 0 15px rgba(15, 220, 122, 0.3)' // Vert néon glow effect
    }
  };
  const scanButtonVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 0 15px rgba(203, 166, 247, 0.6)'
    },
    disabled: {
      scale: 1,
      opacity: 0.5
    }
  };
  const scanProgressVariants = {
    initial: {
      width: '0%'
    },
    animate: progress => ({
      width: `${progress}%`
    })
  };
  const phaseIconVariants = {
    initial: {
      scale: 1,
      opacity: 0.5
    },
    active: {
      scale: 1.1,
      opacity: 1,
      boxShadow: '0 0 10px rgba(203, 166, 247, 0.6)'
    },
    completed: {
      scale: 1,
      opacity: 1
    }
  };
  const messageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  const getPhaseIcon = phase => {
    switch (phase) {
      case 1:
        return <MailIcon className="w-4 h-4" />;
      case 2:
        return <LinkedinIcon className="w-4 h-4" />;
      case 3:
        return <BarChartIcon className="w-4 h-4" />;
      default:
        return <ScanIcon className="w-4 h-4" />;
    }
  };
  const getPhaseStatus = phase => {
    if (scanPhase > phase) return 'completed';
    if (scanPhase === phase) return 'active';
    return 'initial';
  };
  return <div className="space-y-6">
      <audio ref={audioRef} src="/sounds/scanning.mp3" loop />
      {/* Carte principale "Scanner les opportunités" avec nouveau fond violet */}
      <Card variant="act" className="p-6 bg-[#2E1F3B] border-[#4A3361]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white flex items-center">
            <SearchIcon className="w-5 h-5 mr-2 text-red-500" />
            Scanner les opportunités
          </h2>
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setIsAudioEnabled(!isAudioEnabled)} className={`p-2 rounded-full ${isAudioEnabled ? 'bg-act-accent/20 text-act-accent' : 'bg-[#1E0F24] text-white/50'} transition-colors`}>
            <WifiIcon className="w-4 h-4" />
          </motion.button>
        </div>
        <motion.p className="text-white mb-6" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          Connecte tes plateformes pour qu'Apply puisse scanner les offres
          d'emploi pertinentes pour ton profil. Nous analyserons automatiquement
          les opportunités et évaluerons leur pertinence.
        </motion.p>
        <div className="space-y-4 mb-6">
          <h3 className="text-lg text-white mb-2">Plateformes requises</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {getRequiredPlatforms().map(platform => <motion.div key={platform.id} variants={platformCardVariants} initial="initial" animate={isPlatformConnected(platform.id) ? 'connected' : 'initial'} whileHover={isPlatformConnected(platform.id) ? 'connected' : 'hover'} transition={{
            duration: 0.3
          }} onHoverStart={() => setHoverPlatform(platform.id)} onHoverEnd={() => setHoverPlatform(null)}>
                <Card variant="act" className={`p-4 flex items-center cursor-pointer border ${isPlatformConnected(platform.id) ? 'border-[#0FDC7A] bg-[#2E1F3B]' : 'border-[#4A3361] hover:border-[#6A4381]'}`} onClick={() => handleConnectPlatform(platform.id)}>
                  <motion.div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center mr-3`} animate={hoverPlatform === platform.id && !isPlatformConnected(platform.id) ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0]
              } : {}} transition={{
                duration: 0.8
              }}>
                    {platform.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{platform.name}</h4>
                    <p className="text-xs text-white/70">
                      {isPlatformConnected(platform.id) ? 'Connecté' : 'Cliquez pour connecter'}
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    {isPlatformConnected(platform.id) ? <motion.div className="p-2 rounded-full bg-[#0FDC7A]/20 text-[#0FDC7A]" initial={{
                  scale: 0,
                  rotate: -180
                }} animate={{
                  scale: 1,
                  rotate: 0
                }} exit={{
                  scale: 0,
                  rotate: 180
                }} transition={{
                  duration: 0.3
                }}>
                        <CheckIcon className="w-5 h-5" />
                      </motion.div> : <motion.div className="p-2 rounded-full bg-[#1E0F24] text-white/50" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} exit={{
                  scale: 0
                }} transition={{
                  duration: 0.3
                }}>
                        <PlusIcon className="w-5 h-5" />
                      </motion.div>}
                  </AnimatePresence>
                </Card>
              </motion.div>)}
          </div>
          <h3 className="text-lg text-white mb-2 mt-4">
            Plateformes additionnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {platforms.filter(p => !['gmail', 'linkedin'].includes(p.id)).map(platform => <motion.div key={platform.id} variants={platformCardVariants} initial="initial" animate={isPlatformConnected(platform.id) ? 'connected' : 'initial'} whileHover={isPlatformConnected(platform.id) ? 'connected' : 'hover'} transition={{
            duration: 0.3
          }} onHoverStart={() => setHoverPlatform(platform.id)} onHoverEnd={() => setHoverPlatform(null)}>
                  <Card variant="act" className={`p-4 flex items-center cursor-pointer border ${isPlatformConnected(platform.id) ? 'border-[#0FDC7A] bg-[#2E1F3B]' : 'border-[#4A3361] hover:border-[#6A4381]'}`} onClick={() => handleConnectPlatform(platform.id)}>
                    <motion.div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center mr-3`} animate={hoverPlatform === platform.id && !isPlatformConnected(platform.id) ? {
                scale: [1, 1.1, 1]
              } : {}} transition={{
                duration: 0.5
              }}>
                      {platform.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">
                        {platform.name}
                      </h4>
                      <p className="text-xs text-white/70">
                        {isPlatformConnected(platform.id) ? 'Connecté' : 'Optionnel'}
                      </p>
                    </div>
                    <AnimatePresence mode="wait">
                      {isPlatformConnected(platform.id) ? <motion.div className="p-2 rounded-full bg-[#0FDC7A]/20 text-[#0FDC7A]" initial={{
                  scale: 0,
                  rotate: -180
                }} animate={{
                  scale: 1,
                  rotate: 0
                }} exit={{
                  scale: 0,
                  rotate: 180
                }} transition={{
                  duration: 0.3
                }}>
                          <CheckIcon className="w-5 h-5" />
                        </motion.div> : <motion.div className="p-2 rounded-full bg-[#1E0F24] text-white/50" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} exit={{
                  scale: 0
                }} transition={{
                  duration: 0.3
                }}>
                          <PlusIcon className="w-5 h-5" />
                        </motion.div>}
                    </AnimatePresence>
                  </Card>
                </motion.div>)}
          </div>
        </div>
        {!canStartScan() && <motion.div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4 mb-6 flex items-start" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
            <AlertCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-white text-sm">
              Connecte au moins une plateforme de messagerie (Gmail ou Outlook)
              et LinkedIn pour commencer le scan.
            </p>
          </motion.div>}
        {scanning && <motion.div className="mb-6" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} transition={{
        duration: 0.5
      }}>
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <div className="flex items-center space-x-4">
                <motion.div className={`p-1.5 rounded-full ${scanPhase === 1 ? 'bg-red-900/30 text-red-500' : scanPhase > 1 ? 'bg-[#0FDC7A]/20 text-[#0FDC7A]' : 'bg-[#1E0F24] text-white/50'}`} variants={phaseIconVariants} initial="initial" animate={getPhaseStatus(1)}>
                  <MailIcon className="w-4 h-4" />
                </motion.div>
                <motion.div className={`p-1.5 rounded-full ${scanPhase === 2 ? 'bg-red-900/30 text-red-500' : scanPhase > 2 ? 'bg-[#0FDC7A]/20 text-[#0FDC7A]' : 'bg-[#1E0F24] text-white/50'}`} variants={phaseIconVariants} initial="initial" animate={getPhaseStatus(2)}>
                  <LinkedinIcon className="w-4 h-4" />
                </motion.div>
                <motion.div className={`p-1.5 rounded-full ${scanPhase === 3 ? 'bg-red-900/30 text-red-500' : scanPhase > 3 ? 'bg-[#0FDC7A]/20 text-[#0FDC7A]' : 'bg-[#1E0F24] text-white/50'}`} variants={phaseIconVariants} initial="initial" animate={getPhaseStatus(3)}>
                  <BarChartIcon className="w-4 h-4" />
                </motion.div>
              </div>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#1E0F24] rounded-full">
              <motion.div className="h-2 rounded-full bg-gradient-to-r from-red-600 to-purple-600" variants={scanProgressVariants} initial="initial" animate="animate" custom={scanProgress} transition={{
            duration: 0.3
          }} />
            </div>
            <div className="mt-4 bg-[#1E0F24] rounded-lg p-3 border border-[#4A3361]">
              <div className="flex items-center mb-2 text-xs text-white/70">
                <TerminalIcon className="w-3 h-3 mr-1" />
                <span>scan-log</span>
              </div>
              <div className="font-mono text-xs text-white/90 h-48 overflow-y-auto p-2 bg-[#1A0E21] rounded">
                {scanMessages.map((message, index) => <motion.div key={index} variants={messageVariants} initial="initial" animate="animate" className="mb-1 flex">
                    <span className="text-white/50 mr-2">{`[${new Date(message.timestamp).toLocaleTimeString()}]`}</span>
                    <span className={message.phase === 1 ? 'text-blue-400' : message.phase === 2 ? 'text-purple-400' : 'text-[#0FDC7A]'}>
                      {message.text}
                    </span>
                  </motion.div>)}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </motion.div>}
        {showPricingTrigger ? <PricingTrigger variant="act" title="Apply est prêt à postuler pour toi..." subtitle="Pendant que tu dors, on peut faire avancer ta carrière." description="Apply a détecté des offres qui correspondent parfaitement à ton profil. Active le pilote automatique pour postuler intelligemment et maximiser tes chances." ctaText="Activer l'AutoPilot complet" modalTitle="Laisse Apply travailler pour toi" modalSubtitle="Ton assistant de carrière personnel" modalDescription="Nos utilisateurs premium reçoivent 3x plus de réponses positives grâce à notre technologie d'AutoPilot qui optimise chaque candidature et suit les relances automatiquement." modalCtaText="Activer l'AutoPilot complet" onContinueFree={handleContinueFree} onUpgrade={handleUpgrade} highlightedTierId="pro" /> : scanComplete ? <motion.div className="space-y-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }}>
            <motion.div className="bg-[#1E0F24] rounded-lg p-5 border border-[#4A3361]" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1,
          duration: 0.4
        }}>
              <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                <BarChartIcon className="w-5 h-5 mr-2 text-red-500" />
                Résultats du scan
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <motion.div className="bg-[#1A0E21] rounded-lg p-3 text-center" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.1,
              duration: 0.4
            }}>
                  <motion.div className="text-2xl font-bold text-white mb-1" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.4,
                duration: 0.5
              }}>
                    {scanStats.totalOffers}
                  </motion.div>
                  <div className="text-xs text-white/70">Offres totales</div>
                </motion.div>
                <motion.div className="bg-[#1A0E21] rounded-lg p-3 text-center" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.2,
              duration: 0.4
            }}>
                  <motion.div className="text-2xl font-bold text-white mb-1" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.5,
                duration: 0.5
              }}>
                    {scanStats.relevantOffers}
                  </motion.div>
                  <div className="text-xs text-white/70">
                    Offres pertinentes
                  </div>
                </motion.div>
                <motion.div className="bg-[#1A0E21] rounded-lg p-3 text-center" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.3,
              duration: 0.4
            }}>
                  <motion.div className="text-2xl font-bold text-red-500 mb-1" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.6,
                duration: 0.5
              }}>
                    {scanStats.highMatchOffers}
                  </motion.div>
                  <div className="text-xs text-white/70">
                    Correspondances fortes
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className="flex justify-end" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.7,
          duration: 0.5
        }}>
              <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                <Button variant="act" onClick={onComplete} className="flex items-center">
                  <span>Voir les opportunités</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div> : <motion.div className="flex justify-end" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }}>
            <motion.div variants={scanButtonVariants} initial="initial" whileHover={!canStartScan() || scanning ? 'disabled' : 'hover'} whileTap={!canStartScan() || scanning ? {} : {
          scale: 0.97
        }}>
              <Button variant="act" onClick={startScan} disabled={!canStartScan() || scanning} className={`flex items-center relative overflow-hidden ${!canStartScan() || scanning ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {scanning ? <>
                    <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                    <span>Scan en cours...</span>
                  </> : <>
                    <SearchIcon className="w-4 h-4 mr-2" />
                    <span>Lancer le scan</span>
                    {/* Scan effect on hover */}
                    <motion.div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg pointer-events-none" initial={{
                opacity: 0
              }} whileHover={{
                opacity: 1
              }} animate={{
                opacity: 0
              }}>
                      <motion.div className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-act-cta/40 to-transparent" animate={{
                  left: ['-20%', '120%']
                }} transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }} />
                    </motion.div>
                  </>}
              </Button>
            </motion.div>
          </motion.div>}
      </Card>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.3
    }}>
        <Card variant="act" className="p-5 bg-[#2E1F3B] border-[#4A3361]">
          <div className="flex items-start">
            <motion.div className="p-2 bg-[#1E0F24] rounded-full mr-3 mt-1 border border-[#4A3361]" animate={{
            scale: [1, 1.05, 1],
            boxShadow: ['0 0 0px rgba(203, 166, 247, 0)', '0 0 10px rgba(203, 166, 247, 0.3)', '0 0 0px rgba(203, 166, 247, 0)']
          }} transition={{
            duration: 4,
            repeat: Infinity
          }}>
              <LockIcon className="w-4 h-4 text-red-500" />
            </motion.div>
            <div>
              <h3 className="font-medium text-white mb-2">
                Confidentialité & Sécurité
              </h3>
              <p className="text-sm text-white/90">
                Apply utilise des connexions sécurisées et ne stocke jamais tes
                identifiants. Nous analysons uniquement les offres d'emploi et
                les messages liés à ta recherche professionnelle. Tu peux
                déconnecter tes comptes à tout moment.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>;
};