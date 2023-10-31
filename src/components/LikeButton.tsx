import React, { useContext, useState } from "react";
import AuthContext from "context/AuthContext";
import { LikeInterface, PostProps } from "./PostList";

import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface LikeButtonProps {
  post: PostProps | null;
  onLike: (id?: PostProps) => void;
}

export default function LikeButton({ post, onLike }: LikeButtonProps) {
  const { user } = useContext(AuthContext);
  const [likeButton, setLikeButton] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<string[]>();

  //   const handleLikeButton = () => {
  //     const updatedPost = { ...post, like: post.like + 1 };
  //     onLike(updatedPost);
  //     setLikeButton(true);
  //   };

  return (
    <div className="like__button">
      <Button
        variant="outlined"
        startIcon={<FavoriteBorderIcon />}
        // onClick={handleLikeButton}
      >
        Like it!
      </Button>
    </div>
  );
}
