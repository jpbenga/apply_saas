import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { BriefcaseIcon, MapPinIcon, DollarSignIcon, CalendarIcon, UserIcon, CheckIcon, XIcon, ChevronRightIcon, ChevronLeftIcon, StarIcon, ArrowRightIcon, SendIcon, ClockIcon, CheckCircleIcon, FilterIcon, SortAscIcon } from 'lucide-react';
export const OfferDisplay = ({
  offers,
  onApply,
  autoPilotLevel,
  onContinue
}) => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [expandedOffer, setExpandedOffer] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [sortBy, setSortBy] = useState('match'); // match, date, salary
  const [filterMinMatch, setFilterMinMatch] = useState(70);
  const [showFilters, setShowFilters] = useState(false);
  const [autoApplied, setAutoApplied] = useState(false);
  // Auto-apply if in complete mode
  useEffect(() => {
    if (autoPilotLevel === 'complete' && !autoApplied && offers.length > 0) {
      // Automatically apply to top 2 offers
      const topOffers = [...offers].sort((a, b) => b.match - a.match).slice(0, 2);
      setTimeout(() => {
        topOffers.forEach((offer, index) => {
          setTimeout(() => {
            handleApply(offer.id);
          }, index * 1500);
        });
        setAutoApplied(true);
      }, 2000);
    }
  }, [offers, autoPilotLevel, autoApplied]);
  // Filtrer et trier les offres
  const processedOffers = [...offers].filter(offer => offer.match >= filterMinMatch).sort((a, b) => {
    if (sortBy === 'match') return b.match - a.match;
    if (sortBy === 'date') return a.posted.localeCompare(b.posted);
    if (sortBy === 'salary') {
      const aSalary = parseInt(a.salary.split('-')[1]);
      const bSalary = parseInt(b.salary.split('-')[1]);
      return bSalary - aSalary;
    }
    return 0;
  });
  // Gérer l'application à une offre
  const handleApply = offerId => {
    setAppliedOffers(prev => [...prev, offerId]);
    onApply(offerId);
  };
  // Sélectionner une offre pour affichage détaillé
  const handleSelectOffer = offer => {
    setSelectedOffer(offer);
  };
  // Vérifier si une offre a été postulée
  const isApplied = offerId => {
    return appliedOffers.includes(offerId);
  };
  // Obtenir la couleur de correspondance
  const getMatchColor = match => {
    if (match >= 90) return 'text-green-500 bg-green-900/20';
    if (match >= 80) return 'text-blue-500 bg-blue-900/20';
    if (match >= 70) return 'text-yellow-500 bg-yellow-900/20';
    return 'text-gray-400 bg-gray-800';
  };
  return <div className="space-y-6">
      <Card variant="act" className="p-6 border border-[#FF6B6B]/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-white flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2 text-[#FF6B6B]" />
            Offres correspondant à ton profil
          </h2>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="small" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="w-4 h-4 mr-1" />
              Filtres
            </Button>
            <Button variant="act" size="small" className="flex items-center" onClick={onContinue}>
              Continuer
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
        {/* Filtres et tri */}
        <AnimatePresence>
          {showFilters && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} className="overflow-hidden mb-6">
              <div className="p-4 bg-[#1E0F24] rounded-lg border border-[#FF6B6B]/20">
                <h3 className="text-white font-medium mb-3">Filtres et tri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#E5E5EA] text-sm mb-2">
                      Trier par
                    </label>
                    <div className="flex space-x-2">
                      <button className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'match' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'bg-[#1A0E21] text-[#E5E5EA]'}`} onClick={() => setSortBy('match')}>
                        Correspondance
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'date' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'bg-[#1A0E21] text-[#E5E5EA]'}`} onClick={() => setSortBy('date')}>
                        Date
                      </button>
                      <button className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'salary' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'bg-[#1A0E21] text-[#E5E5EA]'}`} onClick={() => setSortBy('salary')}>
                        Salaire
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#E5E5EA] text-sm mb-2">
                      Correspondance minimale: {filterMinMatch}%
                    </label>
                    <input type="range" min="0" max="100" value={filterMinMatch} onChange={e => setFilterMinMatch(parseInt(e.target.value))} className="w-full h-2 bg-[#1A0E21] rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
        {/* Liste des offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {processedOffers.map(offer => <motion.div key={offer.id} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className={`p-4 bg-[#1E0F24] rounded-lg border cursor-pointer ${selectedOffer?.id === offer.id ? 'border-[#FF6B6B]/50' : 'border-[#FF6B6B]/20 hover:border-[#FF6B6B]/30'}`} onClick={() => handleSelectOffer(offer)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium">{offer.position}</h3>
                <div className={`px-2 py-1 rounded-full text-xs flex items-center ${getMatchColor(offer.match)}`}>
                  <StarIcon className="w-3 h-3 mr-1" />
                  <span>{offer.match}%</span>
                </div>
              </div>
              <div className="text-gray-400 mb-3">{offer.company}</div>
              <div className="flex flex-wrap text-sm text-gray-400 mb-3 gap-y-1">
                <div className="flex items-center mr-4">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{offer.location}</span>
                </div>
                <div className="flex items-center mr-4">
                  <DollarSignIcon className="w-4 h-4 mr-1" />
                  <span>{offer.salary}</span>
                </div>
                <div className="flex items-center mr-4">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>Il y a {offer.posted}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="w-4 h-4 mr-1" />
                  <span>{offer.applicants} candidats</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="secondary" size="small" className="flex items-center" onClick={e => {
              e.stopPropagation();
              setExpandedOffer(expandedOffer === offer.id ? null : offer.id);
            }}>
                  {expandedOffer === offer.id ? 'Réduire' : 'Détails'}
                  <ChevronRightIcon className={`w-4 h-4 ml-1 transition-transform ${expandedOffer === offer.id ? 'rotate-90' : ''}`} />
                </Button>
                {isApplied(offer.id) ? <div className="px-3 py-1 bg-green-900/20 text-green-500 rounded-lg text-sm flex items-center">
                    <CheckIcon className="w-4 h-4 mr-1" />
                    Postulé
                  </div> : <Button variant="act" size="small" className="flex items-center" onClick={e => {
              e.stopPropagation();
              handleApply(offer.id);
            }}>
                    <SendIcon className="w-4 h-4 mr-1" />
                    Postuler
                  </Button>}
              </div>

              {/* Description étendue */}
              <AnimatePresence>
                {expandedOffer === offer.id && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} className="overflow-hidden mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 mb-3">{offer.description}</p>
                    <div className="mb-3">
                      <h4 className="text-white font-medium mb-2">Prérequis</h4>
                      <ul className="space-y-1">
                        {offer.requirements.map((req, index) => <li key={index} className="flex items-start text-sm text-gray-300">
                            <div className="p-1 bg-gray-700 rounded-full mr-2 mt-0.5">
                              <CheckIcon className="w-3 h-3 text-act-accent" />
                            </div>
                            {req}
                          </li>)}
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="act" size="small" className="flex items-center" onClick={e => {
                  e.stopPropagation();
                  if (!isApplied(offer.id)) {
                    handleApply(offer.id);
                  }
                }} disabled={isApplied(offer.id)}>
                        {isApplied(offer.id) ? <>
                            <CheckIcon className="w-4 h-4 mr-1" />
                            Déjà postulé
                          </> : <>
                            <SendIcon className="w-4 h-4 mr-1" />
                            Postuler maintenant
                          </>}
                      </Button>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>)}
        </div>
        {/* Message pour AutoPilot complet */}
        {autoPilotLevel === 'complete' && <div className="p-4 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-lg flex items-center mb-6">
            <CheckCircleIcon className="w-5 h-5 text-[#FF6B6B] mr-3 flex-shrink-0" />
            <div>
              <p className="text-white">
                AutoPilot a postulé automatiquement aux meilleures offres
              </p>
              <p className="text-sm text-[#E5E5EA] mt-1">
                Les candidatures ont été optimisées et envoyées aux offres ayant
                la plus forte correspondance avec ton profil
              </p>
            </div>
          </div>}
        <div className="flex justify-between items-center">
          <div className="text-sm text-[#E5E5EA]">
            {processedOffers.length} offres affichées sur {offers.length}{' '}
            trouvées
          </div>
          <Button variant="act" onClick={onContinue} className="flex items-center bg-[#FF6B6B] text-white hover:bg-[#e85c5c]">
            Continuer
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
      {/* Détail de l'offre sélectionnée */}
      {selectedOffer && <Card variant="act" className="p-6 border border-act-accent/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-medium text-white mr-3">
                  {selectedOffer.position}
                </h2>
                <div className={`px-2 py-1 rounded-full text-xs flex items-center ${getMatchColor(selectedOffer.match)}`}>
                  <StarIcon className="w-3 h-3 mr-1" />
                  <span>{selectedOffer.match}%</span>
                </div>
              </div>
              <div className="text-gray-300">{selectedOffer.company}</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="small" onClick={() => setSelectedOffer(null)}>
                <XIcon className="w-4 h-4" />
              </Button>
              {isApplied(selectedOffer.id) ? <div className="px-3 py-1 bg-green-900/20 text-green-500 rounded-lg text-sm flex items-center">
                  <CheckIcon className="w-4 h-4 mr-1" />
                  Postulé
                </div> : <Button variant="act" size="small" className="flex items-center" onClick={() => handleApply(selectedOffer.id)}>
                  <SendIcon className="w-4 h-4 mr-1" />
                  Postuler
                </Button>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
                <h3 className="text-white font-medium mb-3">
                  Description du poste
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedOffer.description}
                </p>
                <div>
                  <h4 className="text-white font-medium mb-2">Prérequis</h4>
                  <ul className="space-y-2">
                    {selectedOffer.requirements.map((req, index) => <li key={index} className="flex items-start text-gray-300">
                        <div className="p-1 bg-gray-700 rounded-full mr-2 mt-0.5">
                          <CheckIcon className="w-3 h-3 text-act-accent" />
                        </div>
                        {req}
                      </li>)}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-3">
                  Analyse de compatibilité
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">
                        Correspondance globale
                      </span>
                      <span className="text-white font-medium">
                        {selectedOffer.match}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-act-accent to-red-500" style={{
                    width: `${selectedOffer.match}%`
                  }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">
                        Compétences techniques
                      </span>
                      <span className="text-white font-medium">90%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{
                    width: '90%'
                  }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">Expérience</span>
                      <span className="text-white font-medium">85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{
                    width: '85%'
                  }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300">Localisation</span>
                      <span className="text-white font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-green-500" style={{
                    width: '100%'
                  }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
                <h3 className="text-white font-medium mb-3">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">Localisation</span>
                    </div>
                    <span className="text-white">{selectedOffer.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSignIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">Salaire</span>
                    </div>
                    <span className="text-white">{selectedOffer.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">Publiée</span>
                    </div>
                    <span className="text-white">
                      Il y a {selectedOffer.posted}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">Candidats</span>
                    </div>
                    <span className="text-white">
                      {selectedOffer.applicants}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
                <h3 className="text-white font-medium mb-3">Actions</h3>
                <div className="space-y-3">
                  {isApplied(selectedOffer.id) ? <div className="p-3 bg-green-900/20 border border-green-900/30 rounded-lg flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-white">Candidature envoyée</span>
                    </div> : <Button variant="act" className="w-full flex items-center justify-center" onClick={() => handleApply(selectedOffer.id)}>
                      <SendIcon className="w-4 h-4 mr-2" />
                      Postuler maintenant
                    </Button>}
                  <Button variant="secondary" className="w-full flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Sauvegarder pour plus tard
                  </Button>
                </div>
              </div>
              {autoPilotLevel === 'complete' && !isApplied(selectedOffer.id) && selectedOffer.match >= 80 && <div className="p-3 bg-act-accent/10 border border-act-accent/30 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircleIcon className="w-4 h-4 text-act-accent mr-2" />
                      <span className="text-white font-medium">
                        Recommandation AutoPilot
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Cette offre a une forte correspondance avec ton profil.
                      AutoPilot recommande de postuler rapidement.
                    </p>
                  </div>}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" className="flex items-center" onClick={() => {
          const currentIndex = processedOffers.findIndex(o => o.id === selectedOffer.id);
          if (currentIndex > 0) {
            setSelectedOffer(processedOffers[currentIndex - 1]);
          }
        }} disabled={processedOffers.findIndex(o => o.id === selectedOffer.id) === 0}>
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            <Button variant="secondary" className="flex items-center" onClick={() => {
          const currentIndex = processedOffers.findIndex(o => o.id === selectedOffer.id);
          if (currentIndex < processedOffers.length - 1) {
            setSelectedOffer(processedOffers[currentIndex + 1]);
          }
        }} disabled={processedOffers.findIndex(o => o.id === selectedOffer.id) === processedOffers.length - 1}>
              Suivant
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>}
    </div>;
};