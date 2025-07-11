import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardListIcon, EyeIcon, MessageCircleIcon, CheckCircleIcon, XCircleIcon, BellIcon, RocketIcon, ArrowLeftIcon, FileTextIcon, PencilIcon, DownloadIcon, MessageSquareIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { formatDistanceToNow, format } from 'date-fns';
import { fr } from 'date-fns/locale';
export const MobileApplicationDetail = ({
  application,
  onClose,
  onFollowUp,
  onUpdateStatus
}) => {
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
  // Timeline data based on application status
  const getTimelineSteps = () => {
    const steps = [{
      id: 'sent',
      label: 'Candidature envoyée',
      date: application.date,
      icon: <ClipboardListIcon className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500',
      completed: true
    }, {
      id: 'viewed',
      label: 'Candidature consultée',
      date: application.viewed ? getRandomPastDate(application.date, 3) : null,
      icon: <EyeIcon className="w-5 h-5 text-purple-500" />,
      color: 'bg-purple-500',
      completed: application.viewed
    }, {
      id: 'followUp',
      label: 'Relance effectuée',
      date: application.followUp ? getRandomPastDate(application.date, 5) : null,
      icon: <BellIcon className="w-5 h-5 text-indigo-500" />,
      color: 'bg-indigo-500',
      completed: application.followUp
    }, {
      id: 'interview',
      label: 'Entretien',
      date: application.interview ? getRandomPastDate(application.date, 7) : null,
      icon: <MessageCircleIcon className="w-5 h-5 text-emerald-500" />,
      color: 'bg-emerald-500',
      completed: application.interview
    }, {
      id: 'result',
      label: application.status === 'accepted' ? 'Candidature acceptée' : application.status === 'rejected' ? 'Candidature refusée' : 'Résultat',
      date: application.status === 'accepted' || application.status === 'rejected' ? getRandomPastDate(application.date, 10) : null,
      icon: application.status === 'accepted' ? <CheckCircleIcon className="w-5 h-5 text-green-500" /> : application.status === 'rejected' ? <XCircleIcon className="w-5 h-5 text-red-500" /> : <ClockIcon className="w-5 h-5 text-gray-500" />,
      color: application.status === 'accepted' ? 'bg-green-500' : application.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300',
      completed: application.status === 'accepted' || application.status === 'rejected'
    }];
    return steps;
  };
  // Helper function to generate random past dates for timeline
  function getRandomPastDate(baseDate, daysOffset) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
  }
  const timelineSteps = getTimelineSteps();
  return <motion.div className="fixed inset-0 bg-white z-50 overflow-y-auto" initial={{
    opacity: 0,
    y: 100
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 100
  }} transition={{
    type: 'spring',
    damping: 25,
    stiffness: 300
  }}>
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center p-4">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="ml-2 text-lg font-semibold text-gray-900">
            Détails de la candidature
          </h2>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-gray-200">
            <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {application.position}
            </h1>
            <p className="text-gray-600">{application.company}</p>
            <div className="flex items-center mt-1">
              <div className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${statusColors[application.status]}`}>
                <span>{statusLabels[application.status]}</span>
              </div>
              {application.isAutoPilot && <div className="ml-2 px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium inline-flex items-center">
                  <RocketIcon className="w-3 h-3 mr-1" />
                  <span>AutoPilot</span>
                </div>}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Chronologie
          </h3>
          <div className="space-y-6">
            {timelineSteps.map((step, index) => <div key={step.id} className="relative flex items-start">
                {/* Timeline connector */}
                {index < timelineSteps.length - 1 && <div className={`absolute top-7 left-4 w-0.5 h-full ${step.completed ? step.color : 'bg-gray-200'}`}></div>}
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${step.completed ? step.color : 'bg-gray-200'}`}>
                  {step.completed ? <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                delay: index * 0.2,
                type: 'spring'
              }}>
                      {step.icon}
                    </motion.div> : <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                {/* Timeline content */}
                <div className="ml-4 min-w-0 flex-1 pt-1.5">
                  <div className="flex justify-between">
                    <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                    {step.date && <p className="text-xs text-gray-500">
                        {format(new Date(step.date), 'dd MMM yyyy', {
                    locale: fr
                  })}
                      </p>}
                  </div>
                  {step.completed && step.id === 'viewed' && <p className="mt-1 text-xs text-gray-600">
                      Votre profil a attiré l'attention du recruteur
                    </p>}
                  {step.completed && step.id === 'followUp' && <p className="mt-1 text-xs text-gray-600">
                      Vous avez relancé pour montrer votre intérêt
                    </p>}
                  {step.completed && step.id === 'interview' && <p className="mt-1 text-xs text-gray-600">
                      Entretien{' '}
                      {application.status === 'interview' ? 'prévu' : 'effectué'}
                    </p>}
                  {!step.completed && step.id === 'viewed' && <div className="mt-1">
                      <button className="text-xs text-blue-600 font-medium" onClick={() => onFollowUp(application)}>
                        Relancer maintenant
                      </button>
                    </div>}
                </div>
              </div>)}
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Documents utilisés
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
              <div className="flex items-center mb-2">
                <FileTextIcon className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm font-medium text-gray-900">CV</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {application.cvVersion}
              </p>
              <div className="h-24 bg-white rounded border border-gray-300 mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-400">Aperçu du CV</span>
              </div>
              <button className="w-full text-xs text-blue-600 font-medium">
                Voir
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
              <div className="flex items-center mb-2">
                <MessageSquareIcon className="w-5 h-5 text-gray-700 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  Lettre
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {application.coverLetter}
              </p>
              <div className="h-24 bg-white rounded border border-gray-300 mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-400">
                  Aperçu de la lettre
                </span>
              </div>
              <button className="w-full text-xs text-blue-600 font-medium">
                Voir
              </button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white pt-4 pb-8 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" className="flex items-center justify-center" onClick={() => onFollowUp(application)}>
              <BellIcon className="w-4 h-4 mr-2" />
              Relancer
            </Button>
            <Button variant="primary" className="flex items-center justify-center">
              <PencilIcon className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button variant="secondary" className="flex items-center justify-center col-span-2" onClick={onClose}>
              <DownloadIcon className="w-4 h-4 mr-2" />
              Télécharger les documents
            </Button>
          </div>
        </div>
      </div>
    </motion.div>;
};