var div = $('<div style="width: 1em;"></div>').appendTo("body");
const em2px = div.width();
div.remove();

const backgroundColor = "#EFD6AC";
const primaryColor = "#272932";
const secondaryColor = "#DB504A";
const tertiaryColor = "#638475";

var selectedDate = 1675 + Math.floor(Math.random() * 338);
var selectedImageId = Math.floor(Math.random() * 170000);
var selectedPaneId = 0;
var prevSelectedImageId = 0;

for (i = 0; i < 100; i++) {
    $("#background").append(
        `<div class="cloud" id="cloud${i}"></div>`
    )

    $(`#cloud${i}`).css({
        "left": Math.random() * 2 * window.outerWidth - 0.5 * window.outerWidth,
        "top": Math.random() * 2 * window.outerWidth - 0.5 * window.outerWidth,
        "animation-duration": Math.floor(Math.random() * 50) + 100 + "s",
        "background-image": `url(/static/images/cloud${Math.floor(Math.random() * 4) + 1}.png)`
    })
}

function updateHistory() {
    if (selectedImageId != prevSelectedImageId) {
        if ($("#selectionHistory > div").length > 10) {
            $("#selectionHistory").children("div").first().fadeOut(200, function () {
                $(this).remove();

                $("#selectionHistory").append(`
                    <div class="prev-selected" onClick="selectPrevImage(${selectedImageId})">
                        <img src="https://storage.googleapis.com/ukiyoe-dataset/images/${selectedImageId}.jpg">
                    </div>
                `)
            });
        } else {
            $("#selectionHistory").append(`
                <div class="prev-selected" onClick="selectPrevImage(${selectedImageId})">
                    <img src="https://storage.googleapis.com/ukiyoe-dataset/images/${selectedImageId}.jpg">
                </div>
            `)
        }

        prevSelectedImageId = selectedImageId;
    }
}

function selectPrevImage(imageId) {
    selectedImageId = imageId;

    updateImageView();
    resetObjectFocus();
    updateColorView();
    updateColorSimilars();
}