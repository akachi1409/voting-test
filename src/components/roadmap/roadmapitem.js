import React from "react";
import { Collapse } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
//import CSS
import "./roadmapitem.css";

import { selectPoll } from "../../redux/data/dataActions";
function RoadMapItem(props) {
  const dispatch = useDispatch();
  const findPoll = () => {
      console.log("props:", props.content);
    dispatch(selectPoll(props.content));
  };
  return (
    <div>
      <div className="collapse-header-control">
        <div className="collapse-header">
          <h4 onClick={() => findPoll()} style={{ cursor: "pointer" }}>
            {props.tag}
          </h4>
          <p>{props.title}</p>
        </div>
      </div>
      <Collapse in={false}>
        <div id="example" className="collapse-content">
          {props.content}
        </div>
      </Collapse>
    </div>
  );
}

export default RoadMapItem;
