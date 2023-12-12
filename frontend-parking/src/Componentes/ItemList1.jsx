import { ImgCircle } from "./imgCircle";

export default function ItemList({ Data }) {
  return (
    <div className=" flex w-full h-12 bg-[#fff] rounded-[1rem] shadow-lg  justify-evenly items-center">
        <div className="h-[4vh] w-[4vh] rotate-90">
            <ImgCircle pathI="testVehicle.jpg" />
        </div>

        {Data.map((item, index) => (
        <div className=" basis-[20%] text-center 	">{item}</div>
        ))}

      </div>
  );
}
