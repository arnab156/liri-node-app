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
            for (var i=0;i<tweets.length;i++){
                console.log ("Tweet number "+ (i+1) + ": " + tweets[i].text);
                //LOG ALL INFORMATION TO FUNCTION LOG
                log("Tweet number "+ (i+1) + ": " + tweets[i].text + "\n ");
            }
            // console.log("3" +JSON.stringify(response));  // Raw response object.
        } else {
            throw error
        }
    });  
}


// * `spotify-this-song`
// if you want to search a particular song please add it in a quote after spotify-this-son. 
// Eg: node liri.js spotify-this-song "crazy in love"
// This will show the following information about the song in your terminal/bash window
    //  * Artist(s)
    //  * The song's name
    //  * A preview link of the song from Spotify
    //  * The album that the song is from
    if (action === "spotify-this-song") {
        var songName = 'The Sign by Ace of base';
        if (entry) {
            songName = entry;
        } 
        SearchSpotify(songName);
    }
    
// * `do-what-it-says` reads from the file random.txt. Will not take user input
if (action === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
    var songName = data;
    SearchSpotify(songName);
    });
}

//movie-this
// if you want to search a particular movie please add it in a quote after movie-this. Eg: node liri.js movie-this "Slumdog Millionaire"
if (action === "movie-this") {
    var movieName = "Mr.Nobody";
    if (entry) {
        movieName = entry;
    } 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    request(queryUrl, function(error, response, body){
        // console.log( JSON.parse(body));
        if (!error && response.statusCode === 200) {
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie was released in the year: " + JSON.parse(body).Year);
        console.log("The movie rating is: " + JSON.parse(body).imdbRating);
        console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of Origin: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        log("The movie's title is: " + JSON.parse(body).Title+ "\n " + 
            "The movie was released in the year: " + JSON.parse(body).Year +"\n " + 
            "The movie rating is: " + JSON.parse(body).imdbRating + "\n " +
            "The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value +"\n " +
            "Country of Origin: " + JSON.parse(body).Country+"\n " +
            "Language: " + JSON.parse(body).Language+"\n " +
            "Plot of the movie: " + JSON.parse(body).Plot +"\n " +
            "Actors: " + JSON.parse(body).Actors +"\n " 
        )
      }
    
    });
}

function SearchSpotify(songName){
    spotify.search({ type: 'track', query:songName}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
    //   console.log(JSON.stringify(data, null, 2)); 

        var artistsArray = data.tracks.items[0].album.artists;
        var artistsNames = [];
        for (var i = 0; i < artistsArray.length; i++) {
            artistsNames.push(artistsArray[i].name);
        }
        var artists = artistsNames.join(", ");
        console.log("The name of the artist(s): " + artists);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        log( "The name of the artist(s): " + artists +"\n " +
        "Song name: " + data.tracks.items[0].name +"\n " +
        "Spotify Preview URL: " + data.tracks.items[0].preview_url  +"\n " +
        "Album Name: " + data.tracks.items[0].album.name +"\n " 
        );
      });
}

function log (input) {
    fs.appendFile("log.txt", input, function(err) {
        if (err) {
          console.log(err);
        }
        else {
            //log time of log creation
          console.log("Content Added to log.txt");
        }
      });
}

