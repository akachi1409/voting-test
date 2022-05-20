// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    console.log("------")
    dispatch(fetchDataRequest());
    try {

      let length = await store
        .getState()
        .blockchain.smartContract.methods.getPollsCount()
        .call();
      console.log("length: " + length)
      let polls = [];
      for (var i = 0 ; i<length; i++){
        let p = await store.getState().blockchain.smartContract.methods.polls(i).call();
        polls.push(p);
      }

      dispatch(
        fetchDataSuccess({
          length,
          polls,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
