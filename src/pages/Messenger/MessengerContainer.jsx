import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { injectEndpoints } from "../../api";
import { setMessages } from "../../slices/messagesReducer";

function MessengerContainer({ children, loading }) {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const { id: convId } = useParams();
  const box = useRef();

  const { useLazyGetMessagesQuery } = useMemo(() => {
    return injectEndpoints({
      overrideExisting: true,
      endpoints: (builder) => ({
        getMessages: builder.query({
          query: (convId) => `/messages/${convId}`,
          onQueryStarted: () => (loading.current = true),
          transformResponse: (res) => {
            loading.current = false;
            return res;
          },
        }),
      }),
    });
  }, []);

  const [getMessages] = useLazyGetMessagesQuery();

  useEffect(() => {
    if (convId) {
      getMessages(convId, true).then(({ data }) => dispatch(setMessages(data)));
    }
  }, [convId]);

  useEffect(() => {
    box.current && (box.current.scrollTop = box.current.scrollHeight);
  }, [messages.length]);

  return (
    <div className="chatBoxTop" ref={box}>
      {children}
    </div>
  );
}

export default React.memo(MessengerContainer);
