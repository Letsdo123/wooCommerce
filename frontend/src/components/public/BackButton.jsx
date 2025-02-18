import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

function BackButton({ onClick,customClass }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${customClass} z-20 flex items-center px-4 py-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors`}
    >
      <FiArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
  );
}

export default BackButton;