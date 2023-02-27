import { Delete } from "@mui/icons-material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints } from "../../api";
import useRegex from "../../hooks/useRegex";
import {
  bothHomeProfileForTheCache,
  invalidatePostTag,
  updateRecipeForLike,
} from "../../utils";
import Comment from "./Comment";
import Edit from "./Edit";
import Like from "./Like";
import "./Post.css";

const regexpUrl =
  /(http|https):\/\/([A-z]?(\.))?[A-z\d\.\_\-]{1,}(\/[A-z\d\S\_\.\-]{1,})?/gi; // url

function Post({ post, pid }) {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { useLikePostMutation, useDeletePostMutation, useEditPostMutation } =
    useMemo(() => {
      return injectEndpoints({
        endpoints: (builder) => ({
          likePost: builder.mutation({
            query: ({ postId }) => ({
              url: `/posts/${postId}/like`,
              method: "PUT",
            }),
            onQueryStarted(args, { dispatch }) {
              args = {
                ...args,
                profileId: args.authorId,
                itemId: args.postId, // updateRecipeForLike(items,{ itemId,userId })
              };
              bothHomeProfileForTheCache({
                dispatch,
                args,
                action: updateRecipeForLike,
                endpoint: "posts",
              });
            },
            invalidatesTags: (res, e, args) => invalidatePostTag(args),
          }),
          deletePost: builder.mutation({
            query: ({ postId }) => ({
              url: `/posts/${postId}`,
              method: "DELETE",
            }),
            onQueryStarted(args, { dispatch }) {
              args.profileId = user?._id;
              bothHomeProfileForTheCache({
                dispatch,
                endpoint: "posts",
                args,
                action: (posts, args) => {
                  return posts.filter((post) => post?._id !== args.postId);
                },
              });
            },
          }),
        }),
      });
    }, [post]);

  const [likePost] = useLikePostMutation();
  const [removePost] = useDeletePostMutation();

  const desc = useRegex(regexpUrl, post?.desc, []);

  const deletePost = () => {
    setDisabled(true);
    const ask = prompt(
      "Are you sure to delete the post ? Then write 'yes' .. "
    );
    if (ask !== "yes") {
      setDisabled(false);
      return;
    } else {
      const args = { postId: post?._id };
      if (pid) args["profileId"] = pid;
      removePost(args);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="topLeft">
            <img
              src={
                post?.user?.userProfileImage
                  ? post?.user?.userProfileImage
                  : "/user.webp"
              }
              alt=""
              className="postImg"
              onClick={() => navigate(`/profile/${post?.userId}`)}
              style={{ cursor: "pointer" }}
            />
            <span className="postUsername">{post?.user?.username}</span>
            <span className="postDate">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <div className="topRight">
            {post?.userId === user?._id && (
              <>
                <Edit
                  postId={post?._id}
                  postDescription={post?.desc}
                  pid={pid}
                />
                <button
                  className="postDeleteBtn postBtn"
                  onClick={deletePost}
                  disabled={disabled}
                >
                  Delete <Delete />
                </button>
              </>
            )}
          </div>
        </div>
        <figure className="postCenter">
          <figcaption className="postDescription">{desc}</figcaption>
          {post?.img.includes("image") ? (
            <img src={post?.img} alt="" className="postCenterImg" />
          ) : (
            post?.img.includes("video") && (
              <video src={post?.img} controls className="postCenterImg"></video>
            )
          )}
        </figure>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Like
              item={post}
              user={user}
              like={likePost}
              args={{
                postId: post?._id,
                userId: user?._id,
                authorId: post.user._id,
              }}
            />
            <Comment post={post} />
          </div>
          {/* <div className="postBottomLeft">
            <Save post={post} user={user} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Post);
