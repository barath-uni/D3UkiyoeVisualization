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

var timelineY = d3
    .scaleLinear()
    .domain([0, 250])
    .range([60, timelineHeight - 25]);

function updateTimeline() {
    timelineSvg.selectAll("rect").remove();
    timelineSvg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .style("stroke", backgroundColor)
        .style("stroke-width", 1)
        .attr("x", function (d) {
            return timelineX(d.x);
        })
        .attr("y", function (d) {
            return timelineY(d.y);
        })
        .attr("width", timelineX.bandwidth())
        .attr("height", function (d) {
            return timelineHeight - timelineY(d.y);
        })
        .attr("fill", function (d) {
            if (d.x == selectedDate) return secondaryColor;
            return primaryColor;
        })
        .style("opacity", function (d) {
            if (d.x < selectedDate) return 0.6;
            return 1;
        });
}

eraDates = [1650, 1740, 1780, 1800, 1870, 1910, 1940, 2010];

for (i = 1; i < eraDates.length - 1; i++) {
    timelineSvg
        .append("line")
        .style("stroke", secondaryColor)
        .style("stroke-width", 3)
        .attr("x1", timelineX(eraDates[i]))
        .attr("y1", timelineY(0) - 20)
        .attr("x2", timelineX(eraDates[i]))
        .attr("y2", timelineY(0));

    const xCenter = (eraDates[i] + eraDates[i + 1]) * 0.5;
    console.log(xCenter)

    timelineSvg
        .append("text")
        .style("fill", secondaryColor)
        .attr("class", "svg-text")
        .attr("x", timelineX(xCenter) - 25)
        .attr("y", timelineY(0))
        .text(eraDates[i]);
}

timelineSvg
    .append("line")
    .style("stroke", primaryColor)
    .style("stroke-width", 3)
    .style("opacity", 0.6)
    .attr("x1", 0)
    .attr("y1", timelineY(0) - 20)
    .attr("x2", timelineWidth)
    .attr("y2", timelineY(0) - 20);

timelineSvg
    .append("circle")
    .style("fill", secondaryColor)
    .attr("r", 10)
    .attr("cx", timelineX(selectedDate))
    .attr("cy", timelineY(0) - 20);

timelineSvg
    .append("text")
    .style("fill", secondaryColor)
    .attr("class", "svg-text");

function updateTimelineText() {
    timelineSvg
        .select("text")
        .attr("x", timelineX(selectedDate) - 25)
        .attr("y", timelineY(0) - 40)
        .text(function () {
            return selectedDate;
        });
}

const dragHandler = d3
    .drag()
    .on("start", function (e) {
        emptyScatter();
    })
    .on("drag", function (e) {
        var eachBand = timelineX.step();
        var index = Math.round(e.x / eachBand);
        selectedDate = timelineX.domain()[index];

        d3.select(this).attr("cx", function () {
            return timelineX(selectedDate) + 0.5 * timelineX.bandwidth();
        });

        updateTimeline();
        updateTimelineText();
    })
    .on("end", function (e) {
        updateScatter();
    });

dragHandler(timelineSvg.select("circle"));

updateTimeline();
updateTimelineText();
