import React, { Component, useState, useEffect } from "react";
import $ from "jquery";
import * as d3 from "d3";
import { render } from "react-dom";

const Chart = (props) => {
  d3.selectAll(".reference > *").remove();

  const firstdata = props.transactions;
  let newdata = firstdata.map((transaction) => {
    return transaction.category;
  });
  function convert(array) {
    var counts = {};
    for (var i = 0; i < array.length; i++) {
      var current = array[i];
      if (!counts[current]) {
        counts[current] = 1;
      } else {
        counts[current]++;
      }
    }
    return counts;
  }
  let finaldata = convert(newdata);
  //   console.log(finaldata);
  function giveData(input) {
    var array = [];
    for (var key in input) {
      array.push({ count: input[key], fruit: key });
    }
    return array;
  }
  var data = giveData(finaldata);
  //   console.log(test);
  //   var data = [
  //     { count: 2, fruit: "orange" },
  //     { count: 3, fruit: "apple" },
  //   ];
  // Helper function for animation of pie chart and donut chart
  function tweenPie(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return function (t) {
      return arc(i(t));
    };
  }

  function tweenDonut(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
    return function (t) {
      return arc2(i(t));
    };
  }
  // margin
  var margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width / 2;

  // color range
  var color = d3
    .scaleOrdinal()
    .range([
      "#BBDEFB",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#2196F3",
      "#1E88E5",
      "#1976D2",
    ]);

  // pie chart arc. Need to create arcs before generating pie
  // var arc = d3
  //   .arc()
  //   .outerRadius(radius - 10)
  //   .innerRadius(0);

  // donut chart arc
  var arc2 = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  // arc for the labels position
  var labelArc = d3
    .arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (data) {
      //   console.log(data);
      return data.count;
    });

  // define the svg for pie chart
  //   var svg = d3
  //     .select(".reference")
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .append("g")
  //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // define the svg donut chart
  var svg2 = d3
    .select(".reference")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //   var g = svg
  //     .selectAll(".arc")
  //     .data(pie(data))
  //     .enter()
  //     .append("g")
  //     .attr("class", "arc");

  // append path
  //   g.append("path")
  //     .attr("d", arc)
  //     .style("fill", function (data) {
  //       return color(data.data.fruit);
  //     })
  //     // transition
  //     .transition()
  //     .ease(d3.easeLinear)
  //     .duration(2000)
  //     .attrTween("d", tweenPie);

  // append text PIE FULL
  //   g.append("text")
  //     .transition()
  //     .ease(d3.easeLinear)
  //     .duration(2000)
  //     .attr("transform", function (data) {
  //       return "translate(" + labelArc.centroid(data) + ")";
  //     })
  //     .attr("dy", ".35em")
  //     .text(function (data) {
  //       return data.data.fruit;
  //     });

  var g2 = svg2
    .selectAll(".arc2")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc2");

  // append path PIE DONUT
  g2.append("path")
    .attr("d", arc2)
    .style("fill", function (data) {
      return color(data.data.fruit);
    })
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween("d", tweenDonut);

  // append text PIE DONUT
  g2.append("text")
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attr("transform", function (data) {
      return "translate(" + labelArc.centroid(data) + ")";
    })
    .attr("dy", ".35em")
    .text(function (data) {
      return data.data.fruit;
    });

  return <div className="reference">Testing Refs</div>;
};

// const Chart = (props) => {
//   const data = props.transactions;
//   let newdata = data.map((transaction) => {
//     return transaction.category;
//   });
//   function convert(array) {
//     var counts = {};
//     for (var i = 0; i < array.length; i++) {
//       var current = array[i];
//       if (!counts[current]) {
//         counts[current] = 1;
//       } else {
//         counts[current]++;
//       }
//     }
//     return counts;
//   }
//   let finaldata = convert(newdata);
//   let piedata = Object.values(finaldata);

//   console.log(piedata);
//   const height = 400;
//   const width = 400;

//   let pie = d3.pie()(piedata);

//   return (
//     <svg height={height} width={width}>
//       <g transform={`translate(${width / 2},${height / 2})`}>
//         <Slice pie={pie} />
//       </g>
//     </svg>
//   );
// };

// const Slice = (props) => {
//   let { pie } = props;

//   let arc = d3.arc().innerRadius(0).outerRadius(100);

//   let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

//   return pie.map((slice, index) => {
//     let sliceColor = interpolate(index / (pie.length - 1));

//     return <path d={arc(slice)} fill={sliceColor} />;
//   });
// };

export default Chart;
