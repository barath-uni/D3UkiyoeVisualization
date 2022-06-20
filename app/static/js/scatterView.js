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
    .range([50, scattereWidth - 50]);

var scatterY = d3
    .scaleLinear()
    .domain([0, 1])
    .range([50, scatterHeight - 50]);

function emptyScatter() {
    scatterSvg
        .selectAll("image")
        .transition()
        .duration(500)
        .style("opacity", 0)
        .remove();
}

function updateScatter() {
    var scatterData = [];
    const nData = Math.floor(Math.random() * 240) + 10;

    for (i = 0; i < nData; i++) {
        scatterData.push({ x: Math.random(), y: Math.random() });
    }

    scatterSvg
        .selectAll("image")
        .data(scatterData)
        .enter()
        .append("image")
        .attr("width", 40)
        .attr("height", 40)
        .attr("xlink:href", "static/images/test2.png")
        .attr("x", function (d) {
            return scatterX(d.x);
        })
        .attr("y", function (d) {
            return scatterY(d.y);
        })
        .attr("style", "opacity: 0")
        // .on("mousemove", function (e) {

        // })
        .on("mouseover", function () {
            const scaleFactor = 7.5;
            const centerX =
                d3.select(this).attr("x") * (scaleFactor - 1) +
                0.5 * d3.select(this).attr("width") * (scaleFactor - 1);
            const centerY =
                d3.select(this).attr("y") * (scaleFactor - 1) +
                0.5 * d3.select(this).attr("height") * (scaleFactor - 1);

            d3.select(this)
                .moveToFront()
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    "translate(-" +
                        centerX +
                        " -" +
                        centerY +
                        ") scale(" +
                        scaleFactor +
                        ", " +
                        scaleFactor +
                        ")"
                );
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                // .attr("transform", "translate(0 0)")
                // .attr("transform", "scale(1, 1)");
                .attr("transform", "");
        })
        .on("click", function () {
            selectedImage = 0;
            updateImageView();
        })
        .transition()
        .duration(500)
        .delay(500)
        .attr("style", "opacity: 1");
}

updateScatter();
