import React from 'react';
import { useAuth } from '../../security/AuthProvider';
import { useNavigate, Link, useMatch, useResolvedPath } from 'react-router-dom';
import Loading from '../informative/Loading';
import { servicesList } from '../service/ServicesList.config';

function NavBar({ children }) {

    const { user, isLoading, logout } = useAuth();

    const navigate = useNavigate();

    function handleLogout(e) {
        logout();
        navigate('/login');
    };

    if(isLoading) return <Loading />;

    return (
        <nav className='w-40 pl-2 pr-2 h-full pt-3 bg-indigo-100 text-white flex-none'>
            <div className='lg:text-sm lg:leading-6 relative'>
                <ul className='w-full'>
                    <li>
                        <form onSubmit={ handleLogout } className='justify-center flex mt-2 mb-3'>
                            <button type='submit' className='text-red-500 text-center shadow-md shadow-red-400 bg-red-400 hover:bg-red-500 hover:shadow-red-600 rounded pl-2 pr-2 hover:border hover:border-solid hover:border-1 hover:border-red-600'>
                                <img
                                    className='w-[30px] h-[30px] p-1'
                                    src='src/assets/logout.png'
                                    alt='Cerrar Sesion'
                                    width='100'
                                    height='100'
                                />
                            </button>
                        </form>
                    </li>

                    {
                        servicesList.map((route, index) => (
                            route.allowedRoles.includes(user.role) &&
                            !route.invisible &&
                            <CustomLink to={route.path} key={index}>
                                {route.value}
                            </CustomLink>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );
};

function CustomLink({ to, children, ...props }) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvePath.pathname, end: true });

    return (
        <li className={`w-full ${isActive ? 'active' : ''}`}>
            <Link 
                to={to} {...props}
                className=" shadow-sm text-center block w-full text-xs bg-white border-white border-solid border-2 hover:border-indigo-600 hover:shadow-indigo-300 hover:shadow-md text-gray-700 font-bold py-1 px-4 rounded mt-2 align-middle"
            >
                {children}
            </Link>
        </li>
    );
};

export default NavBar;