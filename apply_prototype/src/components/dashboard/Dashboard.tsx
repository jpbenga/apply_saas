import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FileTextIcon, UserIcon, MessageSquareIcon, RocketIcon, ClipboardIcon, BarChartIcon, LockIcon, BriefcaseIcon, CheckIcon, ChevronRightIcon, SparklesIcon, ZapIcon, TargetIcon, BellIcon, PlusIcon, SettingsIcon, LogOutIcon, StarIcon, PenToolIcon, HeartIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon, ShieldIcon, LayersIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { NewApplicationFlow } from '../applications/NewApplicationFlow';
export const Dashboard = ({
  onEnterUniverse,
  onViewApplications,
  onViewProfile,
  onNewApplication,
  onShowPricing
}) => {
  const [notifications, setNotifications] = useState([{
    id: 1,
    type: 'application',
    message: 'Nouvelle offre correspondant à ton profil',
    time: '2h',
    read: false
  }, {
    id: 2,
    type: 'interview',
    message: 'Entretien avec TechCorp dans 2 jours',
    time: '6h',
    read: false
  }, {
    id: 3,
    type: 'tip',
    message: 'Conseils pour ton prochain entretien',
    time: '1j',
    read: true
  }]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentApplications, setRecentApplications] = useState([{
    id: 1,
    company: 'Startup Innovante',
    position: 'Développeur Frontend',
    status: 'En attente',
    date: 'Il y a 3 jours'
  }, {
    id: 2,
    company: 'Grande Entreprise',
    position: 'Product Manager',
    status: 'Entretien',
    date: 'Il y a 1 semaine'
  }]);
  const [showNewApplicationModal, setShowNewApplicationModal] = useState(false);
  const [aiActivities, setAiActivities] = useState([{
    id: 1,
    type: 'cv',
    message: "CV mis à jour pour l'offre Orange - Marketing",
    time: '14:30',
    universe: 'build',
    completed: true
  }, {
    id: 2,
    type: 'letter',
    message: 'Lettre générée pour 3 nouvelles offres Indeed',
    time: '11:45',
    universe: 'build',
    completed: true
  }, {
    id: 3,
    type: 'interview',
    message: 'Préparation entretien simulée à 14h',
    time: '14:00',
    universe: 'prepare',
    completed: false
  }, {
    id: 4,
    type: 'application',
    message: 'Candidature automatique envoyée à TechVision',
    time: '09:15',
    universe: 'act',
    completed: true
  }]);
  const {
    subscriptionTier,
    hasViewedProfile
  } = useUser();
  const markNotificationAsRead = id => {
    setNotifications(notifications.map(notif => notif.id === id ? {
      ...notif,
      read: true
    } : notif));
  };
  const getUniverseProgress = universeId => {
    switch (universeId) {
      case 'build':
        return 75;
      case 'prepare':
        return 40;
      case 'act':
        return 20;
      default:
        return 0;
    }
  };
  const getUniverseMessage = universeId => {
    switch (universeId) {
      case 'build':
        return 'Tu avances bien dans ton impact.';
      case 'prepare':
        return 'Ton coaching émotionnel est en cours...';
      case 'act':
        return 'Prêt à passer en mode AutoPilot ?';
      default:
        return '';
    }
  };
  const getActivityIcon = type => {
    switch (type) {
      case 'cv':
        return <FileTextIcon className="w-5 h-5" />;
      case 'letter':
        return <PenToolIcon className="w-5 h-5" />;
      case 'interview':
        return <MessageSquareIcon className="w-5 h-5" />;
      case 'application':
        return <BriefcaseIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };
  const getActivityColor = universe => {
    switch (universe) {
      case 'build':
        return 'bg-build-accent/20 text-build-cta border-build-accent/30';
      case 'prepare':
        return 'bg-prepare-accent/20 text-prepare-accent border-prepare-accent/30';
      case 'act':
        return 'bg-act-accent/20 text-act-accent border-act-accent/30';
      default:
        return 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };
  const getPlanDetails = () => {
    switch (subscriptionTier) {
      case 'etincelle':
        return {
          name: 'Étincelle',
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          message: 'Tu avances vers la clarté. Découvre ce que tu peux activer maintenant.',
          icon: <SparklesIcon className="w-5 h-5 text-amber-500" />
        };
      case 'transformation':
        return {
          name: 'Transformation',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          message: 'Tu es en pleine transformation. Toutes les fonctionnalités sont activées.',
          icon: <ZapIcon className="w-5 h-5 text-blue-500" />
        };
      case 'agent':
        return {
          name: 'Agent',
          color: 'text-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          message: "Tu profites de l'expérience complète avec l'agent IA qui travaille pour toi.",
          icon: <RocketIcon className="w-5 h-5 text-purple-500" />
        };
      default:
        return {
          name: 'Étincelle',
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          message: 'Tu avances vers la clarté. Découvre ce que tu peux activer maintenant.',
          icon: <SparklesIcon className="w-5 h-5 text-amber-500" />
        };
    }
  };
  // Fonction pour vérifier si l'utilisateur a accès à un univers
  const hasAccessToUniverse = universeId => {
    switch (universeId) {
      case 'build':
        // Tous les utilisateurs ont accès à l'univers Build
        return true;
      case 'prepare':
        // Tous les utilisateurs ont accès à l'univers Prepare en mode exploration
        // Mais seuls les utilisateurs avec le plan 'transformation' ou 'agent' ont un accès complet
        return subscriptionTier === 'transformation' || subscriptionTier === 'agent';
      case 'act':
        // Seuls les utilisateurs avec le plan 'agent' ont accès à l'univers Act
        return subscriptionTier === 'agent';
      default:
        return false;
    }
  };
  // Fonction pour gérer l'entrée dans un univers
  const handleEnterUniverse = universeId => {
    if (hasAccessToUniverse(universeId)) {
      // Si l'utilisateur a accès, entrer dans l'univers normalement
      onEnterUniverse(universeId);
    } else {
      // Si l'utilisateur n'a pas accès, entrer en mode exploration
      onEnterUniverse(universeId, 'explore');
    }
  };
  // Fonction pour rediriger vers la page de pricing
  const handleViewPricing = () => {
    // Rediriger directement vers la page de pricing
    onShowPricing('build');
  };
  const universes = [{
    id: 'build',
    name: 'Construire',
    description: 'Crée ton CV et ta lettre de motivation',
    icon: <FileTextIcon className="w-6 h-6 text-build-cta" />,
    bgGradient: 'from-build-bg to-build-bg/90',
    borderColor: 'border-build-ui',
    textColor: 'text-build-text',
    accentColor: 'text-build-cta',
    ctaColor: 'bg-build-cta text-white',
    available: true,
    tierRequired: 'etincelle',
    progress: getUniverseProgress('build'),
    message: getUniverseMessage('build')
  }, {
    id: 'prepare',
    name: 'Se préparer',
    description: 'Entraîne-toi pour tes entretiens',
    icon: <MessageSquareIcon className="w-6 h-6 text-prepare-accent" />,
    bgGradient: 'from-prepare-bg to-prepare-bg/90',
    borderColor: 'border-prepare-accent/30',
    textColor: 'text-prepare-text',
    accentColor: 'text-prepare-accent',
    ctaColor: 'bg-prepare-accent text-white',
    available: true,
    tierRequired: 'etincelle',
    progress: getUniverseProgress('prepare'),
    message: getUniverseMessage('prepare')
  }, {
    id: 'act',
    name: 'Agir',
    description: 'Laisse ton agent IA postuler pour toi',
    icon: <RocketIcon className="w-6 h-6 text-act-accent" />,
    bgGradient: 'from-act-bg to-act-bg/90',
    borderColor: 'border-act-accent/30',
    textColor: 'text-white',
    accentColor: 'text-act-accent',
    ctaColor: 'bg-act-cta text-act-bg',
    available: subscriptionTier === 'agent',
    tierRequired: 'agent',
    progress: getUniverseProgress('act'),
    message: getUniverseMessage('act')
  }];
  const planDetails = getPlanDetails();
  const handleAddApplication = () => {
    setShowNewApplicationModal(true);
  };
  const handleApplicationComplete = newApplication => {
    // Add the new application to the list
    const newId = recentApplications.length > 0 ? Math.max(...recentApplications.map(app => app.id)) + 1 : 1;
    const formattedApplication = {
      id: newId,
      company: newApplication.company,
      position: newApplication.position,
      status: newApplication.status === 'sent' ? 'En attente' : newApplication.status,
      date: "Aujourd'hui"
    };
    setRecentApplications([formattedApplication, ...recentApplications]);
    setShowNewApplicationModal(false);
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  return <div className="min-h-screen bg-gray-50 text-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              Tableau de bord
            </h1>
            <p className="text-gray-500">Bienvenue, Thomas</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.div className={`py-1.5 px-3 rounded-full flex items-center ${planDetails.bgColor} ${planDetails.borderColor} border`} whileHover={{
            scale: 1.03
          }}>
              {planDetails.icon}
              <span className={`ml-1.5 text-sm font-medium ${planDetails.color}`}>
                Plan {planDetails.name}
              </span>
            </motion.div>
            <div className="relative">
              <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 relative" onClick={toggleNotifications}>
                <BellIcon className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>}
              </button>
              {/* Menu déroulant des notifications */}
              <AnimatePresence>
                {showNotifications && <motion.div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200" initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }}>
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">
                        Notifications
                      </h3>
                      <button className="text-xs text-blue-600 hover:underline">
                        Tout marquer comme lu
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? <div className="divide-y divide-gray-100">
                          {notifications.map(notification => <div key={notification.id} className={`p-3 flex items-start hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`} onClick={() => markNotificationAsRead(notification.id)}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${notification.type === 'application' ? 'bg-purple-100 text-purple-600 border border-purple-200' : notification.type === 'interview' ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-green-100 text-green-600 border border-green-200'}`}>
                                {notification.type === 'application' ? <BriefcaseIcon className="w-4 h-4" /> : notification.type === 'interview' ? <MessageSquareIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-gray-500 ml-2">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                            </div>)}
                        </div> : <div className="p-4 text-center text-gray-500">
                          Aucune notification
                        </div>}
                    </div>
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button className="w-full text-sm text-blue-600 hover:underline">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </div>
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200" onClick={onViewProfile}>
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Plan information banner */}
        <motion.div className={`mb-8 p-4 rounded-lg ${planDetails.bgColor} ${planDetails.borderColor} border flex items-center cursor-pointer`} initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} onClick={handleViewPricing}>
          <div className={`p-2 rounded-full bg-white/50 mr-3`}>
            {planDetails.icon}
          </div>
          <div>
            <h3 className={`font-medium ${planDetails.color}`}>
              Tu es sur le plan {planDetails.name}
            </h3>
            <p className="text-sm text-gray-600">{planDetails.message}</p>
          </div>
          {subscriptionTier === 'etincelle' && <Button variant="secondary" size="small" className="ml-auto" onClick={e => {
          e.stopPropagation();
          handleViewPricing();
        }}>
              Débloque tout Apply
            </Button>}
        </motion.div>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <LayersIcon className="w-5 h-5 mr-2 text-gray-400" />
            Tes univers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {universes.map((universe, index) => <motion.div key={universe.id} whileHover={{
            y: -5,
            transition: {
              duration: 0.2
            }
          }} whileTap={{
            scale: 0.98
          }} className="relative h-full" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }}>
                <div className={`rounded-xl border p-5 transition-all duration-200 cursor-pointer relative overflow-hidden bg-gradient-to-br ${universe.bgGradient} ${universe.borderColor} hover:shadow-lg hover:shadow-${universe.id}-accent/10 h-full flex flex-col`} onClick={() => handleEnterUniverse(universe.id)}>
                  {/* Background glow effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-${universe.id}-accent opacity-5 blur-3xl`} animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0]
                }} transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }} />
                    <motion.div className={`absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-${universe.id}-accent opacity-5 blur-3xl`} animate={{
                  x: [0, -10, 0],
                  y: [0, 10, 0]
                }} transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 1
                }} />
                  </div>
                  <div className="flex flex-col h-full relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${universe.id}-accent/10 border border-${universe.id}-accent/20`}>
                      {universe.icon}
                    </div>
                    <h3 className={`font-medium text-lg mb-1 ${universe.accentColor}`}>
                      {universe.name}
                    </h3>
                    <p className={`${universe.textColor} mb-4 font-medium`}>
                      {universe.description}
                    </p>
                    {/* Progress indicator */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-xs ${universe.textColor} font-medium`}>
                          {universe.message}
                        </span>
                        <span className={`text-xs font-medium ${universe.accentColor}`}>
                          {universe.progress}%
                        </span>
                      </div>
                      <div className={`w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4`}>
                        <motion.div className={`h-full bg-${universe.id}-accent`} initial={{
                      width: 0
                    }} animate={{
                      width: `${universe.progress}%`
                    }} transition={{
                      duration: 0.8,
                      delay: index * 0.2
                    }} />
                      </div>
                    </div>
                    {!universe.available && universe.id !== 'act' && <div className="absolute inset-0 bg-gray-100/80 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-white p-3 rounded-lg shadow-lg flex items-center border border-gray-200">
                          <LockIcon className="w-5 h-5 text-purple-400 mr-2" />
                          <span className="text-sm font-medium text-gray-700">
                            Réservé au plan L'Agent
                          </span>
                        </div>
                      </div>}
                    <Button variant="secondary" size="small" className={`mt-auto flex items-center justify-center ${universe.id === 'build' ? 'bg-build-cta text-build-bg hover:bg-build-cta/90' : universe.id === 'prepare' ? 'bg-prepare-accent text-prepare-bg hover:bg-prepare-accent/90' : universe.ctaColor}`} onClick={e => {
                  e.stopPropagation();
                  handleEnterUniverse(universe.id);
                }}>
                      <span>Explorer</span>
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-gray-400" />
                Ce que Apply a fait pour toi
              </h2>
            </div>
            <Card className="p-4 bg-white border-gray-200 shadow-sm">
              <div className="space-y-4">
                {aiActivities.map(activity => <div key={activity.id} className="relative pl-6 pb-4 last:pb-0">
                    {/* Timeline connector */}
                    {activity.id !== aiActivities.length && <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-gray-200"></div>}
                    {/* Activity dot */}
                    <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full ${activity.completed ? getActivityColor(activity.universe) : 'bg-gray-100 text-gray-400 border-gray-200'} border flex items-center justify-center`}>
                      {activity.completed ? <CheckIcon className="w-3 h-3" /> : <ClockIcon className="w-3 h-3" />}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-full ${getActivityColor(activity.universe)} mr-2`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <p className={`font-medium ${activity.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                            {activity.message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                          {activity.time}
                        </span>
                      </div>
                      {!activity.completed && <div className="mt-2 flex justify-end">
                          <Button variant="secondary" size="small" className="flex items-center">
                            <span>Voir détails</span>
                            <ArrowRightIcon className="w-3 h-3 ml-1" />
                          </Button>
                        </div>}
                    </div>
                  </div>)}
              </div>
            </Card>
          </section>
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <BriefcaseIcon className="w-5 h-5 mr-2 text-gray-400" />
                Candidatures récentes
              </h2>
              <button className="text-sm text-blue-600 hover:underline" onClick={onViewApplications}>
                Voir toutes
              </button>
            </div>
            <Card className="p-4 bg-white border-gray-200 shadow-sm">
              <div className="space-y-3">
                {recentApplications.map(application => <div key={application.id} className="p-3 border border-gray-200 rounded-lg flex items-center bg-white hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 border border-gray-200">
                      <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {application.position}
                          </p>
                          <p className="text-sm text-gray-500">
                            {application.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${application.status === 'En attente' ? 'bg-amber-100 text-amber-700 border border-amber-200' : application.status === 'Entretien' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                            {application.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {application.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>)}
                <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors" onClick={onNewApplication}>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  <span>Ajouter une candidature</span>
                </button>
              </div>
            </Card>
          </section>
        </div>

        {showNewApplicationModal && <NewApplicationFlow onClose={() => setShowNewApplicationModal(false)} onComplete={handleApplicationComplete} />}
      </div>
    </div>;
};