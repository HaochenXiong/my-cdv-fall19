d3.json("data.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;


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

    data = newdata;

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
        .attr("r", 5)
    ;
    enteringGroups
      .append("text")
        .text(function(d){return d.name})
        .attr("font-size", "6px")
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

    exitingGroups = theSituation.exit();

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

  document.getElementById("buttonOne").addEventListener("click", function(){
    update(filteredDataOne);
  });

  function filterFunctionTwo(d){
    if(d.series == "Captain America"){
      return true;
    } else {
    return false;
    }
  }

  let filteredDataTwo = newData.filter(filterFunctionTwo);
  console.log(filteredDataTwo);

  document.getElementById("buttonTwo").addEventListener("click", function(){
    update(filteredDataTwo);
  });

  document.getElementById("buttonThree").addEventListener("click", function(){
    update(newData);
  });

}
