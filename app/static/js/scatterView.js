const scattereWidth = $("#scatterView").width();
const scatterHeight = $("#scatterView").height();
// const eraRotations = [0, 45, 90, 135, 180];

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
        .selectAll(".glyph")
        .transition()
        .duration(500)
        .style("opacity", 0)
        .remove();
}

function createGlyph(svgCanvas, glyphData) {
    var glyph = svgCanvas
        .append("g")
        .attr("class", "glyph")
        .attr(
            "transform",
            `translate(${glyphData.x} ${glyphData.y}) scale(0.1)`
        );

    glyph.select(".glyph").data(glyphData).enter();

    glyph
        .append("image")
        .attr("x", -50)
        .attr("y", -50)
        .attr("width", 100)
        .attr("height", 100)
        .attr(
            "xlink:href",
            `https://cocodataset.org/images/cocoicons/${glyphData.objectId}.jpg`
        );

    glyph
        .append("path")
        .attr(
            "d",
            d3
                .arc()
                .innerRadius(75)
                .outerRadius(100)
                .startAngle(0)
                .endAngle(Math.PI * 2)
        )
        .attr("fill", glyphData.colorA);

    glyph
        .append("path")
        .attr(
            "d",
            d3
                .arc()
                .innerRadius(100)
                .outerRadius(120)
                .startAngle(-0.5 * Math.PI)
                .endAngle(0.5 * Math.PI)
        )
        .attr("fill", glyphData.colorB);

    glyph
        .append("path")
        .attr(
            "d",
            d3
                .arc()
                .innerRadius(100)
                .outerRadius(120)
                .startAngle(0.5 * Math.PI)
                .endAngle(1.5 * Math.PI)
        )
        .attr("fill", glyphData.colorC);

    glyph
        .append("path")
        .attr(
            "d",
            d3
                .arc()
                .innerRadius(120)
                .outerRadius(125)
                .startAngle(0)
                .endAngle(glyphData.objectFreq * 2 * Math.PI)
        )
        .attr("fill", primaryColor);

    // glyph
    //     .append("line")
    //     .attr("x1", 0)
    //     .attr("y1", -120)
    //     .attr("x2", 0)
    //     .attr("y2", -200)
    //     .style("stroke", secondaryColor)
    //     .style("stroke-width", 5)
    //     .attr("transform", "rotate(" + eraRotations[glyphData.era] + ")");

    // glyph
    //     .append("rect")
    //     .attr("x", -10)
    //     .attr("y", -210)
    //     .attr("width", 20)
    //     .attr("height", 20)
    //     .attr("fill", secondaryColor)
    //     .attr("transform", "rotate(" + eraRotations[glyphData.era] + ")");

    glyph
        .on("click", function () {
            selectedImageId = glyphData.imageId;
            updateImageView();
            resetObjectFocus();
            updateColorView();
            // resetColorFocus();
        })
        .on("mouseover", function () {
            d3.select(this)
                .moveToFront()
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${glyphData.x} ${glyphData.y}) scale(0.5)`
                );
        })
        .on("mouseout", function () {
            d3.select(this)
                .moveToFront()
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${glyphData.x} ${glyphData.y}) scale(0.1)`
                );
        });

    return glyph;
}

function updateScatter() {
    var scatterData = [];
    const nData = Math.floor(Math.random() * 100);

    for (i = 0; i < nData; i++) {
        var glyphData = {
            x: scatterX(Math.random()),
            y: scatterY(Math.random()),
            imageId: Math.floor(Math.random() * 170000),
            era: Math.floor(Math.random() * 4),
            objectId: Math.floor(Math.random() * 89) + 1,
            objectFreq: Math.random(),
            colorA: "#" + Math.floor(Math.random() * 16777215).toString(16),
            colorB: "#" + Math.floor(Math.random() * 16777215).toString(16),
            colorC: "#" + Math.floor(Math.random() * 16777215).toString(16),
        };

        glyph = createGlyph(scatterSvg, glyphData);
        scatterData.push(glyphData);
    }

    // scatterSvg
    //     .selectAll("image")
    //     .data(scatterData)
    //     .enter()
    //     .append("image")
    //     .attr("width", 40)
    //     .attr("height", 40)
    //     .attr("xlink:href", "static/images/test2.png")
    //     .attr("x", function (d) {
    //         return scatterX(d.x);
    //     })
    //     .attr("y", function (d) {
    //         return scatterY(d.y);
    //     })
    //     .attr("style", "opacity: 0")
    //     .on("mouseover", function () {
    //         const scaleFactor = 7;
    //         const centerX =
    //             d3.select(this).attr("x") * (scaleFactor - 1) +
    //             0.5 * d3.select(this).attr("width") * (scaleFactor - 1);
    //         const centerY =
    //             d3.select(this).attr("y") * (scaleFactor - 1) +
    //             0.5 * d3.select(this).attr("height") * (scaleFactor - 1);

    //         d3.select(this)
    //             .moveToFront()
    //             .transition()
    //             .duration(200)
    //             .attr(
    //                 "transform",
    //                 "translate(-" +
    //                     centerX +
    //                     " -" +
    //                     centerY +
    //                     ") scale(" +
    //                     scaleFactor +
    //                     ", " +
    //                     scaleFactor +
    //                     ")"
    //             );
    //     })
    //     .on("mouseout", function () {
    //         d3.select(this)
    //             .transition()
    //             .duration(200)
    //             .attr("transform", "");
    //     })
    //     .on("click", function () {
    //         selectedImage = 0;
    //         updateImageView();
    //         resetObjectFocus();
    //     })
    //     .transition()
    //     .duration(500)
    //     .delay(500)
    //     .attr("style", "opacity: 1");
}

updateScatter();
