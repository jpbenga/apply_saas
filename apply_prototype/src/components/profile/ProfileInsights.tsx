import React from 'react';
import { Card } from '../common/Card';
import { BarChartIcon, TrendingUpIcon, BrainIcon, StarIcon, LightbulbIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const ProfileInsights = ({
  insights,
  universe = 'prepare'
}) => {
  return <Card className="p-6 relative overflow-hidden border-2 border-[#AED6FD] bg-gradient-to-r from-[#F9FBFE] to-[#EDF4FD] shadow-md rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-[#3F51B5]/10 rounded-full">
          <BrainIcon className="w-5 h-5 text-[#3F51B5]" />
        </div>
        <h2 className="text-xl font-semibold text-[#1F2A44]">
          Résumé IA & Insights
        </h2>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-[#AED6FD] shadow-sm">
          <h3 className="font-medium text-[#1F2A44] mb-3 flex items-center gap-2">
            <BarChartIcon className="w-4 h-4 text-[#3F51B5]" />
            Dashboard
          </h3>
          <div className="mb-4">
            <p className="text-sm text-[#3C475E] mb-2">
              Compétences les plus mises en avant dans tes candidatures :
            </p>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill, index) => <motion.div key={skill} className="px-3 py-1.5 bg-[rgba(63,81,181,0.1)] text-[#3F51B5] rounded-full text-sm flex items-center gap-1.5" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1,
              duration: 0.3
            }}>
                  <StarIcon className="w-3.5 h-3.5" />
                  {skill}
                </motion.div>)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[rgba(63,81,181,0.05)] p-3 rounded-lg border border-[#AED6FD]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#3C475E]">Taux de réponse</span>
                <span className="text-xs font-medium text-[#0F9D58]">+12%</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-semibold text-[#1F2A44]">
                  42%
                </span>
                <TrendingUpIcon className="w-4 h-4 text-[#0F9D58] mb-1" />
              </div>
            </div>
            <div className="bg-[rgba(63,81,181,0.05)] p-3 rounded-lg border border-[#AED6FD]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#3C475E]">Candidatures</span>
                <span className="text-xs font-medium text-[#0F9D58]">+5</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-semibold text-[#1F2A44]">23</span>
                <span className="text-xs text-[#3C475E] mb-1">ce mois</span>
              </div>
            </div>
            <div className="bg-[rgba(63,81,181,0.05)] p-3 rounded-lg border border-[#AED6FD]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#3C475E]">Entretiens</span>
                <span className="text-xs font-medium text-[#0F9D58]">+2</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-semibold text-[#1F2A44]">4</span>
                <span className="text-xs text-[#3C475E] mb-1">en attente</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#AED6FD] shadow-sm">
          <h3 className="font-medium text-[#1F2A44] mb-3 flex items-center gap-2">
            <LightbulbIcon className="w-4 h-4 text-[#3F51B5]" />
            Suggestions IA
          </h3>
          <div className="space-y-3">
            {insights.suggestions.map((suggestion, index) => <motion.div key={index} className="flex items-start gap-3 p-3 bg-[rgba(63,81,181,0.05)] rounded-lg border border-[#AED6FD]" initial={{
            opacity: 0,
            x: -10
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.2,
            duration: 0.3
          }} whileHover={{
            x: 3
          }}>
                <div className="p-1.5 bg-[rgba(63,81,181,0.1)] rounded-full text-[#3F51B5] mt-0.5">
                  <LightbulbIcon className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-[#3C475E] flex-1">{suggestion}</p>
                <motion.button className="p-1.5 text-[#3F51B5] rounded-full hover:bg-[rgba(63,81,181,0.1)]" whileHover={{
              scale: 1.1,
              rotate: 5
            }} whileTap={{
              scale: 0.9
            }}>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>)}
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-[#3C475E] italic">
            Apply analyse en continu votre profil pour vous suggérer des
            améliorations pertinentes.
          </p>
        </div>
      </div>
    </Card>;
};