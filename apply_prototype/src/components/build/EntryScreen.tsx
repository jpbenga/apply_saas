import React, { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { FileTextIcon, PlusIcon, ImportIcon, EditIcon, SparklesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const EntryScreen = ({
  onImport,
  onCreateNew
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);
  const [inspirationalText, setInspirationalText] = useState("Ton CV, c'est ton histoire professionnelle");
  const inspirationalTexts = ["Ton CV, c'est ton histoire professionnelle", 'Révèle ton potentiel unique', 'Chaque section complétée te rapproche de ton objectif', 'Construis une image qui te ressemble vraiment'];
  useEffect(() => {
    // Fade-in effect on load
    setIsVisible(true);
    // Rotate inspirational texts
    const interval = setInterval(() => {
      setInspirationalText(prev => {
        const currentIndex = inspirationalTexts.indexOf(prev);
        return inspirationalTexts[(currentIndex + 1) % inspirationalTexts.length];
      });
    }, 5000);
    // Play soft validation sound on entry
    const audio = new Audio('/sounds/soft-entry.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
    return () => clearInterval(interval);
  }, []);
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 25px rgba(244, 211, 94, 0.2)'
    }
  };
  const iconVariants = {
    initial: {
      scale: 1
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 1.5
      }
    }
  };
  return <motion.div className="space-y-8" initial={{
    opacity: 0
  }} animate={{
    opacity: isVisible ? 1 : 0
  }} transition={{
    duration: 0.8
  }}>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.7,
      delay: 0.2
    }}>
        <Card variant="build" className="mb-6 text-center py-12 px-6 overflow-hidden relative">
          <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-build-bg/30 z-0" animate={{
          background: ['linear-gradient(to bottom right, rgba(254, 243, 199, 0.4), rgba(253, 252, 249, 0.3))', 'linear-gradient(to bottom right, rgba(253, 252, 249, 0.3), rgba(254, 243, 199, 0.4))']
        }} transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }} />
          <div className="relative z-10">
            <motion.div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6" whileHover={iconVariants.hover} initial={iconVariants.initial}>
              <FileTextIcon className="w-12 h-12 text-amber-700" />
            </motion.div>
            <motion.h2 className="text-3xl font-light mb-3 text-amber-900" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              Construis ton profil
            </motion.h2>
            <motion.p className="text-gray-700 mb-8 max-w-lg mx-auto" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.6
          }}>
              Construisons ensemble l'image la plus juste et forte de ton
              potentiel. Un CV qui te représente vraiment et qui sera remarqué.
            </motion.p>
            <motion.div className="text-amber-800 italic text-lg" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.8
          }}>
              <AnimatePresence mode="wait">
                <motion.p key={inspirationalText} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.5
              }}>
                  {inspirationalText}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </Card>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" transition={{
        delay: 0.3
      }} onHoverStart={() => setHoverCard('import')} onHoverEnd={() => setHoverCard(null)} className="h-full">
          <Card variant="build" className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full" onClick={() => {
          // Play soft click sound
          const audio = new Audio('/sounds/soft-click.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.log('Audio playback prevented:', e));
          onImport();
        }}>
            <motion.div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4" variants={iconVariants} animate={hoverCard === 'import' ? 'hover' : 'initial'}>
              <ImportIcon className="w-8 h-8 text-amber-700" />
            </motion.div>
            <h3 className="text-xl font-medium text-amber-900 mb-2">
              Importer un CV existant
            </h3>
            <p className="text-gray-600 mb-6 flex-1">
              Gagne du temps en important ton CV actuel. Nous l'analyserons et
              te proposerons des améliorations.
            </p>
            <Button variant="build" className="flex items-center group">
              <ImportIcon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              <span>Importer un fichier</span>
              <motion.div className="absolute inset-0 rounded-lg bg-build-accent/10" initial={{
              scale: 0,
              opacity: 0
            }} whileHover={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} />
            </Button>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" transition={{
        delay: 0.5
      }} onHoverStart={() => setHoverCard('create')} onHoverEnd={() => setHoverCard(null)} className="h-full">
          <Card variant="build" className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center h-full" onClick={() => {
          // Play soft click sound
          const audio = new Audio('/sounds/soft-click.mp3');
          audio.volume = 0.2;
          audio.play().catch(e => console.log('Audio playback prevented:', e));
          onCreateNew();
        }}>
            <motion.div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4" variants={iconVariants} animate={hoverCard === 'create' ? 'hover' : 'initial'}>
              <EditIcon className="w-8 h-8 text-amber-700" />
            </motion.div>
            <h3 className="text-xl font-medium text-amber-900 mb-2">
              Créer un nouveau CV
            </h3>
            <p className="text-gray-600 mb-6 flex-1">
              Pars d'une page blanche et construis ton CV bloc par bloc, avec
              notre aide à chaque étape.
            </p>
            <Button variant="build" className="flex items-center group">
              <PlusIcon className="w-4 h-4 mr-2 group-hover:scale-125 transition-transform" />
              <span>Créer de zéro</span>
              <motion.div className="absolute inset-0 rounded-lg bg-build-accent/10" initial={{
              scale: 0,
              opacity: 0
            }} whileHover={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }} />
            </Button>
          </Card>
        </motion.div>
      </div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.7,
      delay: 0.7
    }}>
        <Card variant="build" className="p-5 border-amber-200 relative overflow-hidden">
          <motion.div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-100/30 rounded-full" animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }} />
          <div className="relative z-10">
            <motion.div className="flex items-start" whileHover={{
            x: 5
          }} transition={{
            type: 'spring',
            stiffness: 300
          }}>
              <div className="flex items-center">
                <SparklesIcon className="w-5 h-5 text-amber-700 mr-2" />
                <h3 className="font-medium text-amber-900 mb-3">
                  Ce que tu montres construit ce que tu deviens
                </h3>
              </div>
            </motion.div>
            <p className="text-gray-700 text-sm mb-3">
              Un CV n'est pas qu'un document, c'est le reflet de ton parcours et
              de ton potentiel. Avec Apply, tu ne remplis pas juste un
              formulaire - tu construis une image professionnelle qui te
              représente authentiquement.
            </p>
            <motion.p className="text-amber-800 text-sm italic" whileHover={{
            scale: 1.01
          }}>
              "La clarté de ton CV reflète la clarté de ta vision
              professionnelle."
            </motion.p>
          </div>
        </Card>
      </motion.div>
    </motion.div>;
};