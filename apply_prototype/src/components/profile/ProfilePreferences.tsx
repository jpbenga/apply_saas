import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { TargetIcon, BriefcaseIcon, ActivityIcon, EditIcon, AlertCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const ProfilePreferences = ({
  preferences,
  onEdit,
  universe = 'act'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const contractTypes = {
    CDI: 'Contrat à durée indéterminée',
    CDD: 'Contrat à durée déterminée',
    Stage: 'Stage',
    Alternance: 'Alternance',
    Freelance: 'Freelance'
  };
  const searchStatuses = {
    Actif: 'Recherche active',
    Veille: 'En veille',
    Curieux: 'Curieux du marché'
  };
  return <Card className="p-6 relative overflow-hidden border-2 border-[#0FDC7A] rounded-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{
    background: 'hsla(291, 35%, 15%, 1)',
    backgroundImage: 'linear-gradient(90deg, hsla(291, 35%, 15%, 1) 0%, hsla(288, 38%, 49%, 1) 100%)',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }}>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white text-shadow">
            Préférences et objectifs
          </h2>
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Button variant="act" onClick={onEdit} className="flex items-center gap-2 relative overflow-hidden">
              <EditIcon className="w-3.5 h-3.5 mr-1" />
              Modifier
              <motion.div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg pointer-events-none" initial={{
              opacity: 0
            }} whileHover={{
              opacity: 1
            }} animate={{
              opacity: 0
            }}>
                <motion.div className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-act-cta/40 to-transparent" animate={{
                left: ['-20%', '120%']
              }} transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 0.5
              }} />
              </motion.div>
            </Button>
          </motion.div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-white/10 rounded-md text-white">
                <TargetIcon className="w-4 h-4" />
              </div>
              <h3 className="font-medium text-white text-shadow">
                Objectif professionnel
              </h3>
            </div>
            <div className="ml-8 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/60">
              <p className="text-white">{preferences.objective}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white/10 rounded-md text-white">
                  <BriefcaseIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-white text-shadow">
                  Type de poste ciblé
                </h3>
              </div>
              <div className="ml-8 space-y-2">
                {Object.entries(contractTypes).map(([type, label]) => <div key={type} className={`flex items-center gap-2 p-2 rounded-lg ${preferences.contractType === type ? 'bg-white/10 border-[#0FDC7A] border-2 text-white' : 'bg-transparent border-white/60 border text-white/80'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${preferences.contractType === type ? 'bg-[#0FDC7A]' : 'bg-transparent border border-[#CCCCCC]'}`}>
                      {preferences.contractType === type && <motion.div className="w-2 h-2 bg-white rounded-full" initial={{
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
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white/10 rounded-md text-white">
                  <ActivityIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-white text-shadow">
                  Rythme de recherche
                </h3>
              </div>
              <div className="ml-8 space-y-2">
                {Object.entries(searchStatuses).map(([status, label]) => <div key={status} className={`flex items-center gap-2 p-2 rounded-lg ${preferences.searchStatus === status ? 'bg-white/10 border-[#0FDC7A] border-2 text-white' : 'bg-transparent border-white/60 border text-white/80'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${preferences.searchStatus === status ? 'bg-[#0FDC7A]' : 'bg-transparent border border-[#CCCCCC]'}`}>
                      {preferences.searchStatus === status && <motion.div className="w-2 h-2 bg-white rounded-full" initial={{
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
            </div>
          </div>
          <div className="mt-4 bg-red-900/20 border border-red-800/30 rounded-lg p-4 flex items-start">
            <AlertCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-white text-sm">
              Ces données sont exploitées par l'AutoPilot et le Coaching IA pour
              affiner les recommandations.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Card>;
};