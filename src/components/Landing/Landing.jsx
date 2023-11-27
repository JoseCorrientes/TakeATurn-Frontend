//POR HACER  el select en modo celular sale de linea

import { useEffect, useState } from 'react';
import FondoAzul from '../../assets/FondoAzul.jpg';
import { fillClientData } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Landing() {
 
  const dispatch = useDispatch()
  const [user, setUser] = useState('');
  const [email, setEmail]=useState('');  
  const [doctor, setDoctor] = useState(0);
  const [emailValid, setEmailValid] = useState(false)
  const [userValid, setUserValid] = useState(false);  

  const handleChangeUser = (e)=>{
    setUser(e.target.value)
    if (e.target.value.length>10) setUserValid(true)
    else setUserValid(false);
  }
  const handleChangeDoctor = (e)=>{
    setDoctor(e.target.value)
    
  }
  const handleChangeEmail = (e)=>{
    let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    setEmail(e.target.value)
    if (regex.test(e.target.value)) setEmailValid(true)
    else setEmailValid(false)
  }

const handleSearch = ()=>{
    let data={
        user,
        email,
        doctor,
        admin: false,
        
    }

    dispatch(fillClientData(data))    
}

  return (
    <div
        className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
        // className="flex flex-row justify-center w-auto h-screen  bg-no-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
        style={{backgroundImage: `url(${FondoAzul})`}}
    >
        
        
        {/* <div
        className=' flex flex-col bg-black bg-opacity-50 w-full justify-center items-center'
        > */}
            <div
                className='flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-3/6 sm:border-[4px]'
            >
                <h1
                className='text-white font-Saira text-2xl sm:text-3xl  font-light text-center mb-4 ' 
                >
                Buscador de Turnos
                </h1>
                <input 
                    className='w-3/4 h-[2rem] px-1 mb-4 sm:w-1/3  sm:h-1/6 sm:px-2 sm:mb-1  text-center'
                    placeholder='Ingrese su @mail'
                    name={email}
                    value={email}
                    onChange={(e)=>handleChangeEmail(e)}
                />
                <input 
                    className='w-3/4 h-[2rem] px-1 sm:w-1/3 mb-4 sm:h-1/6 sm:px-2 sm:mb-1  text-center'
                    // className='flex flex-row w-1/3 h-1/6 px-2 text-center mb-1'
                    placeholder='Ingrese su Nombre y Apellido'
                    name='user'
                    value={user}
                    onChange={(e)=>handleChangeUser(e)}
                />
                <select
                    className='static flex flex-row justify-center  w-3/4 h-[2rem] px-1 sm:w-1/3 mb-4 sm:h-1/6 sm:px-2 sm:mb-1  text-center'
                    //className='w-1/3 h-1/6 text-center'
                    onChange={(e)=>handleChangeDoctor(e)}
                >
                    <option
                        className='bg-white text-gray-400'  
                        value={0}
                    >Seleccione Doctor</option>
                    <option
                        className=''
                        value={1}
                    >Maira Aresti</option>
                    <option
                        value={2}
                    >Melissa Aguirre</option>
                </select>
               

                {emailValid && userValid && doctor!=0 && <Link
                    className='flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-1/6  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl ' 
                    // className='flex flex-row justify-center items-center mt-3 w-1/6 h-1/6  text-center border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl ' 
                    onClick={handleSearch}
                    to={'/month'}
                >
                    Buscar
                </Link>
}
                {(!emailValid || !userValid || doctor==0  ) && <button
                    className='flex flex-row justify-center items-center mt-3 w-2/3 sm:w-1/6 h-1/6 border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20'
                    // className='flex flex-row justify-center items-center mt-3 w-1/6 h-1/6 border-2 border-mayra-light-blue rounded-lg font-Saira text-2xl sm:text-3xl text-white font-light opacity-20'
                    disabled 
                >
                    Buscar
                </button>
                }



            </div>
    </div>
  )
}

export default Landing
