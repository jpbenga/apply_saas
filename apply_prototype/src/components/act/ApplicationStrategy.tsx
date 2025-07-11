import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { RocketIcon, SettingsIcon, CheckIcon, FileTextIcon, MessageSquareIcon, ClockIcon, BellIcon, RefreshCwIcon, CheckCircleIcon, CalendarIcon, BarChart2Icon, ArrowRightIcon, ZapIcon, SlackIcon, MailIcon, BriefcaseIcon, SearchIcon } from 'lucide-react';
export const ApplicationStrategy = ({
  autoPilotLevel,
  applications,
  onComplete
}) => {
  const [activeTab, setActiveTab] = useState('strategy'); // strategy, schedule, notifications
  const [strategy, setStrategy] = useState({
    applyFrequency: 'daily',
    maxApplicationsPerDay: 5,
    followUpEnabled: true,
    followUpDelay: 7,
    prioritizationEnabled: true,
    coverLetterStyle: 'professional',
    resumeOptimization: 'high'
  });
  const [schedule, setSchedule] = useState({
    jobSearchTime: '9:00',
    applicationTime: '10:00',
    followUpTime: '14:00',
    weekdaysOnly: true
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    slack: false,
    dailySummary: true,
    interviewAlerts: true,
    newMatchAlerts: true
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  // Mettre à jour la stratégie en fonction du niveau d'AutoPilot
  useEffect(() => {
    if (autoPilotLevel === 'analysis') {
      setStrategy({
        ...strategy,
        followUpEnabled: false,
        maxApplicationsPerDay: 0
      });
    } else if (autoPilotLevel === 'preparation') {
      setStrategy({
        ...strategy,
        maxApplicationsPerDay: 3
      });
    }
  }, [autoPilotLevel]);
  // Gérer le changement de stratégie
  const handleStrategyChange = (key, value) => {
    setStrategy(prev => ({
      ...prev,
      [key]: value
    }));
  };
  // Gérer le changement de planning
  const handleScheduleChange = (key, value) => {
    setSchedule(prev => ({
      ...prev,
      [key]: value
    }));
  };
  // Gérer le changement de notifications
  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  // Terminer la configuration
  const handleComplete = () => {
    setShowCompletionAnimation(true);
    setTimeout(() => {
      setIsConfigured(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1500);
  };
  // Obtenir la description du niveau d'AutoPilot
  const getAutoPilotDescription = () => {
    switch (autoPilotLevel) {
      case 'analysis':
        return "Apply analyse les offres et te suggère les meilleures correspondances, mais c'est toi qui postules.";
      case 'preparation':
        return 'Apply analyse les offres et prépare automatiquement tes CV et lettres de motivation adaptés, que tu valides avant envoi.';
      case 'complete':
        return 'Apply analyse, prépare et postule automatiquement aux meilleures offres correspondant à ton profil.';
      default:
        return "Sélectionne un niveau d'AutoPilot pour continuer.";
    }
  };
  // Obtenir l'icône du niveau d'AutoPilot
  const getAutoPilotIcon = () => {
    switch (autoPilotLevel) {
      case 'analysis':
        return <SearchIcon className="w-10 h-10 text-blue-500" />;
      case 'preparation':
        return <FileTextIcon className="w-10 h-10 text-yellow-500" />;
      case 'complete':
        return <RocketIcon className="w-10 h-10 text-red-500" />;
      default:
        return <SettingsIcon className="w-10 h-10 text-gray-500" />;
    }
  };
  // Si la configuration est terminée, afficher l'animation de complétion
  if (isConfigured) {
    return <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mb-6" animate={{
        scale: [1, 1.2, 1],
        boxShadow: ['0 0 0px rgba(34, 197, 94, 0)', '0 0 30px rgba(34, 197, 94, 0.6)', '0 0 0px rgba(34, 197, 94, 0)']
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }}>
          <CheckIcon className="w-12 h-12 text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-light mb-3 text-white">
          Configuration terminée
        </h2>
        <p className="text-gray-300 mb-6 text-center max-w-md">
          Ton AutoPilot est configuré et prêt à optimiser ta recherche d'emploi.
        </p>
      </div>;
  }
  // Afficher l'animation de complétion
  if (showCompletionAnimation) {
    return <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div className="w-24 h-24 relative" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <motion.div className="absolute inset-0 rounded-full border-4 border-act-accent/30 border-t-act-accent" animate={{
          rotate: 360
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }} />
          <motion.div className="absolute inset-0 flex items-center justify-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <RocketIcon className="w-12 h-12 text-act-accent" />
          </motion.div>
        </motion.div>
        <motion.h2 className="text-2xl font-light mb-2 text-center mt-6" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          Finalisation de la stratégie
        </motion.h2>
        <motion.p className="text-gray-300 text-center" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }}>
          Préparation de ton tableau de bord AutoPilot...
        </motion.p>
      </div>;
  }
  return <div className="space-y-6">
      <Card variant="act" className="p-6 border border-act-accent/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-act-accent" />
            Stratégie de candidature
          </h2>
          <div className="flex space-x-2">
            <button className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'strategy' ? 'bg-act-accent/20 text-act-accent' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveTab('strategy')}>
              Stratégie
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'schedule' ? 'bg-act-accent/20 text-act-accent' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveTab('schedule')}>
              Planning
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'notifications' ? 'bg-act-accent/20 text-act-accent' : 'bg-gray-800 text-gray-300'}`} onClick={() => setActiveTab('notifications')}>
              Notifications
            </button>
          </div>
        </div>

        {/* Niveau d'AutoPilot */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
          <div className="flex items-start">
            <div className="p-3 bg-gray-900 rounded-full mr-4">
              {getAutoPilotIcon()}
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">
                Mode AutoPilot :{' '}
                <span className="text-act-accent">{autoPilotLevel}</span>
              </h3>
              <p className="text-gray-300 mb-3">{getAutoPilotDescription()}</p>
              {applications.length > 0 && <div className="p-3 bg-green-900/20 border border-green-900/30 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-white">
                      {applications.length} candidatures déjà envoyées
                    </span>
                  </div>
                </div>}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Onglet Stratégie */}
          {activeTab === 'strategy' && <motion.div key="strategy" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <div className="space-y-6">
                {/* Fréquence de candidature */}
                <div>
                  <h3 className="text-white font-medium mb-3">
                    Fréquence de candidature
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Quand postuler
                      </label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={strategy.applyFrequency} onChange={e => handleStrategyChange('applyFrequency', e.target.value)} disabled={autoPilotLevel === 'analysis'}>
                        <option value="daily">Tous les jours</option>
                        <option value="weekdays">
                          Jours ouvrés uniquement
                        </option>
                        <option value="custom">Planning personnalisé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Candidatures max. par jour
                      </label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={strategy.maxApplicationsPerDay} onChange={e => handleStrategyChange('maxApplicationsPerDay', parseInt(e.target.value))} disabled={autoPilotLevel === 'analysis'}>
                        <option value="0">Aucune (manuel uniquement)</option>
                        <option value="3">3 candidatures</option>
                        <option value="5">5 candidatures</option>
                        <option value="10">10 candidatures</option>
                        <option value="15">15 candidatures</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Relances */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium">
                      Relances automatiques
                    </h3>
                    <div className="flex items-center">
                      <input type="checkbox" id="followUpEnabled" className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-act-accent" checked={strategy.followUpEnabled} onChange={e => handleStrategyChange('followUpEnabled', e.target.checked)} disabled={autoPilotLevel === 'analysis'} />
                      <label htmlFor="followUpEnabled" className="ml-2 text-gray-300">
                        Activer
                      </label>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border ${strategy.followUpEnabled ? 'bg-gray-800 border-gray-700' : 'bg-gray-900 border-gray-800'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Délai avant relance
                        </label>
                        <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={strategy.followUpDelay} onChange={e => handleStrategyChange('followUpDelay', parseInt(e.target.value))} disabled={!strategy.followUpEnabled || autoPilotLevel === 'analysis'}>
                          <option value="3">3 jours</option>
                          <option value="5">5 jours</option>
                          <option value="7">7 jours</option>
                          <option value="10">10 jours</option>
                          <option value="14">14 jours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Prioritisation
                        </label>
                        <div className="flex items-center h-10">
                          <input type="checkbox" id="prioritizationEnabled" className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-act-accent" checked={strategy.prioritizationEnabled} onChange={e => handleStrategyChange('prioritizationEnabled', e.target.checked)} disabled={!strategy.followUpEnabled || autoPilotLevel === 'analysis'} />
                          <label htmlFor="prioritizationEnabled" className="ml-2 text-gray-300">
                            Prioriser les offres à forte correspondance
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personnalisation */}
                <div>
                  <h3 className="text-white font-medium mb-3">
                    Personnalisation des documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Style de lettre de motivation
                      </label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={strategy.coverLetterStyle} onChange={e => handleStrategyChange('coverLetterStyle', e.target.value)}>
                        <option value="professional">Professionnel</option>
                        <option value="creative">Créatif</option>
                        <option value="formal">Formel</option>
                        <option value="conversational">Conversationnel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Niveau d'optimisation du CV
                      </label>
                      <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={strategy.resumeOptimization} onChange={e => handleStrategyChange('resumeOptimization', e.target.value)}>
                        <option value="low">
                          Minimal (peu de changements)
                        </option>
                        <option value="medium">
                          Modéré (ajustements ciblés)
                        </option>
                        <option value="high">
                          Élevé (optimisation complète)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Onglet Planning */}
          {activeTab === 'schedule' && <motion.div key="schedule" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">
                    Planning quotidien
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Recherche d'offres
                      </label>
                      <input type="time" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={schedule.jobSearchTime} onChange={e => handleScheduleChange('jobSearchTime', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Envoi de candidatures
                      </label>
                      <input type="time" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={schedule.applicationTime} onChange={e => handleScheduleChange('applicationTime', e.target.value)} disabled={autoPilotLevel === 'analysis'} />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Relances
                      </label>
                      <input type="time" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value={schedule.followUpTime} onChange={e => handleScheduleChange('followUpTime', e.target.value)} disabled={!strategy.followUpEnabled || autoPilotLevel === 'analysis'} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Jours d'activité
                  </h3>
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center mb-4">
                      <input type="checkbox" id="weekdaysOnly" className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-act-accent" checked={schedule.weekdaysOnly} onChange={e => handleScheduleChange('weekdaysOnly', e.target.checked)} />
                      <label htmlFor="weekdaysOnly" className="ml-2 text-gray-300">
                        Actif uniquement les jours ouvrés (lundi-vendredi)
                      </label>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => <div key={index} className={`p-3 rounded-lg border text-center ${schedule.weekdaysOnly && index < 5 || !schedule.weekdaysOnly ? 'bg-act-accent/20 border-act-accent/30 text-white' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                          {day}
                        </div>)}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Visualisation du planning
                  </h3>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div className="flex space-x-2 text-sm text-gray-400 mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                        <span>Recherche</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span>Candidatures</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                        <span>Relances</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, index) => <div key={index} className="flex items-center">
                            <div className="w-20 text-sm text-gray-400">
                              {day}
                            </div>
                            <div className="flex-1 h-8 bg-gray-900 rounded-lg relative">
                              {(!schedule.weekdaysOnly || index < 5) && <>
                                  <div className="absolute h-6 top-1 rounded-md bg-blue-500/30 border border-blue-500/50" style={{
                          left: `${getTimePercentage(schedule.jobSearchTime)}%`,
                          width: '8%'
                        }}></div>
                                  {autoPilotLevel !== 'analysis' && <div className="absolute h-6 top-1 rounded-md bg-green-500/30 border border-green-500/50" style={{
                          left: `${getTimePercentage(schedule.applicationTime)}%`,
                          width: '8%'
                        }}></div>}
                                  {strategy.followUpEnabled && autoPilotLevel !== 'analysis' && <div className="absolute h-6 top-1 rounded-md bg-purple-500/30 border border-purple-500/50" style={{
                          left: `${getTimePercentage(schedule.followUpTime)}%`,
                          width: '8%'
                        }}></div>}
                                </>}
                            </div>
                          </div>)}
                      {['Samedi', 'Dimanche'].map((day, index) => <div key={index} className="flex items-center">
                          <div className="w-20 text-sm text-gray-400">
                            {day}
                          </div>
                          <div className="flex-1 h-8 bg-gray-900 rounded-lg relative">
                            {!schedule.weekdaysOnly && <>
                                <div className="absolute h-6 top-1 rounded-md bg-blue-500/30 border border-blue-500/50" style={{
                          left: `${getTimePercentage(schedule.jobSearchTime)}%`,
                          width: '8%'
                        }}></div>
                                {autoPilotLevel !== 'analysis' && <div className="absolute h-6 top-1 rounded-md bg-green-500/30 border border-green-500/50" style={{
                          left: `${getTimePercentage(schedule.applicationTime)}%`,
                          width: '8%'
                        }}></div>}
                                {strategy.followUpEnabled && autoPilotLevel !== 'analysis' && <div className="absolute h-6 top-1 rounded-md bg-purple-500/30 border border-purple-500/50" style={{
                          left: `${getTimePercentage(schedule.followUpTime)}%`,
                          width: '8%'
                        }}></div>}
                              </>}
                          </div>
                        </div>)}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                      <span>24:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Onglet Notifications */}
          {activeTab === 'notifications' && <motion.div key="notifications" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">
                    Canaux de notification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <MailIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">Email</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="emailNotif" className="sr-only" checked={notifications.email} onChange={e => handleNotificationChange('email', e.target.checked)} />
                        <label htmlFor="emailNotif" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.email ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.email ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <BellIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">
                          Notifications push
                        </span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="pushNotif" className="sr-only" checked={notifications.push} onChange={e => handleNotificationChange('push', e.target.checked)} />
                        <label htmlFor="pushNotif" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.push ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.push ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div className="flex items-center">
                        <SlackIcon className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-300">Slack</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="slackNotif" className="sr-only" checked={notifications.slack} onChange={e => handleNotificationChange('slack', e.target.checked)} />
                        <label htmlFor="slackNotif" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.slack ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.slack ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Types de notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <BarChart2Icon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-white">Résumé quotidien</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Reçois un résumé des activités et résultats du jour
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="dailySummary" className="sr-only" checked={notifications.dailySummary} onChange={e => handleNotificationChange('dailySummary', e.target.checked)} />
                        <label htmlFor="dailySummary" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.dailySummary ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.dailySummary ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-white">
                            Alertes d'entretien
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Sois notifié immédiatement quand tu obtiens un
                          entretien
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="interviewAlerts" className="sr-only" checked={notifications.interviewAlerts} onChange={e => handleNotificationChange('interviewAlerts', e.target.checked)} />
                        <label htmlFor="interviewAlerts" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.interviewAlerts ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.interviewAlerts ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <BriefcaseIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-white">
                            Nouvelles correspondances
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Sois alerté quand de nouvelles offres à forte
                          correspondance sont trouvées
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="newMatchAlerts" className="sr-only" checked={notifications.newMatchAlerts} onChange={e => handleNotificationChange('newMatchAlerts', e.target.checked)} />
                        <label htmlFor="newMatchAlerts" className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications.newMatchAlerts ? 'bg-act-accent' : 'bg-gray-700'}`}>
                          <span className={`block h-4 w-4 ml-1 mt-1 rounded-full bg-white transform transition-transform duration-200 ${notifications.newMatchAlerts ? 'translate-x-4' : ''}`}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Aperçu des notifications
                  </h3>
                  <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 flex items-start">
                      <div className="p-2 bg-green-900/30 rounded-full mr-3 mt-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium">
                            Candidature envoyée
                          </h4>
                          <span className="text-xs text-gray-500">
                            Il y a 2h
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Ta candidature pour UX Designer chez DesignStudio a
                          été envoyée avec succès.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 flex items-start">
                      <div className="p-2 bg-blue-900/30 rounded-full mr-3 mt-1">
                        <BriefcaseIcon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium">
                            Nouvelle correspondance
                          </h4>
                          <span className="text-xs text-gray-500">
                            Il y a 5h
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Une nouvelle offre avec 92% de correspondance a été
                          trouvée : Product Designer chez TechCorp.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 flex items-start">
                      <div className="p-2 bg-purple-900/30 rounded-full mr-3 mt-1">
                        <RefreshCwIcon className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium">
                            Relance programmée
                          </h4>
                          <span className="text-xs text-gray-500">
                            Il y a 1j
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Une relance pour ta candidature chez WebAgency sera
                          envoyée dans 4 jours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          <Button variant="act" className="flex items-center" onClick={handleComplete}>
            <ZapIcon className="w-5 h-5 mr-2" />
            Finaliser la configuration
          </Button>
        </div>
      </Card>
    </div>;
};
// Fonction utilitaire pour convertir l'heure en pourcentage de la journée
const getTimePercentage = timeString => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes / 1440 * 100; // 1440 = nombre de minutes dans une journée
};