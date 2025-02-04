import React, { useState, useEffect } from 'react';
import { servApi } from '../../util/fetch';
import SingleSelectComponent from './SingleSelectComponent';
import TimeSelector from './TimeSelector';
import Calendar from './Calendar';
import { useAuth } from '../../security/AuthProvider'

const Reserva = () => {
  const [availableNames, setAvailableNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const { user } = useAuth()

  useEffect(() => {
    async function fetchDoctorNames() {
      const res = await servApi('/user/getDoctorFullNames', { method: 'POST' });
      setAvailableNames(await res.json());
    }
    fetchDoctorNames();
  }, []);

  useEffect(() => {
    if (doctorId && selectedDate) {
      fetchAvailableTimes();
    }
  }, [doctorId, selectedDate]);

  const fetchAvailableDates = async () => {
    const res = await servApi('/turn/getAvailableDates', {
      method: 'POST',
      body: JSON.stringify({ doctorId }),
    });
    setUnavailableDates(await res.json());
  };

  const fetchAvailableTimes = async () => {
    try {
      const res = await servApi('/turn/getAvailableTimes', {
        method: 'POST',
        body: JSON.stringify({ doctor_id: doctorId, selectedDate: selectedDate }),
      });
      const times = await res.json();
      setAvailableTimes(times);  // Make sure availableTimes state updates here
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameSelect = (fullname, doctor_id) => {
    setSelectedName(fullname);
    setDoctorId(doctor_id);
    fetchAvailableDates();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    fetchAvailableTimes();
  };

  const handleRequestTurno = async (e) => {
    e.preventDefault();
    console.log(doctorId)
    await servApi('/turn/createTurno', {
      method: 'POST',
      body: JSON.stringify({
        client_id: user.client_id, // Sample client ID, replace with actual client user_id
        doctor_id: doctorId,
        turnoTime: { date: selectedDate, time: selectedTime },
      }),
    });
    setSelectedDate(prev => null)
  };

  return (
    <div>
      <SingleSelectComponent availableNames={availableNames} handleNameSelect={handleNameSelect} />
      { selectedName &&
        <Calendar
          currentMonth={currentMonth}
          onDateSelect={handleDateSelect}
          unavailableDates={unavailableDates}
          selectedDate={selectedDate}
          onMonthChange={(direction) => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))}
        />
      }
      { selectedDate &&
        <TimeSelector
          times={['09a.m.', '10a.m.', '11a.m.', '12p.m.', '13p.m.', '14p.m.', '15p.m.', '16p.m.', '17p.m.', '18p.m.']}  // Full set of times
          availableTimes={availableTimes}  // Filtered available times after fetch
          selectedTime={selectedTime}
          handleTimeSelect={setSelectedTime}
        />
      }
      { selectedTime &&
        <button onClick={handleRequestTurno} disabled={!selectedDate || !selectedTime}>
          Reserve Turno
        </button>
      }
    </div>
  );
};

export default Reserva;

// import React, { useState, useEffect } from 'react';
// import { servApi } from '../../util/fetch'; // API fetch utility
// import { useAuth } from '../../security/AuthProvider'; // Authentication provider
// import NameSelector from './NameSelector';
// import SingleSelectComponent from './SingleSelectComponent';

// function stripTimeToUTC(date) {
//   return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
// }

// const times = [
//   '09a.m.', '10a.m.', '11a.m.', '12p.m.', '13p.m.', '14p.m.', '15p.m.', '16p.m.', '17p.m.', '18p.m.'
// ];

// const Reserva = () => {
//   const { user } = useAuth();
//   const [doctorName, setDoctorName] = useState(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [unavailableTimes, setUnavailableTimes] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [refresh, setRefresh] = useState(false);
//   const [availableNames, setAvailableNames] = useState([])
//   const [selectedName, setSelectedName] = useState("");

//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const res = await servApi('/turn/selectAll', { method: 'POST' });
//       const resbody = await res.json();

//       const unavailableDatesFromAPI = resbody.map(turn => stripTimeToUTC(new Date(turn.turnoTime.date)));
//       setUnavailableDates(unavailableDatesFromAPI);
//     };

    
//     fetchUnavailableDates();
//     getFullNames()
//   }, [refresh]);
  
//   useEffect(() => {
//     getTurns()
//   }, [ selectedName ])

//   async function getTurns() {
//     servApi('/turn/selectByFullname', {
//       method: 'POST',
//       body: JSON.stringify({ fullname: selectedName })
//     })
//     .then(async res => {return await res.json()})
//     .then(decoded => console.log(decoded))
//   }

//   async function getFullNames() {
//     servApi('/user/getFullNames', { 
//       method: 'POST'
//     })
//     .then(async res => 
//       setAvailableNames(await res.json())
//     )
//   }

//   const fetchUnavailableTimes = async (date) => {
//     const res = await servApi(
//       '/turn/selectByFullname', 
//       { method: 'POST', 
//         body: JSON.stringify({
//           date: date,
//           fullname: selectedName
//         })
//       }
//     );
//     const resbody = await res.json();
//     console.log(resbody)
//     setUnavailableTimes(resbody.map(time => time.turnoTime.time));
//   };

//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
//   const firstDayOfWeek = startOfMonth.getDay();

//   const daysInMonth = [];
//   for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
//     daysInMonth.push(new Date(d));
//   };

//   const isUnavailable = (date) => {
//     return unavailableDates.some(unavailableDate => {
//       return stripTimeToUTC(date).getTime() === unavailableDate.getTime();
//     });
//   };

//   const isSelected = (date) => {
//     return selectedDate && stripTimeToUTC(date).getTime() === stripTimeToUTC(selectedDate).getTime();
//   };

//   const selectDate = (date) => {
//     setSelectedDate(stripTimeToUTC(date));
//     setSelectedTime(null);
//     fetchUnavailableTimes(stripTimeToUTC(date));
//   };

//   const selectTime = (time) => {
//     if (!unavailableTimes.includes(time)) {
//       setSelectedTime(time);
//     }
//   };

//   const changeMonth = (direction) => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
//   };

//   function handleDoctorNameSubmit(e) {
//     setDoctorName(e.target.value);
//     console.log(e.target.value);
//   };

//   async function requestTurno(e) {
//     e.preventDefault();
//     console.log(selectedDate, selectedTime)
//     if (selectedDate && selectedTime) {
//       const [ firstname, lastname, user_id ] = selectedName.split(' ')
//       await servApi('/turn/insert', {
//         method: 'POST',
//         body: JSON.stringify({
//           client: {
//             user: {
//               user_id: user.user_id,
//             }
//           },
//           turnoTime: {
//             date: selectedDate,
//             time: selectedTime,
//           },
//           doctor: {
//             user: {
//               user_id: user_id,
//               firstname: firstname,
//               lastname: lastname
//             }
//           },
//         }),
//       });
//       setRefresh(prev => !prev);
//     }
//   };

//   return (
//     <>
//       <label className='text-xl'>Reservar Turno</label>
//       <div className="container mx-auto px-4 pl-[20%] pr-[20%]">
//         <div className='flex flex-col justify-center items-center my-6 w-full'>
//           <SingleSelectComponent availableNames={availableNames} selectedName={selectedName} setSelectedName={setSelectedName} />
//           {/* <p className='text-gray-700'>
//             Nombre de Doctor
//           </p> */}
//           {/* <input
//             type='text'
//             className='rounded outline-none border border-gray-400 focus:border-indigo-600 focus:border-2'
//             onSubmit={handleDoctorNameSubmit}
//           /> */}
//         </div>

//             {selectedName && 
//             <>
//               <div className="flex justify-between items-center my-6">
//                 <button onClick={() => changeMonth(-1)} className="bg-gray-300 p-2 rounded">Prev</button>
//                 <h2 className="text-xl font-bold">
//                   {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                 </h2>
//                 <button onClick={() => changeMonth(1)} className="bg-gray-300 p-2 rounded">Prox</button>
//               </div>

//               <div className="grid grid-cols-7 gap-2 text-center">
//                 {['Dom', 'Lun', 'Mar', 'Mie', 'Juoce', 'Vie', 'Sab'].map((day) => (
//                   <div key={day} className="font-semibold">
//                     {day}
//                   </div>
//                 ))}

//                 {Array.from({ length: firstDayOfWeek }, (_, i) => (
//                   <div key={`empty-${i}`} className="p-2"></div>
//                 ))}

//                 {daysInMonth.map((date, index) => (
//                   <div
//                     key={index}
//                     onClick={() => selectDate(date)}
//                     className={`p-2 border rounded cursor-pointer 
//                       ${isUnavailable(date) ? 'border-red-300 bg-red-600 text-red-300 border-2 border-solid cursor-not-allowed' : ''} 
//                       ${isSelected(date) ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : 'bg-white'}`}
//                   >
//                     {date.getDate()}
//                   </div>
//                 ))}
//               </div>

//               {selectedDate && (
//                 <>
//                   <div className="mt-4">
//                     <div className="grid grid-cols-5 gap-2 justify-items-center">
//                       {times.map((time) => (
//                         <button
//                           key={time}
//                           onClick={() => selectTime(time)}
//                           disabled={unavailableTimes.includes(time)}
//                           className={`p-2 border rounded text-s w-16 h-16
//                             ${unavailableTimes.includes(time) ? 'bg-red-500 text-red-100 cursor-not-allowed' : 'text-black'} 
//                             ${selectedTime === time ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : ''}`}
//                         >
//                           {time}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {selectedTime && (
//                     <div className="mt-4 flex flex-row">
//                       <button
//                         onClick={requestTurno}
//                         className="bg-gray-300 p-2 rounded"
//                       >
//                         Reservar
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           }
//       </div>
//     </>
//   );
// };

