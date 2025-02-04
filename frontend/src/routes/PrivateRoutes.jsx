import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../security/ProtectedRouter';
import { servicesList } from '../components/service/ServicesList.config';

function PrivateRoutes() {
  return (
    <Routes>
      {
        servicesList.map((route, index) => (
          <Route
            path={route.path}
            key={index}
            element={
              <ProtectedRoute allowedRoles={route.allowedRoles}>
                {route.element}
              </ProtectedRoute>
            } />
        ))
      }
    </Routes>
  )
}

export default PrivateRoutes