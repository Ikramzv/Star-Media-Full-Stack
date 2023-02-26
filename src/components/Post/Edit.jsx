import { Edit as EditIcon } from "@mui/icons-material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { injectEndpoints } from "../../api";
import { bothHomeProfileForTheCache, updateRecipe } from "../../utils";

function Edit({ postId, postDescription, pid }) {
  const user = useSelector((state) => state.user);
  const { useEditPostMutation } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        editPost: builder.mutation({
          query: ({ postId, desc }) => ({
            url: `/posts/edit/${postId}`,
            body: { desc },
            method: "PATCH",
          }),
          onQueryStarted(args, { dispatch }) {
            args.profileId = user?._id;
            const { postId, desc } = args;
            bothHomeProfileForTheCache({
              dispatch,
              args,
              endpoint: "posts",
              action: (posts) =>
                updateRecipe(posts, { itemId: postId, change: desc }, "desc"),
            });
          },
        }),
      }),
    });
  }, []);

  const [edit] = useEditPostMutation();

  const editPost = () => {
    const promp = prompt("", postDescription);
    if (!promp && promp !== "") return;
    if (promp === postDescription) return;
    const args = { postId, desc: promp };
    if (pid) args["profileId"] = pid;
    edit(args);
  };

  return (
    <button className="postEditBtn postBtn" onClick={editPost}>
      Edit <EditIcon fontSize={"small"} />
    </button>
  );
}

export default Edit;
