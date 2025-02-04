import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Unauthorized from '../components/error/Unauthorized';
import Error from '../components/error/Error';
import NotFound from '../components/error/NotFound';
import ProtectedRoute from '../security/ProtectedRouter';
import Home from '../components/service/Home';

export const PublicRoutes = [  
    {
        path: '/*',
        element: (
            <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
                <Home />
            </ProtectedRoute>
        ),
        errorElement: <Error />,
    }, {
        path: '/signup',
        element: <Register />,
        errorElement: <Error />,
    }, {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    }, {
        path: '/error',
        element: <Error />,
    }, {
        path: '/unauthorized',
        element: <Unauthorized />,
    }, {
        path: '/notfound',
        element: <NotFound />,
    }
];