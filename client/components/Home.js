import React from "react";
import { Container, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { addPerson, removePerson, removePriorityQueue } from "../store/people";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: "",
      priority: "",
      validated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayPerson = this.displayPerson.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  //Add person dispatch using input state
  onSubmit(evt) {
    evt.preventDefault();
    //Get form to check validity of entry before adding person
    const form = evt.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      const date = new Date();
      this.props.addPerson({ ...this.state, time: date.getTime() });

      //Reset inputs
      this.setState({
        personName: "",
        priority: "",
        validated: false,
      });
    }
  }

  displayPerson(queue) {
    let person;
    let rows = [];
    let newQueue = [...queue];
    const variants = ["warning", "info", "success"];
    for (let i = 0; i < 3; i++) {
      //Add alert for next three people
      person = removePriorityQueue(newQueue);
      if (person) {
        rows.push(
          <Alert
            key={person.time}
            className="text-center"
            variant={variants[i]}
          >
            {person.personName}
          </Alert>
        );
      }
    }
    return rows;
  }

  render() {
    return (
      <Container>
        <h1>Waiting Room</h1>
        <p>Add patients and see the next patient based on priority</p>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.onSubmit}
        >
          <Form.Group className="mb-3" controlId="personName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              name="personName"
              value={this.state.personName}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter priority"
              name="priority"
              value={this.state.priority}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a priority
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              The lower the number, the higher the priority.
            </Form.Text>
          </Form.Group>
          <div className="d-flex justify-content-around">
            <Button variant="primary" type="submit">
              Add Person
            </Button>
            <Button variant="primary" onClick={this.props.removePerson}>
              See next person
            </Button>
          </div>
        </Form>
        <Container fluid className="p-4">
          {this.displayPerson(this.props.queue)}
        </Container>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    queue: state.people,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addPerson: (person) => dispatch(addPerson(person)),
    removePerson: () => dispatch(removePerson()),
  };
};

export default connect(mapState, mapDispatch)(Home);
