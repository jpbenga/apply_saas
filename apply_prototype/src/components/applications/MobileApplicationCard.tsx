import React from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { ClipboardListIcon, EyeIcon, MessageCircleIcon, CheckCircleIcon, XCircleIcon, BellIcon, RocketIcon, ChevronRightIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
export const MobileApplicationCard = ({
  application,
  onView,
  onFollowUp,
  onCancel
}) => {
  const controls = useAnimation();
  const rightActionControls = useAnimation();
  const leftActionControls = useAnimation();
  const statusIcons = {
    sent: <ClipboardListIcon className="w-4 h-4 text-blue-500" />,
    viewed: <EyeIcon className="w-4 h-4 text-purple-500" />,
    waiting: <BellIcon className="w-4 h-4 text-gray-500" />,
    interview: <MessageCircleIcon className="w-4 h-4 text-emerald-500" />,
    accepted: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
    rejected: <XCircleIcon className="w-4 h-4 text-red-500" />
  };
  const statusColors = {
    sent: 'bg-blue-100 text-blue-800 border-blue-200',
    viewed: 'bg-purple-100 text-purple-800 border-purple-200',
    waiting: 'bg-gray-100 text-gray-800 border-gray-200',
    interview: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    accepted: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };
  const statusLabels = {
    sent: 'Envoyée',
    viewed: 'Vue',
    waiting: 'En attente',
    interview: 'Entretien',
    accepted: 'Acceptée',
    rejected: 'Refusée'
  };
  const handleDragEnd = (event, info: PanInfo) => {
    const threshold = 100;
    // If dragged right (for follow up)
    if (info.offset.x > threshold) {
      controls.start({
        x: 300,
        opacity: 0
      });
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setTimeout(() => {
        onFollowUp(application);
        controls.start({
          x: 0,
          opacity: 1
        });
      }, 300);
    }
    // If dragged left (for cancel)
    else if (info.offset.x < -threshold) {
      controls.start({
        x: -300,
        opacity: 0
      });
      // Trigger haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      setTimeout(() => {
        onCancel(application);
        controls.start({
          x: 0,
          opacity: 1
        });
      }, 300);
    } else {
      controls.start({
        x: 0,
        opacity: 1
      });
    }
  };
  const handleDrag = (event, info: PanInfo) => {
    // Show action buttons based on drag direction
    if (info.offset.x > 20) {
      rightActionControls.start({
        opacity: info.offset.x / 100
      });
      leftActionControls.start({
        opacity: 0
      });
    } else if (info.offset.x < -20) {
      leftActionControls.start({
        opacity: -info.offset.x / 100
      });
      rightActionControls.start({
        opacity: 0
      });
    } else {
      rightActionControls.start({
        opacity: 0
      });
      leftActionControls.start({
        opacity: 0
      });
    }
  };
  return <div className="relative mb-3">
      {/* Right action (Follow up) */}
      <motion.div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full z-10" initial={{
      opacity: 0
    }} animate={rightActionControls}>
        <BellIcon className="w-6 h-6" />
      </motion.div>
      {/* Left action (Cancel) */}
      <motion.div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-3 rounded-full z-10" initial={{
      opacity: 0
    }} animate={leftActionControls}>
        <XCircleIcon className="w-6 h-6" />
      </motion.div>
      <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" drag="x" dragConstraints={{
      left: 0,
      right: 0
    }} onDragEnd={handleDragEnd} onDrag={handleDrag} animate={controls} whileTap={{
      scale: 0.98
    }} onClick={onView}>
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 border border-gray-100">
              <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {application.position}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {application.company}
              </p>
            </div>
            {application.isAutoPilot && <div className="ml-2 p-1 rounded-full bg-indigo-100">
                <RocketIcon className="w-4 h-4 text-indigo-600" />
              </div>}
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[application.status]}`}>
              {statusIcons[application.status]}
              <span className="ml-1">{statusLabels[application.status]}</span>
            </div>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(application.date), {
              addSuffix: true,
              locale: fr
            })}
            </span>
          </div>
          <div className="text-sm text-gray-700 mb-3 line-clamp-2">
            {application.status === 'interview' ? <p>
                Entretien prévu. Préparez-vous avec nos outils d'entraînement.
              </p> : application.status === 'viewed' ? <p>
                Votre profil a été consulté. Pensez à relancer dans quelques
                jours.
              </p> : application.status === 'rejected' ? <p>
                Candidature non retenue. Analysez les retours pour progresser.
              </p> : application.status === 'accepted' ? <p>Félicitations ! Votre candidature a été acceptée.</p> : <p>
                Candidature envoyée. Nous vous notifierons de tout changement.
              </p>}
          </div>
          <div className="flex items-center text-sm text-blue-600">
            <span className="font-medium">Voir détails</span>
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </div>;
};