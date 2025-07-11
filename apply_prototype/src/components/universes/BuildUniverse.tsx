import React, { useEffect, useState } from 'react';
import { Header } from '../common/Header';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FileTextIcon, BriefcaseIcon, GraduationCapIcon, AwardIcon, LanguagesIcon, PlusIcon, CheckIcon, UserIcon, ImportIcon, EditIcon, EyeIcon, BarChartIcon, RocketIcon, HeartIcon, StarIcon } from 'lucide-react';
import { EntryScreen } from '../build/EntryScreen';
import { ResumeEditor } from '../build/ResumeEditor';
import { ResumePreview } from '../build/ResumePreview';
import { ConfidenceScore } from '../build/ConfidenceScore';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
export const BuildUniverse = ({
  onBack,
  importedCVData = null
}) => {
  const {
    hasImportedCV
  } = useUser();
  const [currentStep, setCurrentStep] = useState(hasImportedCV ? 'editor' : 'entry');
  const [userProfile, setUserProfile] = useState('professional'); // student, professional, senior
  const [importedResume, setImportedResume] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(30);
  const [completedSections, setCompletedSections] = useState(['personal']);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressPulse, setProgressPulse] = useState(false);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  // État pour stocker les données du CV
  const [cvData, setCvData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: []
  });
  const [sections, setSections] = useState([{
    id: 'personal',
    title: 'Informations personnelles',
    icon: <UserIcon className="w-4 h-4" />,
    complete: true
  }, {
    id: 'experience',
    title: 'Expérience professionnelle',
    icon: <BriefcaseIcon className="w-4 h-4" />,
    complete: false
  }, {
    id: 'education',
    title: 'Formation',
    icon: <GraduationCapIcon className="w-4 h-4" />,
    complete: false
  }, {
    id: 'skills',
    title: 'Compétences',
    icon: <StarIcon className="w-4 h-4" />,
    complete: false
  }, {
    id: 'certifications',
    title: 'Certifications',
    icon: <AwardIcon className="w-4 h-4" />,
    complete: false
  }, {
    id: 'languages',
    title: 'Langues',
    icon: <LanguagesIcon className="w-4 h-4" />,
    complete: false
  }]);
  // Effect to handle imported CV data
  useEffect(() => {
    if (importedCVData) {
      // Update CV data with imported data
      setCvData(importedCVData);
      // Mark sections as complete based on imported data
      const updatedSections = sections.map(section => {
        // Check if the section has data
        const hasData = importedCVData[section.id] && (Array.isArray(importedCVData[section.id]) ? importedCVData[section.id].length > 0 : Object.keys(importedCVData[section.id]).length > 0);
        return {
          ...section,
          complete: hasData
        };
      });
      setSections(updatedSections);
      // Update completed sections
      const newCompletedSections = updatedSections.filter(section => section.complete).map(section => section.id);
      setCompletedSections(newCompletedSections);
      // Set imported resume info
      setImportedResume({
        name: 'CV_Importé.pdf',
        size: '245 KB'
      });
      // Increase confidence score
      setConfidenceScore(Math.min(30 + newCompletedSections.length * 10, 90));
      // Pulse the progress bar
      setProgressPulse(true);
      setTimeout(() => setProgressPulse(false), 1500);
    }
  }, [importedCVData]);
  // Ajout d'un useEffect pour réagir aux changements de hasImportedCV
  useEffect(() => {
    if (hasImportedCV) {
      setCurrentStep('editor');
    }
  }, [hasImportedCV]);
  // Fonction de gestion pour l'importation de CV
  const handleImport = () => {
    // Cette fonction sera passée à EntryScreen
    setCurrentStep('editor');
  };
  // Fonction de gestion pour la création d'un nouveau CV
  const handleCreateNew = () => {
    // Cette fonction sera passée à EntryScreen
    setCurrentStep('editor');
  };
  // Background animation effect
  const [backgroundFlow, setBackgroundFlow] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundFlow(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Check if ready to apply
    if (isReadyToApply() && !showReadyMessage) {
      setShowReadyMessage(true);
    }
  }, [completedSections, confidenceScore]);
  const startFromScratch = () => {
    setIsTransitioning(true);
    // Play transition sound
    const audio = new Audio('/sounds/transition.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    setTimeout(() => {
      setCurrentStep('editor');
      setImportedResume(null);
      setIsTransitioning(false);
    }, 800);
  };
  const importResume = () => {
    setIsTransitioning(true);
    // Play transition sound
    const audio = new Audio('/sounds/transition.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    setTimeout(() => {
      // Simulate resume import
      setImportedResume({
        name: 'Mon_CV.pdf',
        size: '245 KB'
      });
      setCurrentStep('editor');
      setIsTransitioning(false);
      // Simulate sections being analyzed and marked as complete
      setTimeout(() => {
        const updatedSections = sections.map((section, index) => ({
          ...section,
          complete: index < 3 // Mark first 3 sections as complete for demo
        }));
        setSections(updatedSections);
        setCompletedSections(['personal', 'objective', 'experience']);
        // Pulse the progress bar
        setProgressPulse(true);
        setTimeout(() => setProgressPulse(false), 1500);
        // Increase confidence score with animation effect
        const originalScore = confidenceScore;
        const targetScore = 45;
        const step = 1;
        const interval = 50;
        const incrementScore = () => {
          setConfidenceScore(prev => {
            if (prev + step >= targetScore) {
              clearInterval(timer);
              return targetScore;
            }
            return prev + step;
          });
        };
        const timer = setInterval(incrementScore, interval);
      }, 1500);
    }, 800);
  };
  // Fonction mise à jour pour recevoir les données de section complétée
  const completeSection = (sectionId, sectionData) => {
    // Mettre à jour les sections
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          complete: true
        };
      }
      return section;
    });
    setSections(updatedSections);
    // Ajouter la section aux sections complétées
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
      // Pulse the progress bar
      setProgressPulse(true);
      setTimeout(() => setProgressPulse(false), 1500);
      // Increase confidence score with animation
      const originalScore = confidenceScore;
      const targetScore = Math.min(confidenceScore + 10, 100);
      const step = 1;
      const interval = 50;
      const incrementScore = () => {
        setConfidenceScore(prev => {
          if (prev + step >= targetScore) {
            clearInterval(timer);
            return targetScore;
          }
          return prev + step;
        });
      };
      const timer = setInterval(incrementScore, interval);
    }
    // Mettre à jour les données du CV avec les nouvelles informations
    setCvData(prevData => ({
      ...prevData,
      [sectionId]: sectionData
    }));
  };
  const getProgress = () => {
    return Math.round(completedSections.length / sections.length * 100);
  };
  const isReadyToApply = () => {
    return confidenceScore >= 70 || completedSections.length >= 5;
  };
  const renderContent = () => {
    const contentVariants = {
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
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3
        }
      }
    };
    if (isTransitioning) {
      return <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-amber-800">Chargement en cours...</p>
          </div>
        </div>;
    }
    switch (currentStep) {
      case 'entry':
        return <motion.div key="entry" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <EntryScreen onImport={handleImport} onCreateNew={handleCreateNew} />
          </motion.div>;
      case 'editor':
        return <motion.div key="editor" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-3/5">
                <ResumeEditor sections={sections} onCompleteSection={completeSection} importedResume={importedResume} userProfile={userProfile} cvData={cvData} />
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <ResumePreview completedSections={completedSections} sections={sections} cvData={cvData} />
                <ConfidenceScore score={confidenceScore} completedSections={completedSections.length} totalSections={sections.length} />
              </div>
            </div>
            <AnimatePresence>
              {showReadyMessage && isReadyToApply() && <motion.div initial={{
              opacity: 0,
              y: 20,
              height: 0
            }} animate={{
              opacity: 1,
              y: 0,
              height: 'auto'
            }} exit={{
              opacity: 0,
              y: -20,
              height: 0
            }} transition={{
              duration: 0.5
            }} className="overflow-hidden">
                  <Card variant="build" className="bg-gradient-to-r from-amber-50 to-ivory p-6 rounded-xl border border-amber-100 text-center relative overflow-hidden">
                    <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2
                }} className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckIcon className="w-8 h-8 text-amber-700" />
                    </motion.div>
                    <motion.h3 className="text-xl font-light text-amber-900 mb-3" initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.4
                }}>
                      Votre CV est prêt à impressionner
                    </motion.h3>
                    <motion.p className="text-gray-700 mb-5" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: 0.6
                }}>
                      Vous avez créé un CV professionnel qui reflète votre
                      valeur. Prêt à passer à l'étape suivante ?
                    </motion.p>
                    <motion.div className="flex flex-col sm:flex-row gap-3 justify-center" initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.8
                }}>
                      <motion.div whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                        <Button variant="build" className="flex items-center justify-center group">
                          <FileTextIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Exporter en PDF
                          <motion.span className="absolute inset-0 rounded-lg bg-build-accent/10" initial={{
                        scale: 0,
                        opacity: 0
                      }} whileHover={{
                        scale: 1,
                        opacity: 1
                      }} transition={{
                        duration: 0.3
                      }} />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                        <Button className="flex items-center justify-center group" onClick={() => {
                      // Navigate to applications page
                      onBack(); // First go back to dashboard
                      setTimeout(() => {
                        // Then navigate to applications (this simulates the navigation flow)
                        window.dispatchEvent(new CustomEvent('navigateToApplications'));
                      }, 100);
                    }}>
                          <RocketIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Commencer à postuler
                          <motion.span className="absolute inset-0 bg-global-cta/20 rounded-lg" initial={{
                        scale: 0,
                        opacity: 0
                      }} whileHover={{
                        scale: 1,
                        opacity: 1
                      }} transition={{
                        duration: 0.3
                      }} />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </Card>
                </motion.div>}
            </AnimatePresence>
          </motion.div>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen flex flex-col bg-gradient-to-br from-cream via-build-bg to-build-bg/90 relative overflow-hidden" style={{
    backgroundImage: `radial-gradient(circle at ${50 + Math.sin(backgroundFlow * 0.05) * 10}% ${50 + Math.cos(backgroundFlow * 0.05) * 10}%, rgba(244, 211, 94, 0.1) 0%, transparent 50%)`
  }}>
      <Header title="Construire votre CV" onBack={onBack} variant="build" progress={currentStep === 'entry' ? 10 : getProgress()} progressPulse={progressPulse} />
      <main className="flex-1 container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </main>
    </div>;
};