const scattereWidth = $("#scatterView").width();
const scatterHeight = $("#scatterView").height();
// const eraRotations = [0, 45, 90, 135, 180];

var selectedGlyph = ""

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
        )
        .attr("x", glyphData.x)
        .attr("y", glyphData.y);

    glyph.select(".glyph").data(glyphData).enter();

    glyph
        .append("image")
        .attr("x", -70)
        .attr("y", -70)
        .attr("width", 140)
        .attr("height", 140)
        .attr(
            "xlink:href",
            `https://storage.googleapis.com/ukiyoe-dataset/images/${glyphData.imageId}.jpg`
        );

    glyph
        .append("path")
        .attr(
            "d",
            d3
                .arc()
                .innerRadius(75)
                .outerRadius(90)
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
                .innerRadius(90)
                .outerRadius(100)
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
                .innerRadius(90)
                .outerRadius(100)
                .startAngle(0.5 * Math.PI)
                .endAngle(1.5 * Math.PI)
        )
        .attr("fill", glyphData.colorC);

    // glyph
    //     .append("path")
    //     .attr(
    //         "d",
    //         d3
    //             .arc()
    //             .innerRadius(120)
    //             .outerRadius(125)
    //             .startAngle(0)
    //             .endAngle(glyphData.objectFreq * 2 * Math.PI)
    //     )
    //     .attr("fill", primaryColor);

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
            svgCanvas.selectAll(".selected-glyph").attr("class", "glyph");
            d3.select(this).attr("class", "glyph selected-glyph");
            selectedImageId = glyphData.imageId;

            updateImageView();
            resetObjectFocus();
            updateColorView();
            updateColorSimilars();
            updateHistory()
        })
        .on("mouseover", function () {
            d3.select(this)
                .moveToFront()
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${glyphData.x} ${glyphData.y}) scale(0.8)`
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

function updateScatterView() {
    getScatter(selectedDate, updateScatterCallback)
}

function updateScatterCallback(scatterData) {
    scatterSvg.select("text").remove();
    if (Object.keys(scatterData).length == 0) {
        scatterSvg
            .append("text")
            .attr("x", scatterX(0.5))
            .attr("y", scatterY(0.5))
            .text("No Artworks Found for this Year")
            .style("text-anchor", "middle")
            .style("font-size", 2 * em2px)
            .style("fill", secondaryColor);
    }

    for (i in scatterData) {
        scatterData[i]["x"] = scatterX(scatterData[i]["x"])
        scatterData[i]["y"] = scatterY(scatterData[i]["y"])
        glyph = createGlyph(scatterSvg, scatterData[i]);
    }
}

updateScatterView();
