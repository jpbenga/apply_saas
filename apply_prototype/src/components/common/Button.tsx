import React, { createElement } from 'react';
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  href,
  downloadFile,
  isJobSubmitButton = false,
  showPricing = false,
  pricingVariant = 'prepare',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const variantClasses = {
    primary: 'bg-global-cta hover:bg-global-cta/90 text-white focus:ring-global-cta/50',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-300',
    build: 'bg-build-accent/10 hover:bg-build-accent/20 text-build-cta border border-build-ui focus:ring-build-cta/30',
    prepare: 'bg-[#7FB3D5]/20 hover:bg-[#7FB3D5]/30 text-white border border-[#7FB3D5]/30 focus:ring-[#7FB3D5]/40',
    act: 'bg-[#FF6B6B] hover:bg-[#e85c5c] text-white border border-[#CBA6F7]/30 focus:ring-[#CBA6F7]/30',
    destructive: 'bg-red-500 hover:bg-red-600 text-white border border-red-400/30 focus:ring-red-400/40'
  };
  const sizeClasses = {
    small: 'py-1.5 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const handleClick = e => {
    if (downloadFile) {
      e.preventDefault();
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = downloadFile.url || '#';
      link.download = downloadFile.filename || 'download';
      link.target = '_blank';
      // Add to the DOM, click it, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Play download sound if available
      if (downloadFile.sound) {
        const audio = new Audio(downloadFile.sound);
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback prevented:', e));
      } else {
        // Use default download sound
        const audio = new Audio('/sounds/file-download.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio playback prevented:', e));
      }
    }
    if (isJobSubmitButton) {
      e.preventDefault();
      // Dispatch a custom event to trigger the job submission modal/page
      window.dispatchEvent(new CustomEvent('showJobSubmissionModal'));
    }
    // Si showPricing est true, déclencher un événement personnalisé pour afficher le tableau de prix
    if (showPricing) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('showPricingMatrix', {
        detail: {
          variant: pricingVariant
        }
      }));
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  // Si un href est fourni, rendre un lien stylisé comme un bouton
  if (href) {
    return <a href={href} className={classes} {...props}>
        {children}
      </a>;
  }
  // Sinon, rendre un bouton normal
  return <button className={classes} onClick={handleClick} {...props}>
      {children}
    </button>;
};