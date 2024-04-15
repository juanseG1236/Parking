import { ImgCircle } from "./imgCircle";
export default function ItemList({ Data }) {
  const data = Object.values(Data);

  return (
    <div key={Data.idVehicle.plate} className="flex w-full h-20 bg-[#fff] rounded-[1rem] shadow-lg justify-evenly items-center">
      <div className="h-[10vh] w-[10vh]  max-sm:h-[2rem] max-sm:w-[2rem]">
        <ImgCircle pathI="carBlack.png" />
      </div>

      <div className="basis-[20%] text-center max-sm:text-[0.4rem]">{Data.idVehicle.plate}</div>
      <div className="basis-[20%] text-center max-sm:text-[0.4rem]">{Data.timeEntry}</div>
      <div className="basis-[20%] text-center max-sm:text-[0.4rem]">{Data.timeExit}</div>
      <div className="basis-[20%] text-center max-sm:text-[0.4rem]">{Data.price}</div>
      <div className="basis-[20%] text-center max-sm:text-[0.4rem]">{Data.idPuesto}</div>
    </div>
  );
}

