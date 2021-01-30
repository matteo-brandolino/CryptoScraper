const ScraperReducer = (state = {}, actions) => {
    switch (actions.type) {
        case "SET_PENDING":
            return { ...state, pending:true };
        case "SET_DATA":
            return { ...state, data:actions.payload };
        case "SET_HISTORY":
            return { ...state, history:actions.payload };
        case "SET_SUCCESS":
            return { ...state, pending:false };
        default:
            return state;
    }
    };

export default ScraperReducer;