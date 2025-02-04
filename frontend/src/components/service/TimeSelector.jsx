import React from 'react';

const TimeSelector = ({ times, availableTimes, selectedTime, handleTimeSelect }) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-2 justify-items-center">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            disabled={!availableTimes.includes(time)}  // Disable unavailable times
            className={`p-2 border rounded w-16 h-16 
              ${!availableTimes.includes(time) ? 'bg-red-500 text-red-100 cursor-not-allowed' : 'bg-white'}
              ${selectedTime === time ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : ''}`
            }
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
