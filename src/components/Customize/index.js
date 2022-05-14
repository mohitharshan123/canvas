import useStore from "../store";
import CustomizeContainer from "./Container";
import CustomizeText from "./Text";

const Customize = () => {
  const { selectedShape } = useStore();
  return (
    <>
      {selectedShape.type === "rectangle" && <CustomizeContainer />}
      {selectedShape.type === "text" && <CustomizeText />}
    </>
  );
};
export default Customize;
