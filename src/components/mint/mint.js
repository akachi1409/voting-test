import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

//import Assets
import MintGif from "../../assets/images/sevenRight.gif";

//import CSS
import "./mint.css";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import {
  getPollInfo,
  fetchData,
  refreshPollData,
} from "../../redux/data/dataActions";
import { useNavigate } from "react-router-dom";

function Mint() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("");
  const voteYes = () => {
    data.pollContract.methods
      .voteYes()
      .send({
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
      })
      .then(() => {
        dispatch(getPollInfo());
      });
  };

  const voteNo = () => {
    data.pollContract.methods
      .voteNo()
      .send({
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
      })
      .then(() => {
        dispatch(getPollInfo());
      });
  };
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const returnHome = () => {
    dispatch(refreshPollData());
  };

  useEffect(() => {
    console.log(data.pollContract);
    if (data.pollContract == null) {
      console.log("----");
      navigate("/");
    }
  }, [data.pollContract]);
  return (
    <div className="mint-control" id="mint">
      <Container>
        <Row>
          <Col md={6} xs={12} className="mint-image">
            <img src={MintGif} alt="mint gif" />
          </Col>
          <Col md={6} xs={12} className="mint-description">
            <header>
              <span>Vote </span> YOUR <br /> Option.
            </header>
            <p>You can Vote once for this option.</p>

            {blockchain.account === "" || blockchain.smartContract === null ? (
              <div className="flex-column">
                <button
                  className="ybutton"
                  onClick={(e) => {
                    console.log("--------");
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  Connect
                </button>
                {blockchain.errorMsg !== "" ? (
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "white",
                    }}
                  >
                    {blockchain.errorMsg}
                  </span>
                ) : null}
              </div>
            ) : (
              <div>
                {data.isVoted ? (
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <header>
                      <span>Yes: </span>
                      {data.yesNo}
                      <br /> <span>No: </span>
                      {data.noNo}{" "}
                    </header>
                    <button
                      className="ybutton"
                      style={{ marginTop: "1em" }}
                      onClick={() => returnHome()}
                    >
                      home
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="ybutton" onClick={() => voteYes()}>
                      Yes
                    </button>
                    <button className="ybutton" style={{ marginLeft: "2em" }} onClick={() => voteNo()}>
                      No
                    </button>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mint;