// export default Reserva;

// import React, { useState, useEffect } from 'react';
// import { servApi } from '../../util/fetch';
// import { useAuth } from '../../security/AuthProvider';

// function stripTimeToUTC(date) {
//   return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
// }

// const times = [
//   '09a.m.', '10a.m.', '11a.m.', '12p.m.', '13p.m.', '14p.m.', '15p.m.', '16p.m.', '17p.m.', '18p.m.'
// ];

// const Reserva = () => {
//   const { user } = useAuth();
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [unavailableTimes, setUnavailableTimes] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [refresh, setRefresh] = useState(false);

//   // Fetch unavailable dates (no need to mark entire date unavailable unless all times are full)
//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const res = await servApi('/turn/selectAll', { method: 'POST' });
//       const resbody = await res.json();
//       const unavailableDatesFromAPI = resbody.map(turn => turn.date);
//       const parsedDates = unavailableDatesFromAPI.map(dateStr => stripTimeToUTC(new Date(dateStr)));
//       setUnavailableDates(parsedDates);
//     };

//     fetchUnavailableDates();
//   }, [ refresh ]);

//   // Fetch unavailable times for the selected date
//   const fetchUnavailableTimes = async (date) => {
//     const res = await servApi(
//       '/turn/selectTimesByDate',
//       { method: 'POST', 
//         body: { selectDate }
//       },
//     );
//     const resbody = await res.json();
//     setUnavailableTimes(resbody.unavailableTimes);
//   };

