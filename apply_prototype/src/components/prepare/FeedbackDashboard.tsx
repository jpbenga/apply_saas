import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { BarChartIcon, ArrowRightIcon, StarIcon, TrendingUpIcon, BrainIcon, MicIcon, MessageSquareIcon, BookOpenIcon, CameraIcon, PresentationIcon, RocketIcon, HeartIcon, ShareIcon, CheckIcon, UserIcon } from 'lucide-react';
export const FeedbackDashboard = ({
  userProfile,
  completedModules,
  confidenceLevel,
  simulationFeedback,
  onContinueTraining,
  onStartSimulation,
  onEnterActUniverse
}) => {
  const modules = [{
    id: 'pitch',
    title: 'Pitch personnel',
    icon: <MicIcon className="w-4 h-4" />
  }, {
    id: 'questions',
    title: 'Questions classiques',
    icon: <MessageSquareIcon className="w-4 h-4" />
  }, {
    id: 'storytelling',
    title: 'Storytelling',
    icon: <BookOpenIcon className="w-4 h-4" />
  }, {
    id: 'body-language',
    title: 'Langage corporel',
    icon: <CameraIcon className="w-4 h-4" />
  }, {
    id: 'simulation',
    title: 'Simulation',
    icon: <PresentationIcon className="w-4 h-4" />
  }];
  const getConfidenceMessage = () => {
    if (confidenceLevel < 30) return 'Tu commences à développer ta confiance';
    if (confidenceLevel < 50) return 'Ta confiance grandit à chaque étape';
    if (confidenceLevel < 70) return 'Tu gagnes en assurance et en impact';
    if (confidenceLevel < 90) return 'Ta communication inspire confiance';
    return "Tu maîtrises l'art de convaincre";
  };
  const getProgressInsights = () => {
    const insights = ["Ta voix est plus fluide qu'hier", 'Ton storytelling captive davantage', 'Tu inspires plus de confiance', 'Tes réponses sont mieux structurées', 'Ton authenticité transparaît'];
    // Return 2-3 insights based on completed modules
    return insights.slice(0, Math.min(completedModules.length, 3));
  };
  const isReadyForNextUniverse = completedModules.length >= 3 || confidenceLevel >= 70;
  return <div className="space-y-6">
      <Card variant="prepare" className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center mr-4 border border-lavender-300/30">
            <BrainIcon className="w-6 h-6 text-lavender-200" />
          </div>
          <div>
            <h2 className="text-xl font-medium text-lavender-100">
              Ton impact augmente
            </h2>
            <p className="text-sm text-blue-200 mt-1">
              Voici l'évolution de ta préparation aux entretiens
            </p>
          </div>
        </div>
        <div className="bg-blue-900 rounded-lg p-4 mb-6 border border-lavender-300/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-lavender-200 flex items-center">
              <StarIcon className="w-4 h-4 mr-2" />
              Ressenti de confiance
            </h3>
            <div className="bg-blue-800 rounded-full px-3 py-1 text-sm text-lavender-100 border border-lavender-300/20">
              {getConfidenceMessage()}
            </div>
          </div>
          <div className="w-full h-3 bg-blue-800 rounded-full mb-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-lavender-200 to-lavender-400" style={{
            width: `${confidenceLevel}%`
          }}></div>
          </div>
          <div className="space-y-2">
            {getProgressInsights().map((insight, index) => <div key={index} className="flex items-center">
                <div className="p-1 rounded-full bg-lavender-400/20 mr-2">
                  <TrendingUpIcon className="w-3 h-3 text-lavender-200" />
                </div>
                <span className="text-sm text-blue-100">{insight}</span>
              </div>)}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-medium text-lavender-200 mb-3 flex items-center">
            <CheckIcon className="w-4 h-4 mr-2" />
            Modules complétés
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {modules.map(module => <div key={module.id} className={`p-3 rounded-lg border flex items-center ${completedModules.includes(module.id) ? 'bg-lavender-400/10 border-lavender-300/30 text-lavender-100' : 'bg-blue-900 border-blue-800 text-blue-400'}`}>
                <div className={`p-1 rounded-full mr-2 ${completedModules.includes(module.id) ? 'bg-lavender-400/20' : 'bg-blue-800'}`}>
                  {module.icon}
                </div>
                <span className="text-sm">{module.title}</span>
              </div>)}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="secondary" onClick={onContinueTraining} className="flex-1 flex items-center justify-center">
            <BookOpenIcon className="w-4 h-4 mr-2" />
            Continuer l'entraînement
          </Button>
          <Button variant="prepare" onClick={onStartSimulation} className="flex-1 flex items-center justify-center">
            <MicIcon className="w-4 h-4 mr-2" />
            Nouvelle simulation
          </Button>
        </div>
      </Card>
      {simulationFeedback && <Card variant="prepare" className="p-5 border-lavender-300/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-lavender-100 flex items-center">
              <PresentationIcon className="w-4 h-4 mr-2" />
              Dernière simulation
            </h3>
            <Button variant="secondary" size="small" className="flex items-center">
              <ShareIcon className="w-3 h-3 mr-1" />
              Partager
            </Button>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex items-start p-3 bg-blue-900 rounded-lg">
              <div className="p-1.5 rounded-full bg-blue-800 mr-2 mt-0.5 flex-shrink-0">
                <UserIcon className="w-3 h-3 text-lavender-200" />
              </div>
              <div>
                <p className="text-xs text-blue-300 mb-1">Question</p>
                <p className="text-sm text-blue-50">
                  {simulationFeedback[simulationFeedback.length - 1].question}
                </p>
              </div>
            </div>
            <div className="p-3 bg-blue-800/50 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                {[{
              label: 'Clarté',
              value: simulationFeedback[simulationFeedback.length - 1].feedback.clarity
            }, {
              label: 'Impact',
              value: simulationFeedback[simulationFeedback.length - 1].feedback.impact
            }].map(metric => <div key={metric.label} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-blue-200">
                          {metric.label}
                        </span>
                        <span className="text-xs text-lavender-200">
                          {metric.value}/5
                        </span>
                      </div>
                      <div className="w-full h-1 bg-blue-900 rounded-full">
                        <div className="h-1 rounded-full bg-lavender-300" style={{
                    width: `${metric.value / 5 * 100}%`
                  }}></div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </Card>}
      {isReadyForNextUniverse && <Card variant="prepare" className="p-5 border-gold-300/30 bg-gradient-to-r from-blue-900 to-blue-800">
          <div className="flex items-start">
            <div className="p-2 bg-blue-800 rounded-full mr-3 mt-1 border border-gold-300/30">
              <RocketIcon className="w-5 h-5 text-gold-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gold-100 mb-2">
                Tu es prêt pour passer à l'action
              </h3>
              <p className="text-sm text-blue-100 mb-4">
                Maintenant que tu as développé ton impact en entretien, découvre
                comment Apply peut postuler pour toi et maximiser tes chances.
              </p>
              <Button variant="prepare" onClick={onEnterActUniverse} className="flex items-center">
                <span>Découvrir l'Autopilot</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>}
    </div>;
};