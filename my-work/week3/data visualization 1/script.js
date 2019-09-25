function coordianteSet(dataPoint){
  let x = dataPoint.time * 20 + 50;
  let y = dataPoint.date * 100 - 1000;
  return "translate(" + x + ", " + y + ")";
}

function colorSet(dataPoint){
    if (dataPoint.type == "Information"){
      return "lightgreen";
    } else if (dataPoint.type == "News"){
      return "lightblue";
    } else if (dataPoint.type == "Recommendation") {
      return "blueviolet";
    } else if (dataPoint.type == "Stories"){
      return "pink";
    }
}

function appSet(dataPoint){
    if (dataPoint.app == "Weibo"){
      return "tomato";
    } else if (dataPoint.app == "Zhihu"){
      return "dodgerblue";
    } else if (dataPoint.app == "Huxiu") {
      return "silver";
    } else if (dataPoint.app == "Taobao"){
      return "orange";
    } else if (dataPoint.app == "Dongfang Caifu"){
      return "crimson";
    } else if (dataPoint.app == "Tao Piaopiao"){
      return "indianred";
    } else if (dataPoint.app == "Dongqiu Di"){
      return "seagreen";
    } else if (dataPoint.app == "Wangyi Xinwen"){
      return "brown";
    } else if (dataPoint.app == "Taobao"){
      return "orange";
    }
}

function gotData(newData){
  console.log(newData);

  let viz = d3.select("#viz-container")
                  .append("svg")
                      .attr("id", "viz")
                      .attr("width", 1300)
                      .attr("height", 600)
  ;

  let circleGroups = viz.selectAll(".dataGroup").data(newData)
      .enter()
          .append("g")
            .attr("class", "dataGroup")
  ;

  circleGroups.append("circle")
    .attr("fill", colorSet)
    .attr("r", 30)
  ;

  let rects = circleGroups.append("rect")
    .attr("id", "rects")
    .attr("width", 30)
    .attr("height", 5)
    .attr("fill", appSet)
  ;

  rects.attr("x", -15)
       .attr("y", 30);


  circleGroups.attr("transform", coordianteSet);
 }

d3.json("data.json").then(gotData);
