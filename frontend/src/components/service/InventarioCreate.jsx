import React, { useState } from 'react'
import { servApi } from '../../util/fetch'
import { Link, useNavigate } from 'react-router-dom';

function InventarioCreate() {

  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ quantity, setQuantity ] = useState(0);
  const [ unit_price, setUnit_price ] = useState(0);
  const [ description, setDescription ] = useState('');
  const [ invalidName, setInvalidName ] = useState(false)
  
  async function handleItemInsertSubmit(e) {
    e.preventDefault()
    const res = await servApi('/inv/insert', { 
      method: 'POST',
      body: JSON.stringify({
        item: {
          name: name,
          category: category,
          unit_price: parseFloat(unit_price),
          description: description,
          stock: {
            quantity: parseInt(quantity),
          }
        }
      }),
    });

    if(res.status === 400) {
      alert('Name must be unique')
      setInvalidName(true)
    }
  };

  return (
    <div className='w-max'>
      <label className='text-xl w-max text-center'>Crear Inventario</label>
      <div className='pl-8 pr-8 w-max'>
        <br/>
        <Link to='/inv' className='bg-gray-300 pt-1 pb-1 rounded pl-4 pr-4'>Atras</Link>
        <br/>
        <br/>
        <form onSubmit={handleItemInsertSubmit}>
          <div className='flex-col justify-between'>
            <input
              type='text'
              placeholder='nombre'
              required
              onChange={(e) => setName(e.target.value)}
              className={` border border-solid border-2 border-gray-400
                ${invalidName ? 'border-red-500' : ''}`}
            />
            <input type='text' placeholder='categoria' required onChange={(e) => setCategory(e.target.value)}></input>
            <input type='number' placeholder='cantidad' required onChange={(e) => setQuantity(e.target.value)}></input>
            <input type='number' placeholder='precio unitario' required onChange={(e) => setUnit_price(e.target.value)}></input>
            <input type='text' placeholder='descripcion' required onChange={(e) => setDescription(e.target.value)}></input>
          </div>
          <br/>
          <button type='submit' className='mt-4'>Crear</button>
        </form>
      </div>
    </div>
  );
};

export default InventarioCreate;