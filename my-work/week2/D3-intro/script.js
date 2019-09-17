let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 1200)
                    .attr("height", 240)
;

let line = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "line")
                    .attr("width", 1100)
                    .attr("height", 100)
;


function randomNumber(dataPoint){
   return dataPoint.Moment * 20;
}

function chosenColor(dataPoint, i){
     console.log(dataPoint);
     console.log(i);
   return dataPoint.color;
}

function gotData(newData){
  console.log(newData);

  viz.selectAll("circle").data(newData).enter().append("circle")
                                        .attr("cx", randomNumber)
                                        .attr("cy", 200)
                                        .attr("r", 20)
                                        .attr("fill", chosenColor)
  ;



  //
  // // current selction <div id="viz-container">
  // viz.attr("height", 500);
  //
  // let myCircle = viz.append("rect")
  //               .attr("x", 200)
  //               .attr("y", 100)
  //               .attr("width", 400)
  //               .attr("height", 200)
  // ;
  //
  // myCircle.attr("fill", "pink");

    // let myData = [3, 5, 6, 8, 9]
    // for (var i = 0; i < newData.length; i++) {
    //   let momentNumber = newData[i].Moment;
    //   let colorType = newData[i].color;
    //   console.log(momentNumber);
    //   console.log(colorType);
    // }
// }
}

d3.json("data.json").then(gotData)
