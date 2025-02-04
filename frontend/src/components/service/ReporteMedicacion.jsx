import React from 'react'
import { useEffect, useState } from 'react';
import { servApi } from '../../util/fetch';
import DataTable from 'react-data-table-component';
import { PieChart, Pie, ResponsiveContainer, Cell, BarChart, Bar, YAxis, XAxis, CartesianGrid, Legend, Tooltip, Rectangle } from 'recharts';

const columns = [
  {
    name: 'id',
    selector: row => row.id,
    sortable: true
  }, {
    name: 'med_id',
    selector: row => row.med_id,
    sortable: true
  },{
    name: 'Cambio de Cntidad',
    selector: row => row.previous_quantity > 0 ? row.previous_quantity - row.new_quantity : row.new_quantity,
    sortable: true,
  }, {
    name: 'Fecha de Cambio',
    selector: row => row.change_date,
    sortable: true
  },
]

function ReporteMedicacion() {
  
  const [ data, setData ] = useState({});
  const [ total_cost, setTotal_cost ] = useState(0);
  const [ total_consumption, setTotal_consumption ] = useState(0);
  const [ meds_consumed, setMeds_consumed ] = useState([]);
  const [ meds_values, setMeds_values ] = useState([])
  const [ tableData, setTableData ] = useState([]);
  const [ total_value, setTotal_value ] = useState(0);

  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await servApi('/med/report', {
        method: 'POST'
      });
      const decoded = await res.json();
      setTotal_cost(decoded.total_cost)
      setTotal_consumption(decoded.total_consumption)
      setMeds_consumed(decoded.meds_consumed)
      setTableData(decoded.stockChangeRows)
      setMeds_values(decoded.med_value_array)
      setTotal_value(decoded.total_value)
    }
    fetchData();
  }, []);
  
  const COLORS = [
    "#7ff5ff", "#33d4ff", "#00a6ff", "#005aff", "#000dff", "#0a00ff", "#2400ff", "#3d00ff",
    "#5600ff", "#6f00ff", "#8800ff", "#a200ff", "#bb00ff", "#d400ff", "#ed00ff", "#ff00ff", "#ff00e6", "#ff00cc",
    "#ff00b3", "#ff0099", "#ff0080", "#ff0066", "#ff004d", "#ff0033", "#ff001a", "#ff0000", "#ff1a00", "#ff3300",
    "#ff4d00", "#ff6600", "#ff8000", "#ff9900", "#ffb300", "#ffcc00", "#ffe600", "#ffff00", "#ffe600", "#ffcc00",
    "#ffb300", "#ff9900", "#ff8000", "#ff6600", "#ff4d00", "#ff3300", "#ff1a00", "#ff0000", "#e60000", "#cc0000",
    "#b30000", "#990000", "#800000", "#660000", "#4d0000", "#330000", "#1a0000", "#0d0000", "#1a000d", "#33001a",
    "#4d0026", "#660033", "#800040", "#99004c", "#b30059", "#cc0066", "#e50073", "#ff0080", "#ff0073", "#ff0066",
    "#ff0059", "#ff004d", "#ff003f", "#ff0033", "#ff0026", "#ff0019", "#ff000c", "#ff0000", "#e50000", "#cc0000" 
  ];    
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
                    data={meds_consumed}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                  >
                    {meds_consumed.map((med, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col mt-10 border border-solid rounded p-2 bg-white'>
                {meds_consumed.map((med, index) => (
                  med.cost > 0 &&
                  <div
                  className='flex flex-row'
                    key={med.name}
                  >
                    <label className={`border-r border-1 border-solid w-1/2 ${index == 0 ? '' : 'border-t'} `}>{med.name}</label>
                    <label className={`border-1 border-solid w-1/2 text-center ${index == 0 ? '' : 'border-t'} `}>${med.cost}</label>
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
                  data={meds_consumed}
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
                  <Bar dataKey="consumption" fill="#eb1af2" activeBar={<Rectangle fill="eb1af2" stroke="eb1af2" />} />
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
                    data={meds_values}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total_value"
                  >
                    {meds_consumed.map((med, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className='flex flex-col mt-10 border border-solid rounded p-2'>
              {meds_values.map((med_value, index) => (
                med_value.total_value > 0 &&
                <div
                className='flex flex-row'
                  key={med_value.med.name}
                >
                  <label className={`border-r border-1 border-solid w-1/2 ${index == 0 ? '' : 'border-t'} `}>{med_value.med.name}</label>
                  <label className={`border-1 border-solid w-1/2 text-center ${index == 0 ? '' : 'border-t'} `}>${med_value.total_value}</label>
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
                    data={meds_values}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="med.name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total_value" fill="#e0da38" activeBar={<Rectangle fill="#e0da38" stroke="#e0da38" />} />
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
  );
}

export default ReporteMedicacion;
