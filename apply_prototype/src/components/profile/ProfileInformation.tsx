import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { BriefcaseIcon, GraduationCapIcon, StarIcon, PlusIcon, EditIcon, TrashIcon, AwardIcon, ArrowUpIcon, ArrowDownIcon, GripIcon, GlobeIcon, CheckCircleIcon, BookOpenIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const ProfileInformation = ({
  userData,
  onEdit,
  universe = 'build'
}) => {
  // Sections without projects (removed as requested)
  const [sections, setSections] = useState([{
    id: 'experiences',
    title: 'Expériences',
    icon: <BriefcaseIcon className="w-5 h-5" />
  }, {
    id: 'education',
    title: 'Formation',
    icon: <GraduationCapIcon className="w-5 h-5" />
  }, {
    id: 'skills',
    title: 'Compétences',
    icon: <StarIcon className="w-5 h-5" />
  }, {
    id: 'certifications',
    title: 'Certifications',
    icon: <AwardIcon className="w-5 h-5" />
  }, {
    id: 'languages',
    title: 'Langues',
    icon: <GlobeIcon className="w-5 h-5" />
  }]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [draggedSection, setDraggedSection] = useState(null);
  const universeStyles = {
    build: {
      bgHeader: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700',
      borderSelected: 'border-amber-300',
      bgSelected: 'bg-amber-50',
      highlightColor: 'text-amber-700',
      badgeColor: 'bg-amber-100 text-amber-700',
      badgeSoftColor: 'bg-purple-50/50 text-purple-600',
      hoverBorder: 'border-amber-200'
    },
    prepare: {
      bgHeader: 'bg-blue-900/20',
      iconBg: 'bg-blue-800/30',
      iconColor: 'text-blue-400',
      borderSelected: 'border-blue-700',
      bgSelected: 'bg-blue-900/30',
      highlightColor: 'text-blue-400',
      badgeColor: 'bg-blue-800/30 text-blue-400',
      badgeSoftColor: 'bg-purple-800/30 text-purple-400',
      hoverBorder: 'border-blue-700'
    },
    act: {
      bgHeader: 'bg-purple-900/20',
      iconBg: 'bg-purple-800/30',
      iconColor: 'text-purple-400',
      borderSelected: 'border-purple-700',
      bgSelected: 'bg-purple-900/30',
      highlightColor: 'text-purple-400',
      badgeColor: 'bg-purple-800/30 text-purple-400',
      badgeSoftColor: 'bg-purple-800/30 text-purple-400',
      hoverBorder: 'border-purple-700'
    }
  };
  const currentStyle = universeStyles[universe];
  const handleDragStart = sectionId => {
    setDraggedSection(sectionId);
  };
  const handleDragOver = sectionId => {
    if (draggedSection && draggedSection !== sectionId) {
      const dragIndex = sections.findIndex(s => s.id === draggedSection);
      const hoverIndex = sections.findIndex(s => s.id === sectionId);
      const newSections = [...sections];
      const draggedItem = newSections[dragIndex];
      newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, draggedItem);
      setSections(newSections);
    }
  };
  const handleDragEnd = () => {
    setDraggedSection(null);
    // Play sound effect
    const audio = new Audio('/sounds/soft-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  const renderSectionContent = sectionId => {
    switch (sectionId) {
      case 'experiences':
        return <div className="space-y-4 mt-4">
            {userData.experiences.map((exp, index) => <ExperienceCard key={exp.id} experience={exp} isHovered={hoveredItem === exp.id} onHover={() => setHoveredItem(exp.id)} onLeave={() => setHoveredItem(null)} onEdit={() => onEdit('experience')} universe={universe} />)}
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="mt-2">
              <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="w-full flex items-center justify-center" onClick={() => onEdit('experience')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter une expérience
              </Button>
            </motion.div>
          </div>;
      case 'education':
        return <div className="space-y-4 mt-4 relative">
            {/* Timeline line */}
            <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} z-0`}></div>
            {userData.education.map((edu, index) => <EducationCard key={edu.id} education={edu} isHovered={hoveredItem === edu.id} onHover={() => setHoveredItem(edu.id)} onLeave={() => setHoveredItem(null)} onEdit={() => onEdit('education')} universe={universe} />)}
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="mt-2 relative z-10">
              <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="w-full flex items-center justify-center" onClick={() => onEdit('education')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter une formation
              </Button>
            </motion.div>
          </div>;
      case 'skills':
        return <div className="mt-4">
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${universe === 'build' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>
                Compétences techniques
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.skills.filter(skill => skill.type === 'hard').map(skill => <SkillBadge key={skill.id} skill={skill} isHovered={hoveredItem === skill.id} onHover={() => setHoveredItem(skill.id)} onLeave={() => setHoveredItem(null)} universe={universe} />)}
              </div>
            </div>
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${universe === 'build' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>
                Soft skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {userData.skills.filter(skill => skill.type === 'soft').map(skill => <SkillBadge key={skill.id} skill={skill} isHovered={hoveredItem === skill.id} onHover={() => setHoveredItem(skill.id)} onLeave={() => setHoveredItem(null)} isSoft universe={universe} />)}
              </div>
            </div>
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="mt-2">
              <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="w-full flex items-center justify-center" onClick={() => onEdit('skills')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter une compétence
              </Button>
            </motion.div>
          </div>;
      case 'certifications':
        return <div className="space-y-4 mt-4">
            {userData.certifications && userData.certifications.map(cert => <CertificationCard key={cert.id} certification={cert} isHovered={hoveredItem === cert.id} onHover={() => setHoveredItem(cert.id)} onLeave={() => setHoveredItem(null)} onEdit={() => onEdit('certification')} universe={universe} />)}
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="mt-2">
              <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="w-full flex items-center justify-center" onClick={() => onEdit('certification')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter une certification
              </Button>
            </motion.div>
          </div>;
      case 'languages':
        return <div className="space-y-4 mt-4">
            {userData.languages && userData.languages.map(language => <LanguageCard key={language.id} language={language} isHovered={hoveredItem === language.id} onHover={() => setHoveredItem(language.id)} onLeave={() => setHoveredItem(null)} onEdit={() => onEdit('language')} universe={universe} />)}
            <motion.div whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="mt-2">
              <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="w-full flex items-center justify-center" onClick={() => onEdit('language')}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter une langue
              </Button>
            </motion.div>
          </div>;
      default:
        return null;
    }
  };
  return <Card className={`p-6 ${universe === 'build' ? 'bg-cream' : universe === 'prepare' ? 'bg-prepare-bg' : 'bg-act-bg'} ${universe !== 'build' ? 'text-white' : ''}`}>
      <h2 className={`text-xl font-semibold ${universe === 'build' ? 'text-gray-900' : 'text-white'} mb-6`}>
        Informations professionnelles
      </h2>
      <div className="space-y-6">
        {sections.map(section => <motion.div key={section.id} layout className={`border ${universe === 'build' ? 'border-gray-200' : 'border-gray-700'} rounded-lg overflow-hidden`} animate={{
        opacity: 1,
        y: 0,
        boxShadow: draggedSection === section.id ? `0 10px 25px -5px ${universe === 'build' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)'}` : `0 1px 3px 0 ${universe === 'build' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'}`
      }} transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }} draggable onDragStart={() => handleDragStart(section.id)} onDragOver={() => handleDragOver(section.id)} onDragEnd={handleDragEnd}>
            <div className={`${currentStyle.bgHeader} p-4 flex items-center justify-between`}>
              <div className="flex items-center">
                <GripIcon className={`w-5 h-5 ${universe === 'build' ? 'text-gray-400' : 'text-gray-500'} mr-3 cursor-move`} />
                <div className={`p-1.5 rounded-md ${currentStyle.iconBg} mr-3`}>
                  <span className={currentStyle.iconColor}>{section.icon}</span>
                </div>
                <h3 className={`font-medium ${universe === 'build' ? 'text-gray-800' : 'text-white'}`}>
                  {section.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <motion.button whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }} className={`p-1.5 rounded-full hover:${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} ${universe === 'build' ? 'text-gray-500' : 'text-gray-400'}`}>
                  <ArrowUpIcon className="w-4 h-4" />
                </motion.button>
                <motion.button whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }} className={`p-1.5 rounded-full hover:${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} ${universe === 'build' ? 'text-gray-500' : 'text-gray-400'}`}>
                  <ArrowDownIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div className={`p-4 ${universe === 'build' ? 'bg-white' : universe === 'prepare' ? 'bg-prepare-ui' : 'bg-act-ui'}`}>
              {renderSectionContent(section.id)}
            </div>
          </motion.div>)}
      </div>
    </Card>;
};
// Experience card component
const ExperienceCard = ({
  experience,
  isHovered,
  onHover,
  onLeave,
  onEdit,
  universe = 'build'
}) => {
  const cardBg = universe === 'build' ? isHovered ? 'bg-amber-50/70' : 'bg-white' : isHovered ? universe === 'prepare' ? 'bg-blue-900/30' : 'bg-purple-900/30' : 'bg-transparent';
  const cardBorder = universe === 'build' ? isHovered ? 'border-amber-200' : 'border-gray-200' : isHovered ? universe === 'prepare' ? 'border-blue-700' : 'border-purple-700' : 'border-gray-700';
  const textColor = universe === 'build' ? 'text-gray-900' : 'text-white';
  const textSecondary = universe === 'build' ? 'text-gray-600' : 'text-gray-300';
  const textTertiary = universe === 'build' ? 'text-gray-500' : 'text-gray-400';
  return <motion.div className={`p-4 border ${cardBorder} rounded-lg relative ${cardBg}`} whileHover={{
    y: -2,
    boxShadow: universe === 'build' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    borderColor: universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7'
  }} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <AnimatePresence>
        {isHovered && <motion.div className="absolute top-2 right-2 flex space-x-1" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} transition={{
        duration: 0.15
      }}>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={onEdit}>
              <EditIcon className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-red-900/30 text-red-400 hover:bg-red-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
              <TrashIcon className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>}
      </AnimatePresence>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
        <h4 className={`font-medium ${textColor}`}>{experience.title}</h4>
        <div className={`hidden md:block ${textTertiary}`}>•</div>
        <span className={textSecondary}>{experience.company}</span>
      </div>
      <div className={`text-sm ${textTertiary} mb-3`}>{experience.period}</div>
      <p className={`${textSecondary} text-sm`}>{experience.description}</p>
    </motion.div>;
};
// Education card component
const EducationCard = ({
  education,
  isHovered,
  onHover,
  onLeave,
  onEdit,
  universe = 'build'
}) => {
  const cardBg = universe === 'build' ? isHovered ? 'bg-amber-50/70' : 'bg-white' : isHovered ? universe === 'prepare' ? 'bg-blue-900/30' : 'bg-purple-900/30' : 'bg-transparent';
  const cardBorder = universe === 'build' ? isHovered ? 'border-amber-200' : 'border-gray-200' : isHovered ? universe === 'prepare' ? 'border-blue-700' : 'border-purple-700' : 'border-gray-700';
  const textColor = universe === 'build' ? 'text-gray-900' : 'text-white';
  const textSecondary = universe === 'build' ? 'text-gray-700' : 'text-gray-300';
  const textTertiary = universe === 'build' ? 'text-gray-500' : 'text-gray-400';
  const dotColor = isHovered ? universe === 'build' ? 'bg-amber-500' : universe === 'prepare' ? 'bg-blue-500' : 'bg-purple-500' : universe === 'build' ? 'bg-gray-400' : 'bg-gray-600';
  return <motion.div className="pl-10 relative z-10" whileHover={{
    y: -2
  }} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {/* Timeline dot */}
      <motion.div className={`absolute left-4 top-1.5 w-3 h-3 rounded-full border-2 ${universe === 'build' ? 'border-white' : 'border-gray-800'} z-20 ${dotColor}`} style={{
      transform: 'translateX(-50%)'
    }} animate={{
      scale: isHovered ? 1.2 : 1,
      backgroundColor: isHovered ? universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7' : universe === 'build' ? '#9CA3AF' : '#4B5563'
    }} />
      <div className={`p-3 border rounded-lg ${cardBorder} ${cardBg}`}>
        <AnimatePresence>
          {isHovered && <motion.div className="absolute top-1 right-1 flex space-x-1" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.8
        }} transition={{
          duration: 0.15
        }}>
              <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'}`} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} onClick={onEdit}>
                <EditIcon className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-red-900/30 text-red-400 hover:bg-red-800/40'}`} whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }}>
                <TrashIcon className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>}
        </AnimatePresence>
        <h4 className={`font-medium ${textColor}`}>{education.degree}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className={`${textSecondary} text-sm`}>{education.school}</span>
          <span className={`${textTertiary} text-sm`}>{education.year}</span>
        </div>
        {education.description && <p className={`${textSecondary} text-xs mt-1.5`}>
            {education.description}
          </p>}
      </div>
    </motion.div>;
};
// Skill badge component
const SkillBadge = ({
  skill,
  isHovered,
  onHover,
  onLeave,
  isSoft = false,
  universe = 'build'
}) => {
  const universeStyles = {
    build: {
      hardBg: isHovered ? 'bg-amber-100' : 'bg-amber-50/70',
      hardText: 'text-amber-700',
      softBg: isHovered ? 'bg-purple-100/70' : 'bg-purple-50/50',
      softText: 'text-purple-600'
    },
    prepare: {
      hardBg: isHovered ? 'bg-blue-800/40' : 'bg-blue-900/30',
      hardText: 'text-blue-400',
      softBg: isHovered ? 'bg-purple-800/40' : 'bg-purple-900/30',
      softText: 'text-purple-400'
    },
    act: {
      hardBg: isHovered ? 'bg-purple-800/40' : 'bg-purple-900/30',
      hardText: 'text-purple-400',
      softBg: isHovered ? 'bg-purple-800/40' : 'bg-purple-900/30',
      softText: 'text-purple-400'
    }
  };
  const currentStyle = universeStyles[universe];
  const bgColor = isSoft ? currentStyle.softBg : currentStyle.hardBg;
  const textColor = isSoft ? currentStyle.softText : currentStyle.hardText;
  return <motion.div className={`relative px-3 py-1.5 rounded-full ${bgColor} ${textColor} text-sm flex items-center gap-1.5 cursor-pointer transition-colors`} whileHover={{
    scale: 1.05
  }} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <span>{skill.name}</span>
      {/* Skill level indicator */}
      {!isSoft && <div className={`w-16 h-1.5 ${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full overflow-hidden`}>
          <motion.div className={`h-full ${universe === 'build' ? 'bg-amber-500' : universe === 'prepare' ? 'bg-blue-500' : 'bg-purple-500'}`} initial={{
        width: 0
      }} animate={{
        width: `${skill.level}%`
      }} transition={{
        duration: 0.5,
        delay: 0.1
      }} />
        </div>}
      <AnimatePresence>
        {isHovered && <motion.button className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white" initial={{
        opacity: 0,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0
      }} transition={{
        duration: 0.2
      }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>}
      </AnimatePresence>
    </motion.div>;
};
// Certification card component
const CertificationCard = ({
  certification,
  isHovered,
  onHover,
  onLeave,
  onEdit,
  universe = 'build'
}) => {
  const cardBg = universe === 'build' ? isHovered ? 'bg-amber-50/70' : 'bg-white' : isHovered ? universe === 'prepare' ? 'bg-blue-900/30' : 'bg-purple-900/30' : 'bg-transparent';
  const cardBorder = universe === 'build' ? isHovered ? 'border-amber-200' : 'border-gray-200' : isHovered ? universe === 'prepare' ? 'border-blue-700' : 'border-purple-700' : 'border-gray-700';
  const textColor = universe === 'build' ? 'text-gray-900' : 'text-white';
  const textSecondary = universe === 'build' ? 'text-gray-700' : 'text-gray-300';
  const textTertiary = universe === 'build' ? 'text-gray-500' : 'text-gray-400';
  const iconBg = universe === 'build' ? 'bg-amber-100' : universe === 'prepare' ? 'bg-blue-800/30' : 'bg-purple-800/30';
  const iconColor = universe === 'build' ? 'text-amber-700' : universe === 'prepare' ? 'text-blue-400' : 'text-purple-400';
  return <motion.div className={`p-4 border ${cardBorder} rounded-lg relative ${cardBg}`} whileHover={{
    y: -2,
    boxShadow: universe === 'build' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    borderColor: universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7'
  }} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <AnimatePresence>
        {isHovered && <motion.div className="absolute top-2 right-2 flex space-x-1" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} transition={{
        duration: 0.15
      }}>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={onEdit}>
              <EditIcon className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-red-900/30 text-red-400 hover:bg-red-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
              <TrashIcon className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>}
      </AnimatePresence>
      <div className="flex items-start">
        <div className={`p-2 ${iconBg} rounded-full mr-3 mt-0.5`}>
          <AwardIcon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${textColor}`}>{certification.name}</h4>
          <p className={`${textSecondary} text-sm`}>{certification.issuer}</p>
          <div className="flex items-center justify-between mt-2">
            <div className={`text-xs ${textTertiary}`}>
              <span>Obtenu : {certification.date}</span>
              {certification.expires && <span className="ml-2">• Expire : {certification.expires}</span>}
            </div>
            {!certification.expires && <span className={`text-xs ${universe === 'build' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'} px-2 py-0.5 rounded-full flex items-center`}>
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Permanent
              </span>}
          </div>
          {certification.credentialId && <div className={`mt-1.5 text-xs ${textTertiary}`}>
              ID : {certification.credentialId}
            </div>}
        </div>
      </div>
    </motion.div>;
};
// Language card component
const LanguageCard = ({
  language,
  isHovered,
  onHover,
  onLeave,
  onEdit,
  universe = 'build'
}) => {
  const cardBg = universe === 'build' ? isHovered ? 'bg-amber-50/70' : 'bg-white' : isHovered ? universe === 'prepare' ? 'bg-blue-900/30' : 'bg-purple-900/30' : 'bg-transparent';
  const cardBorder = universe === 'build' ? isHovered ? 'border-amber-200' : 'border-gray-200' : isHovered ? universe === 'prepare' ? 'border-blue-700' : 'border-purple-700' : 'border-gray-700';
  const textColor = universe === 'build' ? 'text-gray-900' : 'text-white';
  const textSecondary = universe === 'build' ? 'text-gray-600' : 'text-gray-300';
  const iconBg = universe === 'build' ? 'bg-blue-100' : universe === 'prepare' ? 'bg-blue-800/30' : 'bg-purple-800/30';
  const iconColor = universe === 'build' ? 'text-blue-700' : universe === 'prepare' ? 'text-blue-400' : 'text-purple-400';
  const getProgressColor = proficiency => {
    if (universe === 'build') {
      return proficiency >= 80 ? 'bg-green-500' : proficiency >= 60 ? 'bg-blue-500' : proficiency >= 40 ? 'bg-amber-500' : 'bg-gray-500';
    } else if (universe === 'prepare') {
      return proficiency >= 80 ? 'bg-green-400' : proficiency >= 60 ? 'bg-blue-400' : proficiency >= 40 ? 'bg-amber-400' : 'bg-gray-400';
    } else {
      return proficiency >= 80 ? 'bg-green-400' : proficiency >= 60 ? 'bg-purple-400' : proficiency >= 40 ? 'bg-amber-400' : 'bg-gray-400';
    }
  };
  return <motion.div className={`p-3 border ${cardBorder} rounded-lg relative ${cardBg}`} whileHover={{
    y: -2,
    boxShadow: universe === 'build' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    borderColor: universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7'
  }} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <AnimatePresence>
        {isHovered && <motion.div className="absolute top-2 right-2 flex space-x-1" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} transition={{
        duration: 0.15
      }}>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' : 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} onClick={onEdit}>
              <EditIcon className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button className={`p-1 rounded-full ${universe === 'build' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-red-900/30 text-red-400 hover:bg-red-800/40'}`} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
              <TrashIcon className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>}
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-1.5 ${iconBg} rounded-full mr-2.5`}>
            <GlobeIcon className={`w-3.5 h-3.5 ${iconColor}`} />
          </div>
          <div>
            <h4 className={`font-medium ${textColor}`}>{language.name}</h4>
            <p className={`text-xs ${textSecondary}`}>{language.level}</p>
          </div>
        </div>
        <div className="w-24">
          <div className={`h-2 ${universe === 'build' ? 'bg-gray-200' : 'bg-gray-700'} rounded-full overflow-hidden`}>
            <motion.div className={`h-full ${getProgressColor(language.proficiency)}`} initial={{
            width: 0
          }} animate={{
            width: `${language.proficiency}%`
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} />
          </div>
        </div>
      </div>
    </motion.div>;
};