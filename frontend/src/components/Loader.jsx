import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <div className="absolute inset-4 rounded-full border-b-2 border-white/50 animate-spin" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
