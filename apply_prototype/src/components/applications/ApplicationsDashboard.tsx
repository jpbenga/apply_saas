import React, { useState, Fragment } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { BriefcaseIcon, PlusIcon, SearchIcon, FilterIcon, ChevronDownIcon, CheckIcon, XIcon, ClockIcon, MessageSquareIcon, CalendarIcon, ZapIcon, UserIcon, PanelLeftIcon, PanelRightIcon, LayoutGridIcon, ListIcon, ChevronRightIcon, ArrowLeftIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UpgradeCard } from '../subscription/UpgradeCard';
import { PaywallModal } from '../pricing/PaywallModal';
import { useUser } from '../../context/UserContext';
export const ApplicationsDashboard = ({
  onShowPricing,
  onNewApplication
}) => {
  const [currentTab, setCurrentTab] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [showFilters, setShowFilters] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const {
    subscriptionTier
  } = useUser();
  const applications = [{
    id: 1,
    company: 'TechCorp',
    position: 'Senior Product Designer',
    location: 'Paris, France',
    type: 'CDI',
    status: 'interview',
    date: '15 juin 2023',
    logo: 'https://randomuser.me/api/portraits/men/1.jpg',
    steps: [{
      name: 'Candidature envoyée',
      completed: true,
      date: '10 juin 2023'
    }, {
      name: 'Entretien RH',
      completed: true,
      date: '13 juin 2023',
      feedback: 'Très bon échange, questions sur mon expérience en design system'
    }, {
      name: 'Test technique',
      completed: false,
      date: '18 juin 2023',
      upcoming: true
    }, {
      name: 'Entretien final',
      completed: false
    }]
  }, {
    id: 2,
    company: 'StartupLab',
    position: 'UX Designer',
    location: 'Remote',
    type: 'Freelance',
    status: 'applied',
    date: '12 juin 2023',
    logo: 'https://randomuser.me/api/portraits/women/2.jpg',
    steps: [{
      name: 'Candidature envoyée',
      completed: true,
      date: '12 juin 2023'
    }, {
      name: 'Entretien RH',
      completed: false
    }]
  }, {
    id: 3,
    company: 'DesignStudio',
    position: 'UI/UX Designer',
    location: 'Lyon, France',
    type: 'CDD',
    status: 'rejected',
    date: '5 juin 2023',
    logo: 'https://randomuser.me/api/portraits/men/3.jpg',
    steps: [{
      name: 'Candidature envoyée',
      completed: true,
      date: '5 juin 2023'
    }, {
      name: 'Entretien RH',
      completed: true,
      date: '8 juin 2023',
      feedback: "L'équipe a décidé de poursuivre avec d'autres candidats"
    }, {
      name: 'Refus',
      completed: true,
      date: '10 juin 2023',
      feedback: "Profil intéressant mais ils recherchaient quelqu'un avec plus d'expérience en design system"
    }]
  }, {
    id: 4,
    company: 'AgenceDigitale',
    position: 'Product Designer',
    location: 'Bordeaux, France',
    type: 'CDI',
    status: 'offer',
    date: '1 juin 2023',
    logo: 'https://randomuser.me/api/portraits/women/4.jpg',
    steps: [{
      name: 'Candidature envoyée',
      completed: true,
      date: '1 juin 2023'
    }, {
      name: 'Entretien RH',
      completed: true,
      date: '5 juin 2023',
      feedback: 'Bon échange, questions sur mes projets précédents'
    }, {
      name: 'Test technique',
      completed: true,
      date: '8 juin 2023',
      feedback: 'Test réussi avec succès'
    }, {
      name: 'Entretien final',
      completed: true,
      date: '12 juin 2023',
      feedback: "Très bon feeling avec l'équipe"
    }, {
      name: 'Offre reçue',
      completed: true,
      date: '14 juin 2023',
      feedback: '45K€ annuel + avantages'
    }]
  }];
  const getStatusColor = status => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-amber-100 text-amber-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusText = status => {
    switch (status) {
      case 'applied':
        return 'Candidature envoyée';
      case 'interview':
        return 'Entretien en cours';
      case 'offer':
        return 'Offre reçue';
      case 'rejected':
        return 'Refusée';
      default:
        return status;
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'applied':
        return <CheckIcon className="w-3 h-3" />;
      case 'interview':
        return <MessageSquareIcon className="w-3 h-3" />;
      case 'offer':
        return <BriefcaseIcon className="w-3 h-3" />;
      case 'rejected':
        return <XIcon className="w-3 h-3" />;
      default:
        return <ClockIcon className="w-3 h-3" />;
    }
  };
  const filteredApplications = () => {
    if (currentTab === 'all') return applications;
    return applications.filter(app => app.status === currentTab);
  };
  const handleAddApplication = () => {
    // Check if user can add more applications
    if (subscriptionTier === 'etincelle' && applications.length >= 3) {
      setShowPaywall(true);
    } else {
      // Navigate to new application page
      onNewApplication();
    }
  };
  const handlePaywallAction = () => {
    setShowPaywall(false);
    onShowPricing('build');
  };
  // Get count of applications by status
  const getStatusCount = status => {
    return applications.filter(app => app.status === status).length;
  };
  return <div className="min-h-screen bg-[#FDFCF9]">
      {/* Header sticky - optimisé pour mobile et desktop */}
      <header className="sticky top-0 z-10 bg-[#FDFCF9] border-b border-[#E6E2D8] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="mr-3 p-1.5 rounded-full hover:bg-[#FAF7F1] transition-colors" aria-label="Retour">
              <ArrowLeftIcon className="w-5 h-5 text-[#2C2C2C]" />
            </button>
            <h1 className="text-xl font-semibold text-[#2C2C2C]">
              Mes candidatures
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded-lg bg-[#FAF7F1] border border-[#E6E2D8] text-[#4E4E4E]" onClick={() => setShowFiltersSidebar(!showFiltersSidebar)}>
              <FilterIcon className="w-5 h-5" />
            </button>
            <div className="hidden md:flex">
              <Button variant="primary" className="flex items-center" onClick={handleAddApplication}>
                <PlusIcon className="w-4 h-4 mr-1" />
                <span>Nouvelle candidature</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filtres pour desktop */}
          <aside className="md:w-64 flex-shrink-0 hidden md:block">
            <Card className="p-4 mb-4 bg-[#FAF7F1] border border-[#E6E2D8]">
              <div className="space-y-2">
                <button className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${currentTab === 'all' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => setCurrentTab('all')}>
                  <span>Toutes ({applications.length})</span>
                  {currentTab === 'all' && <ChevronRightIcon className="w-4 h-4" />}
                </button>
                <button className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${currentTab === 'applied' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => setCurrentTab('applied')}>
                  <span>En attente ({getStatusCount('applied')})</span>
                  {currentTab === 'applied' && <ChevronRightIcon className="w-4 h-4" />}
                </button>
                <button className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${currentTab === 'interview' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => setCurrentTab('interview')}>
                  <span>Entretiens ({getStatusCount('interview')})</span>
                  {currentTab === 'interview' && <ChevronRightIcon className="w-4 h-4" />}
                </button>
                <button className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${currentTab === 'offer' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => setCurrentTab('offer')}>
                  <span>Offres ({getStatusCount('offer')})</span>
                  {currentTab === 'offer' && <ChevronRightIcon className="w-4 h-4" />}
                </button>
                <button className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${currentTab === 'rejected' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => setCurrentTab('rejected')}>
                  <span>Refus ({getStatusCount('rejected')})</span>
                  {currentTab === 'rejected' && <ChevronRightIcon className="w-4 h-4" />}
                </button>
              </div>
            </Card>
            {subscriptionTier === 'etincelle' && <UpgradeCard type="applications" currentTier="free" onUpgrade={() => onShowPricing('build')} />}
          </aside>

          {/* Sidebar filtres pour mobile - affichée conditionnellement */}
          <AnimatePresence>
            {showFiltersSidebar && <motion.div className="fixed inset-0 z-40 bg-black/30 md:hidden" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} onClick={() => setShowFiltersSidebar(false)}>
                <motion.div className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-[#FDFCF9] p-4 overflow-y-auto" initial={{
              x: '-100%'
            }} animate={{
              x: 0
            }} exit={{
              x: '-100%'
            }} transition={{
              type: 'spring',
              damping: 25
            }} onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-[#2C2C2C]">
                      Filtres
                    </h2>
                    <button className="p-1.5 rounded-full hover:bg-[#FAF7F1]" onClick={() => setShowFiltersSidebar(false)}>
                      <XIcon className="w-5 h-5 text-[#4E4E4E]" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button className={`w-full px-3 py-3 rounded-lg flex items-center justify-between ${currentTab === 'all' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => {
                  setCurrentTab('all');
                  setShowFiltersSidebar(false);
                }}>
                      <span>Toutes ({applications.length})</span>
                      {currentTab === 'all' && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                    <button className={`w-full px-3 py-3 rounded-lg flex items-center justify-between ${currentTab === 'applied' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => {
                  setCurrentTab('applied');
                  setShowFiltersSidebar(false);
                }}>
                      <span>En attente ({getStatusCount('applied')})</span>
                      {currentTab === 'applied' && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                    <button className={`w-full px-3 py-3 rounded-lg flex items-center justify-between ${currentTab === 'interview' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => {
                  setCurrentTab('interview');
                  setShowFiltersSidebar(false);
                }}>
                      <span>Entretiens ({getStatusCount('interview')})</span>
                      {currentTab === 'interview' && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                    <button className={`w-full px-3 py-3 rounded-lg flex items-center justify-between ${currentTab === 'offer' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => {
                  setCurrentTab('offer');
                  setShowFiltersSidebar(false);
                }}>
                      <span>Offres ({getStatusCount('offer')})</span>
                      {currentTab === 'offer' && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                    <button className={`w-full px-3 py-3 rounded-lg flex items-center justify-between ${currentTab === 'rejected' ? 'bg-[#F4D35E]/20 text-[#2C2C2C] font-medium' : 'text-[#4E4E4E] hover:bg-[#F4D35E]/10'}`} onClick={() => {
                  setCurrentTab('rejected');
                  setShowFiltersSidebar(false);
                }}>
                      <span>Refus ({getStatusCount('rejected')})</span>
                      {currentTab === 'rejected' && <ChevronRightIcon className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              </motion.div>}
          </AnimatePresence>

          <div className="flex-1">
            {/* Barre de recherche et filtres */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center mb-5 gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <input type="text" placeholder="Rechercher..." className="w-full sm:w-auto pl-9 pr-4 py-2.5 border border-[#E6E2D8] rounded-lg focus:ring-[#F4D35E]/50 focus:border-[#F4D35E] bg-white text-[#2C2C2C] placeholder-[#9A9A9A]" />
                  <SearchIcon className="w-5 h-5 text-[#9A9A9A] absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                </div>
                <Button variant="secondary" size="small" className="flex items-center border border-[#E6E2D8] bg-[#FAF7F1] text-[#4E4E4E] w-full sm:w-auto justify-center" onClick={() => setShowFilters(!showFilters)}>
                  <FilterIcon className="w-4 h-4 mr-1.5" />
                  <span>Filtres avancés</span>
                </Button>
              </div>
              <div className="hidden md:flex bg-[#FAF7F1] p-1 rounded-lg border border-[#E6E2D8]">
                <button className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`} onClick={() => setViewMode('list')}>
                  <ListIcon className="w-5 h-5 text-[#4E4E4E]" />
                </button>
                <button className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`} onClick={() => setViewMode('grid')}>
                  <LayoutGridIcon className="w-5 h-5 text-[#4E4E4E]" />
                </button>
              </div>
            </div>

            {/* Filtres avancés - affichés conditionnellement */}
            <AnimatePresence>
              {showFilters && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} className="mb-5 overflow-hidden">
                  <Card className="p-4 bg-[#FAF7F1] border border-[#E6E2D8] shadow-sm">
                    <div className="flex flex-wrap gap-4">
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                          Type de contrat
                        </label>
                        <select className="w-full sm:w-auto border border-[#E6E2D8] rounded-lg px-3 py-2.5 bg-white text-[#2C2C2C] focus:ring-[#F4D35E]/50 focus:border-[#F4D35E]">
                          <option>Tous</option>
                          <option>CDI</option>
                          <option>CDD</option>
                          <option>Freelance</option>
                          <option>Stage</option>
                        </select>
                      </div>
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                          Localisation
                        </label>
                        <select className="w-full sm:w-auto border border-[#E6E2D8] rounded-lg px-3 py-2.5 bg-white text-[#2C2C2C] focus:ring-[#F4D35E]/50 focus:border-[#F4D35E]">
                          <option>Toutes</option>
                          <option>Paris</option>
                          <option>Lyon</option>
                          <option>Marseille</option>
                          <option>Remote</option>
                        </select>
                      </div>
                      <div className="w-full sm:w-auto">
                        <label className="block text-sm font-medium text-[#2C2C2C] mb-1.5">
                          Date
                        </label>
                        <select className="w-full sm:w-auto border border-[#E6E2D8] rounded-lg px-3 py-2.5 bg-white text-[#2C2C2C] focus:ring-[#F4D35E]/50 focus:border-[#F4D35E]">
                          <option>Toutes</option>
                          <option>Aujourd'hui</option>
                          <option>Cette semaine</option>
                          <option>Ce mois</option>
                        </select>
                      </div>
                      <div className="flex items-end w-full sm:w-auto">
                        <Button variant="build" size="small" className="w-full sm:w-auto bg-[#F4D35E] text-[#2C2C2C] border-[#F4D35E] hover:bg-[#F4D35E]/90">
                          Appliquer les filtres
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>}
            </AnimatePresence>

            {/* Indicateur de filtre actif pour mobile */}
            {currentTab !== 'all' && <div className="md:hidden mb-4 flex items-center">
                <span className="text-sm text-[#4E4E4E]">Filtre actif:</span>
                <span className="ml-2 px-2.5 py-1 bg-[#F4D35E]/20 text-[#2C2C2C] rounded-full text-sm font-medium flex items-center">
                  {currentTab === 'applied' && 'En attente'}
                  {currentTab === 'interview' && 'Entretiens'}
                  {currentTab === 'offer' && 'Offres'}
                  {currentTab === 'rejected' && 'Refus'}
                  <button className="ml-1.5 w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#F4D35E]/30" onClick={() => setCurrentTab('all')}>
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              </div>}

            {/* Liste des candidatures */}
            <div className={`space-y-4 ${viewMode === 'grid' ? 'md:grid md:grid-cols-2 md:gap-4 md:space-y-0' : ''}`}>
              {filteredApplications().length > 0 ? filteredApplications().map(application => <Card key={application.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white border border-[#E6E2D8]">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div className="mb-2 sm:mb-0">
                            <h3 className="font-medium text-[#2C2C2C] text-base mb-0.5 truncate">
                              {application.position}
                            </h3>
                            <p className="text-[#4E4E4E] text-sm">
                              {application.company}
                            </p>
                          </div>
                          <div className={`px-2.5 py-1 rounded-full text-xs flex items-center self-start sm:self-auto ${getStatusColor(application.status)}`}>
                            <span className="w-4 h-4 rounded-full flex items-center justify-center mr-1">
                              {getStatusIcon(application.status)}
                            </span>
                            <span>{getStatusText(application.status)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2.5 py-1 bg-[#FAF7F1] rounded-full text-xs text-[#4E4E4E] flex items-center border border-[#E6E2D8]">
                            <BriefcaseIcon className="w-3 h-3 mr-1" />
                            {application.type}
                          </span>
                          <span className="px-2.5 py-1 bg-[#FAF7F1] rounded-full text-xs text-[#4E4E4E] flex items-center border border-[#E6E2D8]">
                            <MapPinIcon className="w-3 h-3 mr-1" />
                            {application.location}
                          </span>
                          <span className="px-2.5 py-1 bg-[#FAF7F1] rounded-full text-xs text-[#4E4E4E] flex items-center border border-[#E6E2D8]">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            {application.date}
                          </span>
                        </div>
                        {/* Timeline des étapes - adapté pour être responsive */}
                        <div className="mt-4 pt-4 border-t border-[#E6E2D8]">
                          <h4 className="text-sm font-medium text-[#2C2C2C] mb-3">
                            Étapes
                          </h4>
                          <div className="flex flex-wrap items-center gap-y-3">
                            {application.steps.map((step, index) => <Fragment key={index}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.completed ? step.upcoming ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600' : 'bg-[#FAF7F1] text-[#9A9A9A] border border-[#E6E2D8]'}`}>
                                  {step.completed ? step.upcoming ? <ClockIcon className="w-4 h-4" /> : <CheckIcon className="w-4 h-4" /> : index + 1}
                                </div>
                                {index < application.steps.length - 1 && <div className={`h-0.5 w-4 sm:w-6 ${step.completed ? 'bg-green-200' : 'bg-[#E6E2D8]'} flex-shrink-0`}></div>}
                              </Fragment>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>) : <div className="text-center py-8">
                  <p className="text-[#4E4E4E]">Aucune candidature trouvée</p>
                </div>}

              {/* Limite de candidatures pour compte gratuit */}
              {subscriptionTier === 'etincelle' && applications.length >= 3 && <div className="mt-4">
                  <Card className="p-4 border-[#4465A0]/20 bg-[#4465A0]/5">
                    <div className="flex items-start">
                      <div className="p-2 bg-[#4465A0]/10 rounded-full mr-3">
                        <ZapIcon className="w-5 h-5 text-[#4465A0]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#2C2C2C] mb-1">
                          Limite de candidatures atteinte
                        </h3>
                        <p className="text-[#4E4E4E] text-sm mb-3">
                          Passez à La Transformation pour gérer un nombre
                          illimité de candidatures.
                        </p>
                        <Button variant="build" size="small" className="bg-[#4465A0] text-white border-[#4465A0] hover:bg-[#4465A0]/90" onClick={() => onShowPricing('build')}>
                          Débloquer cette limite
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>}
            </div>

            {/* Bouton nouvelle candidature pour mobile */}
            <div className="md:hidden mt-8 mb-4">
              <Button variant="primary" className="w-full flex items-center justify-center py-3 bg-[#F4D35E] text-[#2C2C2C] hover:bg-[#F4D35E]/90 shadow-sm" onClick={handleAddApplication}>
                <PlusIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Nouvelle candidature</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal paywall */}
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} onAction={handlePaywallAction} variant="build" type="applications" />
    </div>;
};
function MapPinIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>;
}