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
  function giveData(input) {
    var array = [];
    for (var key in input) {
      array.push({ count: input[key], category: key });
    }
    return array;
  }
  var data = giveData(finaldata);

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

  //   color range
  var color = d3
    .scaleOrdinal()
    .range([
      "#ffffe5",
      "#f7fcb9",
      "#d9f0a3",
      "#addd8e",
      "#78c679",
      "#41ab5d",
      "#238443",
      "#006837",
      "#004529",
    ]);
  // [
  //     "#ffffe5",
  //     "#f7fcb9",
  //     "#d9f0a3",
  //     "#addd8e",
  //     "#78c679",
  //     "#41ab5d",
  //     "#238443",
  //     "#006837",
  //     "#004529",
  //   ]

  // [
  //     "#ffd700",
  //     "#ffb14e",
  //     "#fa8775",
  //     "#ea5f94",
  //     "#cd34b5",
  //     "#9d02d7",
  //     "#0000ff",
  //   ]

  // ["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]

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
      return data.count;
    });

  // define the svg donut chart
  var svg2 = d3
    .select(".reference")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
      return color(data.data.category);
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
      return data.data.category;
    });

  return <div className="reference"></div>;
};

export default Chart;
