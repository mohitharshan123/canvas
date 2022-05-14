import React, { useRef } from "react";
import { Stage, Layer } from "react-konva";
import { Container, Text } from "../Shapes";
import useStore from "../store";
import Fab from "@mui/material/Fab";
import AddIcon from "@material-ui/icons/Add";

const Playground = (props) => {
  const stageRef = useRef();
  const { checkDeselect } = props;
  const {
    setSelectedShape,
    selectedShape,
    setContainers,
    containers,
    selectedBackground,
    texts,
    setTexts,
  } = useStore();

  const handleDragEnd = (e) => {
    const id = e.target.name();
    const items = containers.slice();
    const item = items.find((i) => i.id === id);
    const index = items.indexOf(item);
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y(),
    };
    setContainers(items);
  };

  const shapeProps = (type, allItems, item) => ({
    handleDragEnd: handleDragEnd,
    isSelected: item.id === selectedShape?.id,
    onSelect: () => setSelectedShape({ id: item.id, type }),
    onChange: (newAttrs) => {
      const items = [...allItems];
      const itemIndex = allItems.findIndex(
        (item) => item.id === selectedShape.id
      );
      items[itemIndex] = { ...items[itemIndex], ...newAttrs };
      type === "rectangle" && setContainers(items);
      type === "text" && setTexts(items);
    },
  });

  const downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, "stage.png");
  };

  return (
    <>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={handleExport} />
      </Fab>

      <Stage
        ref={stageRef}
        width={window.innerWidth - 310}
        height={window.innerHeight - 10}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{
          backgroundImage: "url(" + selectedBackground + ")",
          backgroundSize: "cover",
        }}
      >
        <Layer>
          <>
            {containers.map((rect, i) => {
              return (
                <Container
                  key={i}
                  shapeProps={rect}
                  name={rect.id}
                  {...shapeProps("rectangle", containers, rect)}
                />
              );
            })}
            {texts.map((text, i) => {
              return (
                <Text
                  key={i}
                  shapeProps={text}
                  name={text.id}
                  {...shapeProps("text", texts, text)}
                />
              );
            })}
          </>
        </Layer>
      </Stage>
    </>
  );
};

export default Playground;
