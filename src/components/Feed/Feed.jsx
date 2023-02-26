import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { injectEndpoints, updateQueryData } from "../../api";
import Modal from "../../Modal/Modal";
import { serialize } from "../../utils";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import Wrapper from "./Wrapper";

function Feed({ profileId, profileUser }) {
  const dispatch = useDispatch();
  const queries = useSelector((state) => state.api.queries, shallowEqual);
  const { useLazyPostsQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        posts: builder.query({
          query: (args) => {
            const { since } = args;
            const id = args.profileId;
            if (id) {
              return {
                url: `/users/profile/${id}${since ? `?since=${since}` : ""}`,
              };
            }
            return {
              url: `/posts/timeline/all${since ? `?since=${since}` : ""}`,
            };
          },
          transformResponse(result, meta, arg) {
            if (!result.length) return result;
            const args = { since: null };
            if (arg.profileId) args["profileId"] = arg.profileId;
            dispatch(
              updateQueryData("posts", args, (posts) => {
                return [...(posts || []), ...result];
              })
            );
            return result;
          },
          keepUnusedDataFor: 3600,
        }),
      }),
    });
  }, []);
  const { useLazyAdditionalPostsQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        additionalPosts: builder.query({
          query: (since) => ({
            url: `/posts/timeline/additional_to_show${
              since ? `?since=${since}` : ""
            }`,
          }),
          transformResponse(res) {
            if (!res.length) return res;
            dispatch(
              updateQueryData("posts", { since: null }, (data) => {
                return [...data, ...res];
              })
            );
            return res;
          },
        }),
      }),
    });
  }, []);
  const [loadPosts, meta] = useLazyPostsQuery();
  const [loadAdditionalPosts] = useLazyAdditionalPostsQuery();
  const baseQck = `posts(${serialize({ since: null })})`; // qck : query cache key
  const profileQck = `posts(${serialize({
    profileId: profileId || null,
    since: null,
  })})`;

  const posts = useMemo(() => {
    if (!profileId) return queries[baseQck]?.data;
    else return queries[profileQck]?.data;
  }, [
    queries[profileQck]?.data, // profile posts
    queries[baseQck]?.data, // home page posts,
  ]);

  useEffect(() => {
    if (!profileId) loadPosts({ since: null }, true);
    else {
      loadPosts({ since: null, profileId }, true);
    }
  }, [profileId]);

  return (
    <div className="feed">
      <Wrapper
        loadPosts={loadPosts}
        loadAdditionalPosts={loadAdditionalPosts}
        posts={posts || []}
        profileUser={profileUser}
      >
        <Share />
        {(posts || []).map((post) => (
          <Post key={post._id} post={post} pid={profileId} />
        ))}
        <Modal />
      </Wrapper>
    </div>
  );
}

export default React.memo(Feed);
