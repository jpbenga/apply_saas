import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, FileTextIcon, MessageSquareIcon, ClipboardListIcon, EyeIcon, BellIcon, MessageCircleIcon, CheckCircleIcon, XCircleIcon, RefreshCwIcon, DownloadIcon, PrinterIcon, CalendarIcon, RocketIcon, ArrowRightIcon, ClockIcon } from 'lucide-react';
import { Button } from '../common/Button';
export const ApplicationDetail = ({
  application,
  columns,
  onClose,
  onUpdateStatus,
  onFollowUp
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, documents, history
  const getStatusColor = status => {
    if (!columns[status]) return '';
    return columns[status].color;
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  // Mock history data
  const history = [{
    id: 1,
    type: 'sent',
    date: application.date,
    description: 'Candidature envoyée',
    icon: <ClipboardListIcon className="w-5 h-5 text-blue-500" />
  }, ...(application.viewed ? [{
    id: 2,
    type: 'viewed',
    date: new Date(new Date(application.date).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'CV consulté par le recruteur',
    icon: <EyeIcon className="w-5 h-5 text-purple-500" />
  }] : []), ...(application.followUp ? [{
    id: 3,
    type: 'followup',
    date: new Date(new Date(application.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Relance envoyée',
    icon: <RefreshCwIcon className="w-5 h-5 text-indigo-500" />
  }] : []), ...(application.interview ? [{
    id: 4,
    type: 'interview',
    date: new Date(new Date(application.date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Entretien programmé',
    icon: <MessageCircleIcon className="w-5 h-5 text-emerald-500" />
  }] : []), ...(application.status === 'accepted' ? [{
    id: 5,
    type: 'accepted',
    date: new Date(new Date(application.date).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Candidature acceptée',
    icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />
  }] : []), ...(application.status === 'rejected' ? [{
    id: 6,
    type: 'rejected',
    date: new Date(new Date(application.date).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Candidature refusée',
    icon: <XCircleIcon className="w-5 h-5 text-red-500" />
  }] : [])].sort((a, b) => new Date(a.date) - new Date(b.date));
  return <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} onClick={onClose}>
      <motion.div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" initial={{
      scale: 0.9,
      y: 20
    }} animate={{
      scale: 1,
      y: 0
    }} exit={{
      scale: 0.9,
      y: 20
    }} transition={{
      type: 'spring',
      damping: 25,
      stiffness: 300
    }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {application.position}
              </h2>
              <p className="text-gray-600">{application.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(application.status)}`}>
              {columns[application.status]?.title || application.status}
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500" onClick={onClose}>
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex border-b">
          <button className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveTab('overview')}>
            <ClipboardListIcon className="w-4 h-4 mr-2" />
            Aperçu
          </button>
          <button className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveTab('documents')}>
            <FileTextIcon className="w-4 h-4 mr-2" />
            Documents
          </button>
          <button className={`px-6 py-3 text-sm font-medium flex items-center ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveTab('history')}>
            <ClockIcon className="w-4 h-4 mr-2" />
            Historique
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                    Informations générales
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Date de candidature
                      </span>
                      <span className="text-sm font-medium">
                        {formatDate(application.date)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="text-sm font-medium flex items-center">
                        {application.isAutoPilot ? <>
                            <RocketIcon className="w-4 h-4 mr-1 text-indigo-500" />
                            AutoPilot
                          </> : 'Manuelle'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">CV utilisé</span>
                      <span className="text-sm font-medium">
                        {application.cvVersion}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Lettre de motivation
                      </span>
                      <span className="text-sm font-medium">
                        {application.coverLetter}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <MessageCircleIcon className="w-4 h-4 mr-2 text-gray-500" />
                    Suivi de la candidature
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application.viewed ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                        <EyeIcon className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">CV consulté</div>
                        <div className="text-xs text-gray-500">
                          {application.viewed ? 'Oui, le ' + formatDate(new Date(new Date(application.date).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString()) : 'Non détecté'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application.followUp ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                        <RefreshCwIcon className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">
                          Relance effectuée
                        </div>
                        <div className="text-xs text-gray-500">
                          {application.followUp ? 'Oui, le ' + formatDate(new Date(new Date(application.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()) : 'Non'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${application.interview ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                        <MessageCircleIcon className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">Entretien</div>
                        <div className="text-xs text-gray-500">
                          {application.interview ? 'Programmé le ' + formatDate(new Date(new Date(application.date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString()) : 'Pas encore'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {application.response && <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                    <MessageSquareIcon className="w-4 h-4 mr-2 text-blue-500" />
                    Réponse de l'entreprise
                  </h3>
                  <p className="text-sm text-blue-800">
                    {application.response}
                  </p>
                </div>}
              {application.status === 'waiting' && !application.followUp && <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h3 className="text-sm font-medium text-yellow-900 mb-2 flex items-center">
                    <BellIcon className="w-4 h-4 mr-2 text-yellow-500" />
                    Suggestion
                  </h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    Aucun retour depuis{' '}
                    {Math.floor((new Date() - new Date(application.date)) / (1000 * 60 * 60 * 24))}{' '}
                    jours. Une relance pourrait augmenter vos chances de réponse
                    de 30%.
                  </p>
                  <Button variant="secondary" size="small" className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200" onClick={onFollowUp}>
                    Relancer maintenant
                  </Button>
                </div>}
              {application.status === 'interview' && <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <h3 className="text-sm font-medium text-emerald-900 mb-2 flex items-center">
                    <MessageCircleIcon className="w-4 h-4 mr-2 text-emerald-500" />
                    Entretien programmé
                  </h3>
                  <p className="text-sm text-emerald-800 mb-3">
                    Vous avez un entretien le{' '}
                    {formatDate(new Date(new Date(application.date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString())}
                    . Préparez-vous avec notre coach d'entretien.
                  </p>
                  <Button variant="secondary" size="small" className="bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200 flex items-center">
                    <span>Se préparer à l'entretien</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>}
            </div>}
          {activeTab === 'documents' && <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <FileTextIcon className="w-4 h-4 mr-2 text-gray-500" />
                  CV utilisé
                </h3>
                <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 mb-2">
                  <div className="flex items-center">
                    <FileTextIcon className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">
                      {application.cvVersion}.pdf
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <DownloadIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <PrinterIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-64 bg-white rounded border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FileTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Aperçu du CV</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <MessageSquareIcon className="w-4 h-4 mr-2 text-gray-500" />
                  Lettre de motivation
                </h3>
                <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 mb-2">
                  <div className="flex items-center">
                    <MessageSquareIcon className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">
                      {application.coverLetter}.pdf
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <DownloadIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <PrinterIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-64 bg-white rounded border border-gray-200 p-4 overflow-y-auto">
                  <p className="text-sm text-gray-700">
                    Madame, Monsieur,
                    <br />
                    <br />
                    Je vous soumets ma candidature pour le poste de{' '}
                    {application.position} au sein de {application.company}.
                    <br />
                    <br />
                    Actuellement [Situation Professionnelle], je possède [X
                    années] d'expérience dans le domaine [Domaine], où j'ai
                    développé des compétences solides en [Compétence 1],
                    [Compétence 2] et [Compétence 3].
                    <br />
                    <br />
                    Votre entreprise m'attire particulièrement pour sa [Qualité
                    1] et sa [Qualité 2]. Le poste proposé correspond
                    parfaitement à mon projet professionnel, notamment sur les
                    aspects de [Aspect 1] et [Aspect 2].
                    <br />
                    <br />
                    Je serais ravi(e) de pouvoir échanger avec vous lors d'un
                    entretien pour vous présenter plus en détail ma motivation
                    et mes compétences.
                    <br />
                    <br />
                    Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
                    salutations distinguées.
                    <br />
                    <br />
                    [Votre Nom]
                  </p>
                </div>
              </div>
            </div>}
          {activeTab === 'history' && <div className="space-y-6">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
                {history.map((event, index) => <div key={event.id} className="flex mb-6 relative">
                    <div className="absolute top-0 left-4 h-full">
                      {index < history.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                    </div>
                    <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border-2 border-gray-200">
                      {event.icon}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">
                          {event.description}
                        </h4>
                        <span className="ml-2 text-xs text-gray-500">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      {event.type === 'sent' && <p className="text-xs text-gray-600 mt-1">
                          Candidature envoyée avec le CV "
                          {application.cvVersion}" et la lettre "
                          {application.coverLetter}".
                        </p>}
                      {event.type === 'viewed' && <p className="text-xs text-gray-600 mt-1">
                          Le recruteur a consulté votre profil et vos documents.
                        </p>}
                      {event.type === 'followup' && <p className="text-xs text-gray-600 mt-1">
                          Relance envoyée par email pour exprimer votre intérêt
                          continu.
                        </p>}
                      {event.type === 'interview' && <p className="text-xs text-gray-600 mt-1">
                          Entretien programmé le{' '}
                          {formatDate(new Date(new Date(application.date).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString())}{' '}
                          à 14h30.
                        </p>}
                      {event.type === 'accepted' && <p className="text-xs text-gray-600 mt-1">
                          Félicitations ! Votre candidature a été acceptée. Une
                          offre vous a été envoyée.
                        </p>}
                      {event.type === 'rejected' && <p className="text-xs text-gray-600 mt-1">
                          Malheureusement, votre candidature n'a pas été retenue
                          pour ce poste.
                        </p>}
                    </div>
                  </div>)}
              </div>
              {application.status !== 'accepted' && application.status !== 'rejected' && <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">
                      Que faire ensuite ?
                    </h3>
                    <p className="text-xs text-blue-800 mb-3">
                      Continuez à suivre cette candidature et prenez les actions
                      appropriées pour maximiser vos chances.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {!application.followUp && <Button variant="secondary" size="small" className="flex items-center text-xs" onClick={onFollowUp}>
                          <RefreshCwIcon className="w-3 h-3 mr-1" />
                          Relancer
                        </Button>}
                      {application.status !== 'interview' && <Button variant="secondary" size="small" className="flex items-center text-xs" onClick={() => onUpdateStatus(application.id, 'interview')}>
                          <MessageCircleIcon className="w-3 h-3 mr-1" />
                          Marquer comme "Entretien"
                        </Button>}
                      {application.status === 'interview' && <Button variant="secondary" size="small" className="flex items-center text-xs" onClick={() => onUpdateStatus(application.id, 'accepted')}>
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Marquer comme "Acceptée"
                        </Button>}
                      <Button variant="secondary" size="small" className="flex items-center text-xs" onClick={() => onUpdateStatus(application.id, 'rejected')}>
                        <XCircleIcon className="w-3 h-3 mr-1" />
                        Marquer comme "Refusée"
                      </Button>
                    </div>
                  </div>}
            </div>}
        </div>
        <div className="border-t p-4 flex justify-between">
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
          <div className="flex space-x-2">
            {application.status !== 'rejected' && application.status !== 'accepted' && !application.followUp && <Button variant="primary" onClick={onFollowUp} className="flex items-center">
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Relancer
                </Button>}
            {application.status === 'interview' && <Button variant="primary" className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Préparer l'entretien
              </Button>}
          </div>
        </div>
      </motion.div>
    </motion.div>;
};