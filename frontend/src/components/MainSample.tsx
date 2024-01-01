import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Main.css";
import dummyImage from "assets/dummy-image.jpg";
import { useRecoilState } from "recoil";
import { loginState } from "atom";
import Slider from "./Slider";
import "styles/Slider.css";
import SliderSample from "./SliderSample";
import { getPosts } from "api/api";

const fetchPosts = async () => {
  try {
    const response = await getPosts();
    console.log(response);
    return response?.data;
  } catch (error) {
    console.error("게시글을 불러오는 데 실패했습니다.", error);
  }
};

export function MainSample() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const postMenus: string[] = ["주간 인기 포스트", "새로 나온 포스트"];
  const submenus: string[] = ["홈", "포스트", "스토어"];
  const categories: string[] = ["태그1", "태그2", "태그3", "태그길이긴것"];
  const contentList = [
    { title: "타이틀1", writer: "작성자1", tags: ["태그1", "태그2"] },
    { title: "타이틀2", writer: "작성자2", tags: ["태그2", "태그3"] },
    { title: "타이틀3", writer: "작성자3", tags: ["태그2", "태그3", "태그4"] },
    { title: "타이틀4", writer: "작성자4", tags: ["태그1", "태그2", "태그4"] },
  ];

  const [selectedCategories, setSelectedCategories] = useState<number[][]>(
    postMenus.map(() => new Array(categories.length).fill(-1))
  );

  const handleLogin = () => {
    navigate("/login");
    // setIsLogin(true); //로그인 성공
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.");
      setIsLogin(false);
    } else {
    }
  };

  const handleCategory = (postMenuIndex: number, categoryIndex: number) => {
    const newSelectedCategories = selectedCategories.map(
      (categoryState, index) =>
        index === postMenuIndex
          ? categoryState.map((_, catIndex) =>
              catIndex === categoryIndex ? categoryIndex : -1
            )
          : categoryState
    );
    setSelectedCategories(newSelectedCategories);
  };

  const handleSubscribe = () => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <div className="main-header">
          <div className="main-menu">
            <div className="main-left-menu">
              타이틀
              <button
                className="btn-subscribe"
                type="button"
                onClick={handleSubscribe}
              >
                구독
              </button>
            </div>
            <div className="main-right-menu">
              {isLogin ? (
                <>
                  <button
                    className="btn-login"
                    type="button"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-login"
                    type="button"
                    onClick={handleLogin}
                  >
                    로그인
                  </button>
                  <button
                    className="btn-register"
                    type="button"
                    onClick={handleRegister}
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="sub-menu">
            {submenus.map((item, index) => (
              <button className="btn-submenu" type="button">
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* <Slider>
          <div className="card">Card 1</div>
          <div className="card">Card 2</div>
          <div className="card">Card 3</div>
          <div className="card">Card 4</div>
        </Slider> */}
        <SliderSample />
        {postMenus.map((menu, postMenuIndex) => (
          <div className="content-wrapper" key={menu}>
            <div className="content-title">{menu}</div>
            <div className="category-block">
              {categories.map((category, categoryIndex) => (
                <button
                  key={category}
                  className={`btn-category ${
                    selectedCategories[postMenuIndex][categoryIndex] !== -1
                      ? "focused"
                      : ""
                  }`}
                  type="button"
                  onClick={() => handleCategory(postMenuIndex, categoryIndex)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="content-list">
              {contentList.map((item, index) => (
                <div className="content-block">
                  <div className="content-photo">
                    <img src={dummyImage} className="dummy-photo" />
                  </div>
                  <div className="content-text">
                    <div className="text-title">{item.title}</div>
                    <div className="text-info">{item.writer}</div>
                    {item.tags.map((tag, tagIndex) => (
                      <button className="text-tags">{tag}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
