import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Waiting Room</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
