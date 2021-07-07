import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Task } from './types/Task.model';
// axios is arleady installed for http calls
// import axios from 'axios';

/*
  The suggested Task model contains:
  id: number
  task: string
  completed: boolean

  You can find this model under src/types/Task.model
*/

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Get all tasks from backend to display them
    const temp = [
      { id: 1, task: 'Walk the dog', completed: true },
      { id: 2, task: 'Upload this project to GitHub', completed: false },
      { id: 3, task: 'Develop backend for this project', completed: false },
    ];
    setTasks(temp);
  }, []);

  const toggleModal = () => {
    setNewTask('');
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    // Send request to create a new task
    console.log(newTask);
    toggleModal();
  };

  const handleCompleteTask = (task: Task) => {
    // Send request to complete a task
  };

  const handleDeleteTask = (task: Task) => {
    // Send request to delete a task
  };

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formForTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add task
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Todo List
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row className="px-2 py-2">
          <Button variant="success" onClick={toggleModal}>
            Add new task
          </Button>
        </Row>
        {tasks.map((task) => {
          return (
            <Row
              className="d-flex justify-content-between px-5 py-1"
              key={task.id}
            >
              <div>
                {task.completed ? (
                  <del className="text-muted">{task.task}</del>
                ) : (
                  <p>{task.task}</p>
                )}
              </div>
              <div>
                {!task.completed && (
                  <Button
                    variant="success"
                    className="mx-2"
                    onClick={() => handleCompleteTask(task)}
                  >
                    Complete task
                  </Button>
                )}
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => {
                    handleDeleteTask(task);
                  }}
                >
                  Delete task
                </Button>
              </div>
            </Row>
          );
        })}
      </Container>
      {renderModal()}
    </>
  );
}

export default App;
