import React from 'react'
import { useEffect, useState } from 'react';
import { servApi } from '../../util/fetch';
import DataTable from 'react-data-table-component';
import { PieChart, Pie, ResponsiveContainer, Cell, BarChart, Bar, YAxis, XAxis, CartesianGrid, Legend, Tooltip, Rectangle } from 'recharts';

const columns = [
  {
    name: 'id',
    selector: row => row.id,
    sortable: true,
  }, {
    name: 'item_id',
    selector: row => row.item_id,
    sortable: true
  },{
    name: 'Cambio de cantidad',
    selector: row => row.previous_quantity > 0 ? row.previous_quantity - row.new_quantity : row.new_quantity,
    sortable: true,
  }, {
    name: 'Fecha de Cambio',
    selector: row => row.change_date,
    sortable: true
  },
]

function ReporteInventario() {

  const [ data, setData ] = useState({});
  const [ total_cost, setTotal_cost ] = useState(0);
  const [ total_consumption, setTotal_consumption ] = useState(0);
  const [ items_consumed, setItems_consumed ] = useState([]);
  const [ items_values, setItems_values ] = useState([])
  const [ tableData, setTableData ] = useState([]);
  const [ total_value, setTotal_value ] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      const res = await servApi('/inv/report', {
        method: 'POST'
      });
      const decoded = await res.json();
      setTotal_cost(decoded.total_cost)
      setTotal_consumption(decoded.total_consumption)
      setItems_consumed(decoded.items_consumed)
      setTableData(decoded.stockChangeRows)
      setItems_values(decoded.item_value_array)
      setTotal_value(decoded.total_value)
    }
    fetchData();
  }, [])

  const COLORS = ["#ff0000", "#ff3300", "#ff6600", "#ff9900", "#ffcc00", "#ffff00", "#ccff00", "#99ff00", "#66ff00", "#33ff00",
  "#00ff00", "#00ff33", "#00ff66", "#00ff99", "#00ffcc", "#00ffff", "#00ccff", "#0099ff", "#0066ff", "#0033ff",
  "#0000ff", "#3300ff", "#6600ff", "#9900ff", "#cc00ff", "#ff00ff", "#ff00cc", "#ff0099", "#ff0066", "#ff0033",
  "#ff0000", "#ff1a00", "#ff3400", "#ff4d00", "#ff6600", "#ff8000", "#ff9900", "#ffb300", "#ffcc00", "#ffe600",
  "#ffff00", "#e6ff00", "#ccff00", "#b3ff00", "#99ff00", "#80ff00", "#66ff00", "#4dff00", "#33ff00", "#1aff00",
  "#00ff00", "#00ff1a", "#00ff34", "#00ff4d", "#00ff66", "#00ff80", "#00ff99", "#00ffb3", "#00ffcc", "#00ffe6",
  "#00ffff", "#00e6ff", "#00ccff", "#00b3ff", "#0099ff", "#0080ff", "#0066ff", "#004dff", "#0033ff", "#001aff",
  "#0000ff", "#1a00ff", "#3400ff", "#4d00ff", "#6600ff", "#8000ff", "#9900ff", "#b300ff", "#cc00ff", "#e600ff",
  "#ff00ff", "#ff00e6", "#ff00cc", "#ff00b3", "#ff0099", "#ff0080", "#ff0066", "#ff004d", "#ff0033", "#ff001a",
  "#ff0000", "#ff3333", "#ff6666", "#ff9999", "#ffcccc", "#ffffff", "#cccccc", "#999999", "#666666", "#333333"];
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <label
        className='text-xl'
      >
        Reporte de Inventario
      </label>
      <div className='w-[100%] h-[100%] flex-col items-center justify-center'>

        <div className='w-[100%] flex flex-col items-center justify-center align-middle'>
          <div className='flex flex-row'>
            <div className='w-[300px] h-[400px] shadow-sm rounded border border-1 border-solid border-gray-100 m-2 p-2 overflow-hidden overflow-y-auto bg-white'>
              <ResponsiveContainer width="100%" height="50%"  >
                <div className='flex flex-row justify-center'>
                  <label
                    className='text-xl text-center mr-2'
                  >
                    Costo Total</label>
                  <div className='text-xl'>${total_cost}</div>
                </div>
                <PieChart width={500} height={500}>
                  <Pie
                    data={items_consumed}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                  >
                    {items_consumed.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col mt-10 border border-solid rounded p-2 bg-white'>
                {items_consumed.map((item, index) => (
                  item.cost > 0 &&
                  <div
                  className='flex flex-row'
                    key={item.name}
                  >
                    <label className={`border-r border-1 border-solid w-1/2 ${index == 0 ? '' : 'border-t'} `}>{item.name}</label>
                    <label className={`border-1 border-solid w-1/2 text-center ${index == 0 ? '' : 'border-t'} `}>${item.cost}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className='w-[600px] h-[400px] shadow-sm rounded border border-1 border-solid border-gray-100 m-2 p-2 bg-white'>
              <ResponsiveContainer width="90%" height="90%">
                <div className='flex-row flex pb-4 justify-center'>
                  <label
                    className='text-xl mr-2'
                  >
                    Stock Consumido: </label>
                  <label
                    className='text-xl'
                  >
                    {total_consumption}
                  </label>
                  <label className='text-xl mr-2 ml-2'>Items</label>
                </div>
                <BarChart
                  width={500}
                  height={300}
                  data={items_consumed}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" fill="#3d37ef" activeBar={<Rectangle fill="3d37ef" stroke="3d37ef" />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='w-[300px] h-[400px] shadow-sm rounded border border-1 border-solid border-gray-100 m-2 p-2 overflow-hidden overflow-y-auto bg-white'>
              <ResponsiveContainer width="100%" height="50%"  >
                <div className='flex flex-row justify-center'>
                  <label
                    className='text-xl text-center mr-2'
                  >
                    Valor Total</label>
                  <div className='text-xl'>${total_value}</div>
                </div>
                <PieChart width={500} height={500}>
                  <Pie
                    data={items_values}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total_value"
                  >
                    {items_consumed.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col mt-10 border border-solid rounded p-2'>
              {items_values.map((item_value, index) => (
                item_value.total_value > 0 &&
                <div
                className='flex flex-row'
                  key={item_value.item.name}
                >
                  <label className={`border-r border-1 border-solid w-1/2 ${index == 0 ? '' : 'border-t'} `}>{item_value.item.name}</label>
                  <label className={`border-1 border-solid w-1/2 text-center ${index == 0 ? '' : 'border-t'} `}>${item_value.total_value}</label>
                </div>
              ))}
              </div>
            </div>
              <div className='w-[600px] h-[400px] shadow-sm rounded border border-1 border-solid border-gray-100 m-2 p-2 bg-white'>
                <ResponsiveContainer width="90%" height="90%">
                  <div className='flex-row flex justify-center pb-4'>
                    <label
                      className='text-xl mr-2'
                    >
                      Valor de Stock: </label>
                    <label
                      className='text-xl'
                    >
                      ${total_value}
                    </label>
                  </div>
                  <BarChart
                    width={500}
                    height={300}
                    data={items_values}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="item.name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_value" fill="#56d83c" activeBar={<Rectangle fill="56d83c" stroke="56d83c" />} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
          
          <div className='p-8 rounded-t-lg w-max'>
            <DataTable
              columns={columns}
              data={tableData}
              fixedHeader
              pagination
              paginationPerPage={8}
              responsive
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ReporteInventario

// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { servApi } from '../../util/fetch';

// function ReporteInventario() {
  
//   const [datos, setDatos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await servApi('/inv/report', {
//           method: 'POST',
//         });
//         const fetchedData = await res.json();
//         console.log(fetchedData);
//         setDatos(fetchedData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   };

//   return (
//     <div className='p-8'>
//       <BarChart
//         width={730}
//         height={500}
//         data={datos}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="uv" fill="#8884d8" />
//       </BarChart>
//     </div>
//   );
// }

// export default ReporteInventario;