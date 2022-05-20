const initialState = {
  loading: false,
  length: 0,
  polls: [],
  titles: [],
  createPollSuccess: false,
  pollAddress: "",
  pollContract: null,
  isVoted: false,
  yesNo: 0,
  noNo: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
    case "GET_POLL_DATA":
    case "REFRESH_POLL_DATA":
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
        createPollSuccess: false,
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
        error: true,
        errorMsg: action.payload,
      };
    case "SELECT_POLL":
      return {
        ...state,
        loading: true,
      };
    case "SELECT_POLL_SUCCESS":
      return {
        ...state,
        loading: false,
        pollAddresses: action.payload.pollAddress,
        pollContract: action.payload.pollContract,
        isVoted: action.payload.isVoted,
        yesNo: action.payload.yesNo,
        noNo: action.payload.noNo,
        error: false,
        errorMsg: "",
      };
    case "GET_POLL_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        isVoted: action.payload.isVoted,
        yesNo: action.payload.yesNo,
        noNo: action.payload.noNo,
        error: false,
        errorMsg: "",
      };
    case "REFRESH_POLL_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        createPollSuccess: false,
        pollAddress: "",
        pollContract: null,
        isVoted: false,
        yesNo: 0,
        noNo: 0,
        error: false,
        errorMsg: "",
      };
    case "SELECT_POLL_FAIL":
    case "GET_POOL_DATA_FAIL":
    case "REFRESH_POLL_DATA_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
