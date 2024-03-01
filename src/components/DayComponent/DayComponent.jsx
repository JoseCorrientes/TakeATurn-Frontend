import { useDispatch, useSelector } from "react-redux";
import { activateDay } from "../../actions/actions";
import { useEffect, useState } from "react";

function DayComponent({ data, handleOneDay }) {
  const dispatch = useDispatch();
  const [passedDay, setPassedDay] = useState(false);
  const dataMonthToSeek = useSelector((state) => state.dataMonthToSeek);

  useEffect(() => {
    let today = new Date();
    let actualYear = today.getFullYear();
    let actualMonth = today.getMonth() + 1;
    let actualDay = today.getDate();
    if (data.type == "day") {
      let day = data.day;
      let month = dataMonthToSeek.month;
      let year = dataMonthToSeek.year;
      if (
        year < actualYear ||
        (year == actualYear && month < actualMonth) ||
        (year == actualYear && month == actualMonth && day < actualDay)
      )
        setPassedDay(true);
      else setPassedDay(false);
    }
  }, [data]);

  //Funcion que activa un dia completo desactivado
  const handleActivateDay = async (data) => {
    let data1 = {
      year: Number(dataMonthToSeek.year),
      month: Number(dataMonthToSeek.month),
      day: data.day,
      doctor: dataMonthToSeek.idDoctor,
    };
    dispatch(activateDay(data1));
  };

  let loginDoctorValid = useSelector((state) => state.loginDoctorValid);
  let dayWithOwnTurns = useSelector((state) => state.dayWithOwnTurns);

  if (data.type == "initial") {
    return (
      <div
        className={`rounded-md w-full h-10 sm:h-20 border border-gray-600 bg-gray-600 bg-opacity-30 bg-shadow-black bg-shadow-2xl`}
      ></div>
    );
  }

  if (data.type == "blank") {
    return <div className={`w-full h-10 sm:h-20`}></div>;

    //parte que pinta en otro color si tiene turno  --
  } else if (
    data.type == "day" &&
    data.offDuty == false &&
    dayWithOwnTurns.includes(data.day) &&
    !passedDay
  )
    return (
      <button
        className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-red-800 bg-opacity-30 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-800 hover:bg-opacity-70 "
        onClick={() => handleOneDay(data.day)}
      >
        {data.day}
      </button>
    );
  else if (
    data.type == "day" &&
    data.offDuty == true &&
    !loginDoctorValid &&
    !passedDay
  )
    return <div className={`w-full h-10 sm:h-20 `}></div>;
  else if (
    data.type == "day" &&
    data.offDuty == true &&
    loginDoctorValid &&
    !passedDay
  )
    return (
      <button
        className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-white bg-opacity-0 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-700 hover:bg-opacity-70"
        onClick={() => handleActivateDay(data)}
      >
        {data.day}
      </button>
    );
  else if (!passedDay)
    return (
      <button
        className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-white bg-opacity-30 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-700 hover:bg-opacity-70"
        onClick={() => handleOneDay(data.day)}
      >
        {data.day}
      </button>
    );
  else if (passedDay)
    return (
      <div className="rounded-md w-full h-10 sm:h-20 border border-gray-600 bg-gray-600 bg-opacity-30 bg-shadow-black bg-shadow-2xl"></div>
    );
}

export default DayComponent;
