import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XIcon, CheckIcon, ChevronRightIcon, CreditCardIcon, CalendarIcon, SparklesIcon, RocketIcon, BriefcaseIcon, ZapIcon } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
type SubscriptionTier = 'etincelle' | 'transformation' | 'agent';
type PaymentMethod = {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
  expiryDate: string;
  isDefault: boolean;
};
type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
};
type SubscriptionPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
  onUpgrade: () => void;
};
export const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({
  isOpen,
  onClose,
  currentTier,
  onUpgrade
}) => {
  const [currentView, setCurrentView] = useState<'subscription' | 'payment' | 'billing'>('subscription');
  if (!isOpen) return null;
  // Sample data
  const paymentMethods: PaymentMethod[] = [{
    id: 'pm_1',
    type: 'visa',
    last4: '4242',
    expiryDate: '04/24',
    isDefault: true
  }, {
    id: 'pm_2',
    type: 'mastercard',
    last4: '5678',
    expiryDate: '05/25',
    isDefault: false
  }];
  const invoices: Invoice[] = [{
    id: 'inv_1',
    date: '15/06/2023',
    amount: '19,00 €',
    status: 'paid'
  }, {
    id: 'inv_2',
    date: '15/05/2023',
    amount: '19,00 €',
    status: 'paid'
  }];
  const getTierDetails = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'etincelle':
        return {
          name: "L'Étincelle",
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
          icon: <SparklesIcon className="w-5 h-5 text-gray-500" />,
          features: ['Construction : Matérialisez votre proposition de valeur avec un CV ATS-compliant', 'Ciblage IA : Générez une lettre de motivation ciblée pour une offre', 'Introspection : Révélez vos talents latents via le test de positionnement', "Amorçage : Éprouvez la mécanique du coaching via un module d'initiation"],
          limits: ['Maximum 3 candidatures', 'Accès limité au coaching', 'Pas de relances automatiques'],
          price: '0€',
          renewalDate: ''
        };
      case 'transformation':
        return {
          name: 'La Transformation',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <RocketIcon className="w-5 h-5 text-blue-500" />,
          features: ['Fondations de "L\'Étincelle" incluses', "Maîtrise de l'Univers 1 (Construire) : Itérations illimitées de CV et lettres", "Maîtrise de l'Univers 2 (Se préparer) : Accès total au framework de coaching IA", 'Intelligence Augmentée : Feedback IA continu sur vos documents et cibles', 'Tableau de Bord : Centralisation et suivi de votre pipeline de candidatures'],
          limits: [],
          price: '19€/mois',
          renewalDate: 'Prochain renouvellement : 15 juillet 2023'
        };
      case 'agent':
        return {
          name: "L'Agent",
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          icon: <BriefcaseIcon className="w-5 h-5 text-purple-500" />,
          features: ['Suite complète "La Transformation" incluse', "Activation de l'Univers 3 (Agir) : Déploiement de votre agent IA personnel", "Sourcing Autonome : Veille et identification d'opportunités par l'agent", "Exécution Déléguée : Génération et envoi des candidatures par l'agent", 'Intelligence Ambiante : Intégration à vos flux (Mail, LinkedIn)', "Reporting : Analytics de performance de l'activité de votre agent"],
          limits: [],
          price: '79€/mois',
          renewalDate: 'Prochain renouvellement : 15 juillet 2023'
        };
    }
  };
  const handleUpgrade = () => {
    onUpgrade();
    onClose();
  };
  const currentTierDetails = getTierDetails(currentTier);
  const nextTier = currentTier === 'etincelle' ? 'transformation' : currentTier === 'transformation' ? 'agent' : null;
  const nextTierDetails = nextTier ? getTierDetails(nextTier) : null;
  if (currentView === 'payment') {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Méthodes de paiement</h2>
              <button onClick={() => setCurrentView('subscription')} className="p-1 rounded-full hover:bg-gray-100">
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              {paymentMethods.map(method => <div key={method.id} className={`p-4 border ${method.isDefault ? 'border-blue-200 bg-blue-50' : 'border-gray-200'} rounded-lg flex justify-between items-center`}>
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-gray-100 rounded mr-3 flex items-center justify-center">
                      {method.type === 'visa' ? <span className="text-blue-600 font-bold text-xs">
                          VISA
                        </span> : <span className="text-red-600 font-bold text-xs">
                          MC
                        </span>}
                    </div>
                    <div>
                      <div className="font-medium">
                        {method.type === 'visa' ? 'Visa' : 'Mastercard'} ••••{' '}
                        {method.last4}
                      </div>
                      <div className="text-sm text-gray-500">
                        Expire {method.expiryDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {method.isDefault && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                        Par défaut
                      </span>}
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>)}
            </div>
            <Button variant="secondary" className="w-full">
              Ajouter une méthode de paiement
            </Button>
          </div>
        </Card>
      </div>;
  }
  if (currentView === 'billing') {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Historique de facturation
              </h2>
              <button onClick={() => setCurrentView('subscription')} className="p-1 rounded-full hover:bg-gray-100">
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="mb-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map(invoice => <tr key={invoice.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {invoice.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {invoice.amount}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {invoice.status === 'paid' ? 'Payé' : invoice.status === 'pending' ? 'En attente' : 'Échoué'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                          <button className="text-blue-600 hover:text-blue-800">
                            Télécharger
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              Besoin d'aide ?{' '}
              <a href="#" className="text-blue-600">
                Contactez le support
              </a>
            </div>
          </div>
        </Card>
      </div>;
  }
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Votre abonnement</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <div className={`p-2 rounded-full ${currentTierDetails.bgColor} mr-3`}>
                {currentTierDetails.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Votre plan actuel :{' '}
                  <span className={currentTierDetails.color}>
                    {currentTierDetails.name}
                  </span>
                </h3>
                <p className="text-sm text-gray-500">
                  {currentTier !== 'etincelle' ? currentTierDetails.renewalDate : 'Plan gratuit'}
                </p>
              </div>
            </div>
            <Card className={`p-4 border ${currentTierDetails.borderColor} ${currentTierDetails.bgColor} bg-opacity-30`}>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Avantages inclus</h4>
                <span className="text-sm font-bold">
                  {currentTierDetails.price}
                </span>
              </div>
              <div className="space-y-2">
                {currentTierDetails.features.map((feature, index) => <div key={index} className="flex items-start">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>)}
              </div>
              {currentTierDetails.limits.length > 0 && <div className="mt-4 pt-3 border-t border-gray-200">
                  <h4 className="font-medium mb-2 text-sm text-gray-600">
                    Limitations
                  </h4>
                  <div className="space-y-2">
                    {currentTierDetails.limits.map((limit, index) => <div key={index} className="flex items-start">
                        <XIcon className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{limit}</span>
                      </div>)}
                  </div>
                </div>}
            </Card>
          </div>
          {nextTier && <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-3">
                Passez au niveau supérieur
              </h3>
              <motion.div whileHover={{
            scale: 1.02,
            y: -2
          }} transition={{
            type: 'spring',
            stiffness: 400,
            damping: 10
          }}>
                <Card className="p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-50/30 cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full ${nextTierDetails.bgColor} mr-2`}>
                        {nextTierDetails.icon}
                      </div>
                      <h4 className="font-medium">{nextTierDetails.name}</h4>
                    </div>
                    <span className="text-sm font-bold">
                      {nextTierDetails.price}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {nextTierDetails.features.slice(0, 3).map((feature, index) => <div key={index} className="flex items-start">
                          <ZapIcon className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>)}
                  </div>
                  <Button variant="primary" className="w-full" onClick={handleUpgrade}>
                    Passer à {nextTierDetails.name}
                  </Button>
                </Card>
              </motion.div>
            </div>}
          {currentTier !== 'etincelle' && <div className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Gestion de votre abonnement
              </h3>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setCurrentView('payment')}>
                <div className="flex items-center">
                  <CreditCardIcon className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">Gérer le paiement</span>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-gray-500 mr-2">
                    {paymentMethods.find(m => m.isDefault)?.type === 'visa' ? 'Visa' : 'Mastercard'}{' '}
                    •••• {paymentMethods.find(m => m.isDefault)?.last4}
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setCurrentView('billing')}>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-gray-700">
                    Historique de facturation
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="text-xs text-gray-500 mr-2">
                    {invoices.length} factures
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </button>
              <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-red-600">
                <XIcon className="w-5 h-5 mr-3" />
                <span>Annuler l'abonnement</span>
              </button>
            </div>}
        </div>
      </Card>
    </div>;
};