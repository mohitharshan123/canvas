import ContainerSelector from "./Container";
import BackgroundSelector from "./BackgroundSelector";
import TextSelector from "./Text";

const Selectors = () => {
  return (
    <div className="flex flex-col space-y-3 p-3 items-center w-full">
      <div>
        <BackgroundSelector />
      </div>
      <div>
        <p className="text-sm font-bold text-blue-900">Container</p>
        <ContainerSelector />
      </div>
      <div>
        <p className="text-sm font-bold text-blue-900">Text</p>
        <TextSelector />
      </div>
    </div>
  );
};

export default Selectors;
