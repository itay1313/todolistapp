import React, { useState } from 'react';
import { Accordion, Stack } from 'react-bootstrap';

const TodoListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(props.completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // If you want to propagate the change to the parent or update in the backend, you can do it here.
  };

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item
        eventKey={props.index.toString()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Accordion.Header>{props.title}</Accordion.Header>
        <Accordion.Body>
          <Stack
            direction="horizontal"
            className="d-flex justify-content-between"
            gap={3}
          >
            {props.description}
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between"
              gap={3}
            >
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <button
                onClick={() => props.deleteTodoByIndex(props.index)}
                style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
              >
                Delete todo
              </button>
            </Stack>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default TodoListItem;
