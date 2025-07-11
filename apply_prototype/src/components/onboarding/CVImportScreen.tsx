import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { FileTextIcon, UploadIcon, CheckIcon, XIcon } from 'lucide-react';
type CVImportScreenProps = {
  onComplete: (importedData: any) => void;
  onCancel: () => void;
};
export const CVImportScreen: React.FC<CVImportScreenProps> = ({
  onComplete,
  onCancel
}) => {
  const [stage, setStage] = useState<'initial' | 'uploading' | 'success'>('initial');
  useEffect(() => {
    if (stage === 'uploading') {
      // Simulate upload and processing time
      const timer = setTimeout(() => {
        setStage('success');
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (stage === 'success') {
      // Automatically proceed after success message
      const timer = setTimeout(() => {
        // Sample CV data that would be extracted from an uploaded CV
        const sampleCVData = {
          personal: {
            fullName: 'Jean Dupont',
            email: 'jean.dupont@example.com',
            phone: '06 12 34 56 78',
            location: 'Paris, France',
            title: 'Développeur Frontend Senior'
          },
          experience: [{
            id: '1',
            company: 'TechVision',
            position: 'Développeur Frontend Senior',
            location: 'Paris, France',
            startDate: '2020-01',
            endDate: 'present',
            description: "Développement d'applications web avec React et TypeScript. Mise en place d'une architecture frontend moderne et performante."
          }, {
            id: '2',
            company: 'Digital Solutions',
            position: 'Développeur Frontend',
            location: 'Lyon, France',
            startDate: '2018-03',
            endDate: '2019-12',
            description: "Création d'interfaces utilisateur réactives et accessibles. Collaboration avec l'équipe design pour implémenter des maquettes fidèles."
          }],
          education: [{
            id: '1',
            institution: 'Université de Paris',
            degree: "Master en informatique, spécialité en développement d'applications",
            location: 'Paris, France',
            startDate: '2016-09',
            endDate: '2018-06',
            description: "Spécialisation en développement web et mobile. Projet de fin d'études sur les architectures front-end modernes."
          }, {
            id: '2',
            institution: 'IUT de Lyon',
            degree: 'DUT Informatique',
            location: 'Lyon, France',
            startDate: '2014-09',
            endDate: '2016-06',
            description: 'Formation généraliste en informatique avec spécialisation en développement logiciel.'
          }],
          skills: [{
            id: '1',
            name: 'React',
            level: 'Expert'
          }, {
            id: '2',
            name: 'TypeScript',
            level: 'Expert'
          }, {
            id: '3',
            name: 'JavaScript',
            level: 'Expert'
          }, {
            id: '4',
            name: 'HTML/CSS',
            level: 'Expert'
          }, {
            id: '5',
            name: 'Redux',
            level: 'Avancé'
          }, {
            id: '6',
            name: 'Node.js',
            level: 'Intermédiaire'
          }, {
            id: '7',
            name: 'GraphQL',
            level: 'Intermédiaire'
          }, {
            id: '8',
            name: 'Git',
            level: 'Expert'
          }],
          certifications: [{
            id: '1',
            name: 'React Developer Certification',
            issuer: 'Meta',
            date: '2022-05',
            description: 'Certification officielle pour les développeurs React.'
          }, {
            id: '2',
            name: 'Advanced JavaScript',
            issuer: 'Udemy',
            date: '2021-03',
            description: 'Cours avancé sur JavaScript et les patterns modernes.'
          }],
          languages: [{
            id: '1',
            language: 'Français',
            level: 'Natif'
          }, {
            id: '2',
            language: 'Anglais',
            level: 'Courant'
          }, {
            id: '3',
            language: 'Espagnol',
            level: 'Intermédiaire'
          }]
        };
        onComplete(sampleCVData);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);
  const handleFileSelect = () => {
    // Simulate file selection
    setStage('uploading');
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="absolute top-4 right-4">
          <button onClick={onCancel} className="p-1 rounded-full hover:bg-gray-100">
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {stage === 'initial' && <div className="p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileTextIcon className="w-8 h-8 text-amber-700" />
            </div>
            <h2 className="text-xl font-medium mb-2">Importer votre CV</h2>
            <p className="text-gray-600 mb-6">
              Sélectionnez un fichier PDF ou Word contenant votre CV. Nous
              l'analyserons pour extraire automatiquement vos informations.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 cursor-pointer hover:border-amber-500 transition-colors" onClick={handleFileSelect}>
              <div className="flex flex-col items-center">
                <UploadIcon className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-gray-700 font-medium">
                  Glissez votre fichier ici
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  ou cliquez pour parcourir
                </p>
                <p className="text-gray-400 text-xs mt-4">
                  Formats acceptés: PDF, DOCX, DOC
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex-1" onClick={onCancel}>
                Annuler
              </Button>
              <Button variant="build" className="flex-1" onClick={handleFileSelect}>
                Sélectionner un fichier
              </Button>
            </div>
          </div>}
        {stage === 'uploading' && <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <motion.div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full" animate={{
            rotate: 360
          }} transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }} />
            </div>
            <h2 className="text-xl font-medium mb-2">Analyse en cours...</h2>
            <p className="text-gray-600">
              Nous traitons votre CV et extrayons les informations pertinentes.
            </p>
          </div>}
        {stage === 'success' && <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-medium mb-2">Analyse terminée</h2>
            <p className="text-gray-600">
              Nous avons structuré votre profil à partir de votre CV.
            </p>
          </div>}
      </Card>
    </div>;
};