import React, { useEffect } from "react";

import { Text, Transformer } from "react-konva";

const DraggableText = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  handleDragStart,
  handleDragEnd,
  name,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Text
        name={name}
        text={"New Text"}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
            fontSize: node.fontSize() * scaleX,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default DraggableText;
