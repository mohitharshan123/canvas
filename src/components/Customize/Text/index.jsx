import React, { useRef, createRef, useEffect, Fragment } from "react";
import Input from "@mui/material/Input";
import ColorPicker from "material-ui-color-picker";
import useStore from "../../store";
import TextField from "@mui/material/TextField";

const CustomizeText = () => {
  const { texts, setTexts, selectedShape } = useStore();
  let textStyles = useRef([createRef(), createRef()]);

  const selectedText = texts.find(({ id }) => id === selectedShape.id);

  const onCustomizeText = (attributes) => {
    if (!selectedShape?.id) return;
    const allTexts = [...texts];
    const textToEdit = texts.findIndex(({ id }) => id === selectedShape?.id);
    allTexts[textToEdit] = {
      ...allTexts[textToEdit],
      ...attributes,
    };
    setTexts(allTexts);
  };

  useEffect(() => {
    if (!textStyles.current) return;
    if (!selectedText) return;
    textStyles.current[0].current.firstChild.value =
      selectedText.fontSize || 10;
    textStyles.current[1].current.firstChild.value =
      selectedText.fontStyle || "";
  }, []);

  const emitStyles = () => {
    onCustomizeText({
      fontSize: parseInt(textStyles.current[0]?.current.firstChild.value),
      fontStyle: textStyles.current[1]?.current.firstChild.value,
      fill: selectedText.fill,
      text: selectedText.text,
    });
  };

  const textStyleInputs = [
    {
      label: "Font Size",
    },
    {
      label: "Font Style",
    },
  ];

  return (
    <div className="flex flex-col space-y-3 p-3 items-start w-full overflow-y-scroll">
      {textStyleInputs.map(({ label }, index) => (
        <Fragment key={label}>
          <span className="text-blue-800 font-bold">{label}</span>
          <Input
            ref={textStyles.current[index]}
            placeholder={label}
            onChange={() => emitStyles()}
            fullWidth
            className="bg-blue-200 p-2 rounded-md"
            disableUnderline
          />
        </Fragment>
      ))}
      <span className="text-blue-800 font-bold">Content</span>
      <TextField
        fullWidth
        className="bg-blue-200 p-2 rounded-md"
        defaultValue={selectedText.text}
        value={selectedText.text}
        onChange={({ target: { value } }) => onCustomizeText({ text: value })}
      />
      <span className="text-blue-800 font-bold">Font color</span>
      <ColorPicker
        name="color"
        defaultValue={selectedText.fill}
        value={selectedText.fill}
        onChange={(color) => {
          onCustomizeText({ fill: color });
        }}
      />
    </div>
  );
};
export default CustomizeText;
