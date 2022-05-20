// log
import store from "../store";
import Poll from "../../contracts/PollContract.json"

import Web3EthContract from "web3-eth-contract";

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

const selectPollContract = (payload) =>{
  return {
    type: "SELECT_POLL",
  }
}

const selectPollSuccess = (payload) => {
  return {
    type: "SELECT_POLL_SUCCESS",
    payload: payload,
  }
}

const selectPollFail = (payload) => {
  return {
    type: "SELECT_POOL_FAIL",
    payload: payload,
  }
}

const getPollDataRequest = () => {
  return {
    type: "GET_POLL_DATA",
  }
}

const getPollDataSuccess = (payload) => {
  return {
    type: "GET_POLL_DATA_SUCCESS",
    payload: payload,
  }
}

const getPollDataFail = (payload) =>{
  return {
    type: "GET_POOL_DATA_FAIL",
    payload: payload
  }
}

const refreshPollDataRequest = () => {
  return { 
    type: "REFRESH_POLL_DATA"
  }
}

const refreshPollDataSuccess = (payload) => {
  return {
    type: "REFRESH_POLL_DATA_SUCCESS",
    payload: payload
  }
}

const refreshPollDataFail = (payload) => {
  return {
    type: "REFRESH_POLL_DATA_FAIL",
    payload: payload
  }
}
export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let length = await store
        .getState()
        .blockchain.smartContract.methods.getPollsCount()
        .call();
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

export const selectPoll = (contract) =>{
  return async (dispatch) =>{
    dispatch (selectPollContract());
    try{
      let PollContractObj = new Web3EthContract(
        Poll,
        contract // **IMPORTANT** PASTE CONTRACT ADDRESS HERE
      );
      let address = await store.getState().blockchain.account;
      let isVoted = await PollContractObj.methods.isVoted(address).call();
      let yesNo = await PollContractObj.methods.yes().call();
      let noNo = await PollContractObj.methods.no().call();
      dispatch(
        selectPollSuccess({
          pollContract: PollContractObj,
          pollAddress: contract,
          isVoted: isVoted,
          yesNo: yesNo,
          noNo: noNo
      }))
    }catch(err){
      console.log(err);
      dispatch(selectPollFail("Could not select Pool"))
    }
  }
}

export const getPollInfo = () =>{
  return async (dispatch) =>{
    dispatch(getPollDataRequest())
    try{
      let contract = await store.getState().blockchain.account;
      let isVoted = await store.getState().data.pollContract.methods.isVoted(contract).call();
      let yesNo = await store.getState().data.pollContract.methods.yes().call();
      let noNo = await store.getState().data.pollContract.methods.no().call();
      dispatch(
        getPollDataSuccess({
          isVoted: isVoted,
          yesNo: yesNo,
          noNo: noNo
        })
      )
    }catch (err){
      console.log(err);
      dispatch(getPollDataFail("Could not get data of poll"))
    }
  }
}

export const refreshPollData = () => {
  return async (dispatch) => {
    dispatch(refreshPollDataRequest())
    try{
      dispatch(refreshPollDataSuccess())
    }catch (err){
      console.log(err);
      dispatch(refreshPollDataFail("Could not refresh"))
    }
  }
}