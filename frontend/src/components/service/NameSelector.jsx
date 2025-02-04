import React, { useState, useEffect } from 'react';
import { servApi } from '../../util/fetch';

function NameSelector() {
  const [names, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      const res = await servApi('/names', { method: 'GET' });
      const data = await res.json();
      setNames(data);
    };
    fetchNames();
  }, []);

  useEffect(() => {
    setFilteredNames(
      names.filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, names]);


  const selectName = (name) => {
    if (!selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
    setSearchTerm('');
  };


  const removeName = (name) => {
    setSelectedNames(selectedNames.filter((n) => n !== name));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Seleccionar nombre</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar nombre..."
        className="p-2 border rounded mb-2 w-full"
      />

      {searchTerm && filteredNames.length > 0 && (
        <ul className="border rounded mt-2 mb-4 max-h-40 overflow-y-auto">
          {filteredNames.map((name) => (
            <li
              key={name}
              onClick={() => selectName(name)}
              className="cursor-pointer p-2 hover:bg-indigo-200"
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <h3 className="font-semibold">Nombres seleccionados:</h3>
        {selectedNames.length > 0 ? (
          <ul className="flex flex-wrap gap-2 mt-2">
            {selectedNames.map((name) => (
              <li
                key={name}
                className="flex items-center p-2 bg-indigo-100 rounded cursor-pointer"
              >
                {name}
                <button onClick={() => removeName(name)} className="ml-2 text-red-500 font-bold">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">Ningun nombre seleccionado</p>
        )}
      </div>
    </div>
  );
}

export default NameSelector;