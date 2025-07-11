import React from 'react';
export const Card = ({
  children,
  title,
  subtitle,
  variant = 'default',
  onClick,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md',
    build: 'bg-gradient-to-br from-cream to-build-bg border-build-ui hover:border-build-accent/40 hover:shadow-build-accent/10 text-build-text',
    prepare: 'bg-gradient-to-br from-[#0D1B2A] to-[#102135] border-[#7FB3D5]/30 hover:border-[#7FB3D5]/50 hover:shadow-[#7FB3D5]/10 text-white',
    act: 'bg-gradient-to-br from-[#1E0F24] to-[#1A0E21] border-[#CBA6F7]/30 hover:border-[#CBA6F7]/40 hover:shadow-[#CBA6F7]/10 text-white'
  };
  // Définir les styles de texte pour chaque variante pour assurer un bon contraste
  const titleTextStyles = {
    default: 'text-gray-900',
    build: 'text-amber-900',
    prepare: 'text-white',
    act: 'text-white'
  };
  const subtitleTextStyles = {
    default: 'text-gray-700',
    build: 'text-amber-800',
    prepare: 'text-[#D0E3F0]',
    act: 'text-[#D8D4E8]'
  };
  const cardClasses = `rounded-xl border p-5 transition-all duration-200 ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : ''} ${className}`;
  return <div className={cardClasses} onClick={onClick} {...props}>
      {title && <h3 className={`text-lg font-semibold mb-1 ${titleTextStyles[variant]}`}>
          {title}
        </h3>}
      {subtitle && <p className={`text-sm mb-3 ${subtitleTextStyles[variant]}`}>
          {subtitle}
        </p>}
      {children}
    </div>;
};