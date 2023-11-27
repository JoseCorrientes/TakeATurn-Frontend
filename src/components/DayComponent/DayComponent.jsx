import { useSelector } from "react-redux"



function DayComponent({data, handleOneDay}) {
    
    let dayWithOwnTurns = useSelector(state=>state.dayWithOwnTurns);


        
    if (data.type=='initial') {
        return (
            <div
                 className={`rounded-md w-full h-10 sm:h-20 border border-gray-600 bg-gray-600 bg-opacity-30 bg-shadow-black bg-shadow-2xl`} 
            >
            </div>
        )
  }  
  if (data.type=='blank' ) {
        return(
            <div
                 className={`w-full h-10 sm:h-20 `} 
            >
            </div>
        )
//parte que pinta en otro color si tiene turno        
} else if (data.type=='day' && dayWithOwnTurns.includes(data.day)) 
    return (<button
            className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-red-800 bg-opacity-30 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-800 hover:bg-opacity-70" 
            onClick={()=>handleOneDay(data.day)}
        >
            
           {data.day}    
    
    
    
        </button>
      ) 
else
       return (
            <button
                className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-white bg-opacity-30 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-700 hover:bg-opacity-70" 
                onClick={()=>handleOneDay(data.day)}
            >
                
            {data.day}    



            </button>
        )
}



export default DayComponent





































// function DayComponent({data, handleOneDay}) {
  
//     if (data.type=='initial') {
//         return (
//             <div
//                  className={`rounded-md w-full h-20 border border-gray-600 bg-gray-600 bg-opacity-30 bg-shadow-black bg-shadow-2xl`} 
//             >
//             </div>
//         )
//   }  
//   if (data.type=='blank' ) {
//         return(
//             <div
//                  className={`w-full h-10`} 
//             >
//             </div>
//         )
// } else {
//   return (
//     <button
//         className="flex flex-col justify-center items-center rounded-md w-full h-10 sm:h-20    bg-white bg-opacity-30 font-Saira text-2xl sm:text-3xl text-white font-light hover:scale-125 hover:text-4xl sm:hover:text-5xl hover:bg-red-700 hover:bg-opacity-70" 
//         onClick={()=>handleOneDay(data.day)}
//     >
        
//        {data.day}    



//     </button>
//   )
// }
// }

// export default DayComponent