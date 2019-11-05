// data we work with
let data = [
  {
    "laughs": 0,
    "mood": 0
  },
  {
    "laughs": 3,
    "mood": 6
  },
  {
    "laughs": 4,
    "mood": 3
  },
  {
    "laughs": 8,
    "mood": 9
  }
];


let w = 900;
let h = 500;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

function getX(d){
  return d.laughs * 100;
}

function getY(d){
  return d.mood * 50;
}

// let circles = viz.selectAll("circle").data(data).enter()
//                                   .append("circle")
//                                   .attr("cx", getX)
//                                   .attr("cy", getY)
//                                   .attr("r", 20)
// ;

let lineMaker = d3.line()
                    .x(getX)
                    .y(getY)
;

let test = lineMaker(data);
console.log(test);

// viz.append("path").attr("d", test).attr("fill", "none").attr("stroke", "seagreen");

let theSituation = viz.datum(data)
theSituation.append("path")
              .attr("d", lineMaker)
              .attr("fill", "none")
              .attr("stroke", "seagreen");
;
