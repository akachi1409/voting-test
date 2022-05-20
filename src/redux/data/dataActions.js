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

const createPollRequest = (payload) => {
  return {
    type: "CREATE_POLL",
  };
};

const createPollFail = (payload) => {
  return {
    type: "CREATE_FAIL",
    payload: payload,
  };
};

const createPollSuccess = (payload) => {
  return {
    type: "CREATE_SUCCESS",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    console.log("------");
    dispatch(fetchDataRequest());
    try {
      let length = await store
        .getState()
        .blockchain.smartContract.methods.getPollsCount()
        .call();
      console.log("length: " + length);
      let polls = [];
      let titles = [];
      for (var i = 0; i < length; i++) {
        let p = await store
          .getState()
          .blockchain.smartContract.methods.polls(i)
          .call();
        let t = await store
          .getState()
          .blockchain.smartContract.methods.titles(i)
          .call();
        polls.push(p);
        titles.push(t);
      }

      dispatch(
        fetchDataSuccess({
          length,
          polls,
          titles,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

export const createPoll = (title, account) => {
  return async (dispatch) => {
    dispatch(createPollRequest());
    try {
      await store
        .getState()
        .blockchain.smartContract.methods.createPoll(title)
        .send({
          from: account
        });
      let length = await store
        .getState()
        .blockchain.smartContract.methods.getPollsCount()
        .call();
      console.log("length: " + length);
      let polls = [];
      let titles = [];
      for (var i = 0; i < length; i++) {
        let p = await store
          .getState()
          .blockchain.smartContract.methods.polls(i)
          .call();
        let t = await store
          .getState()
          .blockchain.smartContract.methods.titles(i)
          .call();
        polls.push(p);
        titles.push(t);
      }
      dispatch(
        createPollSuccess({
          length,
          polls,
          titles,
        })
      );
      store.dispatch("/");
    } catch (err) {
      console.log(err);
      dispatch(createPollFail("Could not create Poll"));
    }
  };
};
