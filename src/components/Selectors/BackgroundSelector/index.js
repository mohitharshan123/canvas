import useStore from "../../store";
import { bg1, bg2, bg3, bg4 } from "../../../assets";

const BackgroundSelector = () => {
  const { setSelectedBackground } = useStore();
  return (
    <div className="flex flex-col space-y-3 w-full">
      <span className="text-blue-800 font-bold">Background</span>
      <div className="flex flex-row space-x-4 cursor-pointer h-20 w-1/2">
        <img src={bg1} onClick={() => setSelectedBackground(bg1)} />
        <img src={bg2} onClick={() => setSelectedBackground(bg2)} />
      </div>
      <div className="flex flex-row space-x-4 cursor-pointer h-20 w-1/2">
        <img src={bg3} onClick={() => setSelectedBackground(bg3)} />
        <img src={bg4} onClick={() => setSelectedBackground(bg4)} />
      </div>
    </div>
  );
};

export default BackgroundSelector;
