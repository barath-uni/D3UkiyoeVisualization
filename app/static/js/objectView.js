function objectCardClick(newImage) {
    selectedImageId = newImage;
    updateImageView();
    resetObjectFocus();
    updateColorView();
    updateColorSimilars();
    updateHistory()

    $(".selected-card").removeClass("selected-card");
    $(`#objectCard${newImage}`).addClass("selected-card");
}

function resetObjectFocus() {
    $("#objectStats").removeClass("popout-right");
}

function updateObjectView() {
    getObject(selectedPaneId, objectViewCallback);
    getObjectMatches(selectedPaneId, objectViewMatchesCallback);
}

function objectViewCallback(objectData) {
    $("#objectStats").html(
        `<div class='text-container'>
            <p><b>Object Label</b>: ${objectData["label"]}</p>
        </div>
    `);

    $("#objectStats").css(
        "background-image",
        `url(https://storage.googleapis.com/ukiyoe-dataset/panes/${selectedPaneId}.jpg`
    );

    $("#objectStats").addClass("popout-right");
    $("#objectSimilarsTitle").animate(
        {
            color: primaryColor,
        },
        500
    );
}

function objectViewMatchesCallback(objectMatchesData) {
    $("#objectSimilars")
        .children()
        .fadeOut()
        .promise()
        .done(function () {
            $("#objectSimilars").empty();

            for (var i in objectMatchesData) {
                getImage(objectMatchesData[i], function (imageMetaData) {
                    const imageId = imageMetaData['id']
                    const title = imageMetaData['title']
                    const artist = imageMetaData['artist']
                    const era = imageMetaData['era']

                    $("#objectSimilars").append(`
                        <div id="objectCard${imageId}" class="similar-card similar-card-right" onClick=objectCardClick(${imageId})>
                            <div class="similar-card-thumb">
                                <img src="https://storage.googleapis.com/ukiyoe-dataset/images/${imageId}.jpg">
                            </div>
                            <div class="similar-card-text">
                                <p><b>Title:</b> ${title}</p>
                                <p><b>Artist:</b> ${artist}</p>
                                <p><b>Time:</b> ${era}</p>
                            </div>
                        </div>
                    `);
                });
            }
        });

}
