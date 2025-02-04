// import { Tooltip } from '@material-tailwind/react';
// import React from 'react'
// import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer } from 'recharts';

// const data01 = [
//   { hour: '12a', index: 1, value: 170 },
//   { hour: '1a', index: 1, value: 180 },
//   { hour: '2a', index: 1, value: 150 },
//   { hour: '3a', index: 1, value: 120 },
//   { hour: '4a', index: 1, value: 200 },
//   { hour: '5a', index: 1, value: 300 },
//   { hour: '6a', index: 1, value: 400 },
//   { hour: '7a', index: 1, value: 200 },
//   { hour: '8a', index: 1, value: 100 },
//   { hour: '9a', index: 1, value: 150 },
//   { hour: '10a', index: 1, value: 160 },
//   { hour: '11a', index: 1, value: 170 },
//   { hour: '12a', index: 1, value: 180 },
//   { hour: '1p', index: 1, value: 144 },
//   { hour: '2p', index: 1, value: 166 },
//   { hour: '3p', index: 1, value: 145 },
//   { hour: '4p', index: 1, value: 150 },
//   { hour: '5p', index: 1, value: 170 },
//   { hour: '6p', index: 1, value: 180 },
//   { hour: '7p', index: 1, value: 165 },
//   { hour: '8p', index: 1, value: 130 },
//   { hour: '9p', index: 1, value: 140 },
//   { hour: '10p', index: 1, value: 170 },
//   { hour: '11p', index: 1, value: 180 },
// ];

// const data02 = [
//   { hour: '12a', index: 1, value: 160 },
//   { hour: '1a', index: 1, value: 180 },
//   { hour: '2a', index: 1, value: 150 },
//   { hour: '3a', index: 1, value: 120 },
//   { hour: '4a', index: 1, value: 200 },
//   { hour: '5a', index: 1, value: 300 },
//   { hour: '6a', index: 1, value: 100 },
//   { hour: '7a', index: 1, value: 200 },
//   { hour: '8a', index: 1, value: 100 },
//   { hour: '9a', index: 1, value: 150 },
//   { hour: '10a', index: 1, value: 160 },
//   { hour: '11a', index: 1, value: 160 },
//   { hour: '12a', index: 1, value: 180 },
//   { hour: '1p', index: 1, value: 144 },
//   { hour: '2p', index: 1, value: 166 },
//   { hour: '3p', index: 1, value: 145 },
//   { hour: '4p', index: 1, value: 150 },
//   { hour: '5p', index: 1, value: 160 },
//   { hour: '6p', index: 1, value: 180 },
//   { hour: '7p', index: 1, value: 165 },
//   { hour: '8p', index: 1, value: 130 },
//   { hour: '9p', index: 1, value: 140 },
//   { hour: '10p', index: 1, value: 160 },
//   { hour: '11p', index: 1, value: 180 },
// ];

// const parseDomain = () => [
//   0,
//   Math.max(
//     Math.max.apply(
//       null,
//       data01.map((entry) => entry.value),
//     ),
//     Math.max.apply(
//       null,
//       data02.map((entry) => entry.value),
//     ),
//   ),
// ];


// function ReporteVisitas() {
//   const domain = parseDomain();
//   const range = [16, 225];

//   let renderTooltip = (props) => {
//     const { active, payload } = props;

//     if (active && payload && payload.length) {
//       const data = payload[0] && payload[0].payload;

//       return (
//         <div
//           style={{
//             backgroundColor: '#fff',
//             border: '1px solid #999',
//             margin: 0,
//             padding: 10,
//           }}
//         >
//           <p>{data.hour}</p>
//           <p>
//             <span>value: </span>
//             {data.value}
//           </p>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <main className='flex items-center justiify-cente py-24'>
//       <ResponsiveContainer width={'100%'} height={60}>
//         <ScatterChart>
//           <XAxis
//           type='category'
//           dataKey='hour'
//           interval={0}
//           tick={{ fontSize: 0 }}
//           tickLine={{ transform: 'translate(0, -6)'} }
//           />
//           <YAxis
//             type="number"
//             dataKey="index"
//             name="sunday"
//             height={10}
//             width={80}
//             tick={false}
//             tickLine={false}
//             axisLine={false}
//             label={{ value: 'Sunday', position: 'insideRight' }}
//           />
//           <ZAxis type="number" dataKey="value" domain={domain} range={range} />
//           <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
//           <Scatter data={data01} fill='#000000' />
//         </ScatterChart>
//       </ResponsiveContainer>
//     </main>
//   );
// }

