import { createStore } from "redux";
import AllReducers from "./reducers/AllReducers";

const initialStates = {
    auth: {
        loggedIn: false,
        user: {},
        token: null
    },
    scraper : {
        data:[],
        history:[],
        pending:false,
    }
};
const store = createStore(
    AllReducers,
    initialStates,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;