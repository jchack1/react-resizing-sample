import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Graph from "./Graph";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ccc;
  position: relative;
  height: min-content;
`;

//use debounce so we aren't running this code too often, use 500ms
const debounce = (fn, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};

const MyGraph = ({datapoints}) => {

  //sort so most recent data at end of array
  const data = datapoints.sort((a, b) => {
    return Number(a.date) - Number(b.date);
  });

  //set default state of width and height
  const [graphHeight, updateGraphHeight] = useState(500);
  const [graphWidth, updateGraphWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 375) {
        updateGraphWidth(250);
        updateGraphHeight(200);
        return;
      }
      if (window.innerWidth < 575) {
        updateGraphWidth(300);
        updateGraphHeight(200);
        return;
      }
      if (window.innerWidth > 575) {
        updateGraphWidth(500);
        updateGraphHeight(300);
        return;
      }
    };

    //when debounce function runs, it will apply handleResize
    const debounceHandleResize = debounce(handleResize);

    //add event listener to it
    //when window resizes, run this code
    window.addEventListener("resize", debounceHandleResize);

    //remove event listener when we're done to not use up too much memory
    return (_) => {
      window.removeEventListener("resize", debounceHandleResize);
    };
  });

  useEffect(() => {

    if (window.innerWidth < 375) {
      updateGraphWidth(250);
      updateGraphHeight(200);
      return;
    }
    if (window.innerWidth < 575) {
      updateGraphWidth(300);
      updateGraphHeight(200);
      return;
    }
  }, []);

  return (
    <Container>
      <Graph
        data={data}
        graphHeight={graphHeight}
        graphWidth={graphWidth}
      />
    </Container>
  );
};

export default MyGraph;
