import ConsultarTurnos from "./ConsultarTurnos";
import HistMedico from "./HistMedico";
import HistPaciente from "./HistPaciente";
import Inventario from "./Inventario";
import Medicacion from "./Medicacion";
import ReporteFinanciero from "./ReporteFinanciero";
import ReporteInventario from "./ReporteInventario";
import ReporteMedicacion from "./ReporteMedicacion";
import ReporteVisitas from "./ReporteVisitas";
import Reserva from "./Reserva";
import Welcome from "./Welcome";
import InventarioCreate from "./InventarioCreate";
import MedicacionCreate from "./MedicacionCreate";
import Usuarios from "./Usuarios";
import UsuarioCreate from "./UsuarioCreate";
import UserUpdate from "./UserUpdate";
import HistMedCreate from "./HistMedCreate";
import HistMedDesc from "./HistMedDesc";
import DepartCreate from "./DepartCreate";

// -------------- //
//  USER TYPES    //
//                //
//  [ 1 ] Client  //
//  [ 2 ] Doctor  //
//  [ 3 ] Desk    //
//  [ 4 ] Admin   //
// -------------- //

export const servicesList = [
    {
        value: 'Bienvenido',
        allowedRoles: [1, 2, 3, 4],
        path: '/welcome',
        element: <Welcome />,
    }, {
        value: 'Consulta de Turnos',
        allowedRoles: [1, 3, 4],
        path: '/turn',
        element: <ConsultarTurnos />,
    }, {
        value: 'Reservar Turno',
        allowedRoles: [1, 3, 4],
        path: '/res',
        element: <Reserva />,
    }, {
        value: 'Historial Medico',
        allowedRoles: [1, 2],
        path: '/hist/med',
        element: <HistMedico />,
    }, {
        value: 'Insertar Historial Medico',
        allowedRoles: [2],
        path: '/hist/med/insert',
        element: <HistMedCreate />,
        invisible: true
    }, {
        value: 'Historial de Paciente',
        allowedRoles: [2, 4],
        path: '/hist/paciente',
        element: <HistPaciente />,
        invisible: true,
    }, {
        value: 'Inventario',
        allowedRoles: [3, 4],
        path: '/inv',
        element: <Inventario />,
    }, {
        value: 'Insertar en Inventario',
        allowedRoles: [3, 4],
        path: '/inv/insert',
        element: <InventarioCreate />,
        invisible: true,
    }, {
        value: 'Medicacion',
        allowedRoles: [3, 4],
        path: '/med',
        element: <Medicacion />,
    }, {
        value: 'Insertar en Medicacion',
        allowedRoles: [3, 4],
        path: '/med/insert',
        element: <MedicacionCreate />,
        invisible: true,
    }, {
        value: 'Reporte Financiero',
        allowedRoles: [3, 4],
        path: '/rep/fin',
        element: <ReporteFinanciero />,
        invisible: true,
    }, {
        value: 'Reporte de Inventario',
        allowedRoles: [3, 4],
        path: '/rep/inv',
        element: <ReporteInventario />,
    }, {
        value: 'Reporte de Medicacion',
        allowedRoles: [3, 4],
        path: '/rep/med',
        element: <ReporteMedicacion />,
    }, {
        value: 'Reporte de Visitas',
        allowedRoles: [3, 4],
        path: '/rep/vis',
        element: <ReporteVisitas />,
    }, {
        value: 'Gestion de Usuarios',
        allowedRoles: [4],
        path: '/usr',
        element: <Usuarios />,
    }, {
        value: 'Insertar Usuario',
        allowedRoles: [4],
        path: '/usr/insert',
        element: <UsuarioCreate />,
        invisible: true
    }, {
        value: 'Actualizar Usuario',
        allowedRoles: [4],
        path: '/usr/update/:id',
        element: <UserUpdate />,
        invisible: true
    }, {
        value: 'Description',
        allowedRoles: [1, 2],
        path: '/hist/med/:id',
        element: <HistMedDesc />,
        invisible: true
    }, {
        value: 'Crear Departamento',
        allowedRoles: [4],
        path: '/dpt/crear',
        element: <DepartCreate />,
        invisible: true
    }
];