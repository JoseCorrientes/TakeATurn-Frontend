import FondoAzul from "../../assets/FondoAzul.jpg";

function NotFound() {
  return (
    <div
      className="flex flex-row justify-center w-auto h-screen  bg-fixed bg-contain bg-right bg-mayra-dark-blue  "
      style={{ backgroundImage: `url(${FondoAzul})` }}
    >
      <div className="flex flex-col items-center justify-center mt-[1rem] w-11/12 h-5/6 border-[2px] rounded-lg border-mayra-dark-blue  bg-black opacity-80  sm:mt-[4rem] sm:w-3/5 sm:h-2/3 sm:border-[4px] ">
        <h1 className="text-white font-Saira text-2xl sm:text-3xl w-3/4  font-light  mb-6 text-center">
          404 - Página Inexistente
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
