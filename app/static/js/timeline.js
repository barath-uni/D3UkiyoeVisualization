const timelineWidth = $("#timelineView").width();
const timelineHeight = $("#timelineView").height();

var timelineSvg = d3
    .select("#timelineView")
    .append("svg")
    .attr("width", timelineWidth)
    .attr("height", timelineHeight)
    .append("g");

var data = [];
for (i = 1650; i < 2011; i++) {
    data.push({ x: i, y: Math.floor(Math.random() * 250) });
}

var timelineX = d3
    .scaleBand()
    .range([0, timelineWidth])
    .domain(
        data.map(function (d) {
            return d.x;
        })
    );

var timelineY = d3.scaleLinear().domain([0, 250]).range([60, timelineHeight]);

function updateTimeline() {
    timelineSvg.selectAll("rect").remove();
    timelineSvg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("x", function (d) {
            return timelineX(d.x) - 0.5 * timelineX.bandwidth();
        })
        .attr("y", function (d) {
            return timelineY(d.y);
        })
        .attr("width", timelineX.bandwidth())
        .attr("height", function (d) {
            return timelineHeight - timelineY(d.y);
        })
        .attr("fill", function (d) {
            if (d.x < selectedDate) return "red";
            else if (d.x == selectedDate) return "blue";
            return "green";
        });
}

timelineSvg
    .append("line")
    .style("stroke", "green")
    .style("stroke-width", 3)
    .attr("x1", timelineX(1650))
    .attr("y1", timelineY(0) - 20)
    .attr("x2", timelineX(2010))
    .attr("y2", timelineY(0) - 20);

timelineSvg
    .append("circle")
    .style("fill", "red")
    .attr("r", 10)
    .attr("cx", timelineX(selectedDate))
    .attr("cy", timelineY(0) - 20);

timelineSvg.append("text").style("fill", "white").attr("class", "svg-text");

function updateTimelineText() {
    timelineSvg
        .select("text")
        .attr("x", timelineX(selectedDate) - 20)
        .attr("y", timelineY(0) - 40)
        .text(function () {
            return selectedDate;
        });
}

const dragHandler = d3
    .drag()
    .on("drag", function (e) {
        var eachBand = timelineX.step();
        var index = Math.round(e.x / eachBand);
        selectedDate = timelineX.domain()[index];

        d3.select(this).attr("cx", function () {
            return timelineX(selectedDate);
        });

        updateTimeline();
        updateTimelineText();
    })
    .on("end", function (e) {
        updateScatter();
        updateImageView();
    });

dragHandler(timelineSvg.select("circle"));

updateTimeline();
updateTimelineText();
