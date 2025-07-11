import React, { useEffect, useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardIcon, FileTextIcon, PenIcon, CheckCircleIcon, SendIcon, UploadIcon, ScanSearchIcon, SparklesIcon, ArrowRightIcon, AlertCircleIcon, DownloadIcon, SaveIcon, XIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, RefreshCwIcon, CheckIcon, MailIcon, LightbulbIcon, EditIcon, MessageSquareIcon, Eye as EyeIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
export const NewApplicationFlow = ({
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [offerText, setOfferText] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const [coverLetterTone, setCoverLetterTone] = useState('professional');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [companyMotivation, setCompanyMotivation] = useState('');
  const [strengths, setStrengths] = useState([]);
  const [matchScore, setMatchScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const fileInputRef = useRef(null);
  const cvOptions = [{
    id: 'cv-1',
    name: 'CV Développeur Frontend',
    preview: '/images/cv-preview-1.jpg',
    isATSFriendly: true,
    matchScore: 85
  }, {
    id: 'cv-2',
    name: 'CV Data Science',
    preview: '/images/cv-preview-2.jpg',
    isATSFriendly: true,
    matchScore: 65
  }, {
    id: 'cv-3',
    name: 'CV Marketing Digital',
    preview: '/images/cv-preview-3.jpg',
    isATSFriendly: false,
    matchScore: 45
  }];
  // Sample job offer for demo purposes
  const sampleJobOffer = `Développeur Frontend React (H/F)
TechVision - Paris, France - CDI
Description du poste:
Nous recherchons un développeur Frontend passionné pour rejoindre notre équipe produit. Vous travaillerez sur nos applications web utilisant React, TypeScript et les dernières technologies frontend.
Responsabilités:
- Développer des interfaces utilisateur réactives et performantes
- Collaborer avec les designers UX/UI pour implémenter des maquettes fidèles
- Participer à l'architecture frontend et aux choix techniques
- Assurer la qualité du code par des tests unitaires et d'intégration
- Contribuer à l'amélioration continue de nos produits
Compétences requises:
- Maîtrise de React, JavaScript/TypeScript
- Expérience avec les outils modernes (Webpack, ESLint, etc.)
- Connaissance des principes de responsive design
- Expérience avec les API REST
- Bon sens du travail en équipe
Avantages:
- Télétravail partiel
- Matériel de qualité
- Formation continue
- Tickets restaurant
- Mutuelle d'entreprise
Rejoignez une startup en pleine croissance avec une culture d'innovation!`;
  useEffect(() => {
    // Set sample job offer for demo purposes
    if (currentStep === 1 && !offerText) {
      setTimeout(() => {
        setOfferText(sampleJobOffer);
      }, 500);
    }
  }, [currentStep]);
  const analyzeJobOffer = () => {
    if (!offerText.trim()) return;
    setIsAnalyzing(true);
    // Simulate analysis with a delay
    setTimeout(() => {
      // Play scanning sound
      const audio = new Audio('/sounds/scan-complete.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      // Extract data from the offer
      setExtractedData({
        position: 'Développeur Frontend React',
        company: 'TechVision',
        location: 'Paris, France',
        contractType: 'CDI',
        keySkills: [{
          name: 'React',
          relevance: 'high'
        }, {
          name: 'JavaScript',
          relevance: 'high'
        }, {
          name: 'TypeScript',
          relevance: 'high'
        }, {
          name: 'Responsive Design',
          relevance: 'medium'
        }, {
          name: 'API REST',
          relevance: 'medium'
        }, {
          name: 'Tests unitaires',
          relevance: 'medium'
        }],
        description: "Développer des interfaces utilisateur réactives et performantes. Collaborer avec les designers UX/UI. Participer à l'architecture frontend et aux choix techniques."
      });
      // Highlight key terms in the job offer
      highlightKeyTerms();
      setIsAnalyzing(false);
    }, 2000);
  };
  const highlightKeyTerms = () => {
    let text = offerText;
    const keyTerms = ['React', 'TypeScript', 'JavaScript', 'frontend', 'interfaces utilisateur', 'tests unitaires', 'API REST'];
    keyTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      text = text.replace(regex, '<mark class="bg-amber-200 text-amber-800 px-1 rounded">$1</mark>');
    });
    setHighlightedText(text);
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, we would parse the PDF here
      // For demo, we'll just set the sample text
      setOfferText(sampleJobOffer);
      // Play upload sound
      const audio = new Audio('/sounds/file-upload.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    }
  };
  const handleCVSelection = cv => {
    setSelectedCV(cv);
    // Play selection sound
    const audio = new Audio('/sounds/cv-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // If we're on step 2, automatically proceed to step 3 after a short delay
    if (currentStep === 2) {
      setTimeout(() => {
        goToNextStep();
      }, 800);
    }
  };
  const generateCoverLetter = () => {
    if (!selectedCV || !extractedData) return;
    setIsGenerating(true);
    // Simulate letter generation with a delay
    setTimeout(() => {
      const letter = `
Objet : Candidature au poste de ${extractedData.position}
Madame, Monsieur,
C'est avec un grand intérêt que je vous soumets ma candidature au poste de ${extractedData.position} au sein de ${extractedData.company}.
${companyMotivation ? companyMotivation : "Votre entreprise se démarque par son approche innovante dans le secteur technologique, et je suis particulièrement enthousiaste à l'idée de contribuer à vos projets ambitieux."}
Fort d'une expérience solide en développement frontend, j'ai eu l'occasion de travailler sur des projets similaires nécessitant une expertise en React et TypeScript. Ma capacité à créer des interfaces utilisateur réactives et intuitives, ainsi que mon attention aux détails, correspondent parfaitement aux compétences que vous recherchez.
${strengths.length > 0 ? `Parmi mes points forts, je peux notamment citer :
${strengths.map(s => `- ${s}`).join('\n')}` : "J'apporte une expertise technique approfondie, une capacité d'adaptation rapide aux nouvelles technologies, et un esprit d'équipe qui favorise la collaboration et l'innovation collective."}
Je serais ravi de pouvoir échanger avec vous lors d'un entretien pour vous présenter plus en détail ma motivation et mes compétences.
Je vous remercie de l'attention que vous porterez à ma candidature et reste à votre disposition pour toute information complémentaire.
Cordialement,
Jean Dupont
      `;
      setCoverLetterText(letter);
      // Calculate match score based on CV and job requirements
      setMatchScore(selectedCV.matchScore);
      // Play generation complete sound
      const audio = new Audio('/sounds/letter-complete.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      setIsGenerating(false);
    }, 3000);
  };
  const goToNextStep = () => {
    if (currentStep === 1 && !extractedData) {
      analyzeJobOffer();
      return;
    }
    if (currentStep === 3 && !coverLetterText) {
      generateCoverLetter();
      return;
    }
    if (currentStep < 5) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsLoading(false);
        // Play step complete sound
        const audio = new Audio('/sounds/step-complete.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback prevented:', e));
        // If moving to step 3, generate cover letter
        if (currentStep === 2) {
          setTimeout(() => {
            generateCoverLetter();
          }, 500);
        }
      }, 500);
    } else {
      // Final submission
      handleSubmit();
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      // Play success sound
      const audio = new Audio('/sounds/application-success.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      // Close after showing success message
      setTimeout(() => {
        onComplete({
          company: extractedData.company,
          position: extractedData.position,
          status: 'sent',
          date: new Date().toISOString().split('T')[0],
          cv: selectedCV.name,
          coverLetter: 'Lettre personnalisée'
        });
      }, 3000);
    }, 2000);
  };
  const regenerateCoverLetter = () => {
    setCoverLetterText('');
    generateCoverLetter();
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Import de l'offre d'emploi
              </h2>
              <p className="text-gray-600">
                Colle le texte de l'offre ou importe-la en PDF
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Card className="h-full">
                  <div className="p-4 h-full flex flex-col">
                    <div className="flex-1">
                      <textarea className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Colle ici l'offre d'emploi..." value={offerText} onChange={e => setOfferText(e.target.value)}></textarea>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button variant="secondary" className="flex items-center justify-center" onClick={() => fileInputRef.current?.click()}>
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Importer un PDF
                      </Button>
                      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
                      <Button variant="primary" className="flex items-center justify-center" onClick={analyzeJobOffer} disabled={!offerText.trim() || isAnalyzing}>
                        {isAnalyzing ? <>
                            <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" animate={{
                          rotate: 360
                        }} transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear'
                        }} />
                            Analyse en cours...
                          </> : <>
                            <ScanSearchIcon className="w-4 h-4 mr-2" />
                            Analyser l'offre
                          </>}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
              <AnimatePresence mode="wait">
                {!extractedData && !isAnalyzing && <motion.div key="instructions" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} className="flex items-center justify-center">
                    <Card className="bg-gray-50 border-dashed border-2 border-gray-300 h-full flex flex-col items-center justify-center p-6 text-center">
                      <ScanSearchIcon className="w-12 h-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Analyse intelligente
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Notre IA va analyser l'offre pour extraire les
                        informations clés et identifier les compétences
                        recherchées.
                      </p>
                      <ul className="text-sm text-gray-600 text-left space-y-2">
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Extraction automatique des informations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Identification des compétences clés</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                          <span>Mise en évidence des mots-clés importants</span>
                        </li>
                      </ul>
                    </Card>
                  </motion.div>}
                {isAnalyzing && <motion.div key="analyzing" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }}>
                    <Card className="h-full flex flex-col items-center justify-center p-6">
                      <motion.div className="w-16 h-16 mb-6 relative" initial={{
                    opacity: 0.6
                  }} animate={{
                    opacity: 1
                  }} transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}>
                        <motion.div className="absolute inset-0 border-4 border-blue-200 rounded-full" initial={{
                      opacity: 0.2
                    }} animate={{
                      opacity: 0.8
                    }} transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }} />
                        <motion.div className="absolute inset-0 border-t-4 border-blue-500 rounded-full" animate={{
                      rotate: 360
                    }} transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }} />
                        <ScanSearchIcon className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Analyse en cours
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Notre IA analyse l'offre d'emploi pour extraire les
                        informations pertinentes...
                      </p>
                      <motion.div className="w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-blue-500 rounded-full" initial={{
                      width: '0%'
                    }} animate={{
                      width: '100%'
                    }} transition={{
                      duration: 2
                    }} />
                      </motion.div>
                    </Card>
                  </motion.div>}
                {extractedData && <motion.div key="results" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }}>
                    <Card className="h-full">
                      <div className="p-4 h-full flex flex-col">
                        <div className="mb-4 flex items-center">
                          <SparklesIcon className="w-5 h-5 text-blue-500 mr-2" />
                          <h3 className="font-medium text-gray-900">
                            Informations extraites
                          </h3>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Poste
                              </label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={extractedData.position} onChange={e => setExtractedData({
                            ...extractedData,
                            position: e.target.value
                          })} />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Entreprise
                              </label>
                              <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={extractedData.company} onChange={e => setExtractedData({
                            ...extractedData,
                            company: e.target.value
                          })} />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Localisation
                            </label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm" value={extractedData.location} onChange={e => setExtractedData({
                          ...extractedData,
                          location: e.target.value
                        })} />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Compétences clés identifiées
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {extractedData.keySkills.map((skill, index) => <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${skill.relevance === 'high' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {skill.name}
                                  {skill.relevance === 'high' && <span className="ml-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                                </span>)}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Texte analysé avec mots-clés
                            </label>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm h-32 overflow-y-auto" dangerouslySetInnerHTML={{
                          __html: highlightedText
                        }} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="secondary" size="small" className="flex items-center">
                            <EditIcon className="w-3 h-3 mr-1" />
                            Modifier les informations
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>}
              </AnimatePresence>
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Choix du CV
              </h2>
              <p className="text-gray-600">
                Sélectionnez le CV le plus adapté pour cette candidature
              </p>
            </div>
            {extractedData && <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <LightbulbIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">
                      Conseil personnalisé
                    </h3>
                    <p className="text-sm text-blue-700">
                      Pour le poste de <strong>{extractedData.position}</strong>{' '}
                      chez <strong>{extractedData.company}</strong>, un CV
                      mettant en avant vos compétences en{' '}
                      {extractedData.keySkills.slice(0, 3).map(s => s.name).join(', ')}{' '}
                      sera plus efficace.
                    </p>
                  </div>
                </div>
              </div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cvOptions.map(cv => <motion.div key={cv.id} whileHover={{
              y: -5
            }} whileTap={{
              scale: 0.98
            }}>
                  <Card className={`cursor-pointer overflow-hidden transition-all duration-300 h-full flex flex-col ${selectedCV?.id === cv.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`} onClick={() => handleCVSelection(cv)}>
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <FileTextIcon className="w-16 h-16" />
                      </div>
                      {/* This would be a real CV preview in production */}
                      <div className="absolute inset-0 bg-gray-800/10 flex flex-col p-4">
                        <div className="w-full h-5 bg-gray-200 rounded mb-2"></div>
                        <div className="flex gap-2 mb-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
                            <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="w-full h-2 bg-gray-200 rounded"></div>
                          <div className="w-full h-2 bg-gray-200 rounded"></div>
                          <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                          <div className="w-full h-2 bg-gray-200 rounded"></div>
                          <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      {cv.isATSFriendly && <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          ATS Friendly
                        </div>}
                      {extractedData && cv.matchScore > 80 && <div className="absolute bottom-2 left-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          Match Parfait
                        </div>}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {cv.name}
                      </h3>
                      <div className="text-xs text-gray-500 mb-3">
                        Mis à jour le 15 juin 2023
                      </div>
                      {extractedData && <div className="mt-auto">
                          <div className="text-xs text-gray-600 mb-1">
                            Correspondance avec l'offre
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div className={`h-2 rounded-full ${cv.matchScore > 80 ? 'bg-green-500' : cv.matchScore > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                        width: `${cv.matchScore}%`
                      }}></div>
                          </div>
                          <div className="text-xs font-medium text-right">
                            {cv.matchScore}%
                          </div>
                        </div>}
                    </div>
                    {selectedCV?.id === cv.id && <div className="bg-blue-50 border-t border-blue-100 p-3 flex items-center justify-center">
                        <CheckCircleIcon className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm text-blue-700 font-medium">
                          Sélectionné
                        </span>
                      </div>}
                  </Card>
                </motion.div>)}
              <motion.div whileHover={{
              y: -5
            }} whileTap={{
              scale: 0.98
            }}>
                <Card className="cursor-pointer border-dashed border-2 border-gray-300 h-full flex flex-col items-center justify-center p-6 hover:bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <PlusIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Créer un nouveau CV
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    Créer un CV optimisé à partir de mon profil
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Lettre de motivation
              </h2>
              <p className="text-gray-600">
                Personnalisez votre lettre pour maximiser vos chances
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <MessageSquareIcon className="w-4 h-4 text-blue-500 mr-2" />
                    Informations pour personnaliser votre lettre
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pourquoi cette entreprise vous intéresse ?
                      </label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24" placeholder="Décrivez pourquoi vous souhaitez rejoindre cette entreprise..." value={companyMotivation} onChange={e => setCompanyMotivation(e.target.value)}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vos forces spécifiques pour ce poste
                      </label>
                      <div className="space-y-2">
                        {strengths.map((strength, index) => <div key={index} className="flex items-center">
                            <input type="text" className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" value={strength} onChange={e => {
                          const newStrengths = [...strengths];
                          newStrengths[index] = e.target.value;
                          setStrengths(newStrengths);
                        }} />
                            <button className="ml-2 p-1 text-gray-400 hover:text-gray-600" onClick={() => {
                          setStrengths(strengths.filter((_, i) => i !== index));
                        }}>
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>)}
                        <button className="text-blue-600 text-sm flex items-center" onClick={() => setStrengths([...strengths, ''])}>
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Ajouter une force
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ton souhaité
                      </label>
                      <div className="flex items-center space-x-4">
                        <button className={`px-3 py-1.5 rounded-full text-sm ${coverLetterTone === 'professional' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`} onClick={() => setCoverLetterTone('professional')}>
                          Professionnel
                        </button>
                        <button className={`px-3 py-1.5 rounded-full text-sm ${coverLetterTone === 'dynamic' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`} onClick={() => setCoverLetterTone('dynamic')}>
                          Dynamique
                        </button>
                        <button className={`px-3 py-1.5 rounded-full text-sm ${coverLetterTone === 'human' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`} onClick={() => setCoverLetterTone('human')}>
                          Humain
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="secondary" size="small" className="flex items-center" onClick={regenerateCoverLetter} disabled={isGenerating}>
                      <RefreshCwIcon className="w-3 h-3 mr-1" />
                      Régénérer
                    </Button>
                    <Button variant="primary" size="small" className="flex items-center" onClick={generateCoverLetter} disabled={isGenerating}>
                      {isGenerating ? <>
                          <motion.div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-2" animate={{
                        rotate: 360
                      }} transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      }} />
                          Génération...
                        </> : <>
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          Générer
                        </>}
                    </Button>
                  </div>
                </Card>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <LightbulbIcon className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">
                        Conseil pour votre lettre
                      </h3>
                      <p className="text-sm text-blue-700">
                        Mentionnez des exemples concrets de réalisations en lien
                        avec les compétences clés identifiées dans l'offre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <PenIcon className="w-4 h-4 text-blue-500 mr-2" />
                      Aperçu de la lettre
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto">
                    {isGenerating ? <div className="flex flex-col items-center justify-center h-full">
                        <motion.div className="w-12 h-12 mb-4 relative" initial={{
                      opacity: 0.6
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}>
                          <motion.div className="absolute inset-0 border-4 border-blue-200 rounded-full" initial={{
                        opacity: 0.2
                      }} animate={{
                        opacity: 0.8
                      }} transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }} />
                          <motion.div className="absolute inset-0 border-t-4 border-blue-500 rounded-full" animate={{
                        rotate: 360
                      }} transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }} />
                          <PenIcon className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </motion.div>
                        <p className="text-gray-600 text-center">
                          Génération de votre lettre de motivation
                          personnalisée...
                        </p>
                      </div> : coverLetterText ? <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line">
                          {coverLetterText}
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center h-full text-center">
                        <PenIcon className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500">
                          Complétez les informations et cliquez sur "Générer"
                          pour créer votre lettre
                        </p>
                      </div>}
                  </div>
                  {coverLetterText && <div className="p-3 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700 mr-2">
                          Ajuster le ton:
                        </span>
                        <input type="range" min="1" max="3" className="flex-1" value={coverLetterTone === 'professional' ? 1 : coverLetterTone === 'dynamic' ? 2 : 3} onChange={e => {
                      const val = parseInt(e.target.value);
                      setCoverLetterTone(val === 1 ? 'professional' : val === 2 ? 'dynamic' : 'human');
                      regenerateCoverLetter();
                    }} />
                      </div>
                    </div>}
                </Card>
              </div>
            </div>
          </div>;
      case 4:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Vérification et ajustements
              </h2>
              <p className="text-gray-600">
                Assurez-vous que tout est prêt avant d'envoyer votre candidature
              </p>
            </div>
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <SparklesIcon className="w-5 h-5 text-blue-500 mr-2" />
                  Analyse d'adéquation
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Score global de correspondance
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {matchScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${matchScore > 80 ? 'bg-green-500' : matchScore > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                      width: `${matchScore}%`
                    }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <FileTextIcon className="w-4 h-4 text-blue-500 mr-2" />
                        <h4 className="font-medium text-gray-900">CV</h4>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Correspondance
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          {selectedCV?.matchScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                        <div className={`h-1.5 rounded-full ${selectedCV?.matchScore > 80 ? 'bg-green-500' : selectedCV?.matchScore > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                        width: `${selectedCV?.matchScore}%`
                      }}></div>
                      </div>
                      <p className="text-xs text-gray-600">
                        {selectedCV?.matchScore > 80 ? 'Excellent choix de CV pour cette offre !' : selectedCV?.matchScore > 60 ? 'Bon choix, quelques ajustements pourraient améliorer votre score.' : "Envisagez d'adapter davantage votre CV pour cette offre."}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <PenIcon className="w-4 h-4 text-blue-500 mr-2" />
                        <h4 className="font-medium text-gray-900">Lettre</h4>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Pertinence
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          85%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                        <div className="h-1.5 rounded-full bg-green-500" style={{
                        width: '85%'
                      }}></div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Votre lettre est bien personnalisée et met en avant les
                        points clés recherchés.
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <ScanSearchIcon className="w-4 h-4 text-blue-500 mr-2" />
                        <h4 className="font-medium text-gray-900">
                          Compétences
                        </h4>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Couverture
                        </span>
                        <span className="text-xs font-medium text-gray-700">
                          78%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                        <div className="h-1.5 rounded-full bg-amber-500" style={{
                        width: '78%'
                      }}></div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Vous couvrez la majorité des compétences clés demandées
                        dans l'offre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Vérification finale
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        CV sélectionné
                      </h4>
                      <p className="text-xs text-gray-500">
                        {selectedCV?.name}
                      </p>
                    </div>
                    <button className="ml-auto text-sm text-blue-600">
                      Modifier
                    </button>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Lettre de motivation
                      </h4>
                      <p className="text-xs text-gray-500">
                        Personnalisée pour {extractedData?.company}
                      </p>
                    </div>
                    <button className="ml-auto text-sm text-blue-600">
                      Modifier
                    </button>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Offre d'emploi
                      </h4>
                      <p className="text-xs text-gray-500">
                        {extractedData?.position} - {extractedData?.company}
                      </p>
                    </div>
                    <button className="ml-auto text-sm text-blue-600">
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">
                      Recommandation
                    </h3>
                    <p className="text-sm text-amber-700">
                      Pour améliorer votre candidature, ajoutez une mention de
                      votre projet freelance React dans votre lettre de
                      motivation.
                    </p>
                    <button className="text-sm font-medium text-amber-800 mt-2 flex items-center">
                      <span>Appliquer cette suggestion</span>
                      <ArrowRightIcon className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>;
      case 5:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Finalisation
              </h2>
              <p className="text-gray-600">
                Votre candidature est prête à être envoyée
              </p>
            </div>
            <Card className="p-6">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SendIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Candidature prête pour {extractedData?.company}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Votre candidature pour le poste de {extractedData?.position}{' '}
                  est prête à être envoyée. Une fois envoyée, nous activerons le
                  suivi automatique pour vous tenir informé des mises à jour.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <FileTextIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">CV</h4>
                  <p className="text-xs text-gray-500 mb-3 text-center">
                    {selectedCV?.name}
                  </p>
                  <button className="text-xs text-blue-600 flex items-center mt-auto">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    Aperçu
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <PenIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Lettre de motivation
                  </h4>
                  <p className="text-xs text-gray-500 mb-3 text-center">
                    Personnalisée pour {extractedData?.company}
                  </p>
                  <button className="text-xs text-blue-600 flex items-center mt-auto">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    Aperçu
                  </button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Score de correspondance
                  </h4>
                  <div className="flex items-center mb-3">
                    <span className={`text-sm font-bold ${matchScore > 80 ? 'text-green-600' : matchScore > 60 ? 'text-amber-600' : 'text-red-600'}`}>
                      {matchScore}%
                    </span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full ml-2">
                      <div className={`h-1.5 rounded-full ${matchScore > 80 ? 'bg-green-500' : matchScore > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                      width: `${matchScore}%`
                    }}></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {matchScore > 80 ? 'Excellent' : matchScore > 60 ? 'Bon' : 'À améliorer'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 justify-center">
                <Button variant="secondary" className="flex items-center justify-center">
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Télécharger (PDF)
                </Button>
                <Button variant="secondary" className="flex items-center justify-center">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Envoyer par mail
                </Button>
                <Button variant="secondary" className="flex items-center justify-center">
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Sauvegarder pour plus tard
                </Button>
                <Button variant="primary" className="flex items-center justify-center" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? <>
                      <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }} />
                      Envoi en cours...
                    </> : <>
                      <SendIcon className="w-4 h-4 mr-2" />
                      Envoyer ma candidature
                    </>}
                </Button>
              </div>
            </Card>
          </div>;
      default:
        return null;
    }
  };
  // Progress steps
  const steps = [{
    id: 1,
    label: 'Offre',
    icon: <ClipboardIcon className="w-4 h-4" />
  }, {
    id: 2,
    label: 'CV',
    icon: <FileTextIcon className="w-4 h-4" />
  }, {
    id: 3,
    label: 'Lettre',
    icon: <PenIcon className="w-4 h-4" />
  }, {
    id: 4,
    label: 'Vérification',
    icon: <CheckCircleIcon className="w-4 h-4" />
  }, {
    id: 5,
    label: 'Envoi',
    icon: <SendIcon className="w-4 h-4" />
  }];
  return <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <motion.div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: 50
    }} transition={{
      type: 'spring',
      damping: 25
    }}>
        {/* Header with progress */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Nouvelle candidature
            </h1>
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={onClose}>
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-2xl">
              {steps.map((step, index) => <Fragment key={step.id}>
                  {/* Step indicator */}
                  <div className="flex flex-col items-center relative">
                    <motion.div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${currentStep === step.id ? 'bg-blue-600 text-white' : currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`} initial={false} animate={currentStep === step.id ? {
                  scale: [1, 1.15, 1],
                  backgroundColor: '#2563EB'
                } : {}} transition={{
                  duration: 0.5
                }}>
                      {currentStep > step.id ? <CheckIcon className="w-4 h-4" /> : step.icon}
                    </motion.div>
                    <span className={`text-xs mt-1 ${currentStep === step.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && <div className="flex-1 mx-2">
                      <div className="h-0.5 bg-gray-200 relative">
                        <motion.div className="absolute inset-0 bg-blue-600 origin-left" initial={{
                    scaleX: 0
                  }} animate={{
                    scaleX: currentStep > step.id ? 1 : 0
                  }} transition={{
                    duration: 0.5
                  }} />
                      </div>
                    </div>}
                </Fragment>)}
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.3
          }}>
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Footer with navigation */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between">
          <Button variant="secondary" onClick={goToPreviousStep} disabled={currentStep === 1 || showSuccess}>
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Précédent
          </Button>
          <Button variant={currentStep === 5 ? 'primary' : 'secondary'} onClick={goToNextStep} disabled={currentStep === 1 && !extractedData || currentStep === 2 && !selectedCV || currentStep === 3 && !coverLetterText || showSuccess}>
            {currentStep === 5 ? <>
                Envoyer ma candidature
                <SendIcon className="w-4 h-4 ml-2" />
              </> : <>
                Continuer
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </>}
          </Button>
        </div>
        {/* Success overlay */}
        <AnimatePresence>
          {showSuccess && <motion.div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-20" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: [0, 1.2, 1]
          }} transition={{
            type: 'spring',
            damping: 15
          }}>
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-12 h-12 text-green-600" />
                  </div>
                  <motion.div className="absolute inset-0 rounded-full border-4 border-green-500/30" initial={{
                scale: 1,
                opacity: 1
              }} animate={{
                scale: 1.5,
                opacity: 0
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }} />
                </div>
              </motion.div>
              <motion.h2 className="text-2xl font-medium text-gray-900 mt-6 mb-2" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
                Candidature envoyée !
              </motion.h2>
              <motion.p className="text-gray-600 text-center max-w-md" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }}>
                Votre candidature a été envoyée à{' '}
                <strong>{extractedData?.company}</strong>. Suivi activé. Nous
                vous tiendrons informé de chaque mise à jour.
              </motion.p>
            </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>;
};