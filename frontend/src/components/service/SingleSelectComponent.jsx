import React from 'react';

const SingleSelectComponent = ({ availableNames, handleNameSelect }) => {
  const handleChange = (event) => {
    const selectedOption = availableNames.find(name => name.fullname === event.target.value);
    handleNameSelect(selectedOption.fullname, selectedOption.doctor_id);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-lg font-semibold mb-2">Select Doctor</label>
      <select
        onChange={handleChange}
        defaultValue=""
        className="border p-2 rounded"
      >
        <option value="" disabled>-- Select a Doctor --</option>
        {availableNames.map((doctor) => (
          <option key={doctor.doctor_id} value={doctor.fullname}>{doctor.fullname}</option>
        ))}
      </select>
    </div>
  );
};

export default SingleSelectComponent;
