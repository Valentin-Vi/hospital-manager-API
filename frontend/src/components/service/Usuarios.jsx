import { useEffect, useState } from 'react';
import { servApi } from '../../util/fetch';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

function Usuarios() {

  const userCols = [
    {
      name: 'user_id',
      selector: row => row.user_id,
      sortable: true,
    },{
      name: 'e-mail',
      selector: row => row.email,
      sortable: true,
    },{
      name: 'nombre',
      selector: row => row.firstname,
      sortable: true,
    },{
      name: 'apellido',
      selector: row => row.lastname,
      sortable: true,
    },{
      name: 'rol',
      selector: row => row.role,
      sortable: true,
    }, {
      name: 'acciones',
      selector: row => (<Link to={'/usr/update/' + row.user_id.toString()}>update</Link>)
    }
  ];

  const dptCols = [
    {
      name: 'id',
      selector: row => row.id,
      sortable: true
    }, {
      name: 'nombre',
      selector: row => row.name,
      sortable: true
    }
  ]

  const [ userData, setUserData ] = useState([]);
  const [ userRows, setUserRows ] = useState([]);
  const [ departmentData, setDepartmentData ] = useState([]);
  const [ departmentRows, setDepartmentRows ] = useState([]);
  const [ selectedUserRows, setSelectedUserRows ] = useState([]);
  const [ selectedDepartmentRows, setSelectedDepartmentRows ] = useState([])
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchData()
  }, [ reload ]);

  async function fetchData() {
    const res = await servApi('/user/manager', { method: 'POST' });
    if(res.ok) {
      const decoded = await res.json()
      setUserData(decoded.userData)
      setUserRows(decoded.userData)
      setDepartmentData(decoded.departmentRows)
      setDepartmentRows(decoded.departmentRows)
    }
  };

  function handleUserFilter(e) {
    if(e.target.value === '') setUserRows(userData);
    
    const filteredRows = userData.filter(record => {
      return record.firstname.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setUserRows(filteredRows);
  };

  function handleDepartmentFilter(e) {
    if(e.target.value === '') setUserRows(userData);
    
    const filteredRows = departmentData.filter(record => {
      return record.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setDepartmentRows(filteredRows);
  }

  async function bulkDeleteUsers(e) {
    const res = await servApi('/user/deleteMany', {
      method: 'POST',
      body: JSON.stringify({
        users: selectedUserRows.selectedRows
      }),
    });

    if(res.ok) {
      selectedUserRows.selectedRows = [];
      setReload(prev => !prev)
    };
  };

  async function bulkDeleteDepartments(e) {
    const res = await servApi('/dept/deleteMany', {
      method: 'POST',
      body: JSON.stringify({
        dpts: selectedDepartmentRows.selectedRows
      }),
    });

    if(res.ok) {
      selectedDepartmentRows.selectedRows = [];
      setReload(prev => !prev)
    };
  };

  return (
    <>
      <div className='flex flex-col'>
        <label className='text-xl'>Usuarios</label>
        <div className='flex flex-row justify-around p-2 m-3'>
          <input type='text'
            placeholder='filtrar por nombre'
            onChange={handleUserFilter}
            className='outline-none border border-1 border-solid border-gray-300 rounded focus:border-indigo-600 pl-3 pr-3 focus:shadow-sm focus:shadow-indigo-400 focus:bg-indigo-100'
          />

          <button onClick={bulkDeleteUsers}
            className='rounded pt-1 pb-1 pr-2 pl-2 bg-red-200 shadow-md shadow-red-200 active:bg-red-400 active:shadow-red-400  hover:bg-red-300'
          >
            Borrar
          </button>
          <div className='rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300  hover:bg-indigo-300'>
            <Link to='/usr/insert'>Crear</Link>
          </div>
        </div>
          
        <DataTable
          columns={userCols}
          data={userRows}
          fixedHeader
          selectableRows
          pagination
          paginationPerPage={10}
          onSelectedRowsChange={(userRows) => {setSelectedUserRows(userRows)}}
        />

        <div>
          <label className='text-xl'>Departamentos</label>
          <div className='flex flex-row justify-around p-2 m-3'>
            <input type='text'
              placeholder='filtrar por nombre'
              onChange={handleDepartmentFilter}
              className='outline-none border border-1 border-solid border-gray-300 rounded focus:border-indigo-600 pl-3 pr-3 focus:shadow-sm focus:shadow-indigo-400 focus:bg-indigo-100'
            />

            <button onClick={bulkDeleteDepartments}
              className='rounded pt-1 pb-1 pr-2 pl-2 bg-red-200 shadow-md shadow-red-200 active:bg-red-400 active:shadow-red-400  hover:bg-red-300'
            >
              Borrar
            </button>
            <div className='rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300  hover:bg-indigo-300'>
              <Link to='/dpt/crear'>Crear</Link>
            </div>
          </div>

          <DataTable
            columns={dptCols}
            data={departmentRows}
            fixedHeader
            selectableRows
            pagination
            paginationPerPage={10}
            onSelectedRowsChange={(dptRows) => {setSelectedDepartmentRows(dptRows)}}
          />
          
        </div>
      </div>
    </>
  );
}

export default Usuarios;