import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "./login";
import customer from "./customer";
import category from "./category";
import partner from "./partner";
import orders from "./orders";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["login", "customer", "category", "partner", "orders"],
};
const logPersist = {
  key: "login",
  storage,
  blacklist: ["loading", "error"],
};

const rootReducer = combineReducers({
  login: persistReducer(logPersist, login),
  customer,
  category,
  partner,
  orders,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
