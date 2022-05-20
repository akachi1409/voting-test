import React, { useState, useEffect } from "react";

import Logo from "../../assets/logo.png";

//import css
import "./header.css";

import { Container, Navbar, Nav, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData, createPoll } from "../../redux/data/dataActions";
import { useNavigate } from "react-router-dom";
//import components
import YButton from "../basic/YButton";
function Header() {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const createPollFunction = async () => {
        console.log("test", title);
        dispatch(createPoll(title, blockchain.account));
    // 
  };

  useEffect(()=>{
    if (data.createPollSuccess)
      navigate("/")
  }, [data.createPollSuccess])
  return (
    <>
      <div className="header-control">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img src={Logo} width={50} height={50} alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link onClick={() => window.location.replace("/#mint")}>
                  Mint
                </Nav.Link>
                <Nav.Link onClick={() => window.location.replace("/#team")}>
                  TEAM
                </Nav.Link>
                <Nav.Link onClick={() => window.location.replace("/#roadmap")}>
                  ROADMAP
                </Nav.Link>
                <Nav.Link>
                  <YButton text="OPENSEA" />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="header-content">
          <h1>
            SPOOKY BOYS <br /> COUNTRY CLUB
          </h1>
          {blockchain.account === "" || blockchain.smartContract === null ? (
            <div className="flex-column">
              <button
                className="ybutton"
                onClick={(e) => {
                  console.log("--------");
                  e.preventDefault();
                  dispatch(connect());
                  // getData();
                }}
              >
                Connect
              </button>
              {blockchain.errorMsg !== "" ? (
                <span
                  style={{ textAlign: "center", fontSize: 12, color: "white" }}
                >
                  {blockchain.errorMsg}
                </span>
              ) : null}
            </div>
          ) : (
            <div className="item-center">
              <Form.Group>
                <Form.Control
                  type="text"
                  size="lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="header-content-buttons-container">
                <button 
                className="ybutton"
                onClick={() => createPollFunction()} >
                    Create</button>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Header;
