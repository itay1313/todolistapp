import React, { useState } from "react";
import { Accordion, Stack } from "react-bootstrap";

const TodoListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey={props.index.toString()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Accordion.Header>
          {props.title}
        </Accordion.Header>
        <Accordion.Body>
          <Stack direction="horizontal" className="d-flex justify-content-between" gap={3}>
            {props.description}
            {/* <input type="checkbox" checked={props.completed} /> */}
            <button
              onClick={() => props.deleteTodoByIndex(props.index)}
              style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
            >Delete todo</button>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TodoListItem;
