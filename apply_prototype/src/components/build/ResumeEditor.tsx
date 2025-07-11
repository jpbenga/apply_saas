import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UserIcon, BriefcaseIcon, GraduationCapIcon, AwardIcon, LanguagesIcon, PlusIcon, CheckIcon, FileTextIcon, RefreshCwIcon, LightbulbIcon, AlertCircleIcon, HelpCircleIcon, ArrowUpIcon, ArrowDownIcon, GlobeIcon, StarIcon, HeartIcon, EditIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CVSectionCarousel } from './CVSectionCarousel';
// Ajout des données fictives
const mockUserData = {
  education: [{
    id: 'edu1',
    degree: 'Master en Informatique',
    school: 'Université Paris-Saclay',
    year: '2018 - 2020',
    description: 'Spécialisation en Intelligence Artificielle et Science des Données'
  }, {
    id: 'edu2',
    degree: 'Licence en Informatique',
    school: 'Université de Lyon',
    year: '2015 - 2018',
    description: 'Programmation, algorithmes et structures de données'
  }],
  skills: [{
    id: 'skill1',
    name: 'React',
    level: 90,
    type: 'hard'
  }, {
    id: 'skill2',
    name: 'TypeScript',
    level: 85,
    type: 'hard'
  }, {
    id: 'skill3',
    name: 'Node.js',
    level: 75,
    type: 'hard'
  }, {
    id: 'skill4',
    name: 'Python',
    level: 80,
    type: 'hard'
  }, {
    id: 'skill5',
    name: 'SQL',
    level: 70,
    type: 'hard'
  }, {
    id: 'skill6',
    name: 'Communication',
    level: 95,
    type: 'soft'
  }, {
    id: 'skill7',
    name: "Travail d'équipe",
    level: 90,
    type: 'soft'
  }, {
    id: 'skill8',
    name: 'Résolution de problèmes',
    level: 85,
    type: 'soft'
  }, {
    id: 'skill9',
    name: 'Adaptabilité',
    level: 80,
    type: 'soft'
  }],
  certifications: [{
    id: 'cert1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Déc 2022',
    expires: 'Déc 2025',
    credentialId: 'AWS-123456'
  }, {
    id: 'cert2',
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Mar 2021',
    expires: null,
    credentialId: 'PSM-987654'
  }, {
    id: 'cert3',
    name: 'Google Analytics Individual Qualification',
    issuer: 'Google',
    date: 'Jan 2023',
    expires: 'Jan 2024',
    credentialId: 'GA-456789'
  }],
  languages: [{
    id: 'lang1',
    name: 'Français',
    level: 'Natif',
    proficiency: 100
  }, {
    id: 'lang2',
    name: 'Anglais',
    level: 'Courant (C1)',
    proficiency: 85
  }, {
    id: 'lang3',
    name: 'Espagnol',
    level: 'Intermédiaire (B1)',
    proficiency: 60
  }, {
    id: 'lang4',
    name: 'Allemand',
    level: 'Débutant (A2)',
    proficiency: 30
  }],
  experiences: [{
    id: 'exp1',
    title: 'Développeur Full Stack',
    company: 'Tech Innovations',
    period: 'Jan 2021 - Présent',
    description: "Développement d'applications web avec React, Node.js et MongoDB. Participation à l'ensemble du cycle de vie du développement logiciel."
  }, {
    id: 'exp2',
    title: 'Développeur Front-End',
    company: 'Digital Solutions',
    period: 'Mar 2019 - Déc 2020',
    description: "Création d'interfaces utilisateur réactives et accessibles. Collaboration avec les designers et l'équipe back-end."
  }]
};
export const ResumeEditor = ({
  sections,
  onCompleteSection,
  importedResume,
  userProfile,
  cvData = {}
}) => {
  const [activeSectionId, setActiveSectionId] = useState(importedResume ? 'experience' : 'personal');
  const [showATSMode, setShowATSMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [suggestions, setSuggestions] = useState({});
  const [draggedSection, setDraggedSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isCompletingSection, setIsCompletingSection] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipTimerRef = useRef(null);
  // Form field values
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Simulate suggestions as user types
  useEffect(() => {
    if (focusedField === 'jobTitle' && formValues.jobTitle) {
      const jobSuggestions = {
        dev: 'Développeur Frontend',
        dév: 'Développeur Frontend',
        front: 'Développeur Frontend',
        back: 'Développeur Backend',
        full: 'Développeur Full Stack',
        chef: 'Chef de Projet',
        manage: 'Product Manager',
        market: 'Marketing Manager'
      };
      const matchingSuggestion = Object.keys(jobSuggestions).find(key => formValues.jobTitle.toLowerCase().includes(key));
      if (matchingSuggestion && jobSuggestions[matchingSuggestion] !== formValues.jobTitle) {
        setSuggestions({
          ...suggestions,
          jobTitle: jobSuggestions[matchingSuggestion]
        });
      } else {
        setSuggestions({
          ...suggestions,
          jobTitle: null
        });
      }
    }
  }, [formValues.jobTitle, focusedField]);
  const getProfileSpecificTips = () => {
    switch (userProfile) {
      case 'student':
        return "En tant qu'étudiant, mettez en avant vos projets académiques et vos stages.";
      case 'professional':
        return 'Quantifiez vos réalisations avec des chiffres précis pour démontrer votre impact.';
      case 'senior':
        return 'Valorisez votre expertise et votre capacité à transmettre vos connaissances.';
      default:
        return 'Personnalisez chaque section pour mettre en valeur vos points forts.';
    }
  };
  const handleContinueFree = () => {
    setShowPricingTrigger(false);
  };
  const handleUpgrade = () => {
    // Handle upgrade logic
    setShowPricingTrigger(false);
  };
  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };
  const handleInputFocus = field => {
    setFocusedField(field);
    // Clear any existing timer
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }
    // Set a timer to show tooltip if user hesitates
    tooltipTimerRef.current = setTimeout(() => {
      setShowTooltip(field);
    }, 1500);
  };
  const handleInputBlur = () => {
    setFocusedField(null);
    // Clear the timer
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }
    // Keep tooltip visible for a moment before hiding
    setTimeout(() => {
      setShowTooltip(null);
    }, 300);
  };
  const handleSectionComplete = () => {
    setIsCompletingSection(true);
    // Play completion sound
    const audio = new Audio('/sounds/section-complete.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Préparer les données à transmettre au parent
    let sectionData = {};
    if (activeSectionId === 'personal') {
      sectionData = {
        fullName: formValues.fullName || 'Jean Dupont',
        email: formValues.email || 'jean.dupont@email.com',
        phone: formValues.phone || '06 12 34 56 78',
        location: formValues.location || 'Paris, France'
      };
    } else if (activeSectionId === 'experience') {
      // Combiner les expériences existantes avec la nouvelle
      sectionData = [...mockUserData.experiences];
      // Ajouter la nouvelle expérience si les champs sont remplis
      if (formValues.jobTitle || formValues.company) {
        sectionData.push({
          id: `exp${sectionData.length + 1}`,
          title: formValues.jobTitle || 'Nouveau poste',
          company: formValues.company || 'Entreprise',
          period: `${formValues.startDate || 'Date début'} - ${formValues.endDate || 'Présent'}`,
          description: formValues.description || 'Description du poste'
        });
      }
    } else if (activeSectionId === 'education') {
      sectionData = [...mockUserData.education];
    } else if (activeSectionId === 'skills') {
      sectionData = [...mockUserData.skills];
    } else if (activeSectionId === 'certifications') {
      sectionData = [...mockUserData.certifications];
    } else if (activeSectionId === 'languages') {
      sectionData = [...mockUserData.languages];
    }
    // Animate completion then call the callback with the section data
    setTimeout(() => {
      onCompleteSection(activeSectionId, sectionData);
      setIsCompletingSection(false);
      // Close the form after completion
      setFormVisible(false);
      // Find the next incomplete section if available
      const currentIndex = sections.findIndex(s => s.id === activeSectionId);
      const nextIncompleteSection = sections.find((s, index) => index > currentIndex && !s.complete);
      if (nextIncompleteSection) {
        setActiveSectionId(nextIncompleteSection.id);
      }
    }, 1000);
  };
  const handleDragStart = sectionId => {
    setDraggedSection(sectionId);
  };
  const handleDragOver = sectionId => {
    if (draggedSection && draggedSection !== sectionId) {
      setHoveredSection(sectionId);
    }
  };
  const handleDragEnd = () => {
    // Here you would reorder the sections if needed
    setDraggedSection(null);
    setHoveredSection(null);
  };
  const acceptSuggestion = field => {
    setFormValues({
      ...formValues,
      [field]: suggestions[field]
    });
    setSuggestions({
      ...suggestions,
      [field]: null
    });
    // Play acceptance sound
    const audio = new Audio('/sounds/suggestion-accept.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  };
  const handleShowPricing = () => {
    // Handle showing pricing modal through parent component
  };
  const handleSectionChange = sectionId => {
    setActiveSectionId(sectionId);
    setFormVisible(true);
  };
  const tooltipContent = {
    fullName: "Ton nom complet est la première impression que tu donnes. Assure-toi qu'il soit correctement écrit et facile à prononcer.",
    email: 'Utilise une adresse email professionnelle, idéalement basée sur ton nom.',
    phone: 'Inclus ton indicatif pays pour les recruteurs internationaux.',
    location: 'Tu peux mentionner ta ville actuelle et/ou ta disponibilité à déménager.',
    jobTitle: 'Utilise des titres de postes reconnus dans ton industrie pour faciliter les recherches par mots-clés.',
    company: "Le nom de l'entreprise doit être écrit tel qu'il apparaît officiellement.",
    description: "Utilise des verbes d'action et quantifie tes réalisations avec des chiffres précis."
  };
  const renderSectionContent = () => {
    const activeSection = sections.find(s => s.id === activeSectionId);
    if (!activeSection) return null;
    // If form is not visible (after completion), show a message and button to edit again
    if (!formVisible) {
      return <motion.div className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm relative overflow-hidden text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.4
      }}>
          <div className="p-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckIcon className="w-8 h-8 text-amber-700" />
            </div>
            <h3 className="text-lg font-medium text-amber-900 mb-2">
              Section {activeSection.title} complétée
            </h3>
            <p className="text-gray-600 mb-6">
              Cette section a été validée et sera intégrée à votre CV.
            </p>
            <Button variant="secondary" onClick={() => setFormVisible(true)} className="mx-auto">
              <EditIcon className="w-4 h-4 mr-2" />
              Modifier cette section
            </Button>
          </div>
        </motion.div>;
    }
    const editorVariants = {
      hidden: {
        opacity: 0,
        y: 20
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4
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
    return <AnimatePresence mode="wait">
        <motion.div key={activeSectionId} variants={editorVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-xl border border-amber-100 p-6 shadow-sm relative overflow-hidden">
          {isCompletingSection && <motion.div className="absolute inset-0 bg-amber-50 flex items-center justify-center z-50" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              <motion.div initial={{
            scale: 0.8,
            opacity: 0
          }} animate={{
            scale: [0.8, 1.2, 1],
            opacity: [0, 1, 0.7]
          }} transition={{
            duration: 0.8
          }}>
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-10 h-10 text-amber-700" />
                </div>
              </motion.div>
            </motion.div>}
          <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-build-accent/20 to-build-cta/20" initial={{
          scaleX: 0,
          transformOrigin: 'left'
        }} animate={{
          scaleX: 1
        }} transition={{
          duration: 1
        }} />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <motion.div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3" whileHover={{
              scale: 1.1,
              rotate: 5
            }} transition={{
              type: 'spring',
              stiffness: 400
            }}>
                {activeSection.icon}
              </motion.div>
              <h3 className="text-lg font-medium text-amber-900">
                {activeSection.title}
              </h3>
            </div>
            <div className="flex gap-2">
              <motion.button className="p-2 rounded-full hover:bg-amber-50 transition-colors relative" title="Suggestions IA" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <LightbulbIcon className="w-5 h-5 text-amber-600" />
                <motion.span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }} />
              </motion.button>
              <motion.button className={`p-2 rounded-full transition-colors ${showATSMode ? 'bg-amber-100 text-amber-800' : 'hover:bg-amber-50 text-gray-500'}`} onClick={() => {
              setShowATSMode(!showATSMode);
              // Play toggle sound
              const audio = new Audio('/sounds/toggle.mp3');
              audio.volume = 0.2;
              audio.play().catch(e => console.log('Audio playback prevented:', e));
            }} title="Mode ATS" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }}>
                <AlertCircleIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <AnimatePresence>
            {showATSMode && <motion.div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800" initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.3
          }}>
                <p className="flex items-start">
                  <AlertCircleIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    Mode ATS activé. Les systèmes de suivi des candidatures
                    recherchent des mots-clés spécifiques. Utilisez des termes
                    précis de votre secteur et évitez les mises en forme
                    complexes.
                  </span>
                </p>
              </motion.div>}
          </AnimatePresence>
          {activeSectionId === 'personal' && <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <input type="text" className={`w-full p-2 border ${focusedField === 'fullName' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="Jean Dupont" value={formValues.fullName} onChange={e => handleInputChange('fullName', e.target.value)} onFocus={() => handleInputFocus('fullName')} onBlur={handleInputBlur} />
                  <AnimatePresence>
                    {showTooltip === 'fullName' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                  opacity: 0,
                  y: -5
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -5
                }} transition={{
                  duration: 0.2
                }}>
                        <div className="flex items-start">
                          <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                          <p>{tooltipContent.fullName}</p>
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" className={`w-full p-2 border ${focusedField === 'email' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="jean.dupont@email.com" value={formValues.email} onChange={e => handleInputChange('email', e.target.value)} onFocus={() => handleInputFocus('email')} onBlur={handleInputBlur} />
                  <AnimatePresence>
                    {showTooltip === 'email' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                  opacity: 0,
                  y: -5
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -5
                }}>
                        <div className="flex items-start">
                          <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                          <p>{tooltipContent.email}</p>
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input type="tel" className={`w-full p-2 border ${focusedField === 'phone' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="06 12 34 56 78" value={formValues.phone} onChange={e => handleInputChange('phone', e.target.value)} onFocus={() => handleInputFocus('phone')} onBlur={handleInputBlur} />
                  <AnimatePresence>
                    {showTooltip === 'phone' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                  opacity: 0,
                  y: -5
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -5
                }}>
                        <div className="flex items-start">
                          <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                          <p>{tooltipContent.phone}</p>
                        </div>
                      </motion.div>}
                  </AnimatePresence>
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input type="text" className={`w-full p-2 border ${focusedField === 'location' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="Paris, France" value={formValues.location} onChange={e => handleInputChange('location', e.target.value)} onFocus={() => handleInputFocus('location')} onBlur={handleInputBlur} />
                <AnimatePresence>
                  {showTooltip === 'location' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                opacity: 0,
                y: -5
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -5
              }}>
                      <div className="flex items-start">
                        <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                        <p>{tooltipContent.location}</p>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>}
          {activeSectionId === 'experience' && <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Expériences</h4>
                <motion.button className="text-amber-600 text-sm hover:text-amber-700 flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Ajouter une expérience
                </motion.button>
              </div>
              {/* Liste des expériences */}
              <div className="space-y-4">
                {mockUserData.experiences.map((exp, index) => <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <div className="hidden md:block text-gray-400">•</div>
                      <span className="text-gray-700">{exp.company}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      {exp.period}
                    </div>
                    <p className="text-gray-600 text-sm">{exp.description}</p>
                    <div className="mt-2 flex justify-end">
                      <Button variant="secondary" size="small" className="flex items-center">
                        <EditIcon className="w-3.5 h-3.5 mr-1.5" />
                        Modifier
                      </Button>
                    </div>
                  </div>)}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste
                </label>
                <div className="relative">
                  <input type="text" className={`w-full p-2 border ${focusedField === 'jobTitle' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="Chef de projet marketing" value={formValues.jobTitle} onChange={e => handleInputChange('jobTitle', e.target.value)} onFocus={() => handleInputFocus('jobTitle')} onBlur={handleInputBlur} />
                  {suggestions.jobTitle && focusedField === 'jobTitle' && <div className="absolute right-2 top-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs cursor-pointer" onClick={() => acceptSuggestion('jobTitle')}>
                      {suggestions.jobTitle} ✓
                    </div>}
                </div>
                {showATSMode && <motion.p className="text-xs text-green-600 mt-1 flex items-center" initial={{
              opacity: 0,
              x: -5
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.2
            }}>
                    <CheckIcon className="w-3 h-3 mr-1" />
                    Terme bien reconnu par les ATS
                  </motion.p>}
                <AnimatePresence>
                  {showTooltip === 'jobTitle' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                opacity: 0,
                y: -5
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -5
              }}>
                      <div className="flex items-start">
                        <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                        <p>{tooltipContent.jobTitle}</p>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entreprise
                </label>
                <input type="text" className={`w-full p-2 border ${focusedField === 'company' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200`} placeholder="Entreprise ABC" value={formValues.company} onChange={e => handleInputChange('company', e.target.value)} onFocus={() => handleInputFocus('company')} onBlur={handleInputBlur} />
                <AnimatePresence>
                  {showTooltip === 'company' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                opacity: 0,
                y: -5
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -5
              }}>
                      <div className="flex items-start">
                        <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                        <p>{tooltipContent.company}</p>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Janvier 2020" value={formValues.startDate} onChange={e => handleInputChange('startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Présent" value={formValues.endDate} onChange={e => handleInputChange('endDate', e.target.value)} />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea className={`w-full p-2 border ${focusedField === 'description' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300'} rounded-lg focus:outline-none transition-all duration-200 min-h-[100px]`} placeholder="Décrivez vos responsabilités et réalisations..." value={formValues.description} onChange={e => handleInputChange('description', e.target.value)} onFocus={() => handleInputFocus('description')} onBlur={handleInputBlur}></textarea>
                {showATSMode && <motion.p className="text-xs text-amber-600 mt-1 flex items-center" initial={{
              opacity: 0,
              x: -5
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.2
            }}>
                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                    Ajoutez des mots-clés comme "gestion de projet", "KPI",
                    "ROI"
                  </motion.p>}
                <AnimatePresence>
                  {showTooltip === 'description' && <motion.div className="absolute left-0 -bottom-12 z-10 bg-white border border-amber-200 rounded-lg p-2 shadow-lg text-xs text-gray-700 w-64" initial={{
                opacity: 0,
                y: -5
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -5
              }}>
                      <div className="flex items-start">
                        <HelpCircleIcon className="w-3 h-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
                        <p>{tooltipContent.description}</p>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div>
              <div className="flex justify-between items-center pt-2">
                <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <Button variant="secondary" size="small" className="flex items-center">
                    <LightbulbIcon className="w-4 h-4 mr-1" />
                    Suggestions IA
                  </Button>
                </motion.div>
                <div className="text-xs text-gray-500">
                  Cette section inspire{' '}
                  <span className="text-green-600 font-medium">
                    beaucoup de confiance
                  </span>
                </div>
              </div>
            </div>}
          {/* Nouvelle section pour l'éducation */}
          {activeSectionId === 'education' && <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Formation</h4>
                <motion.button className="text-amber-600 text-sm hover:text-amber-700 flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Ajouter une formation
                </motion.button>
              </div>
              {/* Liste des formations */}
              <div className="space-y-4 relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                {mockUserData.education.map(edu => <div key={edu.id} className="pl-10 relative z-10">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white z-20" style={{
                transform: 'translateX(-50%)'
              }} />
                    <div className="p-3 border border-gray-200 rounded-lg bg-white">
                      <h4 className="font-medium text-gray-900">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-700 text-sm">
                          {edu.school}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {edu.year}
                        </span>
                      </div>
                      {edu.description && <p className="text-gray-600 text-xs mt-1.5">
                          {edu.description}
                        </p>}
                      <div className="mt-2 flex justify-end">
                        <Button variant="secondary" size="small" className="flex items-center">
                          <EditIcon className="w-3.5 h-3.5 mr-1.5" />
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
              {/* Formulaire d'ajout */}
              <div className="p-4 border border-dashed border-amber-200 rounded-lg bg-amber-50/30">
                <h5 className="font-medium text-amber-800 mb-3">
                  Ajouter une nouvelle formation
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diplôme
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Master, Licence, BTS..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Établissement
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nom de l'école ou université" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Année de début
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="2018" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Année de fin
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="2020" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (optionnel)
                    </label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg min-h-[80px]" placeholder="Spécialisation, projets importants..."></textarea>
                  </div>
                </div>
              </div>
            </div>}
          {/* Nouvelle section pour les compétences */}
          {activeSectionId === 'skills' && <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Compétences</h4>
                <motion.button className="text-amber-600 text-sm hover:text-amber-700 flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Ajouter une compétence
                </motion.button>
              </div>
              {/* Compétences techniques */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <StarIcon className="w-4 h-4 text-amber-500 mr-1.5" />
                  Compétences techniques
                </h5>
                <div className="flex flex-wrap gap-2">
                  {mockUserData.skills.filter(skill => skill.type === 'hard').map(skill => <div key={skill.id} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm flex items-center gap-1.5">
                        <span>{skill.name}</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{
                    width: `${skill.level}%`
                  }} />
                        </div>
                        <button className="ml-1 text-gray-400 hover:text-gray-600">
                          <EditIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>)}
                </div>
              </div>
              {/* Soft skills */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <HeartIcon className="w-4 h-4 text-purple-500 mr-1.5" />
                  Soft skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {mockUserData.skills.filter(skill => skill.type === 'soft').map(skill => <div key={skill.id} className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm flex items-center gap-1.5">
                        <span>{skill.name}</span>
                        <button className="ml-1 text-gray-400 hover:text-gray-600">
                          <EditIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>)}
                </div>
              </div>
              {/* Formulaire d'ajout */}
              <div className="p-4 border border-dashed border-amber-200 rounded-lg bg-amber-50/30">
                <h5 className="font-medium text-amber-800 mb-3">
                  Ajouter une nouvelle compétence
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la compétence
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: JavaScript, Gestion de projet..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de compétence
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center">
                        <input type="radio" name="skillType" className="mr-1.5" defaultChecked />
                        <span className="text-sm">Technique</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="skillType" className="mr-1.5" />
                        <span className="text-sm">Soft skill</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau
                    </label>
                    <input type="range" min="1" max="100" defaultValue="75" className="w-full accent-amber-500" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Débutant</span>
                      <span>Intermédiaire</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Nouvelle section pour les certifications */}
          {activeSectionId === 'certifications' && <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Certifications</h4>
                <motion.button className="text-amber-600 text-sm hover:text-amber-700 flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Ajouter une certification
                </motion.button>
              </div>
              {/* Liste des certifications */}
              <div className="space-y-4">
                {mockUserData.certifications.map(cert => <div key={cert.id} className="p-4 border border-gray-200 rounded-lg relative">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-full mr-3 mt-0.5">
                        <AwardIcon className="w-4 h-4 text-amber-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {cert.name}
                        </h4>
                        <p className="text-gray-700 text-sm">{cert.issuer}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-gray-500">
                            <span>Obtenu : {cert.date}</span>
                            {cert.expires && <span className="ml-2">
                                • Expire : {cert.expires}
                              </span>}
                          </div>
                          {!cert.expires && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                              <CheckIcon className="w-3 h-3 mr-1" />
                              Permanent
                            </span>}
                        </div>
                        {cert.credentialId && <div className="mt-1.5 text-xs text-gray-500">
                            ID : {cert.credentialId}
                          </div>}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="secondary" size="small" className="flex items-center">
                        <EditIcon className="w-3.5 h-3.5 mr-1.5" />
                        Modifier
                      </Button>
                    </div>
                  </div>)}
              </div>
              {/* Formulaire d'ajout */}
              <div className="p-4 border border-dashed border-amber-200 rounded-lg bg-amber-50/30">
                <h5 className="font-medium text-amber-800 mb-3">
                  Ajouter une nouvelle certification
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de la certification
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: AWS Certified Solutions Architect" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organisme certificateur
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: Amazon Web Services" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'obtention
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: Déc 2022" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'expiration (optionnel)
                      </label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: Déc 2025" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID de certification (optionnel)
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: AWS-123456" />
                  </div>
                </div>
              </div>
            </div>}
          {/* Nouvelle section pour les langues */}
          {activeSectionId === 'languages' && <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Langues</h4>
                <motion.button className="text-amber-600 text-sm hover:text-amber-700 flex items-center" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Ajouter une langue
                </motion.button>
              </div>
              {/* Liste des langues */}
              <div className="space-y-3">
                {mockUserData.languages.map(language => <div key={language.id} className="p-3 border border-gray-200 rounded-lg relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-1.5 bg-blue-100 rounded-full mr-2.5">
                          <GlobeIcon className="w-3.5 h-3.5 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {language.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {language.level}
                          </p>
                        </div>
                      </div>
                      <div className="w-24">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${language.proficiency >= 80 ? 'bg-green-500' : language.proficiency >= 60 ? 'bg-blue-500' : language.proficiency >= 40 ? 'bg-amber-500' : 'bg-gray-500'}`} style={{
                      width: `${language.proficiency}%`
                    }} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="secondary" size="small" className="flex items-center">
                        <EditIcon className="w-3.5 h-3.5 mr-1.5" />
                        Modifier
                      </Button>
                    </div>
                  </div>)}
              </div>
              {/* Formulaire d'ajout */}
              <div className="p-4 border border-dashed border-amber-200 rounded-lg bg-amber-50/30">
                <h5 className="font-medium text-amber-800 mb-3">
                  Ajouter une nouvelle langue
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Langue
                    </label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: Anglais, Espagnol..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                      <option value="">Sélectionnez un niveau</option>
                      <option value="a1">Débutant (A1)</option>
                      <option value="a2">Élémentaire (A2)</option>
                      <option value="b1">Intermédiaire (B1)</option>
                      <option value="b2">Intermédiaire avancé (B2)</option>
                      <option value="c1">Avancé (C1)</option>
                      <option value="c2">Maîtrise (C2)</option>
                      <option value="native">Langue maternelle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maîtrise
                    </label>
                    <input type="range" min="1" max="100" defaultValue="60" className="w-full accent-amber-500" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Débutant</span>
                      <span>Intermédiaire</span>
                      <span>Courant</span>
                      <span>Natif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          <motion.div className="mt-6 flex justify-end" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }}>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button onClick={handleSectionComplete} className="flex items-center group relative overflow-hidden">
                <motion.span className="absolute inset-0 bg-amber-400/20" initial={{
                scale: 0,
                opacity: 0
              }} whileHover={{
                scale: 1,
                opacity: 1
              }} transition={{
                duration: 0.3
              }} />
                <CheckIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Valider cette section
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>;
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-amber-900">Éditeur de CV</h2>
        <div className="flex items-center space-x-3">
          {importedResume && <motion.div className="flex items-center text-sm text-gray-600" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.5
        }}>
              <FileTextIcon className="w-4 h-4 mr-1" />
              <span>Importé : {importedResume.name}</span>
            </motion.div>}
        </div>
      </div>
      {/* Mobile section carousel */}
      {isMobile && <CVSectionCarousel sections={sections} activeSectionId={activeSectionId} onSectionChange={handleSectionChange} />}
      {/* Desktop section grid */}
      {!isMobile && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {sections.map(section => <motion.div key={section.id} whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} drag={!section.complete} dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }} onDragStart={() => handleDragStart(section.id)} onDragEnd={handleDragEnd} onHoverStart={() => handleDragOver(section.id)} className={`${draggedSection === section.id ? 'z-10' : 'z-0'} ${hoveredSection === section.id ? 'scale-105' : ''}`}>
              <Card variant={section.complete ? 'build' : 'default'} className={`p-4 cursor-pointer transition-all h-full ${activeSectionId === section.id ? 'ring-2 ring-amber-400' : ''}`} onClick={() => {
          if (activeSectionId !== section.id) {
            // Play soft click sound
            const audio = new Audio('/sounds/soft-click.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio playback prevented:', e));
            setActiveSectionId(section.id);
            setFormVisible(true); // Show the form when switching to a new section
            // If this section has imported data, pre-populate the form
            if (cvData[section.id]) {
              setCurrentSectionData(cvData[section.id]);
            }
          }
        }}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <motion.div className={`p-2.5 rounded-full mr-3 ${section.complete ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`} whileHover={{
                rotate: [0, -5, 5, -5, 0]
              }} transition={{
                duration: 0.5
              }}>
                      {section.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {section.title}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {section.complete ? 'Complété' : 'À compléter'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end">
                    {section.complete ? <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                stiffness: 500,
                damping: 15
              }}>
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      </motion.div> : <motion.div whileHover={{
                rotate: 90
              }} transition={{
                duration: 0.2
              }}>
                        <PlusIcon className="w-5 h-5 text-amber-600" />
                      </motion.div>}
                  </div>
                </div>
                {!section.complete && hoveredSection === section.id && draggedSection && <motion.div className="absolute inset-0 border-2 border-dashed border-amber-400 rounded-xl pointer-events-none" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} />}
                {!section.complete && <motion.div className="absolute -right-1 -bottom-1 p-1 rounded-full bg-amber-100 text-amber-700 shadow-sm opacity-0 group-hover:opacity-100" initial={{
            opacity: 0
          }} whileHover={{
            opacity: 1,
            rotate: 180
          }} transition={{
            duration: 0.3
          }}>
                    <ArrowUpIcon className="w-3 h-3" />
                  </motion.div>}
              </Card>
            </motion.div>)}
        </div>}
      {renderSectionContent()}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }}>
        <Card variant="build" className="p-4 border-amber-200 relative overflow-hidden">
          <motion.div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-100/20 rounded-full" animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.1, 0.2]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }} />
          <div className="flex items-start relative z-10">
            <motion.div className="p-2 bg-amber-100 rounded-full mr-3 mt-1" whileHover={{
            rotate: [0, -5, 5, -5, 0]
          }} transition={{
            duration: 0.5
          }}>
              <LightbulbIcon className="w-4 h-4 text-amber-700" />
            </motion.div>
            <div>
              <motion.h3 className="font-medium text-amber-900 mb-1" whileHover={{
              x: 3
            }} transition={{
              type: 'spring',
              stiffness: 300
            }}>
                Conseil personnalisé
              </motion.h3>
              <motion.p className="text-sm text-gray-700" initial={{
              opacity: 0.8
            }} whileHover={{
              opacity: 1,
              scale: 1.01
            }}>
                {getProfileSpecificTips()}
              </motion.p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>;
};