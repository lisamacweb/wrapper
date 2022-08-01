import { combineReducers, configureStore } from "@reduxjs/toolkit"; //Redux
import { createWrapper } from "next-redux-wrapper"; // Wrapper
import UserSlice from "./slices/users";
import HousesSlice from "./slices/houses";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  whitelist: ["users", "houses"],
  storage,
};

const rootReducer = combineReducers({
  users: UserSlice,
  houses: HousesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

const makeStore = () => store;

export const persistor = persistStore(store);

export const wrapper = createWrapper(makeStore);

export { store };
