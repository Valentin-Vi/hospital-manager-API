import NavBar from '../navigation/NavBar';
import PrivateRoutes from '../../routes/PrivateRoutes';

function Home() {
    return (
        <div className='flex w-full h-full bg-gray-100'>
            <NavBar className='w-64 fixed'/>
            <div className='flex-grow overflow-scroll rounded-lg p-4 m-3 bg-white shadow-md'>
                <PrivateRoutes/>                
            </div>
        </div>
        
    );
};

export default Home;