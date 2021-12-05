import React from "react";
import { Navbar, NavDropdown, Container } from "react-bootstrap";

export default class Nav extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" sticky="top">
          <NavDropdown
            bg="black"
            title="Menu"
            id="collasible-nav-dropdown"
            style={{ color: "#5299d3" }}
          >
            <NavDropdown.Item style={{ color: "#5299d3" }} href="/">
              Home
            </NavDropdown.Item>
            <NavDropdown.Item style={{ color: "#5299d3" }} href="/about">
              About
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
    );
  }
}
