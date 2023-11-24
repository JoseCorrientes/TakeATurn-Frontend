import LogoNegro from '../../assets/logoFondoNegro.jpg';

function Header() {
  return (
    <div
        className="w-auto h-auto border-2 border-black text-center bg-black text-white"
    >
        <img
            className='w-1/2 sm:w-1/3'
        
            src={LogoNegro}
            
>
        </img>


    </div>
  )
}

export default Header