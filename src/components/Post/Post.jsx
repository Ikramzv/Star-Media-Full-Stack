import { Delete } from "@mui/icons-material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePostAction, like } from "../../actions/postAction";
import Comment from "./Comment";
import Edit from "./Edit";
import Like from "./Like";
import "./Post.css";
import Save from "./Save";

const regexpUrl =
  /(http|https):\/\/([A-z]?(\.))?[A-z\d\._]{1,}\.(com|az|ru|org|co|net|tr|us)(\/[A-z\d\S]{1,})?/gi; // url

function Post({ post }) {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desc = useMemo(() => {
    const urlMatched = String(post?.desc)?.match(regexpUrl);
    let des = post?.desc;
    let end = "";
    let returnValue;
    if (urlMatched) {
      urlMatched?.forEach((url, i) => {
        const description = returnValue || [];
        const index = des?.indexOf(url);
        const start = des.slice(0, index);
        end = des.slice(index + url.length);
        const link = (
          <a
            href={url}
            key={i}
            className="post_description_link"
            target={"_blank"}
          >
            {url}
          </a>
        );
        description.push(start, link);
        des = end;
        returnValue = description;
      });
      returnValue.push(end);
    }
    return returnValue || post?.desc;
  }, [post]);

  const deletePost = () => {
    setDisabled(true);
    const ask = prompt(
      "Are you sure to delete the post ? Then write 'yes' .. "
    );
    if (ask !== "yes") {
      setDisabled(false);
      return;
    } else {
      dispatch(deletePostAction(post?._id, setDisabled));
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
                <Edit postId={post?._id} postDescription={post?.desc} />
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
          <img src={post?.img} alt="" className="postCenterImg" />
        </figure>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Like
              item={post}
              user={user}
              action={like}
              args={[post?._id, user?._id]}
            />
            <Comment post={post} user={user} />
          </div>
          <div className="postBottomLeft">
            <Save post={post} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
