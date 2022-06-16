const timelineWidth = $("#timeline").width();
const timelineHeight = $("#timeline").height();

var svg = d3
    .select("#timeline")
    .append("svg")
    .attr("width", timelineWidth)
    .attr("height", timelineHeight)
    .append("g");

var data = [];
for (i = 1650; i < 2011; i++) {
    data.push({ x: i, y: Math.floor(Math.random() * 250) });
}

var x = d3
    .scaleBand()
    .range([0, timelineWidth])
    .domain(
        data.map(function (d) {
            return d.x;
        })
    );

var y = d3.scaleLinear().domain([0, 250]).range([0, timelineHeight]);

svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
        return x(d.x);
    })
    .attr("y", function (d) {
        return y(d.y);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
        return timelineHeight - y(d.y);
    })
    .attr("fill", "green");

// svg.append("circle")
//     .style("fill", "red")
//     .attr("r", 5)
//     .attr("cx", x(1800))
//     .attr("cy", y(0));
