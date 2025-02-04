import React, { useEffect, useState } from 'react'
import { servApi } from '../../util/fetch';

function DepartCreate() {
  
    const [ name, setName ] = useState('');
  
    async function submitDepartmentForm(e) {
        e.preventDefault();
        if(name === '') {
            alert('Campo "nombre" esta vacio.')
        } else {
            const res = await servApi('/dept/insert',{
                method: 'POST',
                body: JSON.stringify({
                    department: {
                        name: name
                    }
                })
            })

            if(!res.ok) {
                alert(`Error (${res.status})\nHubo un error`)
            } else {
                alert('Departamento crear exitosamente')
            }
        }
    }

    return (
        <div
            className='flex flex-col'
        >
            <label
                className='text-xl mb-2 mt-2'
            >
                Crear Departamento
            </label>
            <div
                className='flex flex-col justify-center items-center m-2'
            >
                <form className='flex flex-col justify-center items-center'>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className='m-2'
                        type='text'
                        required
                        placeholder='Nombre'
                    />
                    <button
                        onClick={submitDepartmentForm}
                        className='rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300 '
                        type='submit'
                    >Crear</button>
                </form>
            </div>
        </div>
    )
}

export default DepartCreate