//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

//   const firstDayOfWeek = startOfMonth.getDay();

//   const daysInMonth = [];
//   for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
//     daysInMonth.push(new Date(d));
//   }

//   const isUnavailable = (date) => {
//     return unavailableDates.some(unavailableDate => {
//       return stripTimeToUTC(date).getTime() === unavailableDate.getTime();
//     });
//   };

//   const isSelected = (date) => {
//     return selectedDate && stripTimeToUTC(date).getTime() === stripTimeToUTC(selectedDate).getTime();
//   };

//   // Select a date and fetch unavailable times for that specific date
//   const selectDate = (date) => {
//     setSelectedDate(stripTimeToUTC(date));
//     setSelectedTime(null); // Reset time selection when date is changed
//     fetchUnavailableTimes(stripTimeToUTC(date)); // Fetch times for the selected date
//   };

//   const selectTime = (time) => {
//     if (!unavailableTimes.includes(time)) {
//       setSelectedTime(time);
//     }
//   };

//   const changeMonth = (direction) => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
//   };

//   async function requestTurno(e) {
//     e.preventDefault();
//     if (selectedDate && selectedTime) {
//       await servApi('/turn/insert', {
//         method: 'POST',
//         body: JSON.stringify({
//           date: selectedDate,
//           time: selectedTime,
//           user_id: user.user_id
//         }),
//       });
//       setRefresh(prev => !prev); // Refresh to update unavailable times after booking
//     }
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-center my-6">
//         <button onClick={() => changeMonth(-1)} className="bg-gray-300 p-2 rounded">Previous</button>
//         <h2 className="text-xl font-bold">
//           {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//         </h2>
//         <button onClick={() => changeMonth(1)} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>

