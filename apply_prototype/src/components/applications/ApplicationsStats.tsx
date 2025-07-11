import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon, BarChart2Icon, PieChartIcon, ClipboardListIcon, EyeIcon, MessageCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Card } from '../common/Card';
export const ApplicationsStats = ({
  stats
}) => {
  return <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart2Icon className="w-5 h-5 mr-2 text-blue-500" />
          Statistiques de candidatures
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <ClipboardListIcon className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-700">Vues</h3>
            <EyeIcon className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-700">{stats.viewed}</p>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-emerald-700">Entretiens</h3>
            <MessageCircleIcon className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            {stats.interviews}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-700">Acceptées</h3>
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-700">{stats.accepted}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <PieChartIcon className="w-4 h-4 mr-2 text-blue-500" />
            Taux de réponse
          </h3>
          <div className="flex items-center">
            <div className="w-24 h-24 relative mr-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="100, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818CF8" strokeWidth="3" strokeDasharray={`${stats.responseRate}, 100`} />
                <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#4F46E5" fontWeight="bold">
                  {stats.responseRate}%
                </text>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{stats.viewed}</span> recruteurs
                ont consulté vos candidatures sur un total de {stats.total}.
              </p>
              <p className="text-xs text-gray-500">
                La moyenne du secteur est de 45%.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
            <TrendingUpIcon className="w-4 h-4 mr-2 text-green-500" />
            Taux de conversion en entretien
          </h3>
          <div className="flex items-center">
            <div className="w-24 h-24 relative mr-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="100, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray={`${stats.successRate}, 100`} />
                <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">
                  {stats.successRate}%
                </text>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{stats.interviews}</span>{' '}
                entretiens obtenus sur {stats.viewed} candidatures vues.
              </p>
              <p className="text-xs text-gray-500">
                C'est {stats.successRate > 30 ? 'au-dessus de' : 'proche de'} la
                moyenne du marché (30%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>;
};