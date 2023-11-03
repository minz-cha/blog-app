import React, { useContext, useState, useEffect } from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  addDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { LikeInterface, PostProps } from "./PostList";

import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { User } from "firebase/auth";

// 좋아요 누를 게시글(post)의 속성을 받는 코드
interface LikeButtonProps {
  post: PostProps | null;
  getPost: (id: string) => Promise<void>;
  user: User | null;
}

export default function LikeButton({ post, getPost, user }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    if (post) {
      if (post.likePostList === undefined) {
        post.likePostList = [];
      }

      if (user && post && post.id) {
        const postRef = doc(db, "posts", post.id);
        const likedBy = post.likePostList.map((like) => like.uid);

        if (likedBy.includes(user.uid)) {
          console.log("좋아요 취소 완료");
          await updateDoc(postRef, {
            like: post.like - 1,
            likePostList: post.likePostList.filter(
              (like) => like.uid !== user.uid
            ),
          });
          setIsLiked(true);
          await getPost(post.id);
        } else {
          console.log("좋아요 완료");
          await updateDoc(postRef, {
            like: post.like + 1,
            likePostList: [
              ...post.likePostList,
              {
                uid: user.uid,
                email: user.email,
                createdAt: new Date().toISOString(),
              },
            ],
          });
          setIsLiked(true);
          await getPost(post.id);
        }
      }
    }
  };

  return (
    <div className="like__button">
      <Button
        variant="outlined"
        startIcon={<FavoriteBorderIcon />}
        onClick={() => handleLike()}
      >
        {post?.like}
      </Button>
    </div>
  );
}
