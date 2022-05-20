import React, { useEffect , useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate} from 'react-router-dom';
//import CSS
import './roadmap.css';
import "../mint/mint.css";

//import Assets
import roadmap from '../../assets/roadmap.png';

//import Component
import RoadMapItem from "./roadmapitem";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
function RoadMap() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [count, setCount] = useState(0);
    const [polls, setPolls] = useState([]);
    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };
    useEffect(() => {
        getData();
    }, [blockchain.account]);

    useEffect(() =>{
        var temp = [];
        for ( var i = 0 ; i<data.length; i++){
            temp.push({
                url:data.polls[i],
                title:data.titles[i]
            });
        }
        setPolls(temp)
        setCount(data.length);
        console.log("polls:", polls)
    }, [data.length])

    useEffect(()=>{
        polls.map((item, index)=>{
            console.log("item:", item)
        })
    },[polls])

    const createPoll = (e) =>{
        navigate("/create-poll");
    }
    return (
        <div className='roadmap-control' id='roadmap'>
            <Container >
                <header><span>Voting App</span></header>
                <p className='roadmap-description'>
                    This is sample voting app.
                </p>
                <Row>
                    <Col xs={12} md={6}>
                        <img src={roadmap} alt='roadmap' />
                    </Col>
                    <Col xs={12} md={6}>
                        {
                            blockchain.account === "" || blockchain.smartContract === null ? 
                            <div className="flex-column">
                            <button className='ybutton' 
                            onClick={(e) => {
                                console.log("--------")
                                e.preventDefault();
                                dispatch(connect());
                                // getData();
                            }}>Connect</button>
                            {blockchain.errorMsg !== "" ? (
                                <span style={{ textAlign: "center", fontSize: 12, color: "white"}}>
                                        {blockchain.errorMsg}
                                    </span>
                                
                            ) : null}
                            </div>
                            :
                            <div>
                                <header> There are <span>{polls.length}</span> polls.</header>
                                {
                                    polls.map((item, index) => {
                                        return(<RoadMapItem key={index}
                                            tag= {item.title}
                                            title= "Owner"
                                            content= "item.content" />)
                                    })
                                }
                                <div style={{ textAlign: "center", marginTop:"3em"}}>
                                    <button className="ybutton" onClick={(e)=>createPoll(e)}>Create poll</button>
                                </div>
                                
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default RoadMap;