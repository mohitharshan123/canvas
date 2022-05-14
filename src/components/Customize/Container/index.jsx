import React, { useRef, createRef, useEffect, Fragment } from "react";
import Input from "@mui/material/Input";
import ColorPicker from "material-ui-color-picker";
import { containerStyleInputs } from "./contants";
import useStore from "../../store";

const CustomizeContainer = () => {
  const { containers, setContainers, selectedShape } = useStore();
  let containerStyles = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  const selectedContainer = containers.find(
    ({ id }) => id === selectedShape.id
  );

  useEffect(() => {
    if (!containerStyles.current) return;
    if (!selectedContainer) return;
    containerStyles.current[4].current.firstChild.value =
      selectedContainer.shadowBlur || "";
    containerStyles.current[5].current.firstChild.value =
      selectedContainer.shadowOffset?.x || "";
    containerStyles.current[6].current.firstChild.value =
      selectedContainer.shadowOffset?.y || "";
    containerStyles.current[7].current.firstChild.value =
      selectedContainer.shadowOpacity || "";
    if (!selectedContainer.cornerRadius) return;
    containerStyles.current[0].current.firstChild.value =
      selectedContainer.cornerRadius[0] || "";
    containerStyles.current[1].current.firstChild.value =
      selectedContainer.cornerRadius[1] || "";
    containerStyles.current[2].current.firstChild.value =
      selectedContainer.cornerRadius[2] || "";
    containerStyles.current[3].current.firstChild.value =
      selectedContainer.cornerRadius[3] || "";
  }, []);

  const onCustomizeContainer = (attributes) => {
    if (!selectedShape?.id) return;
    const allcontainers = [...containers];
    const containerToEdit = containers.findIndex(
      ({ id }) => id === selectedShape?.id
    );
    allcontainers[containerToEdit] = {
      ...allcontainers[containerToEdit],
      ...attributes,
    };
    setContainers(allcontainers);
  };

  const emitStyles = () => {
    onCustomizeContainer({
      cornerRadius: [
        containerStyles.current[0].current.firstChild.value,
        containerStyles.current[1].current.firstChild.value,
        containerStyles.current[2].current.firstChild.value,
        containerStyles.current[3].current.firstChild.value,
      ],
      shadowBlur:
        parseInt(containerStyles.current[4].current.firstChild.value) || 0,
      shadowOffset: {
        x: parseInt(containerStyles.current[5].current.firstChild.value) || 0,
        y: parseInt(containerStyles.current[6].current.firstChild.value) || 0,
      },
      shadowOpacity:
        parseInt(containerStyles.current[7].current.firstChild.value) || 0,
      fill: selectedContainer.fill,
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-3 items-start w-full overflow-y-scroll">
      <>
        <span className="text-blue-800 font-bold">Background</span>
        <ColorPicker
          name="color"
          value={selectedContainer.fill}
          onChange={(color) => {
            onCustomizeContainer({ fill: color });
          }}
        />
        <span className="text-blue-800 font-bold">Shadow color</span>
        <ColorPicker
          name="color"
          value={selectedContainer.shadowColor}
          onChange={(color) => {
            onCustomizeContainer({ shadowColor: color });
          }}
        />
        {containerStyleInputs.map(({ label }, index) => (
          <Fragment key={label}>
            <span className="text-blue-800 font-bold">{label}</span>
            <Input
              ref={containerStyles.current[index]}
              placeholder={label}
              onChange={() => emitStyles()}
              fullWidth
              className="bg-blue-200 p-2 rounded-md"
              disableUnderline
            />
          </Fragment>
        ))}
      </>
    </div>
  );
};
export default CustomizeContainer;
