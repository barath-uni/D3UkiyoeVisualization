function objectCardClick(newImage) {
    selectedImage = newImage;
    updateImageView();
}

function updateObjectView() {
    $("#objectStats").html(
        `
        <div class='text-container'>
            <p><b>Object Label</b>: Some Object</p>
        </div>
    `
    );

    $("#objectStats").css("background-image", "url(static/images/test.png)");

    $("#objectSimilarsTitle").animate(
        {
            color: primaryColor,
        },
        500
    );

    for (i = 0; i < 100; i++) {
        $("#objectSimilars").append(`
            <div class="similar-card" onClick=objectCardClick(0)>
                <div class="similar-card-thumb">
                    <img src="static/images/test2.png">
                </div>
                <div class="similar-card-text">
                    <p><b>Title</b>: Some Title</p>
                    <p><b>Artist</b>: Some Artist</p>
                    <p><b>Time</b>: Some Year, Period</p>
                </div>
            </div>
        `);
    }
}
