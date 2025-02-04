import React from 'react';

const Calendar = ({ currentMonth, unavailableDates, selectedDate, onDateSelect, onMonthChange }) => {
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const firstDayOfWeek = startOfMonth.getDay();

  // Generate all days in the current month
  const daysInMonth = [];
  for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
    daysInMonth.push(new Date(d));
  }

  // Check if a date is unavailable (i.e., has at least one associated turn)
  const isUnavailable = (date) =>
    unavailableDates.some(unavailableDate => date.getTime() === new Date(unavailableDate).getTime());

  // Check if a date is selected
  const isSelected = (date) =>
    selectedDate && date.getTime() === new Date(selectedDate).getTime();

  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <button onClick={() => onMonthChange(-1)} className="bg-gray-300 p-2 rounded">Prev</button>
        <h2 className="text-xl font-bold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => onMonthChange(1)} className="bg-gray-300 p-2 rounded">Next</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold">
            {day}
          </div>
        ))}

        {/* Empty spaces before the first day of the month */}
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* Display each day of the month */}
        {daysInMonth.map((date, index) => (
          <div
            key={index}
            onClick={() => onDateSelect(date)} // Allow selection of all dates
            className={`p-2 border rounded cursor-pointer 
              ${isUnavailable(date) ? 'bg-yellow-100 border-yellow-500 text-yellow-600' : 'bg-white'} 
              ${isSelected(date) ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : ''}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
