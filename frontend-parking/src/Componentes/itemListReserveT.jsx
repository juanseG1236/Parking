import { ImgCircle } from "./imgCircle";

export default function ItemListReserveT({ Data }) {

    const data = (Object.values(Data))
    console.log(Data)

    return (
    <div className=" flex w-full h-12 bg-[#fff] rounded-[1rem] shadow-lg  justify-evenly items-center">
        <div className="h-[4vh] w-[4vh] ">
            <ImgCircle pathI="carBlack.png" />
        </div>

        <div className=" basis-[20%] text-center 	">{Data.vehiclePlate.plate}</div>
        <div className=" basis-[20%] text-center 	">{Data.date}</div>


      </div>
  );
}




