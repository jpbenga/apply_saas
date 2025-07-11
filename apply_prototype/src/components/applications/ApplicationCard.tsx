import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { EyeIcon, BellIcon, RocketIcon, CalendarIcon, ClockIcon } from 'lucide-react';
export const ApplicationCard = ({
  application,
  index,
  onView,
  onFollowUp
}) => {
  const statusColors = {
    sent: 'border-blue-200 bg-blue-50',
    viewed: 'border-purple-200 bg-purple-50',
    waiting: 'border-gray-200 bg-gray-50',
    interview: 'border-emerald-200 bg-emerald-50',
    accepted: 'border-green-200 bg-green-50',
    rejected: 'border-red-200 bg-red-50'
  };
  return <Draggable draggableId={application.id} index={index}>
      {(provided, snapshot) => <motion.div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`mb-3 rounded-lg border ${statusColors[application.status]} overflow-hidden ${snapshot.isDragging ? 'shadow-md' : ''}`} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3,
      delay: index * 0.05
    }} whileHover={{
      y: -3,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
          <div className="bg-white p-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img src={application.logo} alt={application.company} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {application.position}
                </h3>
                <p className="text-sm text-gray-600 truncate">
                  {application.company}
                </p>
              </div>
              {application.isAutoPilot && <div className="ml-2">
                  <RocketIcon className="w-4 h-4 text-indigo-500" />
                </div>}
            </div>
          </div>
          <div className="p-3 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-xs text-gray-500">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>
                  {new Date(application.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {application.interview && <div className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                  Entretien
                </div>}
            </div>
            <div className="flex justify-between">
              <motion.button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={e => {
            e.stopPropagation();
            onView(application);
          }}>
                <EyeIcon className="w-4 h-4" />
              </motion.button>
              <motion.button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={e => {
            e.stopPropagation();
            onFollowUp(application);
          }}>
                <BellIcon className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>}
    </Draggable>;
};