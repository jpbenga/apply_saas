import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalIcon, MailIcon, LinkedinIcon, CheckIcon, XIcon, SearchIcon, FileTextIcon, SendIcon, ClockIcon, BriefcaseIcon, AlertCircleIcon, CheckCircleIcon, RefreshCwIcon, ZapIcon, PauseIcon, PlayIcon, InfoIcon, BarChartIcon } from 'lucide-react';
import { Button } from '../common/Button';
const accounts = [{
  id: 'gmail',
  name: 'Gmail',
  icon: <MailIcon className="w-5 h-5" />,
  status: 'disconnected',
  email: 'thomas.dupont@gmail.com'
}, {
  id: 'linkedin',
  name: 'LinkedIn',
  icon: <LinkedinIcon className="w-5 h-5" />,
  status: 'disconnected',
  username: 'thomasdupont'
}];
const terminalLines = [{
  id: 1,
  type: 'info',
  message: 'Agent AutoPilot initialisé',
  timestamp: new Date().toISOString()
}, {
  id: 2,
  type: 'system',
  message: "Connexion aux services de recherche d'emploi...",
  timestamp: new Date().toISOString()
}];
export const AgentConsole = ({
  onBack
}) => {
  const [activeAccounts, setActiveAccounts] = useState(accounts);
  const [consoleLines, setConsoleLines] = useState(terminalLines);
  const [agentStatus, setAgentStatus] = useState('idle'); // idle, active, paused
  const [isConnecting, setIsConnecting] = useState(false);
  const [metrics, setMetrics] = useState({
    jobsFound: 0,
    jobsAnalyzed: 0,
    applicationsSubmitted: 0,
    responseRate: 0
  });
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [accountToConnect, setAccountToConnect] = useState(null);
  const terminalRef = useRef(null);
  // Auto-scroll terminal to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleLines]);
  // Simulate agent activity
  useEffect(() => {
    if (agentStatus === 'active') {
      const actions = [simulateSearching, simulateAnalyzing, simulateApplying, simulateResponse];
      const interval = setInterval(() => {
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        randomAction();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [agentStatus]);
  const connectAccount = accountId => {
    const account = activeAccounts.find(acc => acc.id === accountId);
    setAccountToConnect(account);
    setShowConnectionModal(true);
  };
  const handleConfirmConnection = () => {
    setIsConnecting(true);
    setShowConnectionModal(false);
    // Simulate connection process
    setTimeout(() => {
      setActiveAccounts(accounts => accounts.map(acc => acc.id === accountToConnect.id ? {
        ...acc,
        status: 'connected'
      } : acc));
      addConsoleLine('success', `Compte ${accountToConnect.name} connecté avec succès`);
      setIsConnecting(false);
      // If both accounts are connected, automatically start the agent
      const updatedAccounts = activeAccounts.map(acc => acc.id === accountToConnect.id ? {
        ...acc,
        status: 'connected'
      } : acc);
      if (updatedAccounts.every(acc => acc.status === 'connected') && agentStatus === 'idle') {
        setTimeout(() => {
          startAgent();
        }, 1000);
      }
    }, 2000);
  };
  const addConsoleLine = (type, message) => {
    const newLine = {
      id: consoleLines.length + 1,
      type,
      message,
      timestamp: new Date().toISOString()
    };
    setConsoleLines(prev => [...prev, newLine]);
  };
  const startAgent = () => {
    if (activeAccounts.some(acc => acc.status !== 'connected')) {
      addConsoleLine('error', "Veuillez connecter tous vos comptes avant de démarrer l'agent");
      return;
    }
    setAgentStatus('active');
    addConsoleLine('system', 'Agent AutoPilot démarré');
    addConsoleLine('info', "Recherche d'offres d'emploi en cours...");
    // Simulate initial search
    simulateSearching();
  };
  const pauseAgent = () => {
    setAgentStatus('paused');
    addConsoleLine('system', 'Agent AutoPilot mis en pause');
  };
  const resumeAgent = () => {
    setAgentStatus('active');
    addConsoleLine('system', 'Agent AutoPilot redémarré');
  };
  const simulateSearching = () => {
    addConsoleLine('search', 'Recherche d\'offres pour "UX Designer" à Paris');
    setTimeout(() => {
      const jobsCount = Math.floor(Math.random() * 5) + 1;
      addConsoleLine('success', `${jobsCount} nouvelles offres trouvées`);
      setMetrics(prev => ({
        ...prev,
        jobsFound: prev.jobsFound + jobsCount
      }));
      // Simulate job analysis after finding jobs
      simulateAnalyzing(jobsCount);
    }, 2000);
  };
  const simulateAnalyzing = (jobCount = 1) => {
    const companies = ['DesignStudio', 'TechVision', 'InnovateCorp', 'PixelPerfect', 'UXMasters'];
    const positions = ['UX Designer', 'Product Designer', 'UI/UX Designer', 'Senior UX Designer', 'UX/UI Lead'];
    for (let i = 0; i < jobCount; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      addConsoleLine('analyze', `Analyse de l'offre: ${position} chez ${company}`);
      setTimeout(() => {
        const match = Math.floor(Math.random() * 30) + 70; // 70-99% match
        addConsoleLine('info', `Compatibilité avec votre profil: ${match}%`);
        setMetrics(prev => ({
          ...prev,
          jobsAnalyzed: prev.jobsAnalyzed + 1
        }));
        // If good match, simulate applying
        if (match > 85 && Math.random() > 0.3) {
          setTimeout(() => {
            simulateApplying(company, position);
          }, 1500);
        }
      }, 1500);
    }
  };
  const simulateApplying = (company = 'DesignStudio', position = 'UX Designer') => {
    addConsoleLine('apply', `Préparation de candidature pour ${position} chez ${company}`);
    setTimeout(() => {
      addConsoleLine('info', 'Personnalisation du CV en cours...');
      setTimeout(() => {
        addConsoleLine('info', 'Génération de la lettre de motivation...');
        setTimeout(() => {
          addConsoleLine('success', `Candidature envoyée avec succès à ${company}`);
          setMetrics(prev => ({
            ...prev,
            applicationsSubmitted: prev.applicationsSubmitted + 1,
            responseRate: Math.min(Math.floor((prev.applicationsSubmitted + 1) * 100 / (prev.jobsAnalyzed || 1) * 0.3), 100)
          }));
        }, 2000);
      }, 2000);
    }, 1000);
  };
  const simulateResponse = () => {
    if (metrics.applicationsSubmitted > 0 && Math.random() > 0.7) {
      const companies = ['DesignStudio', 'TechVision', 'InnovateCorp', 'PixelPerfect', 'UXMasters'];
      const company = companies[Math.floor(Math.random() * companies.length)];
      addConsoleLine('response', `Réponse reçue de ${company}`);
      setTimeout(() => {
        if (Math.random() > 0.5) {
          addConsoleLine('success', `${company} souhaite vous rencontrer pour un entretien!`);
        } else {
          addConsoleLine('info', `${company} a bien reçu votre candidature et l'étudie`);
        }
      }, 1000);
    }
  };
  const getLineIcon = type => {
    switch (type) {
      case 'info':
        return <ClockIcon className="w-4 h-4 text-blue-400" />;
      case 'system':
        return <TerminalIcon className="w-4 h-4 text-gray-400" />;
      case 'search':
        return <SearchIcon className="w-4 h-4 text-blue-500" />;
      case 'analyze':
        return <FileTextIcon className="w-4 h-4 text-purple-500" />;
      case 'apply':
        return <SendIcon className="w-4 h-4 text-green-500" />;
      case 'success':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircleIcon className="w-4 h-4 text-red-500" />;
      case 'response':
        return <BriefcaseIcon className="w-4 h-4 text-amber-500" />;
      default:
        return <TerminalIcon className="w-4 h-4 text-gray-400" />;
    }
  };
  const getLineColor = type => {
    switch (type) {
      case 'info':
        return 'text-blue-200';
      case 'system':
        return 'text-gray-300';
      case 'search':
        return 'text-blue-300';
      case 'analyze':
        return 'text-purple-300';
      case 'apply':
        return 'text-green-300';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-300';
      case 'response':
        return 'text-amber-300';
      default:
        return 'text-gray-300';
    }
  };
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  return <div className="min-h-screen w-full bg-gradient-to-br from-act-bg to-act-bg/90 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>
            <h1 className="text-2xl font-medium">Agent AutoPilot</h1>
          </div>
          <div className="flex items-center space-x-2">
            {agentStatus === 'idle' ? <Button variant="act" onClick={startAgent} className="flex items-center" disabled={activeAccounts.some(acc => acc.status !== 'connected')}>
                <ZapIcon className="w-4 h-4 mr-2" />
                Démarrer l'agent
              </Button> : agentStatus === 'active' ? <Button variant="secondary" onClick={pauseAgent} className="flex items-center">
                <PauseIcon className="w-4 h-4 mr-2" />
                Mettre en pause
              </Button> : <Button variant="act" onClick={resumeAgent} className="flex items-center">
                <PlayIcon className="w-4 h-4 mr-2" />
                Reprendre
              </Button>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Terminal console */}
            <div className="bg-gray-900/80 border border-act-accent/30 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <TerminalIcon className="w-5 h-5 text-act-accent mr-2" />
                  <h2 className="font-medium">Console AutoPilot</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${agentStatus === 'idle' ? 'bg-gray-700 text-gray-300' : agentStatus === 'active' ? 'bg-green-900/60 text-green-300' : 'bg-amber-900/60 text-amber-300'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${agentStatus === 'idle' ? 'bg-gray-400' : agentStatus === 'active' ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`}></span>
                    {agentStatus === 'idle' ? 'Inactif' : agentStatus === 'active' ? 'Actif' : 'En pause'}
                  </span>
                  <button className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors" onClick={() => setConsoleLines(terminalLines)} title="Effacer la console">
                    <RefreshCwIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div ref={terminalRef} className="p-4 h-[500px] overflow-y-auto font-mono text-sm" style={{
              backgroundColor: '#0D1117'
            }}>
                <AnimatePresence initial={false}>
                  {consoleLines.map(line => <motion.div key={line.id} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.3
                }} className="mb-2 flex items-start">
                      <span className="text-gray-500 mr-2">
                        [{formatTimestamp(line.timestamp)}]
                      </span>
                      <span className="mr-2">{getLineIcon(line.type)}</span>
                      <span className={getLineColor(line.type)}>
                        {line.message}
                      </span>
                    </motion.div>)}
                  {agentStatus === 'active' && <motion.div className="flex items-center text-green-400" animate={{
                  opacity: [1, 0.5, 1]
                }} transition={{
                  duration: 1,
                  repeat: Infinity
                }}>
                      <span className="text-gray-500 mr-2">
                        [{formatTimestamp(new Date().toISOString())}]
                      </span>
                      <span className="mr-2">
                        <TerminalIcon className="w-4 h-4" />
                      </span>
                      <span className="h-4 w-2 bg-green-500 animate-pulse"></span>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </div>
            {/* Metrics */}
            <div className="bg-gray-900/80 border border-act-accent/30 rounded-lg p-5">
              <h2 className="font-medium mb-4 flex items-center">
                <BarChartIcon className="w-5 h-5 text-act-accent mr-2" />
                Statistiques de l'agent
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold">{metrics.jobsFound}</div>
                  <div className="text-sm text-gray-400">Offres trouvées</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {metrics.jobsAnalyzed}
                  </div>
                  <div className="text-sm text-gray-400">Offres analysées</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {metrics.applicationsSubmitted}
                  </div>
                  <div className="text-sm text-gray-400">
                    Candidatures envoyées
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {metrics.responseRate}%
                  </div>
                  <div className="text-sm text-gray-400">Taux de réponse</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Connected accounts */}
            <div className="bg-gray-900/80 border border-act-accent/30 rounded-lg p-5">
              <h2 className="font-medium mb-4">Comptes connectés</h2>
              <div className="space-y-3">
                {activeAccounts.map(account => <div key={account.id} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${account.status === 'connected' ? 'bg-green-900/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {account.icon}
                      </div>
                      <div>
                        <div className="font-medium">{account.name}</div>
                        {account.status === 'connected' && <div className="text-xs text-gray-400">
                            {account.id === 'gmail' ? account.email : `linkedin.com/in/${account.username}`}
                          </div>}
                      </div>
                    </div>
                    <div>
                      {account.status === 'connected' ? <span className="inline-flex items-center px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          Connecté
                        </span> : account.status === 'connecting' ? <span className="inline-flex items-center px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                          <RefreshCwIcon className="w-3 h-3 mr-1 animate-spin" />
                          Connexion...
                        </span> : <Button variant="secondary" size="small" onClick={() => connectAccount(account.id)} className="text-xs">
                          Connecter
                        </Button>}
                    </div>
                  </div>)}
              </div>
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-act-accent/20">
                <div className="flex items-start">
                  <InfoIcon className="w-5 h-5 text-act-accent mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    Connectez vos comptes pour permettre à l'agent de postuler
                    automatiquement en votre nom et de suivre les réponses.
                  </p>
                </div>
              </div>
            </div>
            {/* Agent settings */}
            <div className="bg-gray-900/80 border border-act-accent/30 rounded-lg p-5">
              <h2 className="font-medium mb-4">Paramètres de recherche</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Poste recherché
                  </label>
                  <div className="p-2 bg-gray-800 rounded-lg text-white">
                    UX Designer
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Localisation
                  </label>
                  <div className="p-2 bg-gray-800 rounded-lg text-white">
                    Paris, France
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Types de contrat
                  </label>
                  <div className="p-2 bg-gray-800 rounded-lg text-white">
                    CDI, Freelance
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Salaire minimum
                  </label>
                  <div className="p-2 bg-gray-800 rounded-lg text-white">
                    45 000 €
                  </div>
                </div>
              </div>
              <button className="mt-4 text-act-accent text-sm hover:underline w-full text-center">
                Modifier les critères
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Connection modal */}
      <AnimatePresence>
        {showConnectionModal && accountToConnect && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} className="bg-gray-900 border border-act-accent/30 rounded-lg p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${accountToConnect.id === 'gmail' ? 'bg-red-900/20' : 'bg-blue-900/20'}`}>
                  {accountToConnect.icon}
                </div>
                <h3 className="text-xl font-medium">
                  Connecter votre compte {accountToConnect.name}
                </h3>
                <p className="text-gray-400 mt-2">
                  Cette connexion permettra à l'agent de postuler en votre nom
                  et de suivre les réponses.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <div className="space-y-4">
                  {accountToConnect.id === 'gmail' ? <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Adresse email
                        </label>
                        <input type="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value="thomas.dupont@gmail.com" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Mot de passe
                        </label>
                        <input type="password" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value="••••••••••••" readOnly />
                      </div>
                    </> : <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Nom d'utilisateur LinkedIn
                        </label>
                        <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value="thomasdupont" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Mot de passe
                        </label>
                        <input type="password" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white" value="••••••••••••" readOnly />
                      </div>
                    </>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button variant="secondary" onClick={() => setShowConnectionModal(false)} className="sm:order-1" disabled={isConnecting}>
                  Annuler
                </Button>
                <Button variant="act" onClick={handleConfirmConnection} className="flex items-center justify-center" disabled={isConnecting}>
                  {isConnecting ? <>
                      <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                      Connexion...
                    </> : <>
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Connecter
                    </>}
                </Button>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};