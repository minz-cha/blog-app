import React, { useState } from "react";
// import SampleImg from "../assets/carouselSample.jpg";

const Image_1_URL = "../assets/carouselSample.jpg";

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <div>
      <div className="carousel">
        <div className="carousel__slides">
          <input type="radio" name="radio-buttons" id="img-1" readOnly />
          <li className="carousel__slids-container">
            <div className="carousel__slides-image">
              <img alt="image 1" src={Image_1_URL} />
            </div>
            <div className="carousel__controls">
              <label
                onClick={() => setActiveImage(3)}
                className="carousel__slide-prev"
              >
                <span>&lsaquo;</span>
              </label>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}
