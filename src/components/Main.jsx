import Playground from "./Playground";
import { useState } from "react";
import { useCallback } from "react";
import Selectors from "./Selectors";
import useStore from "./store";
import Customize from "./Customize";

const Main = () => {
  const { selectedShape, setSelectedShape } = useStore();

  const checkDeselect = useCallback((e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShape(null);
    }
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex flex-row space-x-2 p-2 overflow-hidden">
      <div className="flex flex-auto bg-white w-3/4 shadow-md rounded-2xl resize-x">
        <Playground checkDeselect={checkDeselect} />
      </div>
      <div className="flex flex-auto bg-gradient-to-r from-cyan-500 to-blue-500 w-1/4 shadow-md rounded-2xl">
        {!selectedShape ? <Selectors /> : <Customize />}
      </div>
    </div>
  );
};

export default Main;
