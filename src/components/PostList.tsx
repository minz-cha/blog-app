import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "firebaseApp";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

// Like 누른 게시글 목록 저장
export interface LikeInterface {
  uid: string;
}

export interface PostProps {
  id?: string;
  email: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
  like: 0;
  likePostList?: LikeInterface[];
}

type TabType = "all" | "my" | "like";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Mobile";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Mobile",
];

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    //posts 정렬
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;

    // 내 게시글
    if (activeTab === "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } // 모든 게시글
    else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } // 좋아요 누른 게시글
    else if (activeTab === "like" && user) {
      postsQuery = query(
        postsRef,
        where("likePostList.index", "==", 0),
        orderBy("createdAt", "desc")
      );
    } else {
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const deleteConfirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (deleteConfirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글을 삭제하였습니다.");
      getPosts(); //변경된 리스트를 다시 가져옴
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation-active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation-active" : ""}
          >
            나의 글
          </div>
          {/* <div
            role="presentation"
            onClick={() => setActiveTab("like")}
            className={activeTab === "like" ? "post__navigation-active" : ""}
          >
            좋아요
          </div> */}
          {CATEGORIES?.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation-active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
