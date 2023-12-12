
import { useReserves } from "../context/reserveContext";
import { ImgCircle } from "./imgCircle"
import TextModule from "./textModule"



export default function ReservationModule({fecha, placa}){

      return (

        <div className="flex flex-col  bg-[#fff] p-7 pt-5 rounded-modules w-full h-full justify-evenly items-center">
        
            <h1 className="title text-center text-2xl">Ultima Reserva</h1>
            <div className=" rotate-90 flex justify-center w-80 h-80 max-sm:h-40  max-sm:w-40">
            <ImgCircle pathI="testVehicle.jpg" />
            </div>
            <div className="flex flex-col w-1/2 gap-8 ">
                <TextModule text1="Placa" text2={placa} isBold />
                <TextModule text1="hora" text2={fecha} isBold />

            </div>
            
        </div>
    )
}