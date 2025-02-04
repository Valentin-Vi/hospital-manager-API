import React, { useState, useEffect } from 'react';
import { servApi } from '../../util/fetch';
import { useAuth } from '../../security/AuthProvider';

const HistMedCreate = () => {
  const [clientId, setClientId] = useState('');
  const [description, setDescription] = useState('');
  const [medications, setMedications] = useState([]);
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [error, setError] = useState('');

    const { user } = useAuth()

  // Fetch medications from the database
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const res = await servApi('/med/selectAll', { method: 'POST' });
        const meds = await res.json();
        setMedications(meds);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId || !description) {
      setError('Client ID and Description are required.');
      return;
    }

    try {
      // Create a histMed entry
      const histMedRes = await servApi('/hist/med/createHistMedicoWithMedications', {
        method: 'POST',
        body: JSON.stringify({
          client_id: parseInt(clientId),
          description: description,
          doctor_id: parseInt(user.doctor_id),
          medications: selectedMeds.map(({ name, quantity }) => ({ name, quantity })),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!histMedRes.ok) {
        throw new Error('Failed to create histMed.');
      }

      // Subtract medication quantities
      if (selectedMeds.length > 0) {
        const subtractMedsRes = await servApi('/med/subtractMany', {
          method: 'POST',
          body: JSON.stringify({ meds: selectedMeds }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!subtractMedsRes.ok) {
          throw new Error('Failed to update medication quantities.');
        }
      }

      // Clear form fields on success
      setClientId('');
      setDescription('');
      setSelectedMeds([]);
      setError('');
      alert('Medical record created and medications updated successfully.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to create medical record or update medications.');
    }
  };

  const handleMedSelect = (e) => {
    const selectedMedName = e.target.value;
    if (!selectedMeds.some((med) => med.name === selectedMedName) && selectedMedName) {
      setSelectedMeds([...selectedMeds, { name: selectedMedName, quantity: 1 }]); // Default quantity to 1
    }
  };

  const handleMedQuantityChange = (name, newQuantity) => {
    setSelectedMeds(selectedMeds.map((med) =>
      med.name === name ? { ...med, quantity: newQuantity } : med
    ));
  };

  const handleMedRemove = (medName) => {
    setSelectedMeds(selectedMeds.filter((med) => med.name !== medName));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Medical Record</h2>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Client ID</label>
          <input
            type="number"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Select Medications</label>
          <select
            onChange={handleMedSelect}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            defaultValue=""
          >
            <option value="" disabled>Select medication...</option>
            {medications.map((med) => (
              <option key={med.med_id} value={med.name}>
                {med.name}
              </option>
            ))}
          </select>

          {/* Display selected medications with quantity */}
          <div className="mt-2">
            {selectedMeds.map((med, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-200 p-2 rounded mt-2"
              >
                <span>{med.name}</span>
                <input
                  type="number"
                  min="1"
                  value={med.quantity}
                  onChange={(e) => handleMedQuantityChange(med.name, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ml-2"
                />
                <button
                  type="button"
                  onClick={() => handleMedRemove(med.name)}
                  className="text-red-600 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HistMedCreate;



// import { useState } from 'react'
// import { servApi } from '../../util/fetch';
// import NameSelector from './NameSelector';

// function HistMedCreate() {

//     const [ user_id, setUser_id ] = useState(0);
//     const [ description, setDescription ] = useState('');

//     async function handleHistMedInsertSubmit(e) {
//         e.preventDefault();
//         const res = await servApi('/hist/med/insert', {
//             method: 'POST',
//             body: JSON.stringify({
//                 user_id: parseInt(user_id),
//                 description: description,
//                 date: new Date().toString(),
//             }),
//         });
//         console.log(res)
//     };

//     return (
//         <div>
//       <label className='text-xl'>Crear Historia Medica</label>
//       <br/>
//       <form onSubmit={handleHistMedInsertSubmit}>
//         <input type='number' placeholder='user_id' required onChange={(e) => setUser_id(e.target.value)}></input>
//         <input type='text' placeholder='descripcion' required onChange={(e) => setDescription(e.target.value)}></input>
//         <button type='submit'>Crear</button>
//       </form>
//     </div>
//     )
// }

// export default HistMedCreate