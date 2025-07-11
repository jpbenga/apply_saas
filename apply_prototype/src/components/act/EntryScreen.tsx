import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, ChevronRightIcon, ZapIcon, SearchIcon, BriefcaseIcon, UserIcon, ArrowRightIcon, CheckIcon, LockIcon, MessageSquareIcon } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
export const EntryScreen = ({
  onActivate,
  onShowPricing,
  exploreMode
}) => {
  return <div className="min-h-screen w-full bg-gradient-to-br from-[#1A0E21] to-[#120818] text-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-[#CBA6F7]/10 rounded-full">
              <RocketIcon className="w-10 h-10 text-[#CBA6F7]" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
            Bienvenue dans l'univers <span className="font-medium">Act</span>
          </h1>
          <p className="text-xl text-[#D8D4E8] max-w-2xl mx-auto">
            Déléguez votre recherche d'emploi à un agent IA qui travaille pour
            vous 24/7
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card variant="act" className="p-6 border-[#CBA6F7]/30 bg-[#1E0F24] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#CBA6F7]/10 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-medium mb-4">
                Pourquoi utiliser un agent IA ?
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="p-1.5 bg-[#CBA6F7]/10 rounded-full mr-3 mt-0.5">
                    <ZapIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      Recherche automatisée
                    </h3>
                    <p className="text-[#D8D4E8] text-sm">
                      Votre agent scanne en continu les offres d'emploi
                      correspondant à votre profil sur plus de 50 plateformes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-1.5 bg-[#CBA6F7]/10 rounded-full mr-3 mt-0.5">
                    <SearchIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      Analyse intelligente
                    </h3>
                    <p className="text-[#D8D4E8] text-sm">
                      L'IA évalue chaque opportunité selon vos critères et votre
                      profil pour ne retenir que les plus pertinentes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-1.5 bg-[#CBA6F7]/10 rounded-full mr-3 mt-0.5">
                    <BriefcaseIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      Candidature automatique
                    </h3>
                    <p className="text-[#D8D4E8] text-sm">
                      L'agent peut postuler pour vous avec des documents
                      personnalisés pour chaque offre, vous faisant gagner des
                      heures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-1.5 bg-[#CBA6F7]/10 rounded-full mr-3 mt-0.5">
                    <MessageSquareIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      Suivi des échanges
                    </h3>
                    <p className="text-[#D8D4E8] text-sm">
                      Votre agent peut gérer les premiers échanges avec les
                      recruteurs et vous alerter lorsqu'une réponse nécessite
                      votre attention.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="act" className="w-full flex items-center justify-center" onClick={onActivate}>
                <span>Découvrir l'agent</span>
                <ChevronRightIcon className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </Card>
          <div className="space-y-6">
            <Card variant="act" className="p-6 border-[#CBA6F7]/30 bg-[#1E0F24]">
              <h2 className="text-2xl font-medium mb-4">Ce que vous obtenez</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Scanner d'opportunités multi-plateformes
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Personnalisation des CV et lettres par IA
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Automatisation des candidatures (jusqu'à 100/mois)
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Réponses automatiques aux premiers messages
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Tableau de bord de suivi des candidatures
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <CheckIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-white">
                    Alertes intelligentes pour les opportunités à fort potentiel
                  </p>
                </div>
              </div>
              {exploreMode ? <Button variant="secondary" className="w-full flex items-center justify-center bg-[#CBA6F7]/10 text-[#CBA6F7] border-[#CBA6F7]/30 hover:bg-[#CBA6F7]/20" onClick={onShowPricing}>
                  <span>Débloquer toutes les fonctionnalités</span>
                  <ArrowRightIcon className="w-5 h-5 ml-1" />
                </Button> : <div className="flex items-center justify-center p-3 bg-[#CBA6F7]/10 rounded-lg border border-[#CBA6F7]/20">
                  <div className="p-1.5 bg-[#CBA6F7]/10 rounded-full mr-2">
                    <UserIcon className="w-4 h-4 text-[#CBA6F7]" />
                  </div>
                  <p className="text-[#CBA6F7] text-sm">
                    Vous avez accès à toutes les fonctionnalités
                  </p>
                </div>}
            </Card>
            {exploreMode && <Card variant="act" className="p-6 border-[#CBA6F7]/20 bg-[#1E0F24]">
                <div className="flex items-start">
                  <div className="p-2 bg-[#CBA6F7]/10 rounded-full mr-3 flex-shrink-0">
                    <LockIcon className="w-5 h-5 text-[#CBA6F7]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Mode exploration
                    </h3>
                    <p className="text-[#D8D4E8] text-sm mb-4">
                      Vous êtes actuellement en mode exploration. Pour utiliser
                      pleinement l'agent IA et automatiser vos candidatures,
                      passez au plan L'Agent.
                    </p>
                    <Button variant="act" className="w-full flex items-center justify-center" onClick={onShowPricing}>
                      <span>Voir les tarifs</span>
                      <ChevronRightIcon className="w-5 h-5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
};