import React, { useEffect, useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../common/Header';
import { ClipboardIcon, FileTextIcon, PenIcon, CheckCircleIcon, SendIcon, UploadIcon, ScanSearchIcon, SparklesIcon, ArrowRightIcon, AlertCircleIcon, DownloadIcon, SaveIcon, XIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon, RefreshCwIcon, CheckIcon, MailIcon, LightbulbIcon, EditIcon, MessageSquareIcon, Eye as EyeIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
export const NewApplicationPage = ({
  onBack,
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
      text = text.replace(regex, '<mark class="bg-amber-100 text-amber-800 px-1 rounded">$1</mark>');
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
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                Import de l'offre d'emploi
              </h2>
              <p className="text-lg text-[#4E4E4E]">
                Colle le texte de l'offre ou importe-la en PDF
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Card className="h-full bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex-1">
                      <textarea className="w-full h-64 p-4 border border-[#E6E2D8] rounded-lg focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent resize-none bg-white text-[#2C2C2C] placeholder-[#9A9A9A] shadow-inner" placeholder="Colle ici l'offre d'emploi..." value={offerText} onChange={e => setOfferText(e.target.value)}></textarea>
                    </div>
                    <div className="mt-5 flex flex-col sm:flex-row gap-3">
                      <Button variant="secondary" className="flex items-center justify-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all" onClick={() => fileInputRef.current?.click()}>
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Importer un PDF
                      </Button>
                      <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileUpload} />
                      <Button variant="primary" className="flex items-center justify-center bg-[#F4D35E] text-[#2C2C2C] hover:bg-[#EBCB4E] hover:shadow-md font-medium" onClick={analyzeJobOffer} disabled={!offerText.trim() || isAnalyzing}>
                        {isAnalyzing ? <>
                            <motion.div className="w-4 h-4 border-2 border-[#2C2C2C] border-t-transparent rounded-full mr-2" animate={{
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
                    <Card className="bg-[#FAF7F1] border-dashed border-2 border-[#E6E2D8] h-full flex flex-col items-center justify-center p-6 text-center shadow-sm">
                      <ScanSearchIcon className="w-14 h-14 text-[#4465A0] mb-5" />
                      <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3">
                        Analyse intelligente
                      </h3>
                      <p className="text-[#4E4E4E] mb-5 text-base">
                        Notre IA va analyser l'offre pour extraire les
                        informations clés et identifier les compétences
                        recherchées.
                      </p>
                      <ul className="text-base text-[#4E4E4E] text-left space-y-3">
                        <li className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-[#38A169] mr-2 mt-0.5" />
                          <span>Extraction automatique des informations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-[#38A169] mr-2 mt-0.5" />
                          <span>Identification des compétences clés</span>
                        </li>
                        <li className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-[#38A169] mr-2 mt-0.5" />
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
                    <Card className="h-full flex flex-col items-center justify-center p-8 bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
                      <motion.div className="w-20 h-20 mb-6 relative" initial={{
                    opacity: 0.6
                  }} animate={{
                    opacity: 1
                  }} transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}>
                        <motion.div className="absolute inset-0 border-4 border-[#F4D35E]/20 rounded-full" initial={{
                      opacity: 0.2
                    }} animate={{
                      opacity: 0.8
                    }} transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }} />
                        <motion.div className="absolute inset-0 border-t-4 border-[#F4D35E] rounded-full" animate={{
                      rotate: 360
                    }} transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear'
                    }} />
                        <ScanSearchIcon className="w-10 h-10 text-[#4465A0] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3">
                        Analyse en cours
                      </h3>
                      <p className="text-[#4E4E4E] mb-5 text-base">
                        Notre IA analyse l'offre d'emploi pour extraire les
                        informations pertinentes...
                      </p>
                      <motion.div className="w-full max-w-xs bg-white h-2.5 rounded-full overflow-hidden shadow-inner">
                        <motion.div className="h-full bg-[#F4D35E] rounded-full" initial={{
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
                    <Card className="h-full bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
                      <div className="p-5 h-full flex flex-col">
                        <div className="mb-4 flex items-center">
                          <SparklesIcon className="w-5 h-5 text-[#F4D35E] mr-2" />
                          <h3 className="font-semibold text-[#2C2C2C] text-lg">
                            Informations extraites
                          </h3>
                        </div>
                        <div className="space-y-4 flex-1">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                Poste
                              </label>
                              <input type="text" className="w-full p-2.5 border border-[#E6E2D8] rounded-lg text-[#2C2C2C] bg-white focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent shadow-inner" value={extractedData.position} onChange={e => setExtractedData({
                            ...extractedData,
                            position: e.target.value
                          })} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                                Entreprise
                              </label>
                              <input type="text" className="w-full p-2.5 border border-[#E6E2D8] rounded-lg text-[#2C2C2C] bg-white focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent shadow-inner" value={extractedData.company} onChange={e => setExtractedData({
                            ...extractedData,
                            company: e.target.value
                          })} />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                              Localisation
                            </label>
                            <input type="text" className="w-full p-2.5 border border-[#E6E2D8] rounded-lg text-[#2C2C2C] bg-white focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent shadow-inner" value={extractedData.location} onChange={e => setExtractedData({
                          ...extractedData,
                          location: e.target.value
                        })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                              Compétences clés identifiées
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {extractedData.keySkills.map((skill, index) => <span key={index} className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${skill.relevance === 'high' ? 'bg-[#ECFDF5] text-[#38A169] border border-[#38A169]/30' : 'bg-[#EBF5FF] text-[#4465A0] border border-[#4465A0]/30'}`}>
                                  {skill.name}
                                  {skill.relevance === 'high' && <span className="ml-1.5 w-2 h-2 bg-[#38A169] rounded-full"></span>}
                                </span>)}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                              Texte analysé avec mots-clés
                            </label>
                            <div className="p-3.5 bg-white border border-[#E6E2D8] rounded-lg text-[#4E4E4E] h-32 overflow-y-auto shadow-inner" dangerouslySetInnerHTML={{
                          __html: highlightedText
                        }} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="secondary" size="small" className="flex items-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all">
                            <EditIcon className="w-3.5 h-3.5 mr-1.5" />
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
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                Choix du CV
              </h2>
              <p className="text-lg text-[#4E4E4E]">
                Sélectionnez le CV le plus adapté pour cette candidature
              </p>
            </div>
            {extractedData && <div className="bg-[#F7F4EE] border border-[#E6E2D8] rounded-lg p-5 mb-6 shadow-sm">
                <div className="flex">
                  <LightbulbIcon className="w-6 h-6 text-[#F4D35E] mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C] mb-2 text-lg">
                      Conseil personnalisé
                    </h3>
                    <p className="text-base text-[#4E4E4E]">
                      Pour le poste de{' '}
                      <strong className="text-[#2C2C2C] font-medium">
                        {extractedData.position}
                      </strong>{' '}
                      chez{' '}
                      <strong className="text-[#2C2C2C] font-medium">
                        {extractedData.company}
                      </strong>
                      , un CV mettant en avant vos compétences en{' '}
                      <span className="text-[#4465A0] font-medium">
                        {extractedData.keySkills.slice(0, 3).map(s => s.name).join(', ')}
                      </span>{' '}
                      sera plus efficace.
                    </p>
                  </div>
                </div>
              </div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cvOptions.map(cv => <motion.div key={cv.id} whileHover={{
              y: -5,
              transition: {
                duration: 0.2
              }
            }} whileTap={{
              scale: 0.98
            }}>
                  <Card className={`cursor-pointer overflow-hidden transition-all duration-300 h-full flex flex-col bg-[#FAF7F1] border border-[#E6E2D8] ${selectedCV?.id === cv.id ? 'ring-2 ring-[#F4D35E] shadow-md' : 'hover:shadow-md hover:border-[#E6E2D8]'}`} onClick={() => handleCVSelection(cv)}>
                    <div className="relative h-48 bg-white overflow-hidden border-b border-[#E6E2D8]">
                      <div className="absolute inset-0 flex items-center justify-center text-[#E6E2D8]">
                        <FileTextIcon className="w-16 h-16" />
                      </div>
                      {/* This would be a real CV preview in production */}
                      <div className="absolute inset-0 bg-white flex flex-col p-4">
                        <div className="w-full h-5 bg-[#F7F4EE] rounded mb-2"></div>
                        <div className="flex gap-2 mb-3">
                          <div className="w-10 h-10 bg-[#F7F4EE] rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-full h-3 bg-[#F7F4EE] rounded mb-1"></div>
                            <div className="w-2/3 h-3 bg-[#F7F4EE] rounded"></div>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="w-full h-2 bg-[#F7F4EE] rounded"></div>
                          <div className="w-full h-2 bg-[#F7F4EE] rounded"></div>
                          <div className="w-3/4 h-2 bg-[#F7F4EE] rounded"></div>
                          <div className="w-full h-2 bg-[#F7F4EE] rounded"></div>
                          <div className="w-5/6 h-2 bg-[#F7F4EE] rounded"></div>
                        </div>
                      </div>
                      {cv.isATSFriendly && <div className="absolute top-2 right-2 bg-[#ECFDF5] text-[#38A169] border border-[#38A169]/30 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          ATS Friendly
                        </div>}
                      {extractedData && cv.matchScore > 80 && <div className="absolute bottom-2 left-2 bg-[#FFF8E6] text-[#F4D35E] border border-[#F4D35E]/30 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          Match Parfait
                        </div>}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-semibold text-[#2C2C2C] mb-1.5 text-lg">
                        {cv.name}
                      </h3>
                      <div className="text-sm text-[#7A7A7A] mb-3">
                        Mis à jour le 15 juin 2023
                      </div>
                      {extractedData && <div className="mt-auto">
                          <div className="text-sm text-[#4E4E4E] mb-1.5">
                            Correspondance avec l'offre
                          </div>
                          <div className="w-full bg-white rounded-full h-2.5 mb-1 shadow-inner">
                            <div className={`h-2.5 rounded-full ${cv.matchScore > 80 ? 'bg-[#38A169]' : cv.matchScore > 60 ? 'bg-[#F4D35E]' : 'bg-[#E53E3E]'}`} style={{
                        width: `${cv.matchScore}%`
                      }}></div>
                          </div>
                          <div className="text-sm font-medium text-right text-[#2C2C2C]">
                            {cv.matchScore}%
                          </div>
                        </div>}
                    </div>
                    {selectedCV?.id === cv.id && <div className="bg-[#F7F4EE] border-t border-[#E6E2D8] p-3.5 flex items-center justify-center">
                        <CheckCircleIcon className="w-5 h-5 text-[#38A169] mr-2" />
                        <span className="text-base text-[#2C2C2C] font-medium">
                          Sélectionné
                        </span>
                      </div>}
                  </Card>
                </motion.div>)}
              <motion.div whileHover={{
              y: -5,
              transition: {
                duration: 0.2
              }
            }} whileTap={{
              scale: 0.98
            }}>
                <Card className="cursor-pointer border-dashed border-2 border-[#E6E2D8] h-full flex flex-col items-center justify-center p-6 hover:bg-[#F7F4EE] bg-[#FAF7F1] hover:shadow-sm transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-[#E6E2D8] shadow-inner">
                    <PlusIcon className="w-8 h-8 text-[#9A9A9A]" />
                  </div>
                  <h3 className="font-semibold text-[#2C2C2C] mb-2 text-lg">
                    Créer un nouveau CV
                  </h3>
                  <p className="text-base text-[#4E4E4E] text-center">
                    Créer un CV optimisé à partir de mon profil
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                Lettre de motivation
              </h2>
              <p className="text-lg text-[#4E4E4E]">
                Personnalisez votre lettre pour maximiser vos chances
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <Card className="p-5 bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
                  <h3 className="font-semibold text-[#2C2C2C] mb-4 flex items-center text-lg">
                    <MessageSquareIcon className="w-5 h-5 text-[#4465A0] mr-2" />
                    Informations pour personnaliser votre lettre
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-base font-medium text-[#2C2C2C] mb-2">
                        Pourquoi cette entreprise vous intéresse ?
                      </label>
                      <textarea className="w-full p-4 border border-[#E6E2D8] rounded-lg focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent resize-none h-28 text-[#2C2C2C] bg-white placeholder-[#9A9A9A] shadow-inner" placeholder="Décrivez pourquoi vous souhaitez rejoindre cette entreprise..." value={companyMotivation} onChange={e => setCompanyMotivation(e.target.value)}></textarea>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-[#2C2C2C] mb-2">
                        Vos forces spécifiques pour ce poste
                      </label>
                      <div className="space-y-3">
                        {strengths.map((strength, index) => <div key={index} className="flex items-center">
                            <input type="text" className="flex-1 p-3 border border-[#E6E2D8] rounded-lg text-[#2C2C2C] bg-white focus:ring-2 focus:ring-[#F4D35E]/50 focus:border-transparent shadow-inner" value={strength} onChange={e => {
                          const newStrengths = [...strengths];
                          newStrengths[index] = e.target.value;
                          setStrengths(newStrengths);
                        }} />
                            <button className="ml-2 p-2 text-[#7A7A7A] hover:text-[#E53E3E] bg-white rounded-full border border-[#E6E2D8] hover:border-[#E53E3E]/30 transition-all" onClick={() => {
                          setStrengths(strengths.filter((_, i) => i !== index));
                        }}>
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>)}
                        <button className="text-[#4465A0] text-base flex items-center hover:text-[#4465A0]/80 transition-colors" onClick={() => setStrengths([...strengths, ''])}>
                          <PlusIcon className="w-5 h-5 mr-1.5" />
                          Ajouter une force
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-[#2C2C2C] mb-2">
                        Ton souhaité
                      </label>
                      <div className="flex items-center space-x-4">
                        <button className={`px-4 py-2 rounded-full text-base ${coverLetterTone === 'professional' ? 'bg-[#F4D35E] text-[#2C2C2C] border-transparent font-medium' : 'bg-white text-[#4E4E4E] border border-[#E6E2D8] hover:border-[#F4D35E]/50'} transition-all`} onClick={() => setCoverLetterTone('professional')}>
                          Professionnel
                        </button>
                        <button className={`px-4 py-2 rounded-full text-base ${coverLetterTone === 'dynamic' ? 'bg-[#F4D35E] text-[#2C2C2C] border-transparent font-medium' : 'bg-white text-[#4E4E4E] border border-[#E6E2D8] hover:border-[#F4D35E]/50'} transition-all`} onClick={() => setCoverLetterTone('dynamic')}>
                          Dynamique
                        </button>
                        <button className={`px-4 py-2 rounded-full text-base ${coverLetterTone === 'human' ? 'bg-[#F4D35E] text-[#2C2C2C] border-transparent font-medium' : 'bg-white text-[#4E4E4E] border border-[#E6E2D8] hover:border-[#F4D35E]/50'} transition-all`} onClick={() => setCoverLetterTone('human')}>
                          Humain
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between">
                    <Button variant="secondary" size="small" className="flex items-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all" onClick={regenerateCoverLetter} disabled={isGenerating}>
                      <RefreshCwIcon className="w-4 h-4 mr-2" />
                      Régénérer
                    </Button>
                    <Button variant="primary" size="small" className="flex items-center bg-[#F4D35E] text-[#2C2C2C] hover:bg-[#EBCB4E] hover:shadow-md font-medium" onClick={generateCoverLetter} disabled={isGenerating}>
                      {isGenerating ? <>
                          <motion.div className="w-4 h-4 border-2 border-[#2C2C2C] border-t-transparent rounded-full mr-2" animate={{
                        rotate: 360
                      }} transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      }} />
                          Génération...
                        </> : <>
                          <SparklesIcon className="w-4 h-4 mr-2" />
                          Générer
                        </>}
                    </Button>
                  </div>
                </Card>
                <div className="bg-[#F7F4EE] border border-[#E6E2D8] rounded-lg p-5 shadow-sm">
                  <div className="flex">
                    <LightbulbIcon className="w-6 h-6 text-[#F4D35E] mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#2C2C2C] mb-2 text-lg">
                        Conseil pour votre lettre
                      </h3>
                      <p className="text-base text-[#4E4E4E]">
                        Mentionnez des exemples concrets de réalisations en lien
                        avec les compétences clés identifiées dans l'offre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card className="h-full flex flex-col bg-white border border-[#E6E2D8] shadow-md">
                  <div className="p-4 border-b border-[#E6E2D8] flex justify-between items-center bg-[#F7F4EE]">
                    <h3 className="font-semibold text-[#2C2C2C] flex items-center text-lg">
                      <PenIcon className="w-5 h-5 text-[#4465A0] mr-2" />
                      Aperçu de la lettre
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 text-[#7A7A7A] hover:text-[#2C2C2C] hover:bg-[#F4D35E]/10 rounded-full transition-colors">
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button className="p-1.5 text-[#7A7A7A] hover:text-[#2C2C2C] hover:bg-[#F4D35E]/10 rounded-full transition-colors">
                        <DownloadIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 flex-1 overflow-y-auto bg-white">
                    {isGenerating ? <div className="flex flex-col items-center justify-center h-full">
                        <motion.div className="w-16 h-16 mb-6 relative" initial={{
                      opacity: 0.6
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}>
                          <motion.div className="absolute inset-0 border-4 border-[#F4D35E]/20 rounded-full" initial={{
                        opacity: 0.2
                      }} animate={{
                        opacity: 0.8
                      }} transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }} />
                          <motion.div className="absolute inset-0 border-t-4 border-[#F4D35E] rounded-full" animate={{
                        rotate: 360
                      }} transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear'
                      }} />
                          <PenIcon className="w-8 h-8 text-[#4465A0] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        </motion.div>
                        <p className="text-[#4E4E4E] text-center text-lg">
                          Génération de votre lettre de motivation
                          personnalisée...
                        </p>
                      </div> : coverLetterText ? <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-line text-[#2C2C2C]">
                          {coverLetterText}
                        </div>
                      </div> : <div className="flex flex-col items-center justify-center h-full text-center">
                        <PenIcon className="w-16 h-16 text-[#E6E2D8] mb-4" />
                        <p className="text-[#7A7A7A] text-lg">
                          Complétez les informations et cliquez sur "Générer"
                          pour créer votre lettre
                        </p>
                      </div>}
                  </div>
                  {coverLetterText && <div className="p-4 bg-[#F7F4EE] border-t border-[#E6E2D8]">
                      <div className="flex items-center">
                        <span className="text-base text-[#4E4E4E] mr-3">
                          Ajuster le ton:
                        </span>
                        <input type="range" min="1" max="3" className="flex-1 h-2 bg-white rounded-lg appearance-none cursor-pointer accent-[#F4D35E]" value={coverLetterTone === 'professional' ? 1 : coverLetterTone === 'dynamic' ? 2 : 3} onChange={e => {
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
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                Vérification et ajustements
              </h2>
              <p className="text-lg text-[#4E4E4E]">
                Assurez-vous que tout est prêt avant d'envoyer votre candidature
              </p>
            </div>
            <Card className="p-6 bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
              <div className="mb-8">
                <h3 className="font-semibold text-[#2C2C2C] mb-5 flex items-center text-xl">
                  <SparklesIcon className="w-6 h-6 text-[#F4D35E] mr-2" />
                  Analyse d'adéquation
                </h3>
                <div className="bg-white border border-[#E6E2D8] rounded-lg p-5 shadow-inner">
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-medium text-[#2C2C2C]">
                        Score global de correspondance
                      </span>
                      <span className="text-base font-semibold text-[#2C2C2C]">
                        {matchScore}%
                      </span>
                    </div>
                    <div className="w-full bg-[#F7F4EE] rounded-full h-3 shadow-inner">
                      <div className={`h-3 rounded-full ${matchScore > 80 ? 'bg-[#38A169]' : matchScore > 60 ? 'bg-[#F4D35E]' : 'bg-[#E53E3E]'}`} style={{
                      width: `${matchScore}%`
                    }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-[#FAF7F1] border border-[#E6E2D8] rounded-lg p-4 shadow-sm">
                      <div className="flex items-center mb-3">
                        <FileTextIcon className="w-5 h-5 text-[#4465A0] mr-2" />
                        <h4 className="font-semibold text-[#2C2C2C] text-lg">
                          CV
                        </h4>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Correspondance
                        </span>
                        <span className="text-sm font-medium text-[#2C2C2C]">
                          {selectedCV?.matchScore}%
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mb-3 shadow-inner">
                        <div className={`h-2 rounded-full ${selectedCV?.matchScore > 80 ? 'bg-[#38A169]' : selectedCV?.matchScore > 60 ? 'bg-[#F4D35E]' : 'bg-[#E53E3E]'}`} style={{
                        width: `${selectedCV?.matchScore}%`
                      }}></div>
                      </div>
                      <p className="text-sm text-[#4E4E4E]">
                        {selectedCV?.matchScore > 80 ? 'Excellent choix de CV pour cette offre !' : selectedCV?.matchScore > 60 ? 'Bon choix, quelques ajustements pourraient améliorer votre score.' : "Envisagez d'adapter davantage votre CV pour cette offre."}
                      </p>
                    </div>
                    <div className="bg-[#FAF7F1] border border-[#E6E2D8] rounded-lg p-4 shadow-sm">
                      <div className="flex items-center mb-3">
                        <PenIcon className="w-5 h-5 text-[#4465A0] mr-2" />
                        <h4 className="font-semibold text-[#2C2C2C] text-lg">
                          Lettre
                        </h4>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Pertinence
                        </span>
                        <span className="text-sm font-medium text-[#2C2C2C]">
                          85%
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mb-3 shadow-inner">
                        <div className="h-2 rounded-full bg-[#38A169]" style={{
                        width: '85%'
                      }}></div>
                      </div>
                      <p className="text-sm text-[#4E4E4E]">
                        Votre lettre est bien personnalisée et met en avant les
                        points clés recherchés.
                      </p>
                    </div>
                    <div className="bg-[#FAF7F1] border border-[#E6E2D8] rounded-lg p-4 shadow-sm">
                      <div className="flex items-center mb-3">
                        <ScanSearchIcon className="w-5 h-5 text-[#4465A0] mr-2" />
                        <h4 className="font-semibold text-[#2C2C2C] text-lg">
                          Compétences
                        </h4>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#7A7A7A]">
                          Couverture
                        </span>
                        <span className="text-sm font-medium text-[#2C2C2C]">
                          78%
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 mb-3 shadow-inner">
                        <div className="h-2 rounded-full bg-[#F4D35E]" style={{
                        width: '78%'
                      }}></div>
                      </div>
                      <p className="text-sm text-[#4E4E4E]">
                        Vous couvrez la majorité des compétences clés demandées
                        dans l'offre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-semibold text-[#2C2C2C] mb-5 text-xl">
                  Vérification finale
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-white p-4 rounded-lg border border-[#E6E2D8] shadow-inner">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-6 h-6 text-[#38A169]" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold text-[#2C2C2C]">
                        CV sélectionné
                      </h4>
                      <p className="text-sm text-[#7A7A7A]">
                        {selectedCV?.name}
                      </p>
                    </div>
                    <button className="ml-auto text-[#4465A0] hover:text-[#4465A0]/80 font-medium transition-colors">
                      Modifier
                    </button>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg border border-[#E6E2D8] shadow-inner">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-6 h-6 text-[#38A169]" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold text-[#2C2C2C]">
                        Lettre de motivation
                      </h4>
                      <p className="text-sm text-[#7A7A7A]">
                        Personnalisée pour {extractedData?.company}
                      </p>
                    </div>
                    <button className="ml-auto text-[#4465A0] hover:text-[#4465A0]/80 font-medium transition-colors">
                      Modifier
                    </button>
                  </div>
                  <div className="flex items-start bg-white p-4 rounded-lg border border-[#E6E2D8] shadow-inner">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-6 h-6 text-[#38A169]" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-semibold text-[#2C2C2C]">
                        Offre d'emploi
                      </h4>
                      <p className="text-sm text-[#7A7A7A]">
                        {extractedData?.position} - {extractedData?.company}
                      </p>
                    </div>
                    <button className="ml-auto text-[#4465A0] hover:text-[#4465A0]/80 font-medium transition-colors">
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFF5F5] border border-[#E53E3E]/30 rounded-lg p-5 mb-6 shadow-sm">
                <div className="flex">
                  <AlertCircleIcon className="w-6 h-6 text-[#E53E3E] mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#2C2C2C] mb-2 text-lg">
                      Recommandation
                    </h3>
                    <p className="text-base text-[#4E4E4E] mb-3">
                      Pour améliorer votre candidature, ajoutez une mention de
                      votre projet freelance React dans votre lettre de
                      motivation.
                    </p>
                    <button className="text-base font-medium text-[#4465A0] hover:text-[#4465A0]/80 flex items-center transition-colors">
                      <span>Appliquer cette suggestion</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>;
      case 5:
        return <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                Finalisation
              </h2>
              <p className="text-lg text-[#4E4E4E]">
                Votre candidature est prête à être envoyée
              </p>
            </div>
            <Card className="p-8 bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-white border border-[#F4D35E]/40 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                  <SendIcon className="w-12 h-12 text-[#F4D35E]" />
                </div>
                <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-3">
                  Candidature prête pour {extractedData?.company}
                </h3>
                <p className="text-[#4E4E4E] max-w-2xl mx-auto text-lg">
                  Votre candidature pour le poste de{' '}
                  <span className="text-[#2C2C2C] font-medium">
                    {extractedData?.position}
                  </span>{' '}
                  est prête à être envoyée. Une fois envoyée, nous activerons le
                  suivi automatique pour vous tenir informé des mises à jour.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-[#E6E2D8] rounded-lg p-5 flex flex-col items-center shadow-sm">
                  <div className="w-12 h-12 bg-[#F7F4EE] rounded-full flex items-center justify-center mb-3 border border-[#E6E2D8] shadow-inner">
                    <FileTextIcon className="w-6 h-6 text-[#4465A0]" />
                  </div>
                  <h4 className="font-semibold text-[#2C2C2C] text-lg mb-2">
                    CV
                  </h4>
                  <p className="text-base text-[#7A7A7A] mb-4 text-center">
                    {selectedCV?.name}
                  </p>
                  <button className="text-sm text-[#4465A0] hover:text-[#4465A0]/80 flex items-center mt-auto border border-[#4465A0]/30 px-3 py-1.5 rounded-full hover:bg-[#4465A0]/5 transition-all">
                    <EyeIcon className="w-4 h-4 mr-1.5" />
                    Aperçu
                  </button>
                </div>
                <div className="bg-white border border-[#E6E2D8] rounded-lg p-5 flex flex-col items-center shadow-sm">
                  <div className="w-12 h-12 bg-[#F7F4EE] rounded-full flex items-center justify-center mb-3 border border-[#E6E2D8] shadow-inner">
                    <PenIcon className="w-6 h-6 text-[#4465A0]" />
                  </div>
                  <h4 className="font-semibold text-[#2C2C2C] text-lg mb-2">
                    Lettre de motivation
                  </h4>
                  <p className="text-base text-[#7A7A7A] mb-4 text-center">
                    Personnalisée pour {extractedData?.company}
                  </p>
                  <button className="text-sm text-[#4465A0] hover:text-[#4465A0]/80 flex items-center mt-auto border border-[#4465A0]/30 px-3 py-1.5 rounded-full hover:bg-[#4465A0]/5 transition-all">
                    <EyeIcon className="w-4 h-4 mr-1.5" />
                    Aperçu
                  </button>
                </div>
                <div className="bg-white border border-[#E6E2D8] rounded-lg p-5 flex flex-col items-center shadow-sm">
                  <div className="w-12 h-12 bg-[#F7F4EE] rounded-full flex items-center justify-center mb-3 border border-[#E6E2D8] shadow-inner">
                    <CheckCircleIcon className="w-6 h-6 text-[#4465A0]" />
                  </div>
                  <h4 className="font-semibold text-[#2C2C2C] text-lg mb-2">
                    Score de correspondance
                  </h4>
                  <div className="flex items-center mb-4">
                    <span className={`text-lg font-bold ${matchScore > 80 ? 'text-[#38A169]' : matchScore > 60 ? 'text-[#F4D35E]' : 'text-[#E53E3E]'}`}>
                      {matchScore}%
                    </span>
                    <div className="w-20 h-2 bg-[#F7F4EE] rounded-full ml-3 shadow-inner">
                      <div className={`h-2 rounded-full ${matchScore > 80 ? 'bg-[#38A169]' : matchScore > 60 ? 'bg-[#F4D35E]' : 'bg-[#E53E3E]'}`} style={{
                      width: `${matchScore}%`
                    }}></div>
                    </div>
                  </div>
                  <span className="text-base text-[#7A7A7A]">
                    {matchScore > 80 ? 'Excellent' : matchScore > 60 ? 'Bon' : 'À améliorer'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button variant="secondary" className="flex items-center justify-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all">
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Télécharger (PDF)
                </Button>
                <Button variant="secondary" className="flex items-center justify-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all">
                  <MailIcon className="w-5 h-5 mr-2" />
                  Envoyer par mail
                </Button>
                <Button variant="secondary" className="flex items-center justify-center border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all">
                  <SaveIcon className="w-5 h-5 mr-2" />
                  Sauvegarder pour plus tard
                </Button>
                <Button variant="primary" className="flex items-center justify-center bg-[#F4D35E] text-[#2C2C2C] hover:bg-[#EBCB4E] hover:shadow-md font-medium px-6 py-2.5" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? <>
                      <motion.div className="w-5 h-5 border-2 border-[#2C2C2C] border-t-transparent rounded-full mr-2" animate={{
                    rotate: 360
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }} />
                      Envoi en cours...
                    </> : <>
                      <SendIcon className="w-5 h-5 mr-2" />
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
    icon: <ClipboardIcon className="w-5 h-5" />
  }, {
    id: 2,
    label: 'CV',
    icon: <FileTextIcon className="w-5 h-5" />
  }, {
    id: 3,
    label: 'Lettre',
    icon: <PenIcon className="w-5 h-5" />
  }, {
    id: 4,
    label: 'Vérification',
    icon: <CheckCircleIcon className="w-5 h-5" />
  }, {
    id: 5,
    label: 'Envoi',
    icon: <SendIcon className="w-5 h-5" />
  }];
  return <div className="min-h-screen bg-[#FDFCF9] w-full">
      <Header title="Nouvelle candidature" onBack={onBack} variant="build" progress={currentStep * 20} />
      <motion.div className="container mx-auto px-4 py-8 max-w-5xl" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        {/* Progress steps */}
        <div className="mb-10 overflow-x-auto pb-3">
          <div className="flex items-center justify-center min-w-max">
            {steps.map((step, index) => <Fragment key={step.id}>
                {/* Step indicator */}
                <div className="flex flex-col items-center relative">
                  <motion.div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${currentStep === step.id ? 'bg-[#F4D35E] text-[#2C2C2C]' : currentStep > step.id ? 'bg-[#38A169] text-white' : 'bg-white text-[#7A7A7A] border border-[#E6E2D8]'}`} initial={false} animate={currentStep === step.id ? {
                scale: [1, 1.15, 1],
                boxShadow: '0 0 15px rgba(244, 211, 94, 0.5)'
              } : {}} transition={{
                duration: 0.5
              }}>
                    {currentStep > step.id ? <CheckIcon className="w-6 h-6" /> : step.icon}
                  </motion.div>
                  <span className={`text-sm mt-2 ${currentStep === step.id ? 'text-[#2C2C2C] font-semibold' : 'text-[#4E4E4E]'}`}>
                    {step.label}
                  </span>
                </div>
                {/* Connector line */}
                {index < steps.length - 1 && <div className="flex-1 mx-3">
                    <div className="h-0.5 bg-[#E6E2D8] relative">
                      <motion.div className="absolute inset-0 bg-[#F4D35E] origin-left" initial={{
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
        {/* Main content */}
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
        {/* Navigation */}
        <div className="mt-10 flex justify-between">
          <Button variant="secondary" className="border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all px-5 py-2.5" onClick={goToPreviousStep} disabled={currentStep === 1 || showSuccess}>
            <ChevronLeftIcon className="w-5 h-5 mr-2" />
            Précédent
          </Button>
          <Button variant={currentStep === 5 ? 'primary' : 'secondary'} className={currentStep === 5 ? 'bg-[#F4D35E] text-[#2C2C2C] hover:bg-[#EBCB4E] hover:shadow-md font-medium px-6 py-2.5' : 'border border-[#4465A0] bg-transparent text-[#4465A0] hover:bg-[#4465A0]/5 hover:shadow-sm transition-all px-5 py-2.5'} onClick={goToNextStep} disabled={currentStep === 1 && !extractedData || currentStep === 2 && !selectedCV || currentStep === 3 && !coverLetterText || showSuccess}>
            {currentStep === 5 ? <>
                Envoyer ma candidature
                <SendIcon className="w-5 h-5 ml-2" />
              </> : <>
                Continuer
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </>}
          </Button>
        </div>
        {/* Success overlay */}
        <AnimatePresence>
          {showSuccess && <motion.div className="fixed inset-0 bg-[#FDFCF9]/95 flex flex-col items-center justify-center z-20 backdrop-blur-md" initial={{
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
                  <div className="w-28 h-28 bg-[#ECFDF5] rounded-full flex items-center justify-center shadow-xl shadow-[#38A169]/10">
                    <CheckIcon className="w-14 h-14 text-[#38A169]" />
                  </div>
                  <motion.div className="absolute inset-0 rounded-full border-4 border-[#38A169]/30" initial={{
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
              <motion.h2 className="text-3xl font-semibold text-[#2C2C2C] mt-8 mb-3" initial={{
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
              <motion.p className="text-[#4E4E4E] text-center max-w-md text-lg" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }}>
                Votre candidature a été envoyée à{' '}
                <strong className="text-[#2C2C2C]">
                  {extractedData?.company}
                </strong>
                . Suivi activé. Nous vous tiendrons informé de chaque mise à
                jour.
              </motion.p>
            </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>;
};