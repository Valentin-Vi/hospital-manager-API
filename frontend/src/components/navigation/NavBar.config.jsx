import InventarioCreate from "../service/InventarioCreate";
import ConsultarTurnos from "../service/ConsultarTurnos";
import HistMedico from "../service/HistMedico";
import HistPaciente from "../service/HistPaciente";
import Inventario from "../service/Inventario";
import Medicacion from "../service/Medicacion";
import MedicacionCreate from "../service/MedicacionCreate";
import ReporteFinanciero from "../service/ReporteFinanciero";
import ReporteInventario from "../service/ReporteInventario";
import ReporteMedicacion from "../service/ReporteMedicacion";
import ReporteVisitas from "../service/ReporteVisitas";
import Reserva from "../service/Reserva";
import Welcome from "../service/Welcome";

export const navbarList = [
    {
        value: 'Bienvenido',
        allowedRoles: [0, 1, 2, 3, 4],
        path: '/welcome',
        element: <Welcome />,
    }, {
        value: 'Consulta de Turnos',
        allowedRoles: [1, 2, 3, 4],
        path: '/turnos',
        element: <ConsultarTurnos />,
    }, {
        value: 'Reservar Turno',
        allowedRoles: [1, 3, 4],
        path: '/reservar',
        element: <Reserva />,
    }, {
        value: 'Historial Medico',
        allowedRoles: [1, 2, 4],
        path: '/historial/medico',
        element: <HistMedico />,
    }, {
        value: 'Historial de Paciente',
        allowedRoles: [2, 4],
        path: '/historial/paciente',
        element: <HistPaciente />,
    }, {
        value: 'Gestion de Inventario',
        allowedRoles: [3, 4],
        path: '/inventario',
        element: <Inventario />,
    }, {
        value: 'Insertar en Inventario',
        allowedRoles: [3, 4],
        path: '/insertItem',
        element: <InventarioCreate />,
    }, {
        value: 'Medicacion',
        allowedRoles: [2, 4],
        path: '/medicacion',
        element: <Medicacion />,
    }, {
        value: 'Insertar en Medicacion',
        allowedRoles: [3, 4],
        path: '/insertMed',
        element: <MedicacionCreate />,
    }, {
        value: 'Reporte Financiero',
        allowedRoles: [3, 4],
        path: '/reportes/financiero',
        element: <ReporteFinanciero />,
    }, {
        value: 'Reporte de Inventario',
        allowedRoles: [3, 4],
        path: '/reportes/inventario',
        element: <ReporteInventario />,
    }, {
        value: 'Reporte de Medicacion',
        allowedRoles: [3, 4],
        path: '/reportes/medicacion',
        element: <ReporteMedicacion />,
    }, {
        value: 'Reporte de Visitas',
        allowedRoles: [3, 4],
        path: '/reportes/visitas',
        element: <ReporteVisitas />,
    },
];