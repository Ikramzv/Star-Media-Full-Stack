import { CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints } from "../../api";
import { socket } from "../../constants";
import { setOnlineFriends } from "../../slices/onlineFriendsSlice";
import { setUser } from "../../slices/userReducer";

function Auth({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user, shallowEqual);

  const { useCallMeQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        callMe: builder.query({
          query: () => "/auth/me",
          transformResponse(res) {
            if (!authUser) dispatch(setUser(res));
            return res;
          },
          transformErrorResponse(res) {
            if (res.originalStatus === 401) navigate("/login");
            return res;
          },
        }),
      }),
    });
  }, []);

  const { isLoading } = useCallMeQuery(null, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
    skip:
      authUser !== null ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register",
  });

  useEffect(() => {
    if (isLoading) return;
    if (authUser) {
      socket.connect();
      socket.emit("sendUser", authUser?._id);
      socket.on("getUsers", (users) => {
        dispatch(setOnlineFriends(users));
      });
    } else {
      navigate("/login");
      socket.close();
    }

    return () => {
      socket.off("getUsers");
    };
  }, [authUser]);

  return isLoading ? (
    <div className="cover">
      <CircularProgress color="error" className="loading" />
    </div>
  ) : (
    children
  );
}

export default Auth;
