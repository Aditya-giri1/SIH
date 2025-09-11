import React from 'react';

const FeatureCard = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
            {icon}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
);

export default FeatureCard;