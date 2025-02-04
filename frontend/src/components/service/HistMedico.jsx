import { useEffect, useState } from "react";
import { servApi } from "../../util/fetch";
import DataTable from "react-data-table-component";
import { useAuth } from "../../security/AuthProvider";
import { Link } from "react-router-dom";

function HistMedico() {

  
  const [ data, setData ] = useState([]);
  const [ rows, setRows ] = useState([]);
  const [ selectedRows, setSelectedRows ] = useState([]);
  let [ reload, setReload ] = useState(false);
  
  const { user } = useAuth();
  
  let columns = [];

  if(user.type === 'CLIENT') {
    columns = [
      {
        name: 'hist_id',
        selector: (row) => row.hist_id,
        sortable: true,
      }, {
        name: 'cliente_id',
        selector: (row) => row.client_id,
        sortable: true,
      }, {
        name: 'tipo',
        selector: row => row.doctor.type,
        sortable: true
      }, {
        name: 'fecha',
        selector: (row) => row.date,
        sortable: true,
      }, {
        name: 'description',
        selector: (row) => (<Link to={'/hist/med/' + row.hist_id.toString()}>view</Link>),
        sortable: true,
      },
    ];
  } else {
    columns = [
      {
        name: 'hist_id',
        selector: (row) => row.hist_id,
        sortable: true,
      }, {
        name: 'cliente_id',
        selector: (row) => row.client_id,
        sortable: true,
      }, {
        name: 'fecha',
        selector: (row) => row.date,
        sortable: true,
      }, {
        name: 'description',
        selector: (row) => (<Link to={'/hist/med/' + row.hist_id.toString()}>view</Link>),
        sortable: true,
      },
    ];
  }

  useEffect(() => {
    fetchData()
    .then((data) => {
      console.log(data)
      setData(data);
      setRows(data);
    });
  }, []);

  async function fetchData() {
    console.log(user.type)
    if(user.type === 'DOCTOR') {
      var res = await servApi('/hist/med/selectByDoctorId', {
        method: 'POST',
        body: JSON.stringify({ doctor_id: user.user_id }) 
      });
    } else if(user.type === 'CLIENT') {
      var res = await servApi('/hist/med/selectByClientId', {
        method: 'POST',
        body: JSON.stringify({ client_id: user.user_id })
      });
    }
    return res.ok ? await res.json() : null;
  };

  function handleFilter(e) {
    if(user.type === 'CLIENT') {
      if(e.target.value === '') setRows(data);
      const filteredRows = data.filter(row => {
        return row.tipo.toLowerCase().includes(e.target.value);
      });
      setRows(filteredRows);
      setReload(prev => !prev);
    } else {
      if(e.target.value === '') setRows(data);
      const filteredRows = data.filter(row => {
        return row.client_id.includes(parseInt(e.target.value));
      });
      setRows(filteredRows);
      setReload(prev => !prev);
    }
  };

  function bulkDelete(e) {
    servApi('/hist/med/deleteMany', {
      method: 'POST',
      body: JSON.stringify(selectedRows.selectedRows),
    });
    setReload(prev => !prev);
  };

  return (
    <>
      <div className='flex flex-col'>
        <label className='text-xl'>Historial Medico</label>
        
        {user.type === 'DOCTOR' &&
          <div className='flex flex-row justify-around p-2 m-3'>
            <input
              onChange={handleFilter}
              type='text'
              className='outline-none border border-1 border-solid border-gray-300 rounded focus:border-indigo-600 pl-3 pr-3 focus:shadow-sm focus:shadow-indigo-400 focus:bg-indigo-100'
              placeholder='filtrar por id'
              />
            {
              user.role === 4 ?
              <button
                onClick={bulkDelete}
                className="rounded pt-1 pb-1 pr-2 pl-2 bg-red-200 shadow-md shadow-red-200 active:bg-red-400 active:shadow-red-400  hover:bg-red-300"
              >
                Borrar
              </button>
                : null
            }
            <div className="rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300  hover:bg-indigo-300">
              <Link
                to='/hist/med/insert'
              >
                Crear
              </Link>
            </div>      
          </div>
        }
        
        {columns && 
          <DataTable
            columns={columns}
            data={rows}
            fixedHeader
            selectableRows
            pagination
            paginationPerPage={8}
            onSelectedRowsChange={(rows) => {setSelectedRows(rows)}}
            />
        }
      </div>
    </>
  );
};

export default HistMedico;