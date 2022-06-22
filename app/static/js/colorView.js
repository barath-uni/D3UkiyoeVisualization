const colorWidth = $("#colorView").width();
const colorHeight = $("#colorView").height();

var colorSvg = d3
    .select("#colorView")
    .append("svg")
    .attr("width", colorWidth)
    .attr("height", colorHeight)
    .append("g");

function colorCardClick(newImage) {
    $(".prev-selected-card").removeClass("prev-selected-card");
    $(`#colorCard${selectedImageId}`).addClass("prev-selected-card");

    selectedImageId = newImage;
    updateImageView();
    updateColorView();

    $(".selected-card").removeClass("selected-card");
    $(`#colorCard${newImage}`).addClass("selected-card");
}

function updateColorView() {
    $("#colorSimilarsTitle").animate(
        {
            color: primaryColor,
        },
        500
    );

    var colorData = {};
    var colors = [];
    for (i = 0; i < 10; i++) {
        colorData[i] = Math.random();
        colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    var color = d3.scaleOrdinal().domain(colorData).range(colors);
    var pie = d3.pie().value(function (d) {
        return d.value;
    });

    var data_ready = pie(d3.entries(colorData));

    colorSvg.selectAll(".prev-color-wheel").remove();
    colorSvg
        .selectAll(".cur-color-wheel")
        .attr("class", "prev-color-wheel")
        .on("mouseover", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${90} ${colorHeight / 2}) scale(1.1)`
                );
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${90} ${colorHeight / 2}) scale(1)`
                );
        })
        .transition()
        .duration(200)
        .attr("transform", `translate(${90} ${colorHeight / 2})`);

    colorSvg
        .selectAll(".cur-color-wheel")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("class", "cur-color-wheel")
        .attr("d", d3.arc().innerRadius(40).outerRadius(80))
        .attr("fill", function (d) {
            return color(d.data.key);
        })
        .attr("stroke", backgroundColor)
        .style("stroke-width", "2px")
        .style("opacity", 0)
        .attr("transform", `translate(${colorWidth - 90} ${colorHeight / 2})`)
        .on("mouseover", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${colorWidth - 90} ${
                        colorHeight / 2
                    }) scale(1.1)`
                );
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr(
                    "transform",
                    `translate(${colorWidth - 90} ${colorHeight / 2}) scale(1)`
                );
        })
        .transition()
        .delay(200)
        .duration(200)
        .style("opacity", 1);
}

function updateColorSimilars() {
    $("#colorSimilars")
        .children()
        .fadeOut()
        .promise()
        .done(function () {
            $("#colorSimilars").empty();

            for (i = 0; i < 25; i++) {
                const newImageId = Math.floor(Math.random() * 170000);

                $("#colorSimilars").append(`
                    <div id="colorCard${newImageId}" class="similar-card similar-card-left" onClick=colorCardClick(${newImageId})>
                        <div class="similar-card-thumb">
                            <img src="https://storage.googleapis.com/ukiyoe-dataset/images/${newImageId}.jpg">
                        </div>
                        <div class="similar-card-text">
                            <p><b>Title</b>: Some Title</p>
                            <p><b>Artist</b>: Some Artist</p>
                            <p><b>Time</b>: Some Year, Period</p>
                        </div>
                    </div>
        `);
            }
        });
}
