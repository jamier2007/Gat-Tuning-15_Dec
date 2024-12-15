import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png"
        alt="Gatwick Tuning"
        className={`${sizes[size]} w-auto object-contain`}
        style={{ 
          filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
          maxHeight: size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px'
        }}
      />
    </div>
  );
};

export default Logo;