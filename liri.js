require("dotenv").config();
var keys = require("./keys.js");	
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");


var action = process.argv[2];
var entry = process.argv[3];

// * `my-tweets`
// * This will show your last 20 tweets and when they were created at in your terminal/bash window.
var params = {screen_name: '@MadeofC'};
if (action === "my-tweets") { 

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
        console.log("1" + JSON.stringify(tweets, null, 2));
        // console.log("3" +JSON.stringify(response));  // Raw response object.
    } else {
        throw error
    }
    
    });  
}









// * `spotify-this-song`



// * `do-what-it-says`



//movie-this
if (action === "movie-this") {
    var movieName = "Mr.Nobody";
    // if (movieTitle === "") {
    //     movieName = 

    // } else {
    //     movieName = entry;
    // }


    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    
    request(queryUrl, function(error, response, body){
      
        if (!error && response.statusCode === 200) {
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie was released in the year: " + JSON.parse(body).Year);
        console.log("The movie rating is: " + JSON.parse(body).imdbRating);
        console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Source.Value);
        console.log("Country of Origin: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Language: " + JSON.parse(body).Language);
      }
    });




}

