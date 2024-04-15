import { ImgCircle } from "./imgCircle";
export default function ItemListReserve({Data}) {

  const data = (Object.values(Data))
    return (
    <div className=" flex w-full h-20 bg-[#fff] rounded-[1rem] shadow-lg  justify-evenly items-center">
        <div className="h-[10vh] w-[10vh]  max-sm:h-[2rem] max-sm:w-[2rem]">
        <ImgCircle pathI="carBlack.png" />
        </div>

        <div className=" basis-[20%] text-center max-sm:text-[0.4rem]	">{Data._id}</div>
        <div className=" basis-[20%] text-center max-sm:text-[0.4rem]	">{Data.vehiclePlate.plate}</div>
        <div className=" basis-[20%] text-center max-sm:text-[0.4rem]	">{Data.date}</div>

      </div>
  );
}
