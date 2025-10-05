import ProfileBtn from "./ProfileBtn";
import SettingsBtn from "./SettingsBtn";

function Slide() {
  return (
    <div className="bg-gray-100 w-[2.5rem] h-full flex flex-col justify-end items-center ">
      <ProfileBtn />
      <SettingsBtn />
    </div>
  );
}

export default Slide;
