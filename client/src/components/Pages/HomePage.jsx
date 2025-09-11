import React from 'react';
import { icons } from '../../utils/icons';
import FeatureCard from '../UI/FeatureCard';

const HomePage = ({ setCurrentPage }) => {
    return (
        <div className="bg-indigo-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Your Safe Space for <span className="text-indigo-600">Mental Wellness</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                    A confidential, stigma-free platform designed for students. Get immediate support, connect with counselors, access resources, and join a supportive peer community. You are not alone.
                </p>
                <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
                    <div className="rounded-md shadow">
                        <button onClick={() => setCurrentPage('chat')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105">
                            Chat with AI Helper
                        </button>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <button onClick={() => setCurrentPage('resources')} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
                            Explore Resources
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={icons.chat}
                        title="AI First-Aid"
                        description="Get immediate, guided support from our friendly AI chat for coping strategies and initial help."
                        onClick={() => setCurrentPage('chat')}
                    />
                    <FeatureCard
                        icon={icons.calendar}
                        title="Book a Session"
                        description="Confidentially book appointments with certified on-campus counselors at your convenience."
                         onClick={() => setCurrentPage('booking')}
                    />
                    <FeatureCard
                        icon={icons.book}
                        title="Resource Hub"
                        description="Access a curated library of videos, audio guides, and articles on mental wellness."
                         onClick={() => setCurrentPage('resources')}
                    />
                    <FeatureCard
                        icon={icons.users}
                        title="Peer Forum"
                        description="Connect with fellow students in a moderated, anonymous forum to share experiences and support."
                         onClick={() => setCurrentPage('forum')}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;