import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetProducts } from "../Features/ProductSlice";
import { reset as resetCart } from "../Features/CartSlice";
import productReducer from "../Features/ProductSlice";
import usersReducer from "../Features/UserSlice";
import cartReducer from "../Features/CartSlice";

// Redux Persist config
const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state in storage
  storage, // The storage method (localStorage)
};

// Combine all your reducers into one rootReducer
const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  products: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});
const persistore = persistStore(store); // Create persistore for rehydration

// Reset all reducers
const resetStore = () => {
  store.dispatch(resetUsers()); // Reset users state
  store.dispatch(resetProducts());
  store.dispatch(resetCart());
};

export { store, persistore, resetStore };
