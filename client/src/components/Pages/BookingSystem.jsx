import React, { useEffect, useState } from 'react';
import { mockCounselors } from '../../data/mockData';

const BookingSystem = () => {
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleBooking = () => {
      if(selectedCounselor && selectedTime) {
          setIsBooked(true);
      }
  }

  useEffect(() => {
    
  } , []) ;

  if (isBooked) {
      return (
          <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto my-12">
              <h2 className="text-2xl font-bold text-green-600">Appointment Confirmed!</h2>
              <p className="mt-4 text-gray-700">Your session with <strong>{selectedCounselor.name}</strong> is booked for <strong>{selectedDate.toDateString()}</strong> at <strong>{selectedTime}</strong>.</p>
              <p className="mt-2 text-sm text-gray-500">A confirmation email with details has been sent to your student address. All sessions are confidential.</p>
              <button onClick={() => { setIsBooked(false); setSelectedCounselor(null); setSelectedTime(null); }} className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                  Close
              </button>
          </div>
      )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book a Confidential Session</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Counselors List */}
            <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">1. Select a Counselor</h2>
                <div className="space-y-4">
                    {mockCounselors.map(c => (
                        <div key={c.id} 
                             onClick={() => c.available && setSelectedCounselor(c)}
                             className={`p-4 rounded-lg border-2 flex items-center space-x-4 ${selectedCounselor?.id === c.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'} ${c.available ? 'cursor-pointer hover:border-indigo-400' : 'opacity-50'}`}>
                            <img src={c.image} alt={c.name} className="w-16 h-16 rounded-full"/>
                            <div>
                                <h3 className="font-bold">{c.name}</h3>
                                <p className="text-sm text-gray-600">{c.specialty}</p>
                                {!c.available && <span className="text-xs text-red-500 font-semibold">Unavailable</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">2. Select a Date & Time</h2>
                <p className="text-gray-600 mb-4">
                    {selectedCounselor ? `Available slots for ${selectedCounselor.name}` : 'Please select a counselor first.'}
                </p>
                {selectedCounselor && (
                    <div>
                        <input type="date" className="p-2 border rounded-md mb-4 w-full" defaultValue={selectedDate.toISOString().substring(0, 10)} onChange={e => setSelectedDate(new Date(e.target.value))}/>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {timeSlots.map(time => (
                                <button key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-md text-center font-medium ${selectedTime === time ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-8 pt-4 border-t">
                    <button onClick={handleBooking} disabled={!selectedCounselor || !selectedTime} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors">
                        Confirm Appointment
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BookingSystem;