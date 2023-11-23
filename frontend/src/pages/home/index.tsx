import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import PostList from "components/PostList";
import CarouselWrapper from "components/Carousel";

export default function Home() {
  return (
    <div>
      <Header />
      {/* <CarouselWrapper /> */}
      <PostList />
      <Footer />
    </div>
  );
}
