import { useState } from 'react'
import { servApi } from '../../util/fetch';

function Medicacion() {

  const columns = [
    {
      name: 'med_id',
      selector: row => row.med_id,
      sortable: true,
    }, {
      name: 'nombre',
      selector: row => row.name,
      sortable: true,
    }, {
      name: 'Cantidad',
      selector: row => row.stock.quantity,
      sortable: true,
    }, {
      name: 'precio unitario',
      selector: row => row.unit_price,
      sortable: true
    }, {
      name: 'descripcion',
      selector: row => row.description,
      sortable: true,
    }
  ];

  const [ data, setData ] = useState([]);
  const [ rows, setRows ] = useState([]);
  const [ selectedRows, setSelectedRows ] = useState([]);
  let [ reload, setReload ] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await servApi('/med/selectAll', { method: 'POST' });
      const json = await res.json()
      console.log(json)
      return res.ok ? json : null;
    };

    fetchData()
    .then((data) => {
      setData(data);
      setRows(data);
    });
  }, [ reload ]);


  function handleFilter(e) {
    const medName = e.target.value;
    if(!medName) setRows(data);
    const filteredRows = data.filter(record => {
      return record.name.toLowerCase().includes(medName.toLowerCase());
    });
    setRows(filteredRows);
  };

  function bulkDelete(e) {
    servApi('/med/deleteMany', {
      method: 'POST',
      body: JSON.stringify({ meds: selectedRows.selectedRows}),
    });
    setReload(prev => !prev);
  };

  async function bulkConsume() {
    await servApi('/med/subtractManyByOne', {
      method: 'POST',
      body: JSON.stringify({
        meds: selectedRows.selectedRows 
      })
    })
    .then(res => {
      if(res.ok) {
        for(const row of selectedRows.selectedRows) {
          console.log(row)
          row.stock.quantity -= 1
        }
      }
    })
    setReload(prev => !prev);
  };

  return (
    <>
      <div className='flex flex-col'>
        <label className='text-xl'>Medicacion</label>
        <div className='flex flex-row justify-around p-2 m-3'>  
          <input
            type='text'
            placeholder='filtrar por nombre'
            onChange={handleFilter}
            className='outline-none border border-1 border-solid border-gray-300 rounded focus:border-indigo-600 pl-3 pr-3 focus:shadow-sm focus:shadow-indigo-400 focus:bg-indigo-100'
          />
          
          <button
            onClick={bulkDelete}
            className='rounded pt-1 pb-1 pr-2 pl-2 bg-red-200 shadow-md shadow-red-200 active:bg-red-400 active:shadow-red-400  hover:bg-red-300'>
            Borrar
          </button>
          
          <Link
            to='/med/insert'
            className='rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300  hover:bg-indigo-300'>
            Crear
          </Link>
          
          <button
            onClick={bulkConsume}
            className='rounded pt-1 pb-1 pr-2 pl-2 bg-gray-300 active:bg-blue-400 shadow-md active:shadow-blue-300 hover:bg-indigo-300'>
            Consumir
          </button>
        </div>

        <DataTable
          columns={columns}
          data={rows}
          fixedHeader
          selectableRows
          pagination
          paginationPerPage={8}
          onSelectedRowsChange={rows => setSelectedRows(rows)}
        />
      </div>
    </>
  )
};

export default Medicacion;