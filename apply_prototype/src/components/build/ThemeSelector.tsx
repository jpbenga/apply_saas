import React, { useState } from 'react';
import { Card } from '../common/Card';
import { CheckIcon, LockIcon, PaletteIcon, LayoutIcon, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
type ThemeProps = {
  id: string;
  name: string;
  thumbnail: string;
  isPremium: boolean;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
};
type ThemeSelectorProps = {
  onSelectTheme: (themeId: string) => void;
  currentTheme: string;
  onShowPricing: () => void;
};
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  onSelectTheme,
  currentTheme,
  onShowPricing
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  // Sample themes data
  const themes: ThemeProps[] = [{
    id: 'professional',
    name: 'Professionnel',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    isPremium: false,
    description: 'Un design sobre et efficace pour mettre en avant votre parcours professionnel.',
    category: 'modern'
  }, {
    id: 'minimalist',
    name: 'Minimaliste',
    thumbnail: 'https://images.unsplash.com/photo-1616004655123-818cbd4b3143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    isPremium: false,
    description: "Un design épuré qui va à l'essentiel.",
    category: 'minimal'
  }, {
    id: 'executive',
    name: 'Exécutif',
    thumbnail: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    isPremium: true,
    description: 'Un design élégant pour les cadres et dirigeants.',
    category: 'classic'
  }, {
    id: 'creative',
    name: 'Créatif',
    thumbnail: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    isPremium: true,
    description: 'Un design original pour les profils créatifs.',
    category: 'creative'
  }, {
    id: 'tech',
    name: 'Tech',
    thumbnail: 'https://images.unsplash.com/photo-1595839095859-60c70ba92567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3VtZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    isPremium: true,
    description: 'Un design moderne pour les profils techniques.',
    category: 'modern'
  }, {
    id: 'academic',
    name: 'Académique',
    thumbnail: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3VtZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    isPremium: true,
    description: 'Un design adapté aux profils académiques et scientifiques.',
    category: 'classic'
  }];
  const filteredThemes = selectedCategory === 'all' ? themes : themes.filter(theme => theme.category === selectedCategory);
  const handleThemeSelect = (themeId: string, isPremium: boolean) => {
    if (isPremium) {
      // Play lock sound
      const audio = new Audio('/sounds/lock.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      // Show pricing modal
      onShowPricing();
    } else {
      // Play selection sound
      const audio = new Audio('/sounds/select.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Audio playback prevented:', e));
      onSelectTheme(themeId);
    }
  };
  const categories = [{
    id: 'all',
    name: 'Tous'
  }, {
    id: 'modern',
    name: 'Moderne'
  }, {
    id: 'classic',
    name: 'Classique'
  }, {
    id: 'creative',
    name: 'Créatif'
  }, {
    id: 'minimal',
    name: 'Minimal'
  }];
  return <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-amber-900">Thèmes de CV</h3>
        <div className="flex items-center text-sm text-gray-500">
          <PaletteIcon className="w-4 h-4 mr-1" />
          <span>Personnalisez l'apparence de votre CV</span>
        </div>
      </div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => <button key={category.id} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategory === category.id ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setSelectedCategory(category.id)}>
            {category.name}
          </button>)}
      </div>
      {/* Themes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredThemes.map(theme => <motion.div key={theme.id} whileHover={{
        y: -4
      }} className="relative rounded-lg overflow-hidden cursor-pointer border border-gray-200 shadow-sm" onMouseEnter={() => setHoveredTheme(theme.id)} onMouseLeave={() => setHoveredTheme(null)} onClick={() => handleThemeSelect(theme.id, theme.isPremium)}>
            <div className="relative aspect-[3/4] bg-gray-100">
              <img src={theme.thumbnail} alt={theme.name} className="w-full h-full object-cover" />
              {/* Premium badge */}
              {theme.isPremium && <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                  <LockIcon className="w-3 h-3 mr-1" />
                  Premium
                </div>}
              {/* Selected indicator */}
              {currentTheme === theme.id && <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <CheckIcon className="w-6 h-6 text-amber-600" />
                  </div>
                </div>}
              {/* Hover overlay */}
              <AnimatePresence>
                {hoveredTheme === theme.id && <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} transition={{
              duration: 0.2
            }}>
                    <p className="text-white text-sm">{theme.description}</p>
                    <button className={`mt-2 px-3 py-1.5 rounded-md text-sm font-medium ${theme.isPremium ? 'bg-amber-500 text-white flex items-center justify-center' : 'bg-white text-gray-800'}`}>
                      {theme.isPremium ? <>
                          <LockIcon className="w-3 h-3 mr-1" />
                          Débloquer
                        </> : 'Sélectionner'}
                    </button>
                  </motion.div>}
              </AnimatePresence>
            </div>
            <div className="p-3 bg-white">
              <h4 className="font-medium text-gray-900">{theme.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500 capitalize">
                  {theme.category}
                </span>
                {theme.isPremium ? <div className="flex items-center text-amber-600 text-xs">
                    <LockIcon className="w-3 h-3 mr-1" />
                    Premium
                  </div> : <div className="text-green-600 text-xs">Gratuit</div>}
              </div>
            </div>
          </motion.div>)}
      </div>
    </div>;
};