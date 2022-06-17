const imageWidth = $("#imageView").width();
const imageHeight = $("#imageView").height();

var imageSvg = d3
    .select("#imageView")
    .append("svg")
    .attr("width", imageWidth)
    .attr("height", imageHeight)
    .append("g");

var imageX = d3.scaleLinear().domain([0, 1]).range([0, imageWidth]);
var imageY = d3.scaleLinear().domain([0, 1]).range([0, imageHeight]);

imageSvg
    .append("image")
    .attr("width", imageWidth)
    .attr("height", imageHeight)
    .attr("xlink:href", "static/images/test2.png");

function updateImageView() {
    imageSvg.select("image").attr("xlink:href", "static/images/test2.png");

    var boxData = [];
    const nData = Math.floor(Math.random() * 5);

    for (i = 0; i < nData; i++) {
        var xmin = Math.random();
        var ymin = Math.random();
        var xmax = Math.min(xmin + Math.random(), 1);
        var ymax = Math.min(ymin + Math.random(), 1);

        boxData.push({
            x: xmin,
            y: ymin,
            width: xmax - xmin,
            height: ymax - ymin,
        });
    }

    imageSvg.selectAll("rect").remove();
    imageSvg
        .selectAll("rect")
        .data(boxData)
        .enter()
        .append("rect")
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", 5)
        .attr("x", function (d) {
            return imageX(d.x);
        })
        .attr("y", function (d) {
            return imageY(d.y);
        })
        .attr("width", function (d) {
            return imageX(d.width);
        })
        .attr("height", function (d) {
            return imageY(d.height);
        });
}

updateImageView();
