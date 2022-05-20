import React, { useEffect , useState} from "react";
import { Col, Container, Row } from "react-bootstrap";

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
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [count, setCount] = useState(0);
    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };
    useEffect(() => {
        getData();
    }, [blockchain.account]);

    useEffect(() =>{
        setCount(data.length);
    }, [data.length])
    return (
        <div className='roadmap-control' id='roadmap'>
            <Container >
                <header><span>SPOOKY BOYS</span> <br/> ROADMAP.</header>
                <p className='roadmap-description'>
                Our Roadmap outlines some of the future perks Spooky Boys Country Club members will be able to enjoy. Scroll through the course map and look over some of the ideas and concepts we wish to grow and deliver. We are constantly developing here at SBCC, so this map will also develop and evolve as more ideas are created to make our Country Club the top rated club of the Metaverse!
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
                                <header> There are <span>{count}</span> polls.</header>
                            
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default RoadMap;