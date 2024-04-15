import { ImgCircle } from "./imgCircle";
import SettingsIcon from "./SettingIcon";

export default function VehicleDashboard({ plate, color, type }) {
    if (plate && color && type) {
        return (
            <div className="bg-[#fff] p-7 pt-5 rounded-modules flex flex-col items-center w-full">
                <SettingsIcon />
                <div className="  flex justify-center w-44 h-44">
                    <ImgCircle pathI="carBlack.png" />
                </div>
                <h1 className=" text-xl font-semibold">{color}</h1>
                <p className=" font-Raleway" >{type} - {plate}</p>
            </div>
        );
    } else {
        return (
            <div className="bg-[#fff] p-7 pt-5 rounded-modules flex flex-col items-center w-full">
              <p>no data</p>
            </div>
        ); 
    }
    
    
}
