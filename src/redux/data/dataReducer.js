const initialState = {
  loading: false,
  length: 0,
  polls: [],
  titles: [],
  createPollSuccess: false,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        length: action.payload.length,
        polls: action.payload.polls,
        titles: action.payload.titles,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "CREATE_POLL":
      return {
        ...state,
        loading: true,
        createPollSuccess: false
      };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loading: false,
        length: action.payload.length,
        polls: action.payload.polls,
        titles: action.payload.titles,
        createPollSuccess: true,
        error: false,
        errorMsg: "",
      };
    case "CREATE_FAIL":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;
