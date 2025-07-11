import React, { useState } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInformation } from './ProfileInformation';
import { ProfilePreferences } from './ProfilePreferences';
import { ProfileDocuments } from './ProfileDocuments';
import { ProfileInsights } from './ProfileInsights';
import { InterviewCoachingCard } from './InterviewCoachingCard';
import { UpgradeCard } from '../subscription/UpgradeCard';
import { useUser } from '../../context/UserContext';
import { Button } from '../common/Button';
import { ArrowLeftIcon } from 'lucide-react';
export const ProfilePage = ({
  onBack
}) => {
  const {
    subscriptionTier
  } = useUser();
  // Mock user data
  const userData = {
    firstName: 'Thomas',
    lastName: 'Dubois',
    tagline: 'Développeur Full Stack | React & Node.js',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    location: 'Paris, France',
    availability: 'Disponible immédiatement',
    education: [{
      id: 'edu1',
      degree: 'Master en Informatique',
      school: 'Université Paris-Saclay',
      year: '2018 - 2020',
      description: 'Spécialisation en Intelligence Artificielle et Science des Données'
    }, {
      id: 'edu2',
      degree: 'Licence en Informatique',
      school: 'Université de Lyon',
      year: '2015 - 2018',
      description: 'Programmation, algorithmes et structures de données'
    }],
    skills: [{
      id: 'skill1',
      name: 'React',
      level: 90,
      type: 'hard'
    }, {
      id: 'skill2',
      name: 'TypeScript',
      level: 85,
      type: 'hard'
    }, {
      id: 'skill3',
      name: 'Node.js',
      level: 75,
      type: 'hard'
    }, {
      id: 'skill4',
      name: 'Python',
      level: 80,
      type: 'hard'
    }, {
      id: 'skill5',
      name: 'SQL',
      level: 70,
      type: 'hard'
    }, {
      id: 'skill6',
      name: 'Communication',
      level: 95,
      type: 'soft'
    }, {
      id: 'skill7',
      name: "Travail d'équipe",
      level: 90,
      type: 'soft'
    }, {
      id: 'skill8',
      name: 'Résolution de problèmes',
      level: 85,
      type: 'soft'
    }, {
      id: 'skill9',
      name: 'Adaptabilité',
      level: 80,
      type: 'soft'
    }],
    experiences: [{
      id: 'exp1',
      title: 'Développeur Full Stack',
      company: 'Tech Innovations',
      period: 'Jan 2021 - Présent',
      description: "Développement d'applications web avec React, Node.js et MongoDB. Participation à l'ensemble du cycle de vie du développement logiciel."
    }, {
      id: 'exp2',
      title: 'Développeur Front-End',
      company: 'Digital Solutions',
      period: 'Mar 2019 - Déc 2020',
      description: "Création d'interfaces utilisateur réactives et accessibles. Collaboration avec les designers et l'équipe back-end."
    }]
  };
  // Mock preferences
  const preferences = {
    objective: 'Je recherche un poste de développeur full stack dans une entreprise innovante où je pourrai contribuer à des projets ambitieux tout en continuant à développer mes compétences techniques.',
    contractType: 'CDI',
    searchStatus: 'Actif'
  };
  // Mock documents
  const documents = {
    cvs: [{
      id: 'cv1',
      name: 'CV_Thomas_Tech.pdf',
      lastModified: '12/05/2023',
      thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
    }, {
      id: 'cv2',
      name: 'CV_Thomas_Startup.pdf',
      lastModified: '28/04/2023',
      thumbnail: 'https://images.unsplash.com/photo-1626378479381-3f6f410fbc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3VtZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }],
    letters: [{
      id: 'letter1',
      name: 'Lettre_TechInnovations.pdf',
      lastModified: '15/05/2023'
    }, {
      id: 'letter2',
      name: 'Lettre_DigitalSolutions.pdf',
      lastModified: '02/05/2023'
    }]
  };
  // Mock insights
  const insights = {
    topSkills: ['React', 'TypeScript', 'Node.js', 'Communication', 'Problem Solving'],
    suggestions: ['Ajoutez plus de détails sur vos projets personnels pour vous démarquer', 'Vos compétences en SQL pourraient être mises plus en avant dans votre CV', 'Pensez à ajouter des chiffres et résultats concrets à vos expériences']
  };
  const handleEdit = section => {
    console.log(`Editing section: ${section}`);
    // In a real app, this would open an edit modal for the specific section
  };
  const handleStartInterview = () => {
    console.log('Starting interview preparation');
    // In a real app, this would navigate to the interview preparation screen
  };
  return <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Button variant="secondary" size="small" className="mr-4" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Mon Profil</h1>
        </div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileHeader userData={userData} completion={85} onEdit={() => handleEdit('header')} universe="build" />
            <ProfileInformation userData={userData} onEdit={handleEdit} universe="build" />
            <ProfilePreferences preferences={preferences} onEdit={() => handleEdit('preferences')} universe="act" />
          </div>
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <InterviewCoachingCard completedModules={1} totalModules={4} onContinue={handleStartInterview} />
            <ProfileInsights insights={insights} universe="prepare" />
            <ProfileDocuments documents={documents} onEdit={() => handleEdit('documents')} universe="build" />
            <UpgradeCard type="progress" currentTier={subscriptionTier} onUpgrade={() => console.log('Upgrade clicked')} />
          </div>
        </div>
      </div>
    </div>;
};