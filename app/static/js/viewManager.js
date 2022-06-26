// Get image from key
function get_image_from_id(idx) {
var fetch_url = '/image_from_key?idx=96790' + idx;
fetch(fetch_url)
    .then(function(response) { console.log("response = ", response) })
    .then((data) => {
        console.log("image path", data)
        return data
});
}

// Makes call to 'object_detection' endpoint
async function get_detected_objects(id, _callback) {
console.log("Detected object selectedImg", id)
detected_object_data = []
var fetch_url = '/object_detection?idx=96790';
console.log(fetch_url)
return fetch(fetch_url)
    .then(function(response) {return response.json()})
    .then((res_data) => {
        console.log("image path", res_data.data)
        _callback(res_data.data)
});
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

