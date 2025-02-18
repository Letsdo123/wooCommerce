import React from 'react';

function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-800">Submitting...</p>
          <p className="text-sm text-gray-500">Please wait while we process your application</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;