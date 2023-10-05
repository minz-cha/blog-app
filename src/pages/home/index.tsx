import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import CarouselComponent from "components/Carousel";

export default function Home() {
  return (
    <div>
      <Header />
      {/* <CarouselComponent /> */}
      <PostList />
      <Footer />
    </div>
  );
}
