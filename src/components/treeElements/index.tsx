import React, { useEffect } from 'react';
import { IElement } from '../../types';
import * as Tone from 'tone'
import * as d3 from "d3";

type TreeProps = {
  elements: IElement[];
};

function TreeElements(props: TreeProps) {

  const playOneShot = (element: IElement) => {
    const player = new Tone.Player(element.destination).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }

  const drawSoundGraph = (elements: IElement[]) => {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 860 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    d3.select("#Data-Visulaizer").selectAll("*").remove();

    // append the svg object to the body of the page
    var svg = d3.select("#Data-Visulaizer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    //Read the elements DATASET
    d3.csv(`${process.env.PUBLIC_URL}/elements.csv`).then((data: any) => {
      
      const randNums = new Set();
        
      while(randNums.size !== 5) {
          randNums.add(Math.floor(Math.random() * data.length-1) + 1);
      }

      // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 4000])
        .range([ 0, width ]);
      

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 500000])
        .range([ height, 0]);
    

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function (d: any) { return x(d?.X); } )
          .attr("cy", function (d: any) { return y(d?.Y); } )
          .attr("r", (d) => Array.from(randNums).includes(data.indexOf(d)) ? 8.5 : 2.5)
          .style("fill", (d) => Array.from(randNums).includes(data.indexOf(d)) ? 'blue' : 'yellow')
          .style("stroke", "black")
          .style("stroke-width", 1)

      })
      .catch((err) => {
          console.log(err)
      });
  }

  useEffect(() => {
    // draw the sounds DATASET on graph via d3
    drawSoundGraph(props.elements);
  }, [props.elements]);

  return(
      <div className={'Tree-Elements'}>
        <div id={'Data-Visulaizer'}>

        </div>
        <div className={'Elements-Wrapper'}>
          {props.elements.map((element, i) => <div onClick={() => playOneShot(element)} key={`el-${i}`} className={'Tree-Element'}>{element.title}</div>)}
        </div>
      </div>);
}

export default TreeElements;
