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

// Makes call to 'object_detection' endpoint. 1. all the panes for given id, 2. list of matches for given id
function get_detected_objects(id, _callback) {
var fetch_url = '/object_detection_panes?idx=0';
console.log(fetch_url)
fetch(fetch_url)
    .then(function(response) {return response.json()})
    .then((res_data) => {
        console.log("Response data from get detected objects", res_data)
        handle_callback(res_data, _callback)
});
}

function get_detected_matches(id, _callback) {
var fetch_url = '/object_detection_matches?idx=0';
console.log(fetch_url)
fetch(fetch_url)
    .then(function(response) {return response.json()})
    .then((res_data) => {
        console.log("Response data from get detected objects", res_data)
        handle_callback(res_data, _callback)
});
}

// Updates the _callback with the meta-data (Title, Artist, date, era, description)
function update_meta_data(id, _callback) {
var fetch_url = '/meta_data?idx='+id;
console.log(fetch_url)
fetch(fetch_url)
    .then(function(response) {return response.json()})
    .then((res_data) => {
        console.log("Response data from get detected objects", res_data)
        handle_callback(res_data, _callback)
});
}


// Updates the _callback with the color_data (color_1: {HEX, %dominance}, ...}
function update_color_view(id, _callback) {
id = 0;
var fetch_url = '/color_information?idx='+id;
console.log(fetch_url)
fetch(fetch_url)
    .then(function(response) {return response.json()})
    .then((res_data) => {
        console.log("Response data Color Information", res_data)
        handle_callback(res_data, _callback)
});
}



// Helpers
function is_there_the_key(json, keys){
  if(keys.length == 0)
    return true
  let key = keys.shift()
  if(!json[key]){
    return false
  }
  }

function handle_callback(res_data, _callback) {
//        Better error handling needed?
//        Silence the view from updating in case of any error
        if (is_there_the_key(res_data.data, keys=["Error"])) {
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

