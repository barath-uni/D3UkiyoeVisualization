const scattereWidth = $("#scatterView").width();
const scatterHeight = $("#scatterView").height();

d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

var scatterSvg = d3
    .select("#scatterView")
    .append("svg")
    .attr("width", scattereWidth)
    .attr("height", scatterHeight)
    .append("g");

var scatterX = d3
    .scaleLinear()
    .domain([0, 1])
    .range([30, scattereWidth - 30]);

var scatterY = d3
    .scaleLinear()
    .domain([0, 1])
    .range([30, scatterHeight - 30]);

function updateScatter() {
    var scatterData = [];
    const nData = Math.floor(Math.random() * 240) + 10;

    for (i = 0; i < nData; i++) {
        scatterData.push({ x: Math.random(), y: Math.random() });
    }

    scatterSvg
        .selectAll("image")
        // .transition()
        // .duration(600)
        // .attr("x", scatterX(0.5))
        // .attr("y", scatterY(0.5))
        .remove();

    scatterSvg
        .selectAll("image")
        .data(scatterData)
        .enter()
        .append("image")
        .attr("width", 20)
        .attr("xlink:href", "static/images/test.png")
        .attr("x", scatterX(0.5))
        .attr("y", scatterY(0.5))
        .attr("style", "opacity: 0")
        .on("mouseover", function () {
            d3.select(this)
                .moveToFront()
                .transition()
                .duration(200)
                .attr("transform", "translate(-60, -60)")
                .attr("width", 180);
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("transform", "translate(0, 0)")
                .attr("width", 20);
        })
        .transition()
        .duration(200)
        .delay(200)
        .attr("x", function (d) {
            return scatterX(d.x) - 10;
        })
        .attr("y", function (d) {
            return scatterY(d.y) - 10;
        })
        .attr("style", "opacity: 1");
}

updateScatter();