// export default ReporteVisitas

// import React, { useState, useEffect } from 'react'
// import { servApi } from '../../util/fetch'

// function ReporteVisitas() {

//   const [canceledVisits, setCanceledVisits] = useState(null)
//   const [cancellationRate, setCancellationRate] = useState(null)
//   const [completedVisits, setCompletedVisits] = useState(null)
//   const [newPatientsCount, setNewPatientsCount] = useState(null)
//   const [returningPatientsCount, setReturningPatientsCount] = useState(null)
//   const [totalVisits, setTotalVisits] = useState(null)
//   const [visitCounts, setVisitCounts] = useState(null)

//   useEffect(() => {
//     fetchData()
//   }, [])

//   async function fetchData() {
//     const res = await servApi('/turn/report', { method: 'POST' })
//     const body = await res.json()

//     setCanceledVisits(body.canceledVisits)
//     setCancellationRate(body.cancellationRate)
//     setCompletedVisits(body.completedVisits)
//     setNewPatientsCount(body.newPatientsCount)
//     setReturningPatientsCount(body.returningPatientsCount)
//     setTotalVisits(body.totalVisits)
//     setVisitCounts(body.visitCounts)
//   }

//   return (
//     <>
//       <div className='text-xl'>ReporteVisitas</div>
//     </>
//   )
// }

// export default ReporteVisitas
import React, { useState, useEffect } from 'react';
import { servApi } from '../../util/fetch';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

function ReporteVisitas() {
  const [canceledVisits, setCanceledVisits] = useState(null);
  const [cancellationRate, setCancellationRate] = useState(null);
  const [completedVisits, setCompletedVisits] = useState(null);
  const [newPatientsCount, setNewPatientsCount] = useState(null);
  const [returningPatientsCount, setReturningPatientsCount] = useState(null);
  const [totalVisits, setTotalVisits] = useState(null);
  const [visitCounts, setVisitCounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await servApi('/turn/report', { method: 'POST' });
    const body = await res.json();

    setCanceledVisits(body.canceledVisits);
    setCancellationRate(body.cancellationRate);
    setCompletedVisits(body.completedVisits);
    setNewPatientsCount(body.newPatientsCount);
    setReturningPatientsCount(body.returningPatientsCount);
    setTotalVisits(body.totalVisits);
    setVisitCounts(body.visitCounts);
  }

  const COLORS = [
    '#4CAF50', '#FF5722', '#FFC107', '#3F51B5', '#009688', '#8BC34A', '#FF9800', '#9C27B0', 
    '#00BCD4', '#CDDC39', '#FFEB3B', '#673AB7', '#E91E63', '#03A9F4', '#795548', '#2196F3',
    '#607D8B', '#FF4081', '#00E676', '#D32F2F'
  ];  

  const visitsPieData = [
    { name: 'Visitas Completadas', value: completedVisits },
    { name: 'Visitas Canceladas', value: canceledVisits },
  ];

  const visitCountsByDepartment = visitCounts.reduce((acc, visit) => {
    const dept = visit.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + visit.visitCount;
    return acc;
  }, {});

  const departmentBarData = Object.entries(visitCountsByDepartment).map(([department, visitCount]) => ({
    department,
    visitCount,
  }));

  const demographicsPieData = [
    { name: 'Nuevos Pacientes', value: newPatientsCount },
    { name: 'Pacientes Recurrentes', value: returningPatientsCount },
  ];

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-6'>Reporte de Visitas</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h3 className='text-xl font-semibold mb-4'>Visita y Cancelaciones Totales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={visitsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {visitsPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className='mt-4'>Visitas Totales: {totalVisits}</p>
          <p>Visitas Canceladas: {canceledVisits} ({cancellationRate?.toFixed(2)}%)</p>
        </div>

        <div className='bg-white p-4 shadow rounded-lg'>
          <h3 className='text-xl font-semibold mb-4'>Demograficas de Pacientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={demographicsPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {demographicsPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index + 2]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className='mt-4'>Nuevos Pacientes: {newPatientsCount}</p>
          <p>Pacientes Recurrentes: {returningPatientsCount}</p>
        </div>

        <div className='bg-white p-4 shadow rounded-lg col-span-1 md:col-span-2'>
          <h3 className='text-xl font-semibold mb-4'>Visitas por Departamento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentBarData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitCount" fill="#42A5F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ReporteVisitas;
