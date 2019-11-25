import currentBox from "./leonScroller.js";
// imports just one function from a different file
// more info, import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// more info, export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// we don't hardcode w and h this time
// but keep them responsive
// (see adjustVizHeight and resized function
// that are defined at the bottom)
let w, h;
let heightRatio = 1;
let padding = 90;
let xpadding = 100;
let ypadding = 50;

let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "lavender")
;
// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
// (function definition at the bottom)
adjustVizHeight();


// your script starts here, e.g. load data here.
d3.json("data.json").then(gotData);

function gotData(incomingData){
  console.log(incomingData);

  let timeParse = d3.timeParse("%Y");

  let newData = incomingData.map(function(d){
    return {
      "name": d.name,
      "year": timeParse(d.year),
      "series": d.series,
      "revenue": d.revenue
    }
  })
  console.log(newData);

  let xDomain = d3.extent(newData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yDomain = [200, 1400];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);

  let graphgroup = viz.append("g").attr("class", "graphgroup");

  function keyFunction(d){
    return d.name;
  }

  let theSituation = graphgroup.selectAll(".datapoint").data(newData, keyFunction);

  let enteringGroups = theSituation.enter()
    .append("g")
      .attr("class", "datapoint")
      .attr("transform", function(d, i){
        let xPos = xScale(d.year);
        let yPos = yScale(d.revenue);
        return "translate("+ xPos +","+ yPos +")"
      })
  ;

  enteringGroups
    .append("circle")
      .attr("r", 2)
  ;
  enteringGroups
    .append("text")
      .text(function(d){return d.name})
      .attr("x", 5)
      .attr("font-size", "6px")
      .attr("font-family", "sans-serif")
    ;

  function update(newdata){

    let data = newdata;

    let xDomain = d3.extent(data, function(d){ return d.year });
    xScale.domain(xDomain);
    xAxis = d3.axisBottom(xScale);
    xAxisGroup.transition().duration(1000).call(xAxis);

    theSituation = graphgroup.selectAll(".datapoint").data(data, keyFunction);
    console.log("theSituation: ", theSituation);

    enteringGroups = theSituation.enter()
      .append("g")
    ;

    enteringGroups
      .append("circle")
        .attr("r", 2)
    ;
    enteringGroups
      .append("text")
        .text(function(d){return d.name})
        .attr("font-size", "6px")
        .attr("x", 5)
        .attr("font-family", "sans-serif")
      ;

    enteringGroups.attr("class", "datapoint")

      .attr("transform", function(d, i){
        return "translate("+xScale(d.year)+",0)";
      })

      .transition()
      .duration(1000)

      .attr("transform", function(d, i){
        return "translate("+xScale(d.year)+","+yScale(d.revenue)+")";
      })
    ;

    let exitingGroups = theSituation.exit();

    exitingGroups

      .transition()
      .duration(1000)

      .attr("transform", function(d, i){
        return "translate("+xScale(d.year)+","+h+")";
      })
      .remove()
    ;

    theSituation

      .transition()
      .duration(1000)

      .attr("transform", function(d, i){
        return "translate("+xScale(d.year)+","+yScale(d.revenue)+")";
      })
    ;
    theSituation
      .select("text")
        .text(function(d){return d.name})
        .attr("font-size", "6px")
        .attr("x", 5)
        .attr("font-family", "sans-serif")
      ;
  }

  function filterFunctionOne(d){
    if(d.series == "Iron Man"){
      return true;
    } else {
    return false;
    }
  }

  let filteredDataOne = newData.filter(filterFunctionOne);
  console.log(filteredDataOne);

// scrolling event listener
// you might move this block into the part of your code
// in which your data is loaded/available
  let previousSection;
  d3.select("#textboxes").on("scroll", function(){
    // the currentBox function is imported on the
    // very fist line of this script
    currentBox(function(box){
      console.log(box.id);

      if(box.id=="two"){
        console.log("changing viz");
        // trigger a new transition
        previousSection = box.id;
        update(filteredDataOne);
    } else {
       update(newData);
    }
  })
})

}





// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
  viz.style("height", function(){
    w = parseInt(viz.style("width"), 10);
    h = w*heightRatio;
    return h;
  })
}
function resized(){
  adjustVizHeight()
}
window.addEventListener("resize", resized);
