function objectCardClick(newImage) {
    selectedImageId = newImage;
    updateImageView();
    resetObjectFocus();
    updateColorView();
    updateColorSimilars();

    $(".selected-card").removeClass("selected-card");
    $(`#objectCard${newImage}`).addClass("selected-card");
}

function resetObjectFocus() {
    $("#objectStats").removeClass("popout-right");
}

function updateObjectView(paneId) {
    $("#objectStats").html(
        `
        <div class='text-container'>
            <p><b>Object Label</b>: Some Object</p>
        </div>
    `
    );

//    const paneId = Math.floor(Math.random() * 170000);
    console.log("PaneID is", paneId)

    $("#objectStats").css(
        "background-image",
        `url(https://storage.googleapis.com/ukiyoe-dataset/images/${paneId}.jpg`
    );

    $("#objectStats").addClass("popout-right");
    $("#objectSimilarsTitle").animate(
        {
            color: primaryColor,
        },
        500
    );
    update_detected_matches(paneId, objectViewCallback)
}

function objectViewCallback(matchesData) {
    total_matches = matchesData['matches_ids']
    match_values = matchesData['matches_values']
    $("#objectSimilars")
        .children()
        .fadeOut()
        .promise()
        .done(function () {
            $("#objectSimilars").empty();

            for (i = 0; i < total_matches.length; i++) {
                const newImageId = total_matches[i];
//                At present no use for Match Value, but can be included
                console.log("Match Value = ", match_values[i])
                update_meta_data(newImageId, objectMetaDataCallback)
            }
        });

}

function objectMetaDataCallback(metaData) {
    imageId = metaData['id']
    title = metaData['title']
    artist = metaData['artist']
    time = metaData['time']
    $("#objectSimilars").append(`
                    <div id="objectCard${imageId}" class="similar-card similar-card-right" onClick=objectCardClick(${imageId})>
                        <div class="similar-card-thumb">
                            <img src="https://storage.googleapis.com/ukiyoe-dataset/images/${imageId}.jpg">
                        </div>
                        <div class="similar-card-text">
                            <p><b>Title</b>: ${title}</p>
                            <p><b>Artist</b>: ${artist}</p>
                            <p><b>Time</b>: ${time}</p>
                        </div>
                    </div>
                `);


}
