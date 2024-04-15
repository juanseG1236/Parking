import { ImgCircle } from "./imgCircle";

export default function ItemListTicketT({ Data }) {

    const data = (Object.values(Data))
    console.log(Data)

    return (
    <div className=" flex w-full h-12 bg-[#fff] rounded-[1rem] shadow-lg  justify-evenly items-center">
        <div className="h-[4vh] w-[4vh] ">
            <ImgCircle pathI="carBlack.png" />
        </div>

        <div className=" basis-[20%] text-center 	">{Data.idVehicle.plate}</div>
        <div className=" basis-[20%] text-center 	">{Data.timeEntry}</div>


      </div>
  );
}




