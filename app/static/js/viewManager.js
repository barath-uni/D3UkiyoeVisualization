// Get image from key
function get_image_from_id(idx) {
var fetch_url = '/image_from_key?idx=' + idx;
fetch(fetch_url)
    .then(function(response) { console.log("response = ", response) })
    .then((data) => {
        console.log("image path", data)
        return data
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

