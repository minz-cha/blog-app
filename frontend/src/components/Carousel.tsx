import React from "react";
import Carousel from "react-bootstrap/Carousel";
import dummyImage from "assets/dummyImage.jpg";
import Cards from "components/Cards";

function CarouselWrapper() {
  return (
    <Carousel className="carousel-wrapper">
      <Carousel.Item className="carousel-item">
        <Carousel.Caption>
          <Cards />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <Carousel.Caption>
          <Cards />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <Carousel.Caption>
          <Cards />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselWrapper;
