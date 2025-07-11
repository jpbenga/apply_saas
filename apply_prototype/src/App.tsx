import React, { useEffect, useState } from 'react';
import { NewOnboarding } from './components/onboarding/NewOnboarding';
import { Dashboard } from './components/dashboard/Dashboard';
import { BuildUniverse } from './components/universes/BuildUniverse';
import { PrepareUniverse } from './components/universes/PrepareUniverse';
import { ActUniverse } from './components/universes/ActUniverse';
import { ApplicationsDashboard } from './components/applications/ApplicationsDashboard';
import { ProfilePage } from './components/profile/ProfilePage';
import { PricingMatrixModal } from './components/pricing/PricingMatrixModal';
import { UserProvider, useUser } from './context/UserContext';
import { CVImportScreen } from './components/onboarding/CVImportScreen';
import { NewApplicationPage } from './components/applications/NewApplicationPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
// Main App wrapper component to provide context
export function App() {
  return <UserProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </UserProvider>;
}
// Inner component that uses the context
function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [currentUniverse, setCurrentUniverse] = useState(null);
  const [showPricingMatrix, setShowPricingMatrix] = useState(false);
  const [pricingVariant, setPricingVariant] = useState('build');
  const [showCVImport, setShowCVImport] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [importedCVData, setImportedCVData] = useState(null);
  const [exploreMode, setExploreMode] = useState(false);
  const {
    subscriptionTier,
    setSubscriptionTier,
    setHasImportedCV,
    hasViewedProfile,
    setHasViewedProfile
  } = useUser();
  // Écouter l'événement showPricingMatrix
  useEffect(() => {
    const handleShowPricingEvent = event => {
      setPricingVariant(event.detail?.variant || 'build');
      setShowPricingMatrix(true);
    };
    window.addEventListener('showPricingMatrix', handleShowPricingEvent);
    return () => {
      window.removeEventListener('showPricingMatrix', handleShowPricingEvent);
    };
  }, []);
  const navigateTo = screen => {
    setCurrentScreen(screen);
    setCurrentUniverse(null);
    setExploreMode(false);
  };
  // Fonction pour vérifier si l'utilisateur a accès à un univers
  const hasAccessToUniverse = universe => {
    switch (universe) {
      case 'build':
        // Tous les utilisateurs ont accès à l'univers Build
        return true;
      case 'prepare':
        // Tous les utilisateurs ont accès à l'univers Prepare
        return true;
      case 'act':
        // Seuls les utilisateurs avec le plan 'agent' ont accès à l'univers Act
        return subscriptionTier === 'agent';
      default:
        return false;
    }
  };
  const enterUniverse = (universe, mode = null) => {
    setCurrentUniverse(universe);
    setCurrentScreen('universe');
    // Si le mode d'exploration est explicitement demandé ou si l'utilisateur n'a pas accès
    if (mode === 'explore' || !hasAccessToUniverse(universe)) {
      setExploreMode(true);
    } else {
      setExploreMode(false);
    }
  };
  const handleShowPricing = (variant = 'build') => {
    setPricingVariant(variant);
    setShowPricingMatrix(true);
  };
  const handlePlanSelect = plan => {
    console.log('Plan selected:', plan);
    // Update subscription tier based on selection
    if (plan === 'transformation' || plan === 'agent') {
      setSubscriptionTier(plan);
      // Execute pending action if exists (like accessing Act universe)
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    }
    setShowPricingMatrix(false);
  };
  const handleImportCV = () => {
    setShowCVImport(true);
  };
  const handleCVImportComplete = cvData => {
    setHasImportedCV(true);
    setShowCVImport(false);
    setImportedCVData(cvData);
    // Navigate to Build universe after import
    setCurrentUniverse('build');
    setCurrentScreen('universe');
  };
  const handleCVImportCancel = () => {
    setShowCVImport(false);
    // Navigate to Build universe anyway
    setCurrentUniverse('build');
    setCurrentScreen('universe');
  };
  const handleViewProfile = () => {
    setHasViewedProfile(true);
    navigateTo('profile');
  };
  const handleNewApplicationComplete = applicationData => {
    // Handle the newly created application
    console.log('New application created:', applicationData);
    // Navigate back to applications dashboard
    navigateTo('applications');
  };
  const handleOnboardingComplete = (userProfile, selectedUniverse, initialAction = null) => {
    // Vous pouvez utiliser les données du profil utilisateur et l'univers sélectionné ici si nécessaire
    console.log('Onboarding completed with profile:', userProfile, 'and selected universe:', selectedUniverse, 'initial action:', initialAction);
    // Si un univers spécifique est sélectionné, naviguer directement vers cet univers
    if (selectedUniverse) {
      setCurrentUniverse(selectedUniverse);
      setCurrentScreen('universe');
      // Si une action initiale est spécifiée, vous pourriez l'utiliser pour configurer l'état initial de l'univers
      if (initialAction) {
        // Par exemple, pour l'univers "prepare", vous pourriez vouloir démarrer avec l'entraînement au pitch
        if (selectedUniverse === 'prepare' && initialAction === 'pitch-practice') {
          // Ici, vous pourriez définir un état qui serait lu par le composant PrepareUniverse
          // pour démarrer directement avec le module de pitch
          window.localStorage.setItem('prepare_initial_module', 'pitch');
        }
        // De même pour les autres actions initiales dans d'autres univers
      }
    } else {
      // Comportement par défaut si aucun univers n'est sélectionné
      navigateTo('dashboard');
    }
  };
  return <div className="w-full min-h-screen" style={{
    background: 'none',
    backdropFilter: 'none'
  }}>
      {currentScreen === 'onboarding' && <NewOnboarding onComplete={handleOnboardingComplete} onImportCV={handleImportCV} onCreateNew={() => {
      setCurrentUniverse('build');
      setCurrentScreen('universe');
    }} />}
      {showCVImport && <CVImportScreen onComplete={handleCVImportComplete} onCancel={handleCVImportCancel} />}
      {currentScreen === 'dashboard' && <Dashboard onEnterUniverse={enterUniverse} onViewApplications={() => navigateTo('applications')} onViewProfile={handleViewProfile} onNewApplication={() => navigateTo('new-application')} onShowPricing={handleShowPricing} />}
      {currentScreen === 'applications' && <div className="relative">
          <button className="absolute top-4 left-4 z-10 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => navigateTo('dashboard')}>
            ← Retour
          </button>
          <ApplicationsDashboard onShowPricing={handleShowPricing} onNewApplication={() => navigateTo('new-application')} />
        </div>}
      {currentScreen === 'new-application' && <NewApplicationPage onBack={() => navigateTo('applications')} onComplete={handleNewApplicationComplete} />}
      {currentScreen === 'profile' && <ProfilePage onBack={() => navigateTo('dashboard')} />}
      {currentScreen === 'universe' && currentUniverse === 'build' && <BuildUniverse onBack={() => navigateTo('dashboard')} importedCVData={importedCVData} />}
      {currentScreen === 'universe' && currentUniverse === 'prepare' && <PrepareUniverse onBack={() => navigateTo('dashboard')} onShowPricing={handleShowPricing} exploreMode={exploreMode} />}
      {currentScreen === 'universe' && currentUniverse === 'act' && <ActUniverse onBack={() => navigateTo('dashboard')} onShowPricing={handleShowPricing} />}
      {/* Pricing Matrix Modal */}
      <PricingMatrixModal isOpen={showPricingMatrix} onClose={() => setShowPricingMatrix(false)} variant={pricingVariant} onSelectPlan={handlePlanSelect} onSelectAlternative={() => console.log('Alternative option selected')} />
    </div>;
}