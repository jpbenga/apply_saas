import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FileTextIcon, MailIcon, PlusIcon, EditIcon, DownloadIcon, CopyIcon, TrashIcon, ExternalLinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const ProfileDocuments = ({
  documents,
  onEdit,
  universe = 'build'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const universeStyles = {
    build: {
      gradient: 'from-amber-50/10 to-build-bg/10',
      hoverGradient: 'from-amber-50/20 to-build-bg/20',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      buttonVariant: 'build',
      cardBg: 'bg-white',
      cardBorder: 'border-gray-200',
      cardHoverBorder: 'border-amber-200',
      thumbnailBg: 'bg-amber-50',
      thumbnailIcon: 'text-amber-400',
      actionBg: 'bg-white',
      actionColor: 'text-amber-600',
      newItemBg: 'bg-gray-50',
      newItemBorder: 'border-dashed border-gray-300',
      newItemHoverBorder: 'border-amber-300',
      newItemText: 'text-amber-600'
    },
    prepare: {
      gradient: 'from-blue-900/10 to-prepare-bg/10',
      hoverGradient: 'from-blue-900/20 to-prepare-bg/20',
      iconBg: 'bg-blue-800/30',
      iconColor: 'text-blue-400',
      buttonVariant: 'prepare',
      cardBg: 'bg-prepare-ui',
      cardBorder: 'border-gray-700',
      cardHoverBorder: 'border-blue-700',
      thumbnailBg: 'bg-blue-900/30',
      thumbnailIcon: 'text-blue-400',
      actionBg: 'bg-blue-900/40',
      actionColor: 'text-blue-400',
      newItemBg: 'bg-blue-900/20',
      newItemBorder: 'border-dashed border-gray-700',
      newItemHoverBorder: 'border-blue-600',
      newItemText: 'text-blue-400'
    },
    act: {
      gradient: 'from-purple-900/10 to-act-bg/10',
      hoverGradient: 'from-purple-900/20 to-act-bg/20',
      iconBg: 'bg-purple-800/30',
      iconColor: 'text-purple-400',
      buttonVariant: 'act',
      cardBg: 'bg-act-ui',
      cardBorder: 'border-gray-700',
      cardHoverBorder: 'border-purple-700',
      thumbnailBg: 'bg-purple-900/30',
      thumbnailIcon: 'text-purple-400',
      actionBg: 'bg-purple-900/40',
      actionColor: 'text-purple-400',
      newItemBg: 'bg-purple-900/20',
      newItemBorder: 'border-dashed border-gray-700',
      newItemHoverBorder: 'border-purple-600',
      newItemText: 'text-purple-400'
    }
  };
  const currentStyle = universeStyles[universe];
  const textColor = universe === 'build' ? 'text-gray-900' : 'text-white';
  const textSecondary = universe === 'build' ? 'text-gray-700' : 'text-gray-200';
  const textTertiary = universe === 'build' ? 'text-gray-500' : 'text-gray-400';
  return <Card className={`p-6 relative overflow-hidden ${universe === 'build' ? 'bg-cream' : universe === 'prepare' ? 'bg-prepare-bg' : 'bg-act-bg'} ${universe !== 'build' ? 'text-white' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div className={`absolute inset-0 bg-gradient-to-br ${currentStyle.gradient} z-0`} animate={{
      background: isHovered ? `linear-gradient(to bottom right, ${universe === 'build' ? 'rgba(254, 243, 199, 0.2)' : universe === 'prepare' ? 'rgba(30, 58, 138, 0.2)' : 'rgba(88, 28, 135, 0.2)'}, ${universe === 'build' ? 'rgba(253, 252, 249, 0.2)' : universe === 'prepare' ? 'rgba(13, 27, 42, 0.2)' : 'rgba(26, 14, 33, 0.2)'})` : `linear-gradient(to bottom right, ${universe === 'build' ? 'rgba(254, 243, 199, 0.05)' : universe === 'prepare' ? 'rgba(30, 58, 138, 0.05)' : 'rgba(88, 28, 135, 0.05)'}, ${universe === 'build' ? 'rgba(253, 252, 249, 0.05)' : universe === 'prepare' ? 'rgba(13, 27, 42, 0.05)' : 'rgba(26, 14, 33, 0.05)'})`
    }} transition={{
      duration: 0.5
    }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${textColor}`}>
            Documents & Templates
          </h2>
          <AnimatePresence>
            {isHovered && <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.8
          }} transition={{
            duration: 0.2
          }}>
                <Button variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'} size="small" className="flex items-center gap-2" onClick={onEdit}>
                  <EditIcon className="w-3.5 h-3.5" />
                  Modifier
                </Button>
              </motion.div>}
          </AnimatePresence>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className={`font-medium ${textSecondary} mb-4 flex items-center gap-2`}>
              <FileTextIcon className={`w-5 h-5 ${currentStyle.iconColor}`} />
              CV créés
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {documents.cvs.map(cv => <motion.div key={cv.id} className={`border ${currentStyle.cardBorder} rounded-lg overflow-hidden ${currentStyle.cardBg}`} whileHover={{
              y: -5,
              boxShadow: universe === 'build' ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
              borderColor: universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7'
            }} onMouseEnter={() => setHoveredItem(cv.id)} onMouseLeave={() => setHoveredItem(null)}>
                  <div className={`h-44 ${currentStyle.thumbnailBg} relative`}>
                    {cv.thumbnail ? <img src={cv.thumbnail} alt={cv.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                        <FileTextIcon className={`w-12 h-12 ${currentStyle.thumbnailIcon}`} />
                      </div>}
                    <AnimatePresence>
                      {hoveredItem === cv.id && <motion.div className="absolute inset-0 bg-black/50 flex items-center justify-center" initial={{
                    opacity: 0
                  }} animate={{
                    opacity: 1
                  }} exit={{
                    opacity: 0
                  }} transition={{
                    duration: 0.2
                  }}>
                          <div className="flex gap-2">
                            <motion.button className={`p-2 ${currentStyle.actionBg} rounded-full ${currentStyle.actionColor}`} whileHover={{
                        scale: 1.1
                      }} whileTap={{
                        scale: 0.9
                      }}>
                              <EditIcon className="w-4 h-4" />
                            </motion.button>
                            <motion.button className={`p-2 ${currentStyle.actionBg} rounded-full text-green-600`} whileHover={{
                        scale: 1.1
                      }} whileTap={{
                        scale: 0.9
                      }}>
                              <DownloadIcon className="w-4 h-4" />
                            </motion.button>
                            <motion.button className={`p-2 ${currentStyle.actionBg} rounded-full ${universe === 'build' ? 'text-purple-600' : 'text-purple-400'}`} whileHover={{
                        scale: 1.1
                      }} whileTap={{
                        scale: 0.9
                      }}>
                              <CopyIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </div>
                  <div className="p-3">
                    <h4 className={`font-medium ${textColor} truncate`}>
                      {cv.name}
                    </h4>
                    <p className={`text-xs ${textTertiary} mt-1`}>
                      Modifié le {cv.lastModified}
                    </p>
                  </div>
                </motion.div>)}
              <motion.div className={`border ${currentStyle.newItemBorder} rounded-lg overflow-hidden flex items-center justify-center h-44 ${currentStyle.newItemBg}`} whileHover={{
              backgroundColor: universe === 'build' ? '#F9FAFB' : universe === 'prepare' ? '#0D1B2A' : '#1A0E21',
              borderColor: universe === 'build' ? '#F4D35E' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7',
              y: -2
            }}>
                <motion.div className="text-center p-4" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <div className={`w-12 h-12 rounded-full ${currentStyle.iconBg} flex items-center justify-center mx-auto mb-2`}>
                    <PlusIcon className={`w-6 h-6 ${currentStyle.iconColor}`} />
                  </div>
                  <p className={`text-sm font-medium ${currentStyle.newItemText}`}>
                    Créer un nouveau CV
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div>
            <h3 className={`font-medium ${textSecondary} mb-4 flex items-center gap-2`}>
              <MailIcon className={`w-5 h-5 ${universe === 'build' ? 'text-purple-600' : 'text-purple-400'}`} />
              Lettres générées
            </h3>
            <div className="space-y-2">
              {documents.letters.map(letter => <motion.div key={letter.id} className={`flex items-center justify-between p-3 border ${currentStyle.cardBorder} rounded-lg ${currentStyle.cardBg}`} whileHover={{
              backgroundColor: universe === 'build' ? '#F9FAFB' : universe === 'prepare' ? '#0F223A' : '#220F29',
              borderColor: universe === 'build' ? '#A07CFF' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7',
              y: -2,
              boxShadow: universe === 'build' ? '0 2px 4px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${universe === 'build' ? 'bg-purple-100' : 'bg-purple-900/30'} rounded-md`}>
                      <MailIcon className={`w-4 h-4 ${universe === 'build' ? 'text-purple-600' : 'text-purple-400'}`} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${textColor}`}>
                        {letter.name}
                      </h4>
                      <p className={`text-xs ${textTertiary}`}>
                        Générée le {letter.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <motion.button className={`p-1.5 rounded-full ${textTertiary} ${universe === 'build' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`} whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }}>
                      <EditIcon className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button className={`p-1.5 rounded-full ${textTertiary} ${universe === 'build' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`} whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }}>
                      <DownloadIcon className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button className={`p-1.5 rounded-full ${textTertiary} ${universe === 'build' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`} whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }}>
                      <TrashIcon className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>)}
              <motion.div className={`flex items-center justify-center p-3 border ${currentStyle.newItemBorder} rounded-lg ${currentStyle.newItemBg}`} whileHover={{
              backgroundColor: universe === 'build' ? '#F9FAFB' : universe === 'prepare' ? '#0D1B2A' : '#1A0E21',
              borderColor: universe === 'build' ? '#A07CFF' : universe === 'prepare' ? '#7FB3D5' : '#CBA6F7',
              y: -2
            }}>
                <motion.div className={`flex items-center gap-2 ${universe === 'build' ? 'text-purple-600' : 'text-purple-400'}`} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                  <PlusIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Générer une nouvelle lettre
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <motion.div className="mt-4 flex justify-center" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <Button className="flex items-center gap-2 group" variant={universe === 'build' ? 'build' : universe === 'prepare' ? 'prepare' : 'act'}>
              <FileTextIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Créer un nouveau document</span>
              <motion.span className={`absolute inset-0 ${universe === 'build' ? 'bg-build-accent/20' : universe === 'prepare' ? 'bg-[#7FB3D5]/20' : 'bg-[#CBA6F7]/20'} rounded-lg`} initial={{
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
      </div>
    </Card>;
};