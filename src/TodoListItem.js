import React, { useState } from 'react';
import { Accordion, Stack, Modal, Button } from 'react-bootstrap';

const TodoListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(props.completed);
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    props.deleteTodoByIndex(props.index);
    setShowModal(false);
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
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <button
                onClick={() => setShowModal(true)}
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              >
                Delete todo
              </button>
            </Stack>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>

      {/* The deletion confirmation modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Accordion>
  );
};

export default TodoListItem;
