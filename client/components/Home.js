import React from "react";
import { Container } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1>Home</h1>
        <h2>Waiting Room</h2>
        <p>Add patients and see the next patient based on priority</p>
      </Container>
    );
  }
}

export default Home;
