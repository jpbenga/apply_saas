import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { RocketIcon, PlayIcon, PauseIcon, CheckIcon, ClockIcon, MailIcon, CalendarIcon, RefreshCwIcon, UserIcon, BarChartIcon, BriefcaseIcon, MessageSquareIcon, EyeIcon, ArrowRightIcon, AlertCircleIcon, ThumbsUpIcon, ThumbsDownIcon, SendIcon } from 'lucide-react';
export const AutoPilotDashboard = ({
  applications,
  offers,
  autoPilotActive,
  onToggleAutoPilot,
  onUpdateStatus,
  autoPilotLevel
}) => {
  const [activeTab, setActiveTab] = useState('all'); // all, pending, interview, rejected
  const getStatusLabel = status => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'interview':
        return 'Entretien';
      case 'rejected':
        return 'Refusée';
      case 'accepted':
        return 'Acceptée';
      case 'followup':
        return 'Relancée';
      default:
        return status;
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/20 text-yellow-500 border-yellow-900/30';
      case 'interview':
        return 'bg-green-900/20 text-green-500 border-green-900/30';
      case 'rejected':
        return 'bg-red-900/20 text-red-500 border-red-900/30';
      case 'accepted':
        return 'bg-blue-900/20 text-blue-500 border-blue-900/30';
      case 'followup':
        return 'bg-purple-900/20 text-purple-500 border-purple-900/30';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'interview':
        return <CalendarIcon className="w-4 h-4" />;
      case 'rejected':
        return <ThumbsDownIcon className="w-4 h-4" />;
      case 'accepted':
        return <ThumbsUpIcon className="w-4 h-4" />;
      case 'followup':
        return <RefreshCwIcon className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };
  const filteredApplications = activeTab === 'all' ? applications : applications.filter(app => app.status === activeTab);
  const stats = {
    pending: applications.filter(app => app.status === 'pending').length,
    interview: applications.filter(app => app.status === 'interview').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    total: applications.length
  };
  const getAutoPilotLevelLabel = () => {
    switch (autoPilotLevel) {
      case 'analysis':
        return 'Analyse uniquement';
      case 'preparation':
        return 'Préparation auto';
      case 'complete':
        return 'Pilote automatique';
      default:
        return 'Non configuré';
    }
  };
  return <div className="space-y-6">
      <Card variant="act" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white flex items-center">
            <RocketIcon className="w-5 h-5 mr-2 text-red-500" />
            AutoPilot Dashboard
          </h2>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-400">
              Mode:{' '}
              <span className="text-white font-medium">
                {getAutoPilotLevelLabel()}
              </span>
            </div>
            <Button variant={autoPilotActive ? 'secondary' : 'act'} size="small" onClick={onToggleAutoPilot} className="flex items-center">
              {autoPilotActive ? <>
                  <PauseIcon className="w-4 h-4 mr-1" />
                  <span>Pause</span>
                </> : <>
                  <PlayIcon className="w-4 h-4 mr-1" />
                  <span>Activer</span>
                </>}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.total}
            </div>
            <div className="text-xs text-gray-400">Candidatures</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-yellow-500 mb-1">
              {stats.pending}
            </div>
            <div className="text-xs text-gray-400">En attente</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {stats.interview}
            </div>
            <div className="text-xs text-gray-400">Entretiens</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {stats.rejected}
            </div>
            <div className="text-xs text-gray-400">Refus</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {stats.accepted}
            </div>
            <div className="text-xs text-gray-400">Acceptées</div>
          </div>
        </div>
        <div className="flex border-b border-gray-800 mb-4">
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('all')}>
            Toutes
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'pending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('pending')}>
            En attente
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'interview' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('interview')}>
            Entretiens
          </button>
          <button className={`px-4 py-2 text-sm font-medium ${activeTab === 'rejected' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setActiveTab('rejected')}>
            Refusées
          </button>
        </div>
        {applications.length === 0 ? <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <BriefcaseIcon className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Aucune candidature pour le moment
            </h3>
            <p className="text-gray-400 mb-4 max-w-md mx-auto">
              Apply va commencer à postuler pour toi en fonction des offres qui
              correspondent à ton profil.
            </p>
            <Button variant="act" className="flex items-center mx-auto">
              <SendIcon className="w-4 h-4 mr-2" />
              <span>Postuler manuellement</span>
            </Button>
          </div> : <div className="space-y-3">
            {filteredApplications.map(application => <Card key={application.id} variant="act" className="p-4 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-white">
                        {application.offer.position}
                      </h3>
                      <div className="ml-3 px-2 py-0.5 bg-gray-800 rounded-full text-xs flex items-center">
                        <StarIcon className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-white">
                          {application.offer.match}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <span className="mr-3">{application.offer.company}</span>
                      <div className="flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        <span>
                          Postulé le {formatDate(application.appliedDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs flex items-center border ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1">
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors" onClick={() => {}}>
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {application.status === 'pending' && <>
                          <button className="p-1 rounded-md bg-green-900/20 text-green-500 hover:bg-green-900/30 transition-colors" onClick={() => onUpdateStatus(application.id, 'interview')}>
                            <CalendarIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded-md bg-purple-900/20 text-purple-500 hover:bg-purple-900/30 transition-colors" onClick={() => onUpdateStatus(application.id, 'followup')}>
                            <RefreshCwIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded-md bg-red-900/20 text-red-500 hover:bg-red-900/30 transition-colors" onClick={() => onUpdateStatus(application.id, 'rejected')}>
                            <ThumbsDownIcon className="w-4 h-4" />
                          </button>
                        </>}
                      {application.status === 'interview' && <button className="p-1 rounded-md bg-blue-900/20 text-blue-500 hover:bg-blue-900/30 transition-colors" onClick={() => onUpdateStatus(application.id, 'accepted')}>
                          <ThumbsUpIcon className="w-4 h-4" />
                        </button>}
                    </div>
                  </div>
                </div>
                {application.status === 'interview' && <div className="mt-3 p-3 bg-green-900/10 border border-green-900/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-300">
                        Entretien confirmé
                      </span>
                    </div>
                    <Button variant="secondary" size="small" className="flex items-center">
                      <span>Se préparer</span>
                      <ArrowRightIcon className="w-3 h-3 ml-1" />
                    </Button>
                  </div>}
                {application.status === 'rejected' && <div className="mt-3 p-3 bg-red-900/10 border border-red-900/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircleIcon className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-sm text-gray-300">
                        Candidature refusée
                      </span>
                    </div>
                    <Button variant="secondary" size="small" className="flex items-center">
                      <span>Voir alternatives</span>
                      <ArrowRightIcon className="w-3 h-3 ml-1" />
                    </Button>
                  </div>}
              </Card>)}
          </div>}
        {autoPilotActive && applications.length > 0 && <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-gray-900 rounded-full mr-3">
                <RocketIcon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">AutoPilot actif</h3>
                <p className="text-sm text-gray-400">
                  Apply continue de rechercher et postuler pour toi
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-300">En cours</span>
            </div>
          </div>}
      </Card>
    </div>;
};
const formatDate = date => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short'
  });
};
const StarIcon = ({
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>;