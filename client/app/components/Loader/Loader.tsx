// Loader.tsx
import React from 'react';
import { AiOutlineBulb } from 'react-icons/ai';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce">
        <AiOutlineBulb className="text-yellow-400 w-12 h-12" />
      </div>
    </div>
  );
};

export default Loader;
