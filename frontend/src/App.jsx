import { CookiesProvider } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import AuthProvider from './security/AuthProvider';

const router = createBrowserRouter(PublicRoutes);

const App = () => {
  return (
    <div className='h-screen'>
      <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={ router } />
        </AuthProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;