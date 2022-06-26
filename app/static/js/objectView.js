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

function updateObjectView() {
    $("#objectStats").html(
        `
        <div class='text-container'>
            <p><b>Object Label</b>: Some Object</p>
        </div>
    `
    );
//    No method as of now to collect the paneId. Have to wait
    const paneId = Math.floor(Math.random() * 170000);
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

    $("#objectSimilars")
        .children()
        .fadeOut()
        .promise()
        .done(function () {
            $("#objectSimilars").empty();

            for (i = 0; i < 25; i++) {
                const newImageId = Math.floor(Math.random() * 170000);

                $("#objectSimilars").append(`
                    <div id="objectCard${newImageId}" class="similar-card similar-card-right" onClick=objectCardClick(${newImageId})>
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
