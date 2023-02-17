import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/index";
import { reducer as loadingReducer } from "./reducers/loadingReducer";
import { reducer as userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    loading: loadingReducer,
  },
  middleware: (gdm) => {
    return gdm().concat([api.middleware]);
  },
});

export default store;
