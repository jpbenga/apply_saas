import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FileTextIcon, CheckIcon, ArrowRightIcon, BriefcaseIcon } from 'lucide-react';
export const JobOfferPreparationFlow = ({
  onComplete,
  onBack,
  isAudioEnabled,
  onShowPricing
}) => {
  const [jobOffer, setJobOffer] = useState(null);
  const [customJobOffer, setCustomJobOffer] = useState('');
  const [step, setStep] = useState(0);
  // Exemples d'offres d'emploi
  const exampleJobOffers = [{
    id: 1,
    title: 'UX Designer',
    company: 'TechVision',
    description: 'Nous recherchons un UX Designer talentueux pour rejoindre notre équipe produit en pleine croissance...'
  }, {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateCorp',
    description: 'Rejoignez notre équipe en tant que Product Manager et dirigez le développement de produits innovants...'
  }, {
    id: 3,
    title: 'Front-end Developer',
    company: 'WebSolutions',
    description: 'Nous recherchons un développeur front-end passionné pour créer des interfaces utilisateur exceptionnelles...'
  }];
  // Handle job offer selection
  const handleSelectJobOffer = offer => {
    setJobOffer(offer);
    // Appeler directement la prop onShowPricing
    if (onShowPricing) {
      onShowPricing('prepare');
    }
    // Play selection sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/prepare-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    }
  };
  // Handle custom job offer submission
  const handleSubmitCustomOffer = () => {
    if (customJobOffer.trim().length < 50) {
      alert("Veuillez entrer une offre d'emploi plus détaillée (minimum 50 caractères).");
      return;
    }
    // Appeler directement la prop onShowPricing
    if (onShowPricing) {
      onShowPricing('prepare');
    }
    // Play selection sound
    if (isAudioEnabled) {
      const audio = new Audio('/sounds/prepare-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.warn('Audio playback prevented:', e));
    }
  };
  return <div className="space-y-6">
      <Card variant="prepare" className="p-6">
        <h2 className="text-xl font-medium text-lavender-100 mb-6 flex items-center">
          <BriefcaseIcon className="w-5 h-5 mr-2 text-lavender-300" />
          Analyse d'offre d'emploi
        </h2>
        <p className="text-blue-100 mb-6">
          Sélectionnez une offre d'emploi exemple ou entrez une offre réelle
          pour laquelle vous souhaitez vous préparer.
        </p>
        <div className="space-y-4 mb-6">
          <h3 className="text-lg text-lavender-200">
            Offres d'emploi exemples
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {exampleJobOffers.map(offer => <Card key={offer.id} variant="prepare" className="p-4 cursor-pointer border-lavender-300/20 hover:border-lavender-300/40 transition-all" onClick={() => handleSelectJobOffer(offer)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lavender-100">
                      {offer.title}
                    </h4>
                    <p className="text-sm text-blue-200">{offer.company}</p>
                    <p className="text-sm text-blue-100 mt-2">
                      {offer.description}
                    </p>
                  </div>
                  <Button variant="prepare" size="small" className="flex items-center">
                    <span>Analyser</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>)}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg text-lavender-200 mb-3">
            Entrez votre propre offre d'emploi
          </h3>
          <textarea className="w-full h-32 bg-blue-900/50 border border-lavender-300/20 rounded-lg p-3 text-blue-50 focus:outline-none focus:border-lavender-300/50" placeholder="Copiez-collez l'offre d'emploi ici..." value={customJobOffer} onChange={e => setCustomJobOffer(e.target.value)}></textarea>
          <div className="flex justify-end mt-3">
            <Button variant="prepare" onClick={handleSubmitCustomOffer} className="flex items-center" disabled={customJobOffer.trim().length < 50}>
              <span>Analyser cette offre</span>
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>;
};