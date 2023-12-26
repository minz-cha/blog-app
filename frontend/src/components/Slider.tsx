import React, { useState, ReactNode } from "react";
import "styles/Slider.css";

type SliderProps = {
  children: ReactNode;
};

const Slider: React.FC<SliderProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goNext = (): void => {
    setActiveIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  const goPrev = (): void => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button onClick={goPrev}>&lt;</button>
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children}
      </div>
      <button onClick={goNext}>&gt;</button>
    </div>
  );
};

export default Slider;
