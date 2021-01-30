import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ScraperReducer from "./ScaperReducer";

const AllReducers = combineReducers({ auth: AuthReducer, scraper: ScraperReducer });

export default AllReducers;