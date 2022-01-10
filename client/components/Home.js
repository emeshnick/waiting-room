import React from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { addPerson } from "../store/people";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personName: "",
      priority: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.setState({
      personName: "",
      priority: "",
    });
    const date = new Date();
    this.props.addPerson({ ...this.state, time: date.getTime() });
  }

  render() {
    return (
      <Container>
        <h1>Home</h1>
        <h2>Waiting Room</h2>
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
        </Form>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {this.props.queue.map((person, idx) => {
              return (
                <tr key={person.personName}>
                  <td>{idx + 1}</td>
                  <td>{person.personName}</td>
                  <td>{person.priority}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
  };
};

export default connect(mapState, mapDispatch)(Home);
