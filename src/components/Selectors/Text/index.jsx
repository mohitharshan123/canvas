import React from "react";
import { v4 } from "uuid";
import useStore from "../../store";

const TextSelector = () => {
  const { addText } = useStore();

  return (
    <div className="flex flex-col space-y-3 z-50">
      {
        <button
          className="w-60 h-20 cursor-pointer bg-white rounded-md shadow-md"
          onClick={() => {
            addText({
              x: 150,
              y: 150,
              width: 100,
              height: 100,
              id: v4(),
            });
          }}
        ></button>
      }
    </div>
  );
};

export default TextSelector;
