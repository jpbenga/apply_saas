import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, BriefcaseIcon, SearchIcon, StarIcon, MapPinIcon, ClockIcon, CheckIcon, ChevronRightIcon, FilterIcon, XIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
// Mock job offers data
const mockJobOffers = [{
  id: 1,
  title: 'UX Designer Senior',
  company: 'DesignStudio',
  logo: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
  location: 'Paris, France',
  type: 'CDI',
  posted: 'Il y a 2 jours',
  applicants: 18,
  match: 92,
  skills: ['Figma', 'UX Research', 'Design System', 'Prototyping'],
  description: 'DesignStudio recherche un UX Designer Senior pour rejoindre notre équipe créative et travailler sur des projets innovants pour des clients internationaux.'
}, {
  id: 2,
  title: 'Product Designer',
  company: 'TechInnov',
  logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
  location: 'Lyon, France',
  type: 'CDI',
  posted: 'Il y a 5 jours',
  applicants: 24,
  match: 85,
  skills: ['UI Design', 'User Testing', 'Adobe XD', 'Sketch'],
  description: "Rejoignez TechInnov pour concevoir des produits numériques utilisés par des millions d'utilisateurs. Vous travaillerez en étroite collaboration avec les équipes produit et développement."
}, {
  id: 3,
  title: 'UI/UX Designer',
  company: 'WebAgency',
  logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
  location: 'Remote',
  type: 'Freelance',
  posted: 'Il y a 1 semaine',
  applicants: 36,
  match: 78,
  skills: ['UI Design', 'Responsive Design', 'HTML/CSS', 'Wireframing'],
  description: 'WebAgency cherche un designer UI/UX freelance pour travailler sur plusieurs projets web et mobiles. Possibilité de collaboration à long terme.'
}, {
  id: 4,
  title: 'UX Researcher',
  company: 'DataViz',
  logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&h=80&q=80',
  location: 'Bordeaux, France',
  type: 'CDD',
  posted: 'Il y a 3 jours',
  applicants: 12,
  match: 81,
  skills: ['User Research', 'Interviews', 'Data Analysis', 'Usability Testing'],
  description: "DataViz recherche un UX Researcher pour mener des études utilisateurs et améliorer l'expérience de nos produits de visualisation de données."
}];
export const JobOfferSelection = ({
  onSelectOffer,
  onBack
}) => {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  // Simulate loading job offers
  useEffect(() => {
    const timer = setTimeout(() => {
      setOffers(mockJobOffers);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // Handle search
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };
  // Filter offers based on search term
  const filteredOffers = offers.filter(offer => offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || offer.company.toLowerCase().includes(searchTerm.toLowerCase()) || offer.location.toLowerCase().includes(searchTerm.toLowerCase()));
  // Handle offer selection
  const handleSelectOffer = offer => {
    setSelectedOffer(offer);
  };
  // Confirm selection
  const confirmSelection = () => {
    if (selectedOffer) {
      onSelectOffer(selectedOffer);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#0E1B33] to-[#162440] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card variant="prepare" className="p-6 border-prepare-highlight/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Button variant="secondary" className="mr-4 bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack}>
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <h1 className="text-xl font-medium text-white">
                  Sélectionne une offre d'emploi
                </h1>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher par titre, entreprise ou lieu..." className="w-full bg-[#1E3A60] border border-prepare-highlight/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prepare-highlight/50" value={searchTerm} onChange={handleSearch} />
              </div>
            </div>
            {isLoading ? <div className="py-12 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-prepare-highlight/30 border-t-prepare-highlight rounded-full animate-spin mb-4"></div>
                <p className="text-prepare-text">Chargement des offres...</p>
              </div> : <>
                <div className="space-y-4 mb-6">
                  {filteredOffers.length > 0 ? filteredOffers.map(offer => <motion.div key={offer.id} className={`p-4 bg-[#1E3A60] rounded-lg border ${selectedOffer?.id === offer.id ? 'border-prepare-highlight' : 'border-prepare-highlight/20'} cursor-pointer transition-all`} whileHover={{
                scale: 1.01
              }} onClick={() => handleSelectOffer(offer)}>
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-prepare-highlight/20">
                            <img src={offer.logo} alt={offer.company} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <h3 className="text-white font-medium">
                                {offer.title}
                              </h3>
                              <div className="flex items-center mt-1 sm:mt-0">
                                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="text-white text-sm">
                                  {offer.match}% match
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-prepare-text mt-1">
                              {offer.company} • {offer.location}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {offer.skills.slice(0, 3).map((skill, i) => <span key={i} className="text-xs bg-prepare-highlight/10 text-prepare-highlight px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>)}
                              {offer.skills.length > 3 && <span className="text-xs bg-prepare-highlight/10 text-prepare-highlight px-2 py-0.5 rounded-full">
                                  +{offer.skills.length - 3}
                                </span>}
                            </div>
                            <div className="flex items-center mt-2 text-xs text-gray-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              <span>{offer.posted}</span>
                              <span className="mx-2">•</span>
                              <BriefcaseIcon className="w-3 h-3 mr-1" />
                              <span>{offer.type}</span>
                              <span className="mx-2">•</span>
                              <span>{offer.applicants} candidats</span>
                            </div>
                          </div>
                          {selectedOffer?.id === offer.id && <div className="ml-2 p-1 bg-prepare-highlight/20 rounded-full">
                              <CheckIcon className="w-5 h-5 text-prepare-highlight" />
                            </div>}
                        </div>
                      </motion.div>) : <div className="py-8 text-center">
                      <SearchIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-prepare-text">
                        Aucune offre ne correspond à votre recherche
                      </p>
                    </div>}
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" className="bg-[#1E3A60] text-white border-prepare-accent/20" onClick={onBack}>
                    Retour
                  </Button>
                  <Button variant="prepare" className="flex items-center bg-prepare-highlight text-white hover:bg-prepare-highlight/90" onClick={confirmSelection} disabled={!selectedOffer}>
                    <span>Continuer avec cette offre</span>
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </>}
          </Card>
        </div>
      </div>
    </div>;
};