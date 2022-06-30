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

function updateImageView(img_path = null) {
    if (!img_path) {
        img_path = `https://storage.googleapis.com/ukiyoe-dataset/images/${selectedImageId}.jpg`
    }
    else {
        img_path = `https://storage.googleapis.com/ukiyoe-dataset/images/${img_path}.jpg`
    }

    imageSvg
        .select("image")
        .attr(
            "xlink:href",
            `${img_path}`
        );

    getImage(selectedImageId, updateImage)
    getImageObjects(selectedImageId, updateImageObjects)
}


function updateImage(imageData) {
    $("#metaView").html(`
        <p><b>Title</b>: ${imageData["title"]}</p>
        <p><b>Description</b>: ${imageData["description"]}</p>
        <p><b>Artist</b>: ${imageData["artist"]}</p>
        <p><b>Year</b>: ${imageData["date"]}</p>
        <p><b>Era</b>: ${imageData["era"]}</p>
    `)
}


function updateImageObjects(imageObjectsData) {
    if (imageObjectsData == {}) {
        return
    }

    const origImageWidth = imageObjectsData["width"];
    const origImageHeight = imageObjectsData["height"];
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

    var objectX = d3
        .scaleLinear()
        .domain([0, origImageWidth])
        .range([rescaleX, rescaleX + rescaleWidth]);

    var objectY = d3
        .scaleLinear()
        .domain([0, origImageHeight])
        .range([rescaleY, rescaleY + rescaleHeight]);

    // imageSvg.select("circle").remove()
    // imageSvg.append("circle").attr("r", 10).attr("cx", rescaleX).attr("cy", rescaleY).style("fill", "black")
    // imageSvg.append("circle").attr("r", 10).attr("cx", rescaleX + rescaleWidth).attr("cy", rescaleY + rescaleHeight).style("fill", "black")

    var boxData = [];
    for (i in imageObjectsData["panes"]) {
        var xmin = parseFloat(imageObjectsData["panes"][i]['xmin']);
        var ymin = parseFloat(imageObjectsData["panes"][i]['ymin']);
        var xmax = parseFloat(imageObjectsData["panes"][i]['xmax']);
        var ymax = parseFloat(imageObjectsData["panes"][i]['ymax']);

        boxData.push({
            x: objectX(xmin),
            y: objectY(ymin),
            width: objectX(xmax) - objectX(xmin),
            height: objectY(ymax) - objectY(ymin),
            paneId: imageObjectsData["panes"][i]['paneId'],
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
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
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
            selectedPaneId = selectedObjectData.paneId;

            imageSvg.selectAll("line").remove();
            imageSvg
                .append("line")
                .style("stroke", secondaryColor)
                .style("stroke-width", 1)
                .attr(
                    "x1",
                    selectedObjectData.x + selectedObjectData.width
                )
                .attr("y1", selectedObjectData.y)
                .attr("x2", imageWidth + em2px - 7)
                .attr("y2", 7);

            imageSvg
                .append("line")
                .style("stroke", secondaryColor)
                .style("stroke-width", 1)
                .attr(
                    "x1",
                    selectedObjectData.x + selectedObjectData.width
                )
                .attr(
                    "y1",
                    selectedObjectData.y + selectedObjectData.height
                )
                .attr("x2", imageWidth + em2px)
                .attr("y2", imageHeight + em2px);

            updateObjectView();
        })
        .transition()
        .duration(200)
        .style("fill-opacity", 0.2);
}