//       <div className="grid grid-cols-7 gap-2 text-center">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="font-semibold">
//             { day }
//           </div>
//         ))}

//         {Array.from({ length: firstDayOfWeek }, (_, i) => (
//           <div key={`empty-${i}`} className="p-2"></div>
//         ))}

//         {daysInMonth.map((date, index) => (
//           <div
//             key={index}
//             onClick={() => selectDate(date)}
//             className={`p-2 border rounded cursor-pointer 
//               ${isUnavailable(date) ? 'border-red-300 bg-red-600 text-red-300 border-2 border-solid cursor-not-allowed' : ''} 
//               ${isSelected(date) ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : 'bg-white'}`}
//           >
//             { date.getDate() }
//           </div>
//         ))}
//       </div>

//       {selectedDate && (
//         <>
//           <div className="mt-4">
//             <div className="grid grid-cols-5 gap-2 justify-items-center">
//               {times.map((time) => (
//                 <button
//                   key={time}
//                   onClick={() => selectTime(time)}
//                   disabled={unavailableTimes.includes(time)} // Disable unavailable times
//                   className={`p-2 border rounded text-s w-16 h-16
//                     ${unavailableTimes.includes(time) ? 'bg-red-500 text-red-100 cursor-not-allowed' : 'text-black'} 
//                     ${selectedTime === time ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : ''}`}
//                 >
//                   { time }
//                 </button>
//               ))}
//             </div>
//           </div>

//           {selectedTime && (
//             <div className="mt-4 flex flex-row">
//               <button
//                 onClick={requestTurno}
//                 className="bg-gray-300 p-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Reserva;

// import React, { useState, useEffect } from 'react';
// import { servApi } from '../../util/fetch';
// import { useAuth } from '../../security/AuthProvider';

// function stripTimeToUTC(date) {
//   return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
// }

// const times = [
//   '09a.m.', '10a.m.', '11a.m.', '12p.m.', '13p.m.', '14p.m.', '15p.m.', '16p.m.', '17p.m.', '18p.m.'
// ];

// const Reserva = () => {
//   const { user } = useAuth();
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [unavailableDates, setUnavailableDates] = useState([]);
//   const [unavailableTimes, setUnavailableTimes] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   let [refresh, setRefresh] = useState(false);

