import { combineReducers } from "redux";

let modules = {};
const files = require.context("./modules", true, /reducer\.ts$/);
files.keys().forEach((key: string) => {
  modules = Object.assign(modules, files(key).default);
});
const rootReducer = combineReducers(modules);
export default rootReducer;
