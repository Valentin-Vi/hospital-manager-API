import React, { useEffect, useState } from 'react';
import { servApi } from '../../util/fetch'; // API utility function for fetch requests
import { useAuth } from '../../security/AuthProvider';

const ConsultarTurnos = () => {
  const { user } = useAuth();
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    // Fetch all turnos associated with the logged-in user
    const fetchTurnos = async () => {
      try {
        const res = await servApi(`/turn/selectByUser_id`, {
          method: 'POST',
          body: JSON.stringify({ user_id: user.user_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setTurnos(data);
      } catch (err) {
        console.error('Failed to fetch turnos:', err);
      }
    };
    fetchTurnos();
  }, [user.user_id]);

  // Function to cancel a turno
  const cancelTurno = async (turnoId) => {
    try {
      const res = await servApi(`/turn/cancelById`, {
        method: 'POST',
        body: JSON.stringify({ turn_id: turnoId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setTurnos((prevTurnos) =>
          prevTurnos.filter((turno) => turno.id !== turnoId)
        );
        alert('Turno canceled successfully');
      } else {
        console.error('Failed to cancel turno');
      }
    } catch (err) {
      console.error('Error canceling turno:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Turnos</h2>
      <div className="space-y-4">
        {turnos.map((turno) => (
          <div
            key={turno.id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <div>
              <p className="text-lg font-medium">
                Doctor: {turno.doctor.user.firstname} {turno.doctor.user.lastname}
              </p>
              <p className="text-gray-600">
                Date: {new Date(turno.turnoTime.date).toLocaleDateString()} | Time: {turno.turnoTime.time}
              </p>
            </div>
            <button
              onClick={() => cancelTurno(turno.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultarTurnos;



