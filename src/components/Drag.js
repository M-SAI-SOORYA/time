import React from 'react'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define the draggable component
const DraggableComponent = ({ id, text, index, moveComponent }) => {
  const [, drag] = useDrag({
    item: { type: 'COMPONENT', id, index },
  });

  const [, drop] = useDrop({
    accept: 'COMPONENT',
    hover(item) {
      if (item.index !== index) {
        moveComponent(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ margin: '5px', padding: '10px', border: '1px solid #ccc' }}>
      {text}
    </div>
  );
};

// Define the list of draggable components
const ComponentList = () => {
  const [components, setComponents] = useState([
    { id: 1, text: 'Component 1' },
    { id: 2, text: 'Component 2' },
    { id: 3, text: 'Component 3' },
  ]);

  const moveComponent = (fromIndex, toIndex) => {
    const updatedComponents = [...components];
    const [movedComponent] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedComponent);
    setComponents(updatedComponents);
  };

  return (
    <div>
      {components.map((component, index) => (
        <DraggableComponent
          key={component.id}
          id={component.id}
          text={component.text}
          index={index}
          moveComponent={moveComponent}
        />
      ))}
    </div>
  );
};
export default function Drag() {
  return (
    <div>
      
    </div>
  )
}
