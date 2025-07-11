import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { EntryScreen } from '../prepare/EntryScreen';
import { JobOfferPreparationFlow } from '../prepare/JobOfferPreparationFlow';
import { InterviewSimulation } from '../prepare/InterviewSimulation';
import { PitchTrainingModule } from '../prepare/PitchTrainingModule';
export const PrepareUniverse = ({
  onBack,
  onShowPricing,
  exploreMode
}) => {
  const [currentModule, setCurrentModule] = useState('entry');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  useEffect(() => {
    // Check if there's an initial module to load from onboarding
    const initialModule = window.localStorage.getItem('prepare_initial_module');
    if (initialModule) {
      setCurrentModule(initialModule);
      // Clear the storage to prevent reloading on next visit
      window.localStorage.removeItem('prepare_initial_module');
    }
  }, []);
  const handleStartCoaching = type => {
    // Diriger vers le module approprié en fonction du type de coaching
    if (type === 'pitch') {
      setCurrentModule('pitch');
    } else if (type === 'jobOffer') {
      setCurrentModule('jobOffer');
    }
  };
  const handleCompleteModule = () => {
    if (currentModule === 'jobOffer') {
      setCurrentModule('interview');
    } else {
      setCurrentModule('entry');
    }
  };
  const handleBack = () => {
    if (currentModule === 'interview') {
      setCurrentModule('jobOffer');
    } else if (currentModule === 'jobOffer' || currentModule === 'pitch') {
      setCurrentModule('entry');
    } else {
      onBack();
    }
  };
  const handlePitchComplete = () => {
    // Retour à l'écran principal après avoir terminé le pitch
    setCurrentModule('entry');
    // Vous pourriez ajouter ici une logique pour marquer le pitch comme complété
  };
  return <div className="min-h-screen w-full bg-gradient-to-br from-[#0F172A] to-[#131836] text-white">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button onClick={handleBack} className="p-2 rounded-full bg-blue-900/50 hover:bg-blue-800/60 transition-colors mr-3">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium text-white">
              Prépare ton entretien
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsAudioEnabled(!isAudioEnabled)} className={`p-2 rounded-full ${isAudioEnabled ? 'bg-lavender-400/20 text-lavender-200' : 'bg-blue-900/50 text-gray-400'} hover:bg-lavender-400/30 transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </button>
          </div>
        </div>
        {/* Content */}
        {currentModule === 'entry' && <EntryScreen onStartCoaching={handleStartCoaching} />}
        {currentModule === 'pitch' && <PitchTrainingModule onComplete={handlePitchComplete} onBack={handleBack} isAudioEnabled={isAudioEnabled} />}
        {currentModule === 'jobOffer' && <JobOfferPreparationFlow onComplete={handleCompleteModule} onBack={handleBack} isAudioEnabled={isAudioEnabled} onShowPricing={onShowPricing} />}
        {currentModule === 'interview' && <InterviewSimulation onComplete={handleCompleteModule} onBack={handleBack} isAudioEnabled={isAudioEnabled} showPricing={true} onShowPricing={onShowPricing} />}
      </div>
    </div>;
};