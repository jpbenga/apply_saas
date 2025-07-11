export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // Base colors - redéfinies sans blanc ou gris clair
        ivory: '#FFFFF0',
        cream: '#FDFCF9',
        'gray-brume': '#F0F0F5',
        'yellow-light': '#FFFACD',
        // Build Universe (Construire)
        'build': {
          bg: '#FDFCF9',     // Crème très clair - Sérénité
          accent: '#F4D35E', // Jaune doré doux - Énergie douce
          text: '#4E4E4E',   // Gris perle - Lisibilité
          ui: '#E8DCC2',     // Sable chaud - Chaleur humaine
          cta: '#4465A0'     // Bleu froid élégant - Confiance
        },
        // Prepare Universe (Se préparer)
        'prepare': {
          bg: '#0D1B2A',     // Bleu nuit profond - Concentration
          accent: '#7FB3D5', // Bleu glacier - Clarté mentale
          ui: '#D0E3F0',     // Bleu glacier clair - Fraîcheur cognitive
          highlight: '#7FB3D5', // Bleu glacier - Cohérence
          text: '#D0E3F0'    // Bleu-gris très doux - Lisibilité
        },
        // Act Universe (Agir)
        'act': {
          bg: '#1A0E21',     // Fond violet sombre - Mise à jour
          bg2: '#120818',    // Fond violet plus sombre - Mise à jour
          accent: '#CBA6F7', // Violet lavande - Mise à jour
          cta: '#FF6B6B',    // Rouge vif pour CTA - Inchangé
          ui: '#1E0F24',     // Fond carte - Mise à jour
          text: '#D8D4E8',   // Texte secondaire - Mise à jour
          progress: '#FF6B6B' // Rouge vif pour progression - Inchangé
        },
        // Global CTA color
        'global-cta': '#4BB8F1', // Bleu cyan énergétique
        // Legacy colors (keeping for backward compatibility)
        'lavender': {
          100: '#E6E6FA',
          200: '#D8BFD8',
          300: '#DDA0DD',
          400: '#DA70D6'
        },
        'gold': {
          100: '#FFF8DC',
          200: '#FFE4B5',
          300: '#FFD700'
        }
      }
    }
  },
  // Désactivation complète des couleurs par défaut qui pourraient causer un fond blanc
  corePlugins: {
    preflight: true,
  },
  // S'assurer que les styles de base n'appliquent pas de fond blanc
  plugins: []
}