import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearLoginDoctorAll } from "../../actions/actions"

function DoctorsMenu() {

    const navigate=useNavigate()
    const dispatch = useDispatch()

    const handleExit =()=>{
        console.log('llega a exit')
        dispatch(clearLoginDoctorAll());
        window.localStorage.clear()
        navigate('/doctors')
    }

    return (
        <div
            className="flex flex-row justify-center w-auto h-screen  bg-repeat bg-fixed bg-contain bg-right bg-mayra-dark-blue"
        >
                <div
                    className='flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-auto sm:border-[4px] '
                >
                    <h1
                    className='text-white font-Saira text-2xl sm:text-3xl sm:mt-[1rem]  font-light text-center mb-6 ' 
                    >
                    Opciones del Doctor
                    </h1>



                    <button 
                        className="rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white text-center font-Saira sm:font-normal sm:text-lg hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl sm:hover:font-thin"
                    >Listar Turnos Diario
                    </button>








                    <button 
                        className="rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white text-center font-Saira sm:font-normal sm:text-lg hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl sm:hover:font-thin"
                    >Cambiar Status de un Día
                    </button>


                    <button 
                       className="rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white text-center font-Saira sm:font-normal sm:text-lg hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl sm:hover:font-thin"
                    >Cancelar un Turno
                    </button>

                    <button 
                          className="rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-1 text-white text-center font-Saira sm:font-normal sm:text-lg hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl sm:hover:font-thin"
                    >Informacion de un Turno
                    </button>

                    <button 
                        
                        className="rounded-lg border-2 border-mayra-light-blue w-3/4 h-[4rem] px-1 mb-8 text-white text-center font-Saira sm:font-normal sm:text-lg hover:bg-black hover:border-4 hover:border-mayra-light-blue hover:text-4xl sm:hover:font-thin"
                    >Cambiar Contraseña
                    </button>

                    <button 
                        className='flex flex-row justify-center items-center w-2/3 sm:w-3/4 sm:h-[4rem] h-1/6  text-center border-2 border-mayra-push-red rounded-lg font-Saira text-2xl sm:text-3xl text-white font-thin hover:bg-black hover:border-4 hover:border-mayra-push-red hover:text-4xl ' 
                        onClick={()=>handleExit()}
                    >Salir del Sistema
                    </button>
    
                </div>
        </div>
      )
} 

export default DoctorsMenu 