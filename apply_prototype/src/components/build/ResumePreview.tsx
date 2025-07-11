import React, { useEffect, useState, Fragment } from 'react';
import { Card } from '../common/Card';
import { EyeIcon, DownloadIcon, RefreshCwIcon, ChevronLeftIcon, ChevronRightIcon, LockIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingTrigger } from '../pricing/PricingTrigger';
const templates = [{
  id: 'modern',
  name: 'Modern',
  accentColor: 'border-amber-200',
  bgColor: 'bg-white',
  headerStyle: 'border-b border-amber-200',
  textColor: 'text-gray-900',
  sectionStyle: 'text-amber-900',
  dividerStyle: 'bg-amber-200',
  isPremium: false
}, {
  id: 'minimal',
  name: 'Minimal',
  accentColor: 'border-gray-200',
  bgColor: 'bg-white',
  headerStyle: 'border-b border-gray-200',
  textColor: 'text-gray-900',
  sectionStyle: 'text-gray-900',
  dividerStyle: 'bg-gray-200',
  isPremium: false
}, {
  id: 'bold',
  name: 'Bold',
  accentColor: 'border-blue-200',
  bgColor: 'bg-white',
  headerStyle: 'border-b-2 border-blue-400',
  textColor: 'text-blue-900',
  sectionStyle: 'text-blue-800',
  dividerStyle: 'bg-blue-200',
  isPremium: true
}, {
  id: 'creative',
  name: 'Creative',
  accentColor: 'border-purple-200',
  bgColor: 'bg-gradient-to-br from-purple-50 to-white',
  headerStyle: 'border-b border-purple-200',
  textColor: 'text-purple-900',
  sectionStyle: 'text-purple-800',
  dividerStyle: 'bg-purple-200',
  isPremium: true
}, {
  id: 'professional',
  name: 'Professional',
  accentColor: 'border-gray-300',
  bgColor: 'bg-white',
  headerStyle: 'border-b-2 border-gray-800',
  textColor: 'text-gray-900',
  sectionStyle: 'text-gray-800',
  dividerStyle: 'bg-gray-300',
  isPremium: true
}];
export const ResumePreview = ({
  completedSections,
  sections,
  cvData
}) => {
  const [previewMode, setPreviewMode] = useState('design'); // design, classic, ats
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [templateIndex, setTemplateIndex] = useState(0);
  const [isTemplateCarouselVisible, setIsTemplateCarouselVisible] = useState(false);
  const [showPricingTrigger, setShowPricingTrigger] = useState(false);
  const [selectedPremiumTemplate, setSelectedPremiumTemplate] = useState(null);
  const renderPreviewContent = () => {
    // Données personnelles par défaut si non complétées
    const personalData = cvData.personal || {
      fullName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 12 34 56 78',
      location: 'Paris, France'
    };
    // Autres sections
    const experiences = cvData.experience || [];
    const education = cvData.education || [];
    const skills = cvData.skills || [];
    const certifications = cvData.certifications || [];
    const languages = cvData.languages || [];
    if (previewMode === 'design') {
      return <div className={`rounded-lg p-4 border ${currentTemplate.accentColor} min-h-[400px] ${currentTemplate.bgColor}`}>
          <div className={`pb-3 mb-4 ${currentTemplate.headerStyle}`}>
            <h1 className={`text-xl font-bold ${currentTemplate.textColor}`}>
              {personalData.fullName}
            </h1>
            <p className="text-gray-600">
              {experiences.length > 0 ? experiences[0].title : 'Chef de projet marketing'}
            </p>
            <div className="flex text-xs text-gray-500 mt-2 gap-2">
              <span>{personalData.location}</span>
              <span>•</span>
              <span>{personalData.email}</span>
              <span>•</span>
              <span>{personalData.phone}</span>
            </div>
          </div>
          {completedSections.length > 0 ? <div className="space-y-4">
              {/* Expériences */}
              {completedSections.includes('experience') && experiences.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                      <span className="mr-2">Expérience professionnelle</span>
                      <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                    </h2>
                    {experiences.map((exp, index) => <div key={exp.id} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.title}</h3>
                          <span className="text-sm text-gray-600">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-600">
                          {exp.description}
                        </p>
                      </div>)}
                  </motion.div>}
              {/* Formation */}
              {completedSections.includes('education') && education.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                      <span className="mr-2">Formation</span>
                      <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                    </h2>
                    {education.map(edu => <div key={edu.id} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{edu.degree}</h3>
                          <span className="text-sm text-gray-600">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          {edu.school}
                        </p>
                        {edu.description && <p className="text-sm text-gray-600">
                            {edu.description}
                          </p>}
                      </div>)}
                  </motion.div>}
              {/* Compétences */}
              {completedSections.includes('skills') && skills.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                  <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                    <span className="mr-2">Compétences</span>
                    <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <span key={skill.id} className={`text-xs px-2 py-1 rounded-full ${skill.type === 'hard' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {skill.name}
                      </span>)}
                  </div>
                </motion.div>}
              {/* Certifications */}
              {completedSections.includes('certifications') && certifications.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                      <span className="mr-2">Certifications</span>
                      <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                    </h2>
                    {certifications.map(cert => <div key={cert.id} className="mb-2">
                        <h3 className="font-medium text-sm">{cert.name}</h3>
                        <p className="text-xs text-gray-600">
                          {cert.issuer} • {cert.date}
                          {cert.expires && ` - ${cert.expires}`}
                        </p>
                      </div>)}
                  </motion.div>}
              {/* Langues */}
              {completedSections.includes('languages') && languages.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                      <span className="mr-2">Langues</span>
                      <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                    </h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {languages.map(lang => <span key={lang.id} className="text-sm">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-gray-600"> - {lang.level}</span>
                        </span>)}
                    </div>
                  </motion.div>}
              {/* Sections non complétées */}
              {sections.filter(s => !completedSections.includes(s.id) && s.id !== 'personal').map(section => <motion.div key={section.id} className="pb-2 opacity-50" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 0.5,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-semibold ${currentTemplate.sectionStyle} mb-2 flex items-center`}>
                      <span className="mr-2">{section.title}</span>
                      <div className={`h-px ${currentTemplate.dividerStyle} flex-grow`}></div>
                    </h2>
                    <p className="text-sm text-gray-500 italic">
                      Cette section n'a pas encore été complétée...
                    </p>
                  </motion.div>)}
            </div> : <motion.div className="flex flex-col items-center justify-center h-64 text-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
              <EyeIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-500">
                Complétez des sections pour voir l'aperçu
              </p>
            </motion.div>}
        </div>;
    }
    // Mode classique
    else if (previewMode === 'classic') {
      return <div className={`rounded-lg p-4 border ${currentTemplate.accentColor} min-h-[400px] bg-white`}>
          <div className="pb-3 mb-4">
            <h1 className="text-xl font-bold">
              {personalData.fullName.toUpperCase()}
            </h1>
            <p className="text-gray-700">
              {experiences.length > 0 ? experiences[0].title : 'Chef de projet marketing'}
            </p>
            <div className="text-xs text-gray-600 mt-2">
              <p>
                {personalData.location} | {personalData.email} |{' '}
                {personalData.phone}
              </p>
            </div>
          </div>
          {completedSections.length > 0 ? <div className="space-y-4">
              {/* Expériences */}
              {completedSections.includes('experience') && experiences.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-bold uppercase mb-2 border-b ${currentTemplate.accentColor} pb-1`}>
                      Expérience professionnelle
                    </h2>
                    {experiences.map(exp => <div key={exp.id} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{exp.title}</h3>
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <p className="text-sm font-medium">{exp.company}</p>
                        <p className="text-sm">
                          {exp.description.split('.').map((item, i) => item.trim() ? <Fragment key={i}>
                                • {item.trim()}
                                <br />
                              </Fragment> : null)}
                        </p>
                      </div>)}
                  </motion.div>}
              {/* Formation */}
              {completedSections.includes('education') && education.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-bold uppercase mb-2 border-b ${currentTemplate.accentColor} pb-1`}>
                      Formation
                    </h2>
                    {education.map(edu => <div key={edu.id} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{edu.degree}</h3>
                          <span className="text-sm">{edu.year}</span>
                        </div>
                        <p className="text-sm font-medium">{edu.school}</p>
                        {edu.description && <p className="text-sm">{edu.description}</p>}
                      </div>)}
                  </motion.div>}
              {/* Autres sections avec le même principe */}
              {completedSections.includes('skills') && skills.length > 0 && <motion.div className="pb-2" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                  <h2 className={`text-sm font-bold uppercase mb-2 border-b ${currentTemplate.accentColor} pb-1`}>
                    Compétences
                  </h2>
                  <div className="columns-2 text-sm">
                    {skills.map(skill => <div key={skill.id} className="mb-1">
                        • {skill.name}
                      </div>)}
                  </div>
                </motion.div>}
              {/* Sections non complétées */}
              {sections.filter(s => !completedSections.includes(s.id) && s.id !== 'personal').map(section => <motion.div key={section.id} className="pb-2 opacity-50" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 0.5,
            y: 0
          }} transition={{
            duration: 0.3
          }}>
                    <h2 className={`text-sm font-bold uppercase mb-2 border-b ${currentTemplate.accentColor} pb-1`}>
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500 italic">
                      Cette section n'a pas encore été complétée...
                    </p>
                  </motion.div>)}
            </div> : <motion.div className="flex flex-col items-center justify-center h-64 text-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
              <EyeIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-500">
                Complétez des sections pour voir l'aperçu
              </p>
            </motion.div>}
        </div>;
    }
    // Mode ATS
    else if (previewMode === 'ats') {
      return <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 min-h-[400px] font-mono text-sm">
          <motion.div className="bg-green-100 text-green-800 px-3 py-2 rounded-md mb-4 text-xs" initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            Ce mode montre comment les systèmes ATS "voient" votre CV
          </motion.div>
          {completedSections.length > 0 ? <div className="space-y-3">
              <motion.div className="bg-white p-2 rounded border border-gray-300" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
                <span className="text-blue-600">NOM:</span>{' '}
                {personalData.fullName}
                <br />
                <span className="text-blue-600">TITRE:</span>{' '}
                {experiences.length > 0 ? experiences[0].title : 'Chef de projet marketing'}
                <br />
                <span className="text-blue-600">CONTACT:</span>{' '}
                {personalData.email} | {personalData.phone}
                <br />
                <span className="text-blue-600">LOCALISATION:</span>{' '}
                {personalData.location}
              </motion.div>
              {/* Expériences */}
              {completedSections.includes('experience') && experiences.length > 0 && <motion.div className="bg-white p-2 rounded border border-gray-300" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }}>
                    <span className="text-blue-600">
                      EXPÉRIENCE PROFESSIONNELLE:
                    </span>
                    <br />
                    {experiences.map((exp, index) => <div key={exp.id} className="mb-2">
                        <span className="text-blue-600">POSTE:</span>{' '}
                        {exp.title}
                        <br />
                        <span className="text-blue-600">ENTREPRISE:</span>{' '}
                        {exp.company}
                        <br />
                        <span className="text-blue-600">PÉRIODE:</span>{' '}
                        {exp.period}
                        <br />
                        <span className="text-blue-600">DESCRIPTION:</span>{' '}
                        {exp.description}
                        <br />
                        <motion.span className="text-green-600 mt-1 block" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.6 + index * 0.1
              }}>
                          ✓ Mots-clés détectés:{' '}
                          {exp.title.split(' ').join(', ')}
                        </motion.span>
                      </div>)}
                  </motion.div>}
              {/* Formation */}
              {completedSections.includes('education') && education.length > 0 && <motion.div className="bg-white p-2 rounded border border-gray-300" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }}>
                    <span className="text-blue-600">FORMATION:</span>
                    <br />
                    {education.map(edu => <div key={edu.id} className="mb-2">
                        <span className="text-blue-600">DIPLÔME:</span>{' '}
                        {edu.degree}
                        <br />
                        <span className="text-blue-600">
                          ÉTABLISSEMENT:
                        </span>{' '}
                        {edu.school}
                        <br />
                        <span className="text-blue-600">PÉRIODE:</span>{' '}
                        {edu.year}
                        <br />
                        {edu.description && <>
                            <span className="text-blue-600">DESCRIPTION:</span>{' '}
                            {edu.description}
                            <br />
                          </>}
                      </div>)}
                  </motion.div>}
              {/* Compétences */}
              {completedSections.includes('skills') && skills.length > 0 && <motion.div className="bg-white p-2 rounded border border-gray-300" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
                  <span className="text-blue-600">COMPÉTENCES:</span>
                  <br />
                  <span className="text-blue-600">TECHNIQUES:</span>{' '}
                  {skills.filter(s => s.type === 'hard').map(s => s.name).join(', ')}
                  <br />
                  <span className="text-blue-600">SOFT SKILLS:</span>{' '}
                  {skills.filter(s => s.type === 'soft').map(s => s.name).join(', ')}
                </motion.div>}
            </div> : <motion.div className="flex flex-col items-center justify-center h-64 text-center" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
              <EyeIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-500">
                Complétez des sections pour voir l'aperçu
              </p>
            </motion.div>}
        </div>;
    }
  };
  const getCompletedSectionData = () => {
    return sections.filter(section => completedSections.includes(section.id)).map(section => ({
      id: section.id,
      title: section.title,
      icon: section.icon
    }));
  };
  const handleModeChange = mode => {
    if (mode !== previewMode) {
      setIsTransitioning(true);
      // Play transition sound
      const audio = new Audio('/sounds/switch-mode.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      setTimeout(() => {
        setPreviewMode(mode);
        setIsTransitioning(false);
      }, 300);
    }
  };
  const nextTemplate = () => {
    setTemplateIndex(prev => (prev + 1) % templates.length);
    // Play transition sound
    const audio = new Audio('/sounds/template-switch.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  };
  const prevTemplate = () => {
    setTemplateIndex(prev => (prev - 1 + templates.length) % templates.length);
    // Play transition sound
    const audio = new Audio('/sounds/template-switch.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  };
  const handleTemplateChange = index => {
    const selectedTemplate = templates[index];
    // Check if the template is premium
    if (selectedTemplate.isPremium) {
      // Play lock sound
      const audio = new Audio('/sounds/lock.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      // Store the selected premium template
      setSelectedPremiumTemplate(selectedTemplate);
      // Show pricing trigger
      setShowPricingTrigger(true);
      return;
    }
    setTemplateIndex(index);
    // Play selection sound
    const audio = new Audio('/sounds/template-select.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    // Add a brief transition effect
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  const handleContinueFree = () => {
    setShowPricingTrigger(false);
  };
  const handleUpgrade = () => {
    // Here you would handle the actual upgrade logic
    setShowPricingTrigger(false);
    // After upgrading, you might want to apply the premium template
    // that the user was trying to select
    if (selectedPremiumTemplate) {
      const index = templates.findIndex(t => t.id === selectedPremiumTemplate.id);
      if (index !== -1) {
        setTemplateIndex(index);
      }
    }
  };
  const completedSectionData = getCompletedSectionData();
  const currentTemplate = templates[templateIndex];
  const previewVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3
      }
    }
  };
  const modeButtonVariants = {
    inactive: {
      scale: 1
    },
    active: {
      scale: 1.05,
      boxShadow: '0 2px 8px rgba(244, 211, 94, 0.3)'
    }
  };
  const carouselVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      height: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  return <motion.div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.2
  }}>
      <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50">
        <h3 className="font-medium text-gray-700">Aperçu en temps réel</h3>
        <div className="flex gap-1">
          <motion.button className={`px-2 py-1 text-xs rounded-md ${previewMode === 'design' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`} onClick={() => handleModeChange('design')} variants={modeButtonVariants} animate={previewMode === 'design' ? 'active' : 'inactive'} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            Design
          </motion.button>
          <motion.button className={`px-2 py-1 text-xs rounded-md ${previewMode === 'classic' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`} onClick={() => handleModeChange('classic')} variants={modeButtonVariants} animate={previewMode === 'classic' ? 'active' : 'inactive'} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            Classique
          </motion.button>
          <motion.button className={`px-2 py-1 text-xs rounded-md ${previewMode === 'ats' ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`} onClick={() => handleModeChange('ats')} variants={modeButtonVariants} animate={previewMode === 'ats' ? 'active' : 'inactive'} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            ATS
          </motion.button>
        </div>
      </div>
      <div className="p-5 relative">
        <AnimatePresence mode="wait">
          {isTransitioning ? <motion.div key="transition" className="absolute inset-0 flex items-center justify-center bg-white" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }}>
              <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
            </motion.div> : <motion.div key={`${previewMode}-${templateIndex}`} variants={previewVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
              {renderPreviewContent()}
            </motion.div>}
        </AnimatePresence>
      </div>
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex justify-between items-center">
        <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Button variant="secondary" size="small" className="flex items-center" onClick={() => setIsTemplateCarouselVisible(!isTemplateCarouselVisible)}>
            <RefreshCwIcon className="w-3 h-3 mr-1" />
            Changer de style
          </Button>
        </motion.div>
        <motion.div whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
          <Button variant="build" size="small" className="flex items-center group">
            <DownloadIcon className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
            Exporter
            <motion.span className="absolute inset-0 bg-amber-400/20 rounded-lg" initial={{
            scale: 0,
            opacity: 0
          }} whileHover={{
            scale: 1,
            opacity: 1
          }} transition={{
            duration: 0.3
          }} />
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {isTemplateCarouselVisible && <motion.div variants={carouselVariants} initial="hidden" animate="visible" exit="hidden" className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Choisir un template
              </h4>
              <div className="flex gap-2">
                <motion.button className="p-1 rounded-full hover:bg-gray-200" onClick={prevTemplate} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                  <ChevronLeftIcon className="w-4 h-4" />
                </motion.button>
                <motion.button className="p-1 rounded-full hover:bg-gray-200" onClick={nextTemplate} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }}>
                  <ChevronRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <motion.div className="flex gap-3" animate={{
            x: -templateIndex * 120
          }} transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}>
                {templates.map((template, index) => <motion.div key={template.id} className={`w-28 h-36 flex-shrink-0 rounded-md border-2 cursor-pointer flex flex-col items-center justify-center ${index === templateIndex ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white hover:border-amber-200'} relative`} whileHover={{
              y: -3
            }} whileTap={{
              scale: 0.97
            }} onClick={() => handleTemplateChange(index)}>
                    <div className="w-16 h-20 bg-gray-100 rounded mb-2 overflow-hidden">
                      <div className={`w-full h-4 ${index === 0 ? 'bg-amber-200' : index === 1 ? 'bg-blue-200' : index === 2 ? 'bg-red-200' : index === 3 ? 'bg-gray-200' : 'bg-green-200'}`}></div>
                      <div className="p-1">
                        <div className="w-full h-1 bg-gray-300 mb-1"></div>
                        <div className="w-full h-1 bg-gray-300 mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-300"></div>
                      </div>
                    </div>
                    <p className="text-xs font-medium">{template.name}</p>
                    {template.isPremium && <div className="absolute top-1 right-1 bg-amber-500/90 rounded-full p-0.5 text-white">
                        <LockIcon className="w-3 h-3" />
                      </div>}
                  </motion.div>)}
              </motion.div>
            </div>
          </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showPricingTrigger && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} className="w-full max-w-lg">
              <PricingTrigger variant="build" title="Débloquez des templates premium" subtitle="Démarquez-vous avec des designs professionnels" description="Accédez à notre collection complète de templates premium conçus par des designers professionnels pour maximiser l'impact de votre CV." ctaText="Débloquer tous les templates" modalTitle="Donnez vie à votre CV" modalSubtitle="Des templates qui vous démarquent" modalDescription="Nos utilisateurs premium ont 3x plus de chances d'être contactés grâce à nos designs optimisés et testés sur le terrain." modalCtaText="Accéder aux templates premium" onContinueFree={handleContinueFree} onUpgrade={handleUpgrade} highlightedTierId="transformation" />
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};