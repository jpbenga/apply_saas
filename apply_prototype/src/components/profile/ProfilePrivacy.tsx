import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LockIcon, MailIcon, RocketIcon, EyeIcon, EditIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const ProfilePrivacy = ({
  privacy,
  onEdit
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animateSwitch, setAnimateSwitch] = useState(false);
  const handleToggleAutopilot = () => {
    setAnimateSwitch(true);
    // Play toggle sound
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setTimeout(() => setAnimateSwitch(false), 500);
  };
  const visibilityOptions = {
    private: 'Privé (visible uniquement par vous)',
    apply: 'Visible sur Apply (pour les recruteurs partenaires)',
    public: 'Public (partageable via lien direct)'
  };
  const autopilotLevels = {
    low: 'Contrôle élevé (validation manuelle requise)',
    medium: 'Équilibré (validation pour les actions importantes)',
    high: 'Automatique (Apply agit pour vous)'
  };
  return <Card className="p-6 relative overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-purple-50/10 z-0" animate={{
      background: isHovered ? 'linear-gradient(to bottom right, rgba(239, 246, 255, 0.2), rgba(243, 232, 255, 0.2))' : 'linear-gradient(to bottom right, rgba(239, 246, 255, 0.05), rgba(243, 232, 255, 0.05))'
    }} transition={{
      duration: 0.5
    }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Confidentialité & connexion IA
          </h2>
          <AnimatePresence>
            {isHovered && <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.8
          }} transition={{
            duration: 0.2
          }}>
                <Button variant="secondary" size="small" className="flex items-center gap-2" onClick={onEdit}>
                  <EditIcon className="w-3.5 h-3.5" />
                  Modifier
                </Button>
              </motion.div>}
          </AnimatePresence>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-2 bg-blue-100 rounded-md text-blue-600 mt-0.5">
              <MailIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-800">
                  Connexion à la boîte mail
                </h3>
                {privacy.emailConnected && <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckIcon className="w-3 h-3" />
                    <span>Connectée</span>
                  </div>}
              </div>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Apply scanne votre boîte mail chaque jour pour détecter des
                opportunités pertinentes.
              </p>
              <Button variant="secondary" size="small" className={privacy.emailConnected ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : ''}>
                {privacy.emailConnected ? 'Déconnecter' : 'Connecter ma boîte mail'}
              </Button>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-2 bg-purple-100 rounded-md text-purple-600 mt-0.5">
              <RocketIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">
                  Délégation AutoPilot
                </h3>
                <motion.div className={`w-12 h-6 rounded-full p-1 flex items-center ${privacy.autopilotEnabled ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`} animate={{
                backgroundColor: privacy.autopilotEnabled ? '#10B981' : '#D1D5DB'
              }} onClick={handleToggleAutopilot} style={{
                cursor: 'pointer'
              }}>
                  <motion.div className="w-4 h-4 bg-white rounded-full shadow-sm" layout animate={{
                  scale: animateSwitch ? 0.8 : 1
                }} transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />
                </motion.div>
              </div>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                Permet à Apply d'agir pour vous dans votre recherche d'emploi
                (scan d'offres, candidatures, etc.)
              </p>
              {privacy.autopilotEnabled && <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Niveau de contrôle :
                  </p>
                  <div className="space-y-2">
                    {Object.entries(autopilotLevels).map(([level, label]) => <div key={level} className={`flex items-center gap-2 p-2 rounded-lg border ${privacy.autopilotLevel === level ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200 opacity-70'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${privacy.autopilotLevel === level ? 'bg-purple-500' : 'bg-gray-300'}`}>
                          {privacy.autopilotLevel === level && <motion.div className="w-2 h-2 bg-white rounded-full" initial={{
                      scale: 0
                    }} animate={{
                      scale: 1
                    }} transition={{
                      duration: 0.2
                    }} />}
                        </div>
                        <span className="text-sm">{label}</span>
                      </div>)}
                  </div>
                </div>}
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-2 bg-amber-100 rounded-md text-amber-600 mt-0.5">
              <EyeIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">
                Visibilité du profil
              </h3>
              <div className="space-y-2 mb-3">
                {Object.entries(visibilityOptions).map(([option, label]) => <div key={option} className={`flex items-center gap-2 p-2 rounded-lg border ${privacy.profileVisibility === option ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200 opacity-70'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${privacy.profileVisibility === option ? 'bg-amber-500' : 'bg-gray-300'}`}>
                      {privacy.profileVisibility === option && <motion.div className="w-2 h-2 bg-white rounded-full" initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} transition={{
                    duration: 0.2
                  }} />}
                    </div>
                    <span className="text-sm">{label}</span>
                  </div>)}
              </div>
              {privacy.profileVisibility === 'public' && <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertCircleIcon className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Votre profil sera accessible par toute personne disposant du
                    lien de partage.
                  </p>
                </div>}
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <LockIcon className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-blue-700">
              Vos données sont sécurisées et ne sont utilisées que pour
              améliorer votre expérience de recherche d'emploi.
            </p>
          </div>
        </div>
      </div>
    </Card>;
};