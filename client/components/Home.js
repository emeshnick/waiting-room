import React from "react";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { addPerson, removePerson, removePriorityQueue } from "../store/people";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: "",
      priority: "",
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
    const date = new Date();
    this.props.addPerson({ ...this.state, time: date.getTime() });

    //Reset inputs
    this.setState({
      personName: "",
      priority: "",
    });
  }

  displayPerson(queue) {
    let person;
    let rows = [];
    let newQueue = [...queue];
    for (let i = 0; i < 3; i++) {
      //Add alert for next three people
      person = removePriorityQueue(newQueue);
      if (person) {
        rows.push(<Alert key={person.time}>{i + 1} person.personName</Alert>);
      }
    }
    return rows;
  }

  render() {
    return (
      <Container>
        <h1>Waiting Room</h1>
        <p>Add patients and see the next patient based on priority</p>
        <Form>
          <Form.Group className="mb-3" controlId="personName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter name"
              name="personName"
              value={this.state.personName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter priority"
              name="priority"
              value={this.state.priority}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Add Person
          </Button>
          <Button variant="primary" onClick={this.props.removePerson}>
            See next person
          </Button>
        </Form>
        <Container>{this.displayPerson(this.props.queue)}</Container>
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
