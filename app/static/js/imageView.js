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

function updateImageView(img_path=null) {
    if (!img_path){
    img_path=`https://storage.googleapis.com/ukiyoe-dataset/images/${selectedImageId}.jpg`
    }
    else{
    img_path = `https://storage.googleapis.com/ukiyoe-dataset/images/${img_path}.jpg`
    }
    console.log("INSIDE UPDATE VIEW")
    imageSvg
        .select("image")
        // .transition()
        // .duration(200)
        .attr(
            "xlink:href",
            `${img_path}`
        );

    get_detected_objects(selectedImageId, updateDetectedObjects)

}

function updateDetectedObjects(detected_object_info) {
console.log(detected_object_info)
var boxData = [];
//  Temporarily setting to 1, change later
//const nData = Object.keys(detected_object_info).length;
const nData = 1;
console.log("number of data", nData)
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

//for (var pane=0;pane<nData;pane++) {
//object_rect = detected_object_info[pane]
object_rect = detected_object_info
console.log("object_rect", object_rect)
var xmin = parseFloat(object_rect['xmin']);
var ymin = parseFloat(object_rect['ymin']);
var xmax = parseFloat(object_rect['xmax']);
var ymax = parseFloat(object_rect['ymax']);
boxData.push({
    x: xmin * 0.8,
    y: ymin * 0.8,
    width: (xmax - xmin) * 0.5,
    height: (ymax - ymin) * 0.5,
    objectId: object_rect['pane_id'],
});
//}

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
        console.log("selectedObject",selectedObjectData)
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

        updateObjectView(selectedObject);
    })
    .transition()
    .duration(200)
    .style("fill-opacity", 0.2);
}
