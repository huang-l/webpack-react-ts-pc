import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
// 永久存储
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// persistConfig 对象还可以设置黑名单白名单，就是不需要永久保存的数据。
const persistConfig = {
  key: "root", //存储在localStorage上的key
  storage: storage, //localStorage功能封装
  // blacklist: ['navigation'], //黑名单  不缓存内部其他缓存
  // whitelist: ['navigation'], //白名单 缓存内部其他不缓存
};

const middlware = compose(applyMiddleware(thunk));
const myPersistReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(myPersistReducer, middlware);
export const persistor = persistStore(store);

export default store;
