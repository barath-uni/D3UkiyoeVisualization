function getTimeline(callback) {
    var fetch_url = "/timeline"

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}

function getScatter(year, callback) {
    var fetch_url = "/scatter/" + year

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            console.log(responseData)
            handle_callback(responseData, callback)
        });
}

function getImage(imageId, callback) {
    var fetch_url = "/images/" + imageId

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}

function getImageObjects(imageId, callback) {
    var fetch_url = "/images/" + imageId + "/objects"

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}

function getImageColors(paneId, callback) {
    var fetch_url = "/images/" + paneId + "/colors"

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}

function getObject(paneId, callback) {
    var fetch_url = "/objects/" + paneId

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}

function getObjectMatches(paneId, callback) {
    var fetch_url = "/objects/" + paneId + "/matches"

    fetch(fetch_url)
        .then(function (response) { return response.json() })
        .then((responseData) => {
            handle_callback(responseData, callback)
        });
}


// Helpers
function is_there_the_key(json, keys) {
    if (keys.length == 0)
        return true
    let key = keys.shift()
    if (!json[key]) {
        return false
    }
}

function handle_callback(res_data, _callback) {
    //        Better error handling needed?
    //        Silence the view from updating in case of any error
    if (is_there_the_key(res_data.data, keys = ["Error"])) {
        console.log("ERRORR")
    }
    else {
        _callback(res_data.data)
    }

}
// Load each view here
function loadColorMatcher(color_list) {

    //    Load the color matching function for given input (Color_list)
    //TODO: eg. color_matcher.load_matching_id()

    //    Fetch the image matching the given id
    img_path = get_image_from_id(idx)

    // Record all updates. This is easier to maintain and fix at later stage
    // 1. Update the Views
    updateImageView(img_path)
    // 2. UpdateColorMatcher()
    // 3. UpdateScatterPlots()
    // 4. UpdateObjectDetector()

}

