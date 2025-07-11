import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { PlayIcon, CheckIcon, LockIcon, MicIcon, MessageSquareIcon, StarIcon, BookOpenIcon, CameraIcon, PresentationIcon, ArrowRightIcon, LightbulbIcon, BrainIcon } from 'lucide-react';
export const TrainingPlan = ({
  userProfile,
  completedModules,
  onCompleteModule,
  onStartSimulation,
  confidenceLevel
}) => {
  const [activeModule, setActiveModule] = useState(null);
  const modules = [{
    id: 'pitch',
    title: 'Ton pitch personnel',
    description: 'Apprends à te présenter en 1 minute de façon impactante',
    icon: <MicIcon className="w-5 h-5 text-lavender-200" />,
    duration: '15 min',
    emotion: 'Clarté et assurance',
    exercises: ['Structurer ton parcours en 3 temps forts', 'Identifier ta valeur unique', "S'entraîner à la concision"]
  }, {
    id: 'questions',
    title: 'Questions classiques',
    description: 'Prépare des réponses aux questions les plus fréquentes',
    icon: <MessageSquareIcon className="w-5 h-5 text-lavender-200" />,
    duration: '20 min',
    emotion: 'Confiance et authenticité',
    exercises: ['Forces et faiblesses sans clichés', 'Motivation et projet professionnel', 'Gestion des questions déstabilisantes']
  }, {
    id: 'storytelling',
    title: 'Storytelling professionnel',
    description: 'Transforme tes expériences en histoires captivantes',
    icon: <BookOpenIcon className="w-5 h-5 text-lavender-200" />,
    duration: '25 min',
    emotion: 'Engagement et impact',
    exercises: ['Méthode STAR pour structurer tes récits', 'Mise en valeur des résultats obtenus', "Adaptation au contexte de l'entreprise"]
  }, {
    id: 'body-language',
    title: 'Langage corporel',
    description: 'Maîtrise ta communication non-verbale',
    icon: <CameraIcon className="w-5 h-5 text-lavender-200" />,
    duration: '15 min',
    emotion: 'Présence et charisme',
    exercises: ["Posture et gestuelle d'impact", 'Contact visuel et expressions faciales', 'Respiration et gestion du stress']
  }, {
    id: 'simulation',
    title: 'Simulation complète',
    description: 'Mets en pratique toutes tes compétences',
    icon: <PresentationIcon className="w-5 h-5 text-lavender-200" />,
    duration: '30 min',
    emotion: 'Maîtrise et adaptabilité',
    exercises: ['Entretien complet avec questions variées', 'Feedback détaillé sur chaque réponse', "Conseils d'amélioration personnalisés"]
  }];
  const handleModuleClick = moduleId => {
    // If module is already completed, just show it
    if (completedModules.includes(moduleId) || getNextModuleId() === moduleId) {
      setActiveModule(moduleId);
    }
  };
  const completeCurrentModule = () => {
    if (activeModule) {
      onCompleteModule(activeModule);
      setActiveModule(null);
    }
  };
  const getNextModuleId = () => {
    for (const module of modules) {
      if (!completedModules.includes(module.id)) {
        return module.id;
      }
    }
    return null;
  };
  const isModuleAvailable = moduleId => {
    if (completedModules.includes(moduleId)) return true;
    return moduleId === getNextModuleId();
  };
  const getConfidenceMessage = () => {
    if (confidenceLevel < 30) return 'Tu commences à développer ta confiance';
    if (confidenceLevel < 50) return 'Ta confiance grandit à chaque étape';
    if (confidenceLevel < 70) return 'Tu gagnes en assurance et en impact';
    if (confidenceLevel < 90) return 'Ta communication inspire confiance';
    return "Tu maîtrises l'art de convaincre";
  };
  return <div className="space-y-6">
      {!activeModule ? <>
          <Card variant="prepare" className="p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-blue-800 rounded-full flex items-center justify-center mb-4 border border-lavender-300/30">
              <BrainIcon className="w-8 h-8 text-lavender-200" />
            </div>
            <h2 className="text-2xl font-light mb-2 text-lavender-100">
              {userProfile}
            </h2>
            <p className="text-blue-100 mb-4 max-w-lg mx-auto">
              Voici ton programme personnalisé pour développer ton impact en
              entretien. Chaque module te permet de progresser vers une
              communication plus convaincante.
            </p>
            {/* Confidence level indicator */}
            <div className="mb-2 flex justify-center">
              <div className="bg-blue-800 rounded-full px-4 py-1 inline-flex items-center border border-lavender-300/30">
                <StarIcon className="w-4 h-4 text-lavender-300 mr-2" />
                <span className="text-sm text-lavender-100">
                  {getConfidenceMessage()}
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-blue-800 rounded-full mb-6 max-w-xs mx-auto">
              <div className="h-2 rounded-full bg-gradient-to-r from-lavender-200 to-lavender-400" style={{
            width: `${confidenceLevel}%`
          }}></div>
            </div>
          </Card>
          <div className="space-y-4">
            {modules.map((module, index) => <Card key={module.id} variant="prepare" className={`p-4 transition-all duration-300 border-lavender-300/20 ${isModuleAvailable(module.id) ? 'hover:border-lavender-300/50 cursor-pointer' : 'opacity-70'}`} onClick={() => handleModuleClick(module.id)}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 border ${completedModules.includes(module.id) ? 'bg-lavender-400/20 border-lavender-300/50' : isModuleAvailable(module.id) ? 'bg-blue-800 border-lavender-300/30' : 'bg-blue-900 border-blue-800'}`}>
                    {completedModules.includes(module.id) ? <CheckIcon className="w-6 h-6 text-lavender-200" /> : isModuleAvailable(module.id) ? module.icon : <LockIcon className="w-6 h-6 text-blue-700" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lavender-100">
                        {module.title}
                      </h3>
                      <span className="text-xs bg-blue-800 px-2 py-1 rounded-full text-lavender-200 border border-lavender-300/20">
                        {module.duration}
                      </span>
                    </div>
                    <p className="text-sm text-blue-200 mt-1">
                      {module.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-lavender-300">
                      <span className="mr-2">Objectif :</span>
                      <span>{module.emotion}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {completedModules.includes(module.id) ? <div className="p-2 rounded-full bg-lavender-400/20">
                        <CheckIcon className="w-5 h-5 text-lavender-200" />
                      </div> : isModuleAvailable(module.id) ? <div className="p-2 rounded-full bg-blue-800 text-lavender-200">
                        <PlayIcon className="w-5 h-5" />
                      </div> : <div className="p-2 rounded-full bg-blue-900 text-blue-700">
                        <LockIcon className="w-5 h-5" />
                      </div>}
                  </div>
                </div>
              </Card>)}
          </div>
          {completedModules.length >= 2 && <Card variant="prepare" className="p-5 border-lavender-300/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-800 rounded-full mr-3 border border-lavender-300/20">
                    <PresentationIcon className="w-5 h-5 text-lavender-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lavender-100">
                      Prêt pour une simulation ?
                    </h3>
                    <p className="text-sm text-blue-200 mt-1">
                      Mets en pratique ce que tu as appris dans un entretien
                      simulé
                    </p>
                  </div>
                </div>
                <Button variant="prepare" onClick={onStartSimulation} className="flex items-center">
                  <span>Commencer</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>}
          <Card variant="prepare" className="p-5 border-lavender-300/20">
            <div className="flex items-start">
              <div className="p-2 bg-blue-800 rounded-full mr-3 mt-1 border border-lavender-300/20">
                <LightbulbIcon className="w-4 h-4 text-lavender-200" />
              </div>
              <div>
                <h3 className="font-medium text-lavender-100 mb-2">
                  Conseil personnalisé
                </h3>
                <p className="text-sm text-blue-100">
                  Pour ton profil{' '}
                  <span className="text-lavender-200 font-medium">
                    {userProfile}
                  </span>
                  , concentre-toi sur la structure de tes réponses. Les
                  recruteurs apprécient particulièrement les candidats qui
                  savent organiser leurs idées et aller droit au but.
                </p>
              </div>
            </div>
          </Card>
        </> : <div className="space-y-6">
          {/* Module content when a module is active */}
          {modules.map(module => module.id === activeModule && <div key={module.id} className="space-y-6">
                  <Card variant="prepare" className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mr-4 border border-lavender-300/30">
                        {module.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-medium text-lavender-100">
                          {module.title}
                        </h2>
                        <p className="text-sm text-blue-200 mt-1">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-900 rounded-lg p-4 mb-6 border border-lavender-300/10">
                      <h3 className="text-lavender-200 font-medium mb-3 flex items-center">
                        <StarIcon className="w-4 h-4 mr-2" />
                        Objectif émotionnel
                      </h3>
                      <p className="text-blue-100">
                        {module.emotion} — Ce module te permettra de développer
                        une présence qui inspire confiance et capte l'attention
                        de ton interlocuteur.
                      </p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lavender-200 font-medium mb-3">
                        Exercices
                      </h3>
                      <div className="space-y-3">
                        {module.exercises.map((exercise, index) => <div key={index} className="flex items-start p-3 bg-blue-800/50 rounded-lg border border-lavender-300/10">
                            <div className="p-1 rounded-full bg-lavender-400/20 mr-3 mt-0.5">
                              <CheckIcon className="w-4 h-4 text-lavender-200" />
                            </div>
                            <span className="text-blue-50">{exercise}</span>
                          </div>)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="secondary" onClick={() => setActiveModule(null)}>
                        Retour au plan
                      </Button>
                      <Button variant="prepare" onClick={completeCurrentModule} className="flex items-center">
                        <span>Terminer ce module</span>
                        <CheckIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                  <Card variant="prepare" className="p-5 border-lavender-300/20">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-800 rounded-full mr-3 mt-1 border border-lavender-300/20">
                        <LightbulbIcon className="w-4 h-4 text-lavender-200" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lavender-100 mb-2">
                          Astuce pour ce module
                        </h3>
                        <p className="text-sm text-blue-100">
                          Enregistre-toi pendant que tu t'exerces. Écouter ta
                          propre voix te permettra d'identifier les points à
                          améliorer et de renforcer ta confiance.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>)}
        </div>}
    </div>;
};