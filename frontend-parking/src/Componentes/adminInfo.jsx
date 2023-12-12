import { ImgCircle } from "./imgCircle";
import SettingsIcon from "./SettingIcon";

export default function AdminInfo({ name, user}) {
    return (
        <div className="bg-[#fff] p-7 pt-5 rounded-modules flex flex-col items-center w-full">
            <SettingsIcon />
            <div className=" rotate-90 flex justify-center w-44 h-44">
                <ImgCircle pathI="testVehicle.jpg" />
            </div>
            <h1 className=" text-xl font-semibold">Admin</h1>
            <p className=" font-Raleway" >{name} - {user}</p>
        </div>
    );
}
