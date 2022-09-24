//// **** /////
// VARIABLES ////////////////////////////////////////////////////////////////////////////
//// **** /////

// HTML Elements
var picBtn = document.querySelector("#picBtn");
var pic = document.querySelector("#pic");

// Strings
var APIKey = "DEMO_KEY";
var picURLs = ['','','','','','','','','',''];
var currentURL = '';

// Ints
var imageNumber = 0;
var numPics = 0;


//// ***** ////
// FUNCTIONS ///////////////////////////////////////////////////////////////////////////
//// ***** ////

// gets up to 10 random images from NASA APOD and loads the URLs into picURLs
// params: n (int) - number of images to get
// returns: nothing
function getImagesFromApi(n) {

  // set numPics for this request
  numPics = n;

  var queryURL = "https://api.nasa.gov/planetary/apod?count=" + n.toString() +"&api_key=DEMO_KEY"
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // see what data we got
    console.log(data);
    console.log(data.url);

    // loop through and fill in the URLs
    for (let i = 0; i < n; i++) {
      picURLs[i] = data[i].url;
    }
      
  });

}

// move to the next picture
// params: none
// returns: nothing
function nextPic(){

  // increment the selected image
  // loop back to zero if counter is above numPics
  imageNumber = imageNumber + 1;
  imageNumber = imageNumber%numPics;

  // select URL for the image
  currentURL = picURLs[imageNumber];

  // if video, set video
  // otherwise set picture
  if (currentURL.includes("tube")){
    //vid.src = currentURL;
  } else {
    pic.src = currentURL;
  }

}

// ***** //
// INIT //////////////////////////////////////////////////////////////////////////////////////////////
// ***** //

// Event Listeners
picBtn.addEventListener('click', nextPic);

// startup functions
getImagesFromApi(5);