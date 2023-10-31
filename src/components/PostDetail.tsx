import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";
import Comments from "components/Comments";
import LikeButton from "./LikeButton";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      //document의 data 불러옴
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const deleteConfirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (deleteConfirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제하였습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.createdAt}</div>
          </div>
          {post?.email === user?.email && (
            <div className="post__utils-box">
              {post?.category && (
                <div className="post__category">{post?.category}</div>
              )}
              <div className="post__delete" onClick={handleDelete}>
                삭제
              </div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </div>
          )}
          <div className="post__text post__text-pre-wrap">{post?.content}</div>
        </div>
        {/* 댓글이 변경되었을 때 변경된 data를 불러올 수 있도록 getPost 추가 */}
        {/* <LikeButton post={post}/> */}
        <Comments post={post} getPost={getPost} />
      </div>
    </>
  );
}
