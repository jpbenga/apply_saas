import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { MicIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
type InterviewCoachingCardProps = {
  completedModules?: number;
  totalModules?: number;
  onContinue: () => void;
};
export const InterviewCoachingCard: React.FC<InterviewCoachingCardProps> = ({
  completedModules = 1,
  totalModules = 4,
  onContinue
}) => {
  const progressPercentage = Math.round(completedModules / totalModules * 100);
  return <Card className="p-5 relative overflow-hidden border-2 border-[#83D0CB] rounded-lg shadow-md" style={{
    background: 'hsla(202, 71%, 27%, 1)',
    backgroundImage: 'linear-gradient(90deg, hsla(202, 71%, 27%, 1) 0%, hsla(176, 45%, 66%, 1) 100%)'
  }}>
      <div className="flex items-start">
        <div className="p-2 bg-white/10 rounded-full mr-3 flex-shrink-0">
          <MicIcon className="w-5 h-5 text-[#F5F7FF]" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-[#F5F7FF] text-lg">
            Ton coaching entretien
          </h3>
          <p className="text-sm text-[#E0E4FA] mt-1 mb-3">
            Vois où tu en es dans ton entraînement
          </p>
          <div className="mb-3">
            <div className="flex justify-between text-xs text-[#E0E4FA] mb-1">
              <span>Progression</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-[rgba(245,247,255,0.6)] rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#6B7ADF]" initial={{
              width: '0%'
            }} animate={{
              width: `${progressPercentage}%`
            }} transition={{
              duration: 1,
              ease: 'easeOut'
            }} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-[#E0E4FA]">
              {completedModules}/{totalModules} modules
            </div>
            <Button className="flex items-center bg-[#6B7ADF] text-white hover:opacity-85" size="small" onClick={onContinue}>
              <span>Continuer</span>
              <ArrowRightIcon className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>;
};