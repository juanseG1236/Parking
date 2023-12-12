import { ImgCircle } from "./imgCircle";
import SettingsIcon from "./SettingIcon";
import TextModule from "./textModule";

export default function ProfileDashboard({ user, name, _id }) {
  return (
    <div className="flex flex-col  bg-[#fff] p-7 pt-5 rounded-modules w-full h-full">
        <SettingsIcon/>
        <div className="flex grow justify-evenly items-center ">
            <div className="flex basis-1/3">
              <ImgCircle pathI="testProfile1.jpg" />
            </div>
            <div className="flex flex-col w-1/2 h-full pt-[13%] max-sm:pt-1">
              <h1 className="text-xl font-semibold">Angie Benavides</h1>
              <TextModule text1="usuario:" text2={user} Bold />
              <TextModule text1="nombre:" text2={name} />
              <TextModule text1="id:" text2={_id} />
            </div>
          </div>
        </div>
   );
}
