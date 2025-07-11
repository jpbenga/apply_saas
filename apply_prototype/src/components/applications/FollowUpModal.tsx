import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  XIcon,
  RefreshCwIcon,
  SendIcon,
  CheckIcon,
  Wand2Icon,
} from 'lucide-react'
import { Button } from '../common/Button'
export const FollowUpModal = ({ application, onClose, onSend }) => {
  const [message, setMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('professional')
  // Template options
  const templates = {
    professional: {
      name: 'Professionnel',
      text: `Bonjour,\n\nJe me permets de revenir vers vous concernant ma candidature au poste de ${application.position} envoyée le ${new Date(application.date).toLocaleDateString('fr-FR')}.\n\nJe suis toujours très intéressé(e) par cette opportunité et serais ravi(e) de pouvoir échanger avec vous pour vous présenter plus en détail mon parcours et mes motivations.\n\nJe reste à votre disposition pour tout complément d'information.\n\nCordialement,\n[Votre nom]`,
    },
    friendly: {
      name: 'Amical',
      text: `Bonjour,\n\nJ'espère que vous allez bien. Je vous ai envoyé ma candidature pour le poste de ${application.position} il y a quelques jours et je voulais simplement m'assurer que vous l'aviez bien reçue.\n\nJe suis très enthousiaste à l'idée de potentiellement rejoindre votre équipe et j'aimerais avoir l'opportunité d'en discuter davantage avec vous.\n\nMerci d'avance pour votre retour,\n[Votre nom]`,
    },
    followUp: {
      name: 'Suivi',
      text: `Bonjour,\n\nSuite à ma candidature pour le poste de ${application.position} chez ${application.company}, je souhaitais vous faire part de mon intérêt continu pour cette opportunité.\n\nDepuis l'envoi de ma candidature, j'ai eu l'occasion de [mention d'une réalisation récente pertinente], ce qui renforce ma conviction que je pourrais apporter une contribution significative à votre équipe.\n\nJe reste disponible pour un entretien à votre convenance.\n\nCordialement,\n[Votre nom]`,
    },
  }
  useEffect(() => {
    setMessage(templates.professional.text)
  }, [application])
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
    setMessage(templates[template].text)
  }
  const handleGenerateMessage = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const customMessage = `Bonjour,\n\nJe me permets de revenir vers vous concernant ma candidature au poste de ${application.position} chez ${application.company}.\n\nAprès avoir exploré davantage votre entreprise, j'ai été particulièrement impressionné(e) par [réalisation récente de l'entreprise] et je suis plus que jamais motivé(e) à rejoindre votre équipe. Ma récente expérience en [compétence pertinente] pourrait être un atout pour votre projet de [projet mentionné dans l'offre].\n\nJe reste disponible pour échanger à ce sujet et vous présenter comment je pourrais contribuer concrètement à vos objectifs.\n\nCordialement,\n[Votre nom]`
      setMessage(customMessage)
      setIsGenerating(false)
    }, 1500)
  }
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl max-w-xl w-full overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <RefreshCwIcon className="w-5 h-5 mr-2 text-blue-500" />
            Relancer la candidature
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            onClick={onClose}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Candidature pour{' '}
              <span className="font-medium text-gray-900">
                {application.position}
              </span>{' '}
              chez{' '}
              <span className="font-medium text-gray-900">
                {application.company}
              </span>
            </p>
            <div className="flex space-x-2 mb-4">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  className={`px-3 py-1 text-sm rounded-full ${selectedTemplate === key ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                  onClick={() => handleTemplateChange(key)}
                >
                  {template.name}
                </button>
              ))}
              <button
                className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800 border border-purple-300 flex items-center hover:bg-purple-200"
                onClick={handleGenerateMessage}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCwIcon className="w-3 h-3 mr-1 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Wand2Icon className="w-3 h-3 mr-1" />
                    IA
                  </>
                )}
              </button>
            </div>
            <textarea
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Rédigez votre message de relance..."
            />
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-4">
            <div className="flex items-start">
              <div className="p-1 bg-blue-100 rounded-full mr-2 mt-0.5">
                <CheckIcon className="w-3 h-3 text-blue-600" />
              </div>
              <p className="text-xs text-blue-800">
                Les relances augmentent vos chances d'obtenir une réponse de{' '}
                <span className="font-semibold">+35%</span>. Le meilleur moment
                pour relancer est entre 5 et 10 jours après votre candidature
                initiale.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t p-4 flex justify-between">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => onSend(message)}
            className="flex items-center"
          >
            <SendIcon className="w-4 h-4 mr-2" />
            Envoyer la relance
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
const Wand2Icon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 4-8 8" />
    <path d="m9 4 1 1" />
    <path d="m4 9 1 1" />
    <path d="m14 20 6-6" />
    <path d="m19 12 1-1" />
    <path d="m12 19 1 1" />
  </svg>
)
