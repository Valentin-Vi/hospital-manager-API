import { useEffect, useState } from 'react';
import { servApi } from '../../util/fetch';
import { useParams } from 'react-router-dom';

function UserUpdate() {
    const { id } = useParams();
    
    const [ user_id, setUser_id ] = useState(id);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ role, setRole ] = useState('');
    const [ userType, setUserType ] = useState('CLIENT');  // Initial value set to 'CLIENT'
    const [ type, setType ] = useState('');
    const [ department_id, setDepartment_id ] = useState(0);

    function handleUserUpdateSubmit(e) {
        e.preventDefault();

        servApi('/user/asymetricUpdateById', {
            method: 'POST',
            body: JSON.stringify({
                user_id: parseInt(user_id),
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                role: parseInt(role),
            }),
        });

        
    };

    useEffect(() => console.log(id), [id]);

    return (
        <div>
            <label className='text-xl'>Actualizar Usuario</label>
            <br/>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <select
                        name='userType'
                        value={userType}  // Controlled select input
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value='CLIENT'>Client</option>
                        <option value='DOCTOR'>Doctor</option>
                        <option value='DESK'>Desk</option>
                        <option value='ADMIN'>Admin</option>
                    </select>
                </div>

                { userType === 'DOCTOR' && 
                    (<div>
                        <form onSubmit={handleUserUpdateSubmit}>
                            <div>
                                <input type='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='firstname' required onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='lastname' required onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div>
                                <input type='number' placeholder='role' required onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='tipo' required onChange={(e) => setType(e.target.value)} />
                            </div>
                            <div>
                                <input type='number' placeholder='department_id' required onChange={(e) => setDepartment_id(e.target.value)} />
                            </div>
                            <div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>)
                }

                { userType === 'CLIENT' &&
                    (<div>
                        <form onSubmit={handleUserUpdateSubmit}>
                            <div>
                                <input type='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='firstname' required onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='lastname' required onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div>
                                <input type='number' placeholder='role' required onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>)
                }

                { (userType === 'ADMIN' || userType === 'DESK') &&   // Parentheses around the condition
                    (<div>
                        <form onSubmit={handleUserUpdateSubmit}>
                            <div>
                                <input type='email' placeholder='email' required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='firstname' required onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div>
                                <input type='text' placeholder='lastname' required onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div>
                                <input type='number' placeholder='role' required onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div>
                                <input type='number' placeholder='department_id' required onChange={(e) => setDepartment_id(e.target.value)} />
                            </div>
                            <div>
                                <button type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>)
                }   
            </div>
        </div>
    );
};

export default UserUpdate;
