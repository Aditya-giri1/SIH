import React from 'react';

const AdminDashboard = () => {
    const usageData = [
        { name: 'Anxiety', value: 45 },
        { name: 'Stress', value: 82 },
        { name: 'Sleep', value: 32 },
        { name: 'Burnout', value: 61 },
        { name: 'Social', value: 25 },
    ];
    const maxUsage = Math.max(...usageData.map(d => d.value));

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard (Anonymous Analytics)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Key Metrics */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-600">Total Users (Last 30 Days)</h3>
                    <p className="text-3xl font-bold text-indigo-600">4,281</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-600">Appointments Booked (This Month)</h3>
                    <p className="text-3xl font-bold text-indigo-600">124</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-600">Most Accessed Resource</h3>
                    <p className="text-xl font-bold text-indigo-600">Managing Exam Stress</p>
                </div>
                
                {/* Chart */}
                <div className="md:col-span-2 bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-4">Commonly Reported Issues (via Chat)</h3>
                    <div className="space-y-4">
                        {usageData.map(item => (
                            <div key={item.name} className="flex items-center">
                                <span className="w-24 text-sm text-gray-600">{item.name}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-6">
                                    <div className="bg-indigo-500 h-6 rounded-full text-white text-xs flex items-center justify-end pr-2"
                                         style={{ width: `${(item.value / maxUsage) * 100}%` }}>
                                         {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                 <div className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-4">Platform Usage Trends</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex justify-between"><span>Chatbot Interactions:</span> <span className="font-bold text-green-600">+15%</span></li>
                        <li className="flex justify-between"><span>Resource Views:</span> <span className="font-bold text-green-600">+8%</span></li>
                        <li className="flex justify-between"><span>Forum Posts:</span> <span className="font-bold text-red-500">-2%</span></li>
                        <li className="flex justify-between"><span>Counselor Bookings:</span> <span className="font-bold text-green-600">+22%</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;