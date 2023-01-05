import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePostAction, like } from "../../actions/postAction";
import Edit from "./Edit";
import "./Post.css";

const Like = ({ post, user }) => {
  const dispatch = useDispatch();
  const likePost = () => {
    dispatch(like(post._id, user._id));
  };
  return (
    <>
      {post.likes.some((id) => id === user?._id) ? (
        <Favorite className="likeBtn" onClick={likePost} color="error" />
      ) : (
        <FavoriteBorder className="likeBtn" onClick={likePost} />
      )}
      <span className="likeCounter">{post.likes.length}</span>
    </>
  );
};

let str = `JavaScript Entusiast ! contact : ikramzulfugarcodein@gmail.com github: https://github.com/Ikramzv https://id.heroku.com/login hello test vbro https://github.com/Ikramzv?tab=repositories hrh dsf https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_regexp_ahead https://www.google.com/search?q=+instead+of+www+%3F&biw=1536&bih=722&sxsrf=ALiCzsaEuClhVaUf-Dfec1_XelWPVnN8Dg%3A1672868516241&ei=pPK1Y_qpDqSprgSc24fIAQ&ved=0ahUKEwj6i6rt8K78AhWklIsKHZztARkQ4dUDCA8&uact=5&oq=+instead+of+www+%3F&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIJCAAQBxAeEPEEMgkIABAIEB4Q8QQyCAgAEAgQHhAPOgoIABBHENYEELADOggIIRDDBBCgAToFCAAQogRKBAhBGABKBAhGGABQqAlYuxdgjxpoAXABeACAAf8BiAGjDZIBBjAuMTAuMZgBAKABAcgBCMABAQ&sclient=gws-wiz-serp`;

const regexpUrl =
  /(http|https):\/\/([A-z]?(\.))?[A-z\d\._]{1,}\.(com|az|ru|org|co|net|tr|us)(\/[A-z\d\S]{1,})?/gi; // url

function Post({ post }) {
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desc = useMemo(() => {
    const urlMatched = post.desc.match(regexpUrl);
    let des = post.desc;
    let returnValue;
    urlMatched?.forEach((url) => {
      const convertToArr = des.split(url);
      const index = convertToArr.length === 1 ? 0 : 1;
      convertToArr.splice(
        index,
        0,
        <a
          href={url}
          key={url}
          className="post_description_link"
          target={"_blank"}
        >
          {url}
        </a>
      );
      returnValue = convertToArr;
    });
    return returnValue ? returnValue : post.desc;
  }, [post?.desc]);

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
            {post.userId === user?._id && (
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
          <img src={post.img} alt="" className="postCenterImg" />
        </figure>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Like post={post} user={user} />
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
