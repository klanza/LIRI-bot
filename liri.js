// Required files for dependencies
const keys = require('./keys.js')

// Required NPM packages
const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const request = require('request')

// Generating user information using twitter API keys
const twitterUser = new Twitter(keys.twitterKeys)

// Generating user information using Spotify API keys
let spotifyUser = new Spotify(keys.spotifyKeys)

// Constants for command
const command = process.argv[2]
const userQuery = process.argv[3]

if (command === 'my-tweets') {
  const params = {screen_name: 'KennethLanza91'}
  twitterUser.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets.length)
      tweets.forEach(element => {
        // console.log('===========')
        console.log(element.created_at)
        console.log(element.text)
        console.log('===================================================')
      })
    }
  })
}

if (command === 'spotify-this-song' && userQuery === undefined) {
  console.log('---------------------------------------------------')
  console.log('Please include the song name, in quotations, after the Spotify command to use this function.')
  console.log('Here is an example response:')
  spotifyUser
    .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
    .then(function (data) {
      console.log('===================================================')
      console.log('Artist: ' + data.artists[0].name)
      console.log('Song: ' + data.name)
      console.log('Album: ' + data.album.name)
      console.log('Preview: ' + data.preview_url)
      console.log('===================================================')
    })
    .catch(function (err) {
      console.error('Error occurred: ' + err)
    })
}

if (command === 'spotify-this-song' && typeof (userQuery) === 'string') {
  spotifyUser.search({ type: 'track', query: userQuery, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err)
    }
    console.log('===================================================')
    console.log('Artist: ' + data.tracks.items[0].artists[0].name)
    console.log('Song: ' + data.tracks.items[0].name)
    console.log('Preview: ' + data.tracks.items[0].preview_url)
    console.log('Album: ' + data.tracks.items[0].album.name)
    console.log('===================================================')
  })
}

if (command === 'movie-this' && userQuery === undefined) {
  request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece', function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log('---------------------------------------------------')
      console.log('Please include the movie title, in quotations, after the Spotify command to use this function.')
      console.log('Here is an example response:')
      console.log('===================================================')
      console.log('Title: ' + JSON.parse(body).Title)
      console.log('Year: ' + JSON.parse(body).Year)
      console.log('IMDB rating: ' + JSON.parse(body).Ratings[0].Value)
      console.log('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value)
      console.log('Production country: ' + JSON.parse(body).Country)
      console.log('Language: ' + JSON.parse(body).Title)
      console.log('Plot: ' + JSON.parse(body).Plot)
      console.log('Actors: ' + JSON.parse(body).Actors)
      console.log('===================================================')
    }
  })
}

if (command === 'movie-this' && typeof (userQuery) === 'string') {
  request(`http://www.omdbapi.com/?t=${userQuery}&y=&plot=short&apikey=40e9cece`, function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      console.log('===================================================')
      console.log('Title: ' + JSON.parse(body).Title)
      console.log('Year: ' + JSON.parse(body).Year)
      console.log('IMDB rating: ' + JSON.parse(body).Ratings[0].Value)
      console.log('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value)
      console.log('Production country: ' + JSON.parse(body).Country)
      console.log('Language: ' + JSON.parse(body).Title)
      console.log('Plot: ' + JSON.parse(body).Plot)
      console.log('Actors: ' + JSON.parse(body).Actors)
      console.log('===================================================')
    }
  })
}

if (command === 'do-what-it-says') {

}
