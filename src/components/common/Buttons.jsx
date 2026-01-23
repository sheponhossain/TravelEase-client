import React from 'react';

const Buttons = ({ children, onClick, type = 'outline', className = '' }) => {
  const baseStyles =
    'relative px-5 py-2.5 tracking-widest font-medium rounded-lg overflow-hidden group transition-all duration-300 border-1 inline-flex items-center justify-center min-w-[110px]';
  const variants = {
    outline: 'border-[#040720] bg-[#040720] text-white hover:text-[#040720]',
    solid: 'border-[#FF7000] bg-[#FF7000] text-white hover:text-[#FF7000]',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[type]} ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-white origin-top transform scale-y-0 transition-transform duration-300 group-hover:scale-y-100 -z-0"></span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Buttons;
