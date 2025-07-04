import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-16 w-full">
      <div className="w-10 h-10 border-4 border-neutral-200 rounded-full border-t-primary animate-spin" />
    </div>
  );
};

export default Loader;
