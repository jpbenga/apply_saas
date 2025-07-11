import React, { useEffect, useState, createContext, useContext } from 'react';
export type SubscriptionTier = 'etincelle' | 'transformation' | 'agent';
type UserContextType = {
  subscriptionTier: SubscriptionTier;
  setSubscriptionTier: (tier: SubscriptionTier) => void;
  hasImportedCV: boolean;
  setHasImportedCV: (imported: boolean) => void;
  completedSimulations: number;
  incrementCompletedSimulations: () => void;
  hasViewedProfile: boolean;
  setHasViewedProfile: (viewed: boolean) => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Always start with 'etincelle' as default tier - don't load from storage
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('etincelle');
  const [hasImportedCV, setHasImportedCV] = useState(false);
  const [completedSimulations, setCompletedSimulations] = useState(0);
  const [hasViewedProfile, setHasViewedProfile] = useState(false);
  // Simulate persistence by storing in localStorage - but only for non-subscription data
  useEffect(() => {
    const storedImportedCV = localStorage.getItem('hasImportedCV');
    const storedSimulations = localStorage.getItem('completedSimulations');
    const storedViewedProfile = localStorage.getItem('hasViewedProfile');
    // We no longer load subscription tier from localStorage
    // Always start with 'etincelle' on page refresh
    if (storedImportedCV) setHasImportedCV(storedImportedCV === 'true');
    if (storedSimulations) setCompletedSimulations(parseInt(storedSimulations));
    if (storedViewedProfile) setHasViewedProfile(storedViewedProfile === 'true');
  }, []);
  // Still save tier to localStorage during the session for consistency
  // but it won't be loaded on refresh
  useEffect(() => {
    localStorage.setItem('subscriptionTier', subscriptionTier);
  }, [subscriptionTier]);
  useEffect(() => {
    localStorage.setItem('hasImportedCV', hasImportedCV.toString());
  }, [hasImportedCV]);
  useEffect(() => {
    localStorage.setItem('completedSimulations', completedSimulations.toString());
  }, [completedSimulations]);
  useEffect(() => {
    localStorage.setItem('hasViewedProfile', hasViewedProfile.toString());
  }, [hasViewedProfile]);
  const incrementCompletedSimulations = () => {
    setCompletedSimulations(prev => prev + 1);
  };
  return <UserContext.Provider value={{
    subscriptionTier,
    setSubscriptionTier,
    hasImportedCV,
    setHasImportedCV,
    completedSimulations,
    incrementCompletedSimulations,
    hasViewedProfile,
    setHasViewedProfile
  }}>
      {children}
    </UserContext.Provider>;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};