import React from 'react';

function PartnerCard({ icon: Icon, title, description, benefits, buttonText, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <ul className="text-left space-y-3 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
      <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors">
        {buttonText}
      </button>
    </div>
  );
}

export default PartnerCard;