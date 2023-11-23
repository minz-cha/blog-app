import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import dummyImage from "assets/dummyImage.jpg";

function Cards() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={dummyImage} width={286} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
