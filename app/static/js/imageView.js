var imageWidth = $("#imageView").width();
var imageHeight = $("#imageView").height();
var imageRatio = imageWidth / imageHeight;

var imageSvg = d3
    .select("#imageView")
    .append("svg")
    .attr("width", imageWidth)
    .attr("height", imageHeight)
    .append("g");

imageWidth -= 1 * em2px;
imageHeight -= 1 * em2px;

imageSvg.append("image").attr("width", imageWidth).attr("height", imageHeight);

function updateImageView() {
    imageSvg
        .select("image")
        // .transition()
        // .duration(200)
        .attr(
            "xlink:href",
            `https://storage.googleapis.com/ukiyoe-dataset/images/${selectedImageId}.jpg`
        );

    var boxData = [];
    const nData = Math.floor(Math.random() * 4);

    const origImageWidth = imageWidth;
    const origImageHeight = imageHeight;
    const origImageRatio = origImageWidth / origImageHeight;

    var rescaleWidth = 0;
    var rescaleHeight = 0;

    if (imageRatio > origImageRatio) {
        rescaleWidth = origImageWidth * (imageHeight / origImageHeight);
        rescaleHeight = imageHeight;
    } else {
        rescaleWidth = imageWidth;
        rescaleHeight = origImageHeight * (imageWidth / origImageWidth);
    }

    var rescaleX = 0.5 * (imageWidth - rescaleWidth);
    var rescaleY = 0.5 * (imageHeight - rescaleHeight);

    for (i = 0; i < nData; i++) {
        var xmin = Math.random() * rescaleWidth;
        var ymin = Math.random() * rescaleHeight;
        var xmax = Math.min(xmin + Math.random(), 1) * rescaleWidth;
        var ymax = Math.min(ymin + Math.random(), 1) * rescaleHeight;

        boxData.push({
            x: xmin * 0.8,
            y: ymin * 0.8,
            width: (xmax - xmin) * 0.5,
            height: (ymax - ymin) * 0.5,
            objectId: i,
        });
    }

    imageSvg.selectAll("rect").remove();
    imageSvg.selectAll("line").remove();

    imageSvg
        .selectAll("rect")
        .data(boxData)
        .enter()
        .append("rect")
        .style("stroke", secondaryColor)
        .style("fill", "primaryColor")
        .style("stroke-width", 1)
        .style("fill-opacity", 0)
        .attr("x", function (d) {
            return d.x + rescaleX;
        })
        .attr("y", function (d) {
            return d.y + rescaleY;
        })
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .on("mouseover", function (d) {
            d3.select(this).style("fill-opacity", 0.8);
        })
        .on("mouseout", function () {
            d3.select(this).style("fill-opacity", 0.2);
        })
        .on("click", function (d) {
            const selectedObjectData = d3.select(this).data()[0];
            selectedObject = selectedObjectData.objectId;

            imageSvg.selectAll("line").remove();
            imageSvg
                .append("line")
                .style("stroke", secondaryColor)
                .style("stroke-width", 1)
                .attr(
                    "x1",
                    selectedObjectData.x + rescaleX + selectedObjectData.width
                )
                .attr("y1", selectedObjectData.y + rescaleY)
                .attr("x2", imageWidth + em2px - 7)
                .attr("y2", 7);

            imageSvg
                .append("line")
                .style("stroke", secondaryColor)
                .style("stroke-width", 1)
                .attr(
                    "x1",
                    selectedObjectData.x + rescaleX + selectedObjectData.width
                )
                .attr(
                    "y1",
                    selectedObjectData.y + rescaleY + selectedObjectData.height
                )
                .attr("x2", imageWidth + em2px)
                .attr("y2", imageHeight + em2px);

            updateObjectView();
        })
        .transition()
        .duration(200)
        .style("fill-opacity", 0.2);
}

updateImageView();