//   useEffect(() => {
//     const fetchUnavailableDates = async () => {
//       const res = await servApi('/turn/selectAll', { method: 'POST' });
//       const resbody = await res.json();
//       const unavailableDatesFromAPI = resbody.map(turn => turn.date);
//       const parsedDates = unavailableDatesFromAPI.map(dateStr => stripTimeToUTC(new Date(dateStr)));
//       setUnavailableDates(parsedDates);
//     };

//     fetchUnavailableDates();
//   }, [refresh]);

//   const fetchUnavailableTimes = async (date) => {
//     const res = await servApi(`/turn/selectTimes?date=${date.toISOString()}`, { method: 'POST' });
//     const resbody = await res.json();
//     setUnavailableTimes(resbody.unavailableTimes);
//   };

//   const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
//   const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

//   const firstDayOfWeek = startOfMonth.getDay();

//   const daysInMonth = [];
//   for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
//     daysInMonth.push(new Date(d));
//   }

//   const isUnavailable = (date) => {
//     return unavailableDates.some(unavailableDate => {
//       return stripTimeToUTC(date).getTime() === unavailableDate.getTime();
//     });
//   };

//   const isSelected = (date) => {
//     return selectedDate && stripTimeToUTC(date).getTime() === stripTimeToUTC(selectedDate).getTime();
//   };

//   const selectDate = (date) => {
//     if (!isUnavailable(date)) {
//       setSelectedDate(stripTimeToUTC(date));
//       setSelectedTime(null);
//       fetchUnavailableTimes(stripTimeToUTC(date));
//     }
//   };

//   const selectTime = (time) => {
//     if (!unavailableTimes.includes(time)) {
//       setSelectedTime(time);
//     }
//   };

//   const changeMonth = (direction) => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
//   };

//   async function requestTurno(e) {
//     e.preventDefault();
//     if (selectedDate && selectedTime) {
//       servApi('/turn/insert', {
//         method: 'POST',
//         body: JSON.stringify({
//           date: selectedDate,
//           time: selectedTime,
//           user_id: user.user_id
//         }),
//       });
//       setRefresh(prev => !prev);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <div className="flex justify-between items-center my-6">
//         <button onClick={() => changeMonth(-1)} className="bg-gray-300 p-2 rounded">Previous</button>
//         <h2 className="text-xl font-bold">
//           {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//         </h2>
//         <button onClick={() => changeMonth(1)} className="bg-gray-300 p-2 rounded">Next</button>
//       </div>

//       <div className="grid grid-cols-7 gap-2 text-center">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="font-semibold">
//             {day}
//           </div>
//         ))}

//         {Array.from({ length: firstDayOfWeek }, (_, i) => (
//           <div key={`empty-${i}`} className="p-2"></div>
//         ))}

//         {daysInMonth.map((date, index) => (
//           <div
//             key={index}
//             onClick={() => selectDate(date)}
//             className={`p-2 border rounded cursor-pointer 
//               ${isUnavailable(date) ? 'border-red-300 bg-red-600 text-red-300 border-2 border-solid cursor-not-allowed' : ''} 
//               ${isSelected(date) ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : 'bg-white'}`}
//           >
//             {date.getDate()}
//           </div>
//         ))}
//       </div>

//       {selectedDate && (
//         <>
//           <div className="mt-4">
//             <div className="grid grid-cols-5 gap-2 justify-items-center">
//               {times.map((time) => (
//                 <button
//                   key={time}
//                   onClick={() => selectTime(time)}
//                   disabled={unavailableTimes.includes(time)}
//                   className={`p-2 border rounded text-s w-16 h-16
//                     ${unavailableTimes.includes(time) ? 'bg-red-500 text-red-100 cursor-not-allowed' : 'text-black'} 
//                     ${selectedTime === time ? 'border-solid border-2 border-indigo-600 text-indigo-600 bg-indigo-100' : ''}`}
//                 >
//                   {time}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {selectedTime && (
//             <div className="mt-4 flex flex-row">
//               <button
//                 onClick={requestTurno}
//                 className="bg-gray-300 p-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Reserva;