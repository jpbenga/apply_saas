import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, SearchIcon, ZapIcon, UserIcon, SettingsIcon, MessageSquareIcon, BriefcaseIcon } from 'lucide-react';
import { Card } from '../common/Card';
import { ScanInterface } from '../act/ScanInterface';
import { AgentConsole } from '../act/AgentConsole';
import { PricingMatrixModal } from '../pricing/PricingMatrixModal';
import { EntryScreen } from '../act/EntryScreen';
export const ActUniverse = ({
  onBack,
  onShowPricing
}) => {
  const [currentTool, setCurrentTool] = useState('scan'); // scan, agent, chat
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [showPricingMatrix, setShowPricingMatrix] = useState(false);
  useEffect(() => {
    // Check if there's an initial action to load from onboarding
    const initialAction = window.localStorage.getItem('act_initial_action');
    if (initialAction) {
      if (initialAction === 'job-scan') {
        setCurrentTool('scan');
      } else if (initialAction === 'autopilot') {
        setCurrentTool('agent');
      }
      // Clear the storage to prevent reloading on next visit
      window.localStorage.removeItem('act_initial_action');
    }
  }, []);
  // Handle platform connection
  const handleConnectPlatform = platformId => {
    // Check if platform is already connected
    if (connectedPlatforms.includes(platformId)) {
      // If already connected, disconnect it
      setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
    } else {
      // If not connected, connect it
      setConnectedPlatforms([...connectedPlatforms, platformId]);
    }
  };
  // Handle scan completion
  const handleScanComplete = () => {
    setScanComplete(true);
  };
  // Handle upgrade (show pricing matrix)
  const handleUpgrade = () => {
    setShowPricingMatrix(true);
  };
  // Handle plan selection from pricing matrix
  const handleSelectPlan = plan => {
    setShowPricingMatrix(false);
    // Here you would normally activate the premium features
    // For now, we'll just go back to the scan interface
    setScanComplete(true);
  };
  const tools = [{
    id: 'scan',
    name: 'Scanner',
    icon: <SearchIcon className="w-5 h-5" />,
    description: 'Analyser les opportunités'
  }, {
    id: 'agent',
    name: 'AutoPilot',
    icon: <ZapIcon className="w-5 h-5" />,
    description: 'Agent automatisé'
  }, {
    id: 'applications',
    name: 'Candidatures',
    icon: <BriefcaseIcon className="w-5 h-5" />,
    description: 'Suivi des candidatures'
  }];
  return <div className="min-h-screen w-full bg-gradient-to-br from-[#1A0E21] to-[#120818] text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 rounded-full bg-[#1E0F24] hover:bg-[#CBA6F7]/10 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-medium">Univers Act</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-[#1E0F24] hover:bg-[#CBA6F7]/10 transition-colors">
              <UserIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-[#1E0F24] hover:bg-[#CBA6F7]/10 transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Tools navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tools.map(tool => <motion.div key={tool.id} whileHover={{
          y: -5
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setCurrentTool(tool.id)}>
              <Card variant="act" className={`p-4 cursor-pointer ${currentTool === tool.id ? 'border-[#CBA6F7]/50 bg-[#CBA6F7]/10' : 'border-[#CBA6F7]/20 hover:border-[#CBA6F7]/30'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${currentTool === tool.id ? 'bg-[#CBA6F7]/20 text-[#CBA6F7]' : 'bg-[#1E0F24] text-[#D8D4E8]'}`}>
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{tool.name}</h3>
                    <p className="text-xs text-[#D8D4E8]">{tool.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>)}
        </div>
        {/* Tool content */}
        {currentTool === 'scan' && <ScanInterface onConnect={handleConnectPlatform} connectedPlatforms={connectedPlatforms} onComplete={handleScanComplete} scanComplete={scanComplete} onUpgrade={handleUpgrade} />}
        {currentTool === 'agent' && <AgentConsole onBack={() => setCurrentTool('scan')} />}
        {currentTool === 'applications' && <div className="p-8 text-center">
            <h2 className="text-xl mb-4">Suivi des candidatures</h2>
            <p className="text-gray-400">
              Fonctionnalité en cours de développement
            </p>
          </div>}
      </div>
      {/* Pricing Matrix Modal */}
      <PricingMatrixModal isOpen={showPricingMatrix} onClose={() => setShowPricingMatrix(false)} variant="act" onSelectPlan={handleSelectPlan} onSelectAlternative={() => console.log('Alternative option selected')} />
    </div>;
};