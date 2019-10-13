let w = 900;
let h = 600;

let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "white")
    .attr("transform", "translate(150, 100)")
;

function gotData(data){
  console.log(data);

let length = 80,
    radius = 90,
    padding = 10;

let color = d3.scaleOrdinal(d3.schemePastel2).domain(d3.keys(data[0]).filter(function(key) { return key !== "Date"; }));

let arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);

let pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.number; });

data.forEach(function(d) {
      d.types = color.domain().map(function(name) {
        return {name: name, number: +d[name]};
      });
    });

function legendSet(d, i){
  let y = i*20;
  return "translate(0, "+ y +")";
}

let legend = viz.append("svg")
        .attr("class", "legend")
        .attr("width", length * 2)
        .attr("height", length * 2)
      .selectAll("g")
        .data(color.domain().slice())
      .enter().append("g")
        .attr("transform", legendSet);

legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("font-family", "Courier New")
        .text(function(d) { return d; });

let svg = viz.selectAll(".pie")
          .data(data)
          .enter().append("svg")
            .attr("class", "pie")
            .attr("width", radius * 2)
            .attr("height", radius * 2)
            .attr("x", function(d, i){
              if (i<4){
                let a = i * 200;
                let x = a + 60;
                return x
              }else{
                let b = (i-4)* 200;
                let xx = b + 60;
                return xx
              }
            })
            .attr("y", function(d, i){
              if(i<4){
                return 150
              }else{
                return 350
              }
            });

let groups = svg.append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");

    groups.selectAll(".arc")
          .data(function(d) { return pie(d.types); })
          .enter().append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.name); });

        groups.append("text")
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("font-family", "Courier New")
            .text(function(d) { return d.Date; });
}

d3.csv("data.csv").then(gotData);
