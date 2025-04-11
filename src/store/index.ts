import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./reducers/cart";
import userReducer from "./reducers/user";

const reducer = {
  cart: cartReducer,
  user: userReducer,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

let store = configureStore({
  reducer,
});

const makeStore = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    return (store = configureStore({
      reducer,
    }));
  } else {
    const persistConfig = {
      key: "shoppingcart",
      whitelist: ["cart", "user"],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    store = configureStore({
      reducer: persistedReducer,
    });

    // @ts-ignore:next-line
    store.__persistor = persistStore(store);

    return store;
  }
};

// @ts-ignore:next-line
export const wrapper = createWrapper(makeStore, { debug: true });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
