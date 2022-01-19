import React from "react";
import { PageHeader, Container, Row, Col, Card } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <Container>
        <h1 className="text-center" style={{ marginTop: "1rem" }}>
          About
        </h1>
        <Row>
          <Col>
            <Card style={{ margin: "5%", marginTop: "1%" }}>
              <Card.Body>
                <Card.Title>
                  <strong>Waiting Room Priority Queue</strong>
                </Card.Title>
                <Card.Text>
                  This Waiting Room application uses a Priority Queue data
                  structure to allow the user to create queue of people based on
                  priority and time. <br></br>
                  <br></br> This means that people with higher priorities will
                  be seen before people with lower priorities, regardless of the
                  time they were entered into the queue. However, if two people
                  have the same priority, the time that they will be seen will
                  be deterimied by the time their name was entered.
                </Card.Text>
                <Card.Text>
                  <strong>What is a Minimum Heap?</strong>
                  <br></br>
                  Another word for a priority queue is a minimum heap.
                </Card.Text>
                <Card.Img
                  src="minimum_heap.png"
                  alt="Image of a complete binary tree with the nodes from top to bottom and left to right: 1, 2, 3, 17, 19, 36, 7, 25, 100"
                />
                <Card.Text>
                  The Minimum Heap requires that each node be greater than or
                  equal to its parent node and less than or equal to its
                  children. The tree must remain complete, which means all
                  levels are full except for the lowest level, which is filled
                  from left to right.
                  <br></br>
                  <br></br>
                  This Minimum Heap is contained in an array. Removing and
                  adding a person to the queue takes O(logN).
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <p className="text-center">Created in 2022 by Elijah Meshnick</p>
      </Container>
    );
  }
}

export default About;
