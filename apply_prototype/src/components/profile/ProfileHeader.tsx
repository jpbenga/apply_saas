import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { EditIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const ProfileHeader = ({
  userData,
  completion,
  onEdit,
  universe = 'build'
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const universeStyles = {
    build: {
      gradient: 'from-amber-50/40 to-build-bg/30',
      animateGradient: ['linear-gradient(to bottom right, rgba(254, 243, 199, 0.4), rgba(253, 252, 249, 0.3))', 'linear-gradient(to bottom right, rgba(253, 252, 249, 0.3), rgba(254, 243, 199, 0.4))'],
      progressGradient: 'from-amber-500 to-amber-400',
      bgAlert: 'bg-amber-50',
      borderAlert: 'border-amber-100',
      textIcon: 'text-amber-700',
      checkIcon: 'text-amber-600'
    },
    prepare: {
      gradient: 'from-blue-900/40 to-prepare-bg/30',
      animateGradient: ['linear-gradient(to bottom right, rgba(30, 58, 138, 0.4), rgba(13, 27, 42, 0.3))', 'linear-gradient(to bottom right, rgba(13, 27, 42, 0.3), rgba(30, 58, 138, 0.4))'],
      progressGradient: 'from-blue-500 to-blue-400',
      bgAlert: 'bg-blue-900/20',
      borderAlert: 'border-blue-800/30',
      textIcon: 'text-blue-400',
      checkIcon: 'text-blue-400'
    },
    act: {
      gradient: 'from-purple-900/40 to-act-bg/30',
      animateGradient: ['linear-gradient(to bottom right, rgba(88, 28, 135, 0.4), rgba(26, 14, 33, 0.3))', 'linear-gradient(to bottom right, rgba(26, 14, 33, 0.3), rgba(88, 28, 135, 0.4))'],
      progressGradient: 'from-purple-500 to-purple-400',
      bgAlert: 'bg-purple-900/20',
      borderAlert: 'border-purple-800/30',
      textIcon: 'text-purple-400',
      checkIcon: 'text-purple-400'
    }
  };
  const currentStyle = universeStyles[universe];
  return <Card className={`relative overflow-hidden ${universe === 'build' ? 'bg-cream' : universe === 'prepare' ? 'bg-prepare-bg' : 'bg-act-bg'} ${universe !== 'build' ? 'text-white' : ''}`}>
      <motion.div className={`absolute inset-0 bg-gradient-to-br ${currentStyle.gradient} z-0`} animate={{
      background: currentStyle.animateGradient
    }} transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse'
    }} />
      <div className="relative z-10 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <motion.div className="relative" whileHover={{
          scale: 1.05
        }} transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10
        }}>
            {userData.photo ? <img src={userData.photo} alt={`${userData.firstName} ${userData.lastName}`} className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md" /> : <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-semibold">
                {userData.firstName.charAt(0)}
                {userData.lastName.charAt(0)}
              </div>}
            <motion.div className="absolute -bottom-1 -right-1 bg-green-100 rounded-full p-1 border-2 border-white shadow-sm" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.5,
            type: 'spring'
          }}>
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
            </motion.div>
          </motion.div>
          <div className="flex-1">
            <h1 className={`text-2xl font-semibold ${universe === 'build' ? 'text-gray-900' : 'text-white'}`}>
              {userData.firstName} {userData.lastName}
            </h1>
            <p className={`text-lg mt-1 italic ${universe === 'build' ? 'text-gray-700' : 'text-gray-200'}`}>
              {userData.tagline}
            </p>
            <div className="flex flex-wrap gap-4 mt-3">
              <div className={`flex items-center ${universe === 'build' ? 'text-gray-600' : 'text-gray-300'}`}>
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{userData.location}</span>
              </div>
              <div className="flex items-center text-green-500">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">{userData.availability}</span>
              </div>
            </div>
          </div>
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Button onClick={onEdit} className="flex items-center gap-2" variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'}>
              <EditIcon className="w-4 h-4" />
              Modifier mon profil
            </Button>
          </motion.div>
        </div>
        <div className={`mt-6 ${currentStyle.bgAlert} rounded-lg p-4 border ${currentStyle.borderAlert}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-medium ${universe === 'build' ? 'text-gray-900' : 'text-white'}`}>
                  Complétude du profil: {completion}%
                </h3>
                <motion.div initial={{
                opacity: 0,
                scale: 0
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 0.7,
                type: 'spring'
              }}>
                  <CheckCircleIcon className={`w-4 h-4 ${currentStyle.checkIcon}`} />
                </motion.div>
              </div>
              <p className={`text-sm ${universe === 'build' ? 'text-gray-600' : 'text-gray-300'}`}>
                Plus votre profil est complet, plus vos candidatures sont
                performantes.
              </p>
            </div>
            <div className="w-full md:w-48">
              <div className={`h-3 ${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full overflow-hidden`}>
                <motion.div className={`h-full bg-gradient-to-r ${currentStyle.progressGradient} relative`} initial={{
                width: '0%'
              }} animate={{
                width: `${completion}%`
              }} transition={{
                duration: 1.5,
                ease: 'easeOut'
              }}>
                  <motion.div className="absolute inset-0 bg-white/30" animate={{
                  x: ['-100%', '100%']
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear'
                }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};