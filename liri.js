// Required files for dependencies
const keys = require('./keys.js')

// Required NPM packages
const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const request = require('request')
const fs = require('fs')

// Generating user information using twitter API keys
const twitterUser = new Twitter(keys.twitterKeys)

// Generating user information using Spotify API keys
let spotifyUser = new Spotify(keys.spotifyKeys)

// Constants for commands and inputs
let command = process.argv[2]
let userQuery = process.argv[3]

// Function for program logic
const nodeCommands = function (command, userQuery) {
  if (command === 'my-tweets') {
    const params = {screen_name: 'KennethLanza91'}
    twitterUser.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
        let tweetResponse = []
        tweets.forEach(element => {
          tweetResponse.push(element.created_at)
          console.log(element.created_at)
          tweetResponse.push(element.text)
          console.log(element.text)
          tweetResponse.push('===================================================')
          console.log('===================================================')
        })
        let tweetResponseLog = tweetResponse.join('\r\n')
        fs.appendFile('log.txt', '\n' + command + '\n' + tweetResponseLog, (err) => {
          if (err) throw err
        })
      }
    })
  }

  if (command === 'spotify-this-song' && userQuery === undefined) {
    spotifyUser
      .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
      .then(function (data) {
        const spotifyResponse = [
          'Command: ' + command,
          '---------------------------------------------------',
          'Please include the song name, in quotations, after the Spotify command to use this function.',
          'Here is an example response:',
          '===================================================',
          'Artist: ' + data.artists[0].name,
          'Song: ' + data.name,
          'Album: ' + data.album.name,
          'Preview: ' + data.preview_url,
          '==================================================='
        ]
        spotifyResponse.forEach(function (element) {
          console.log(element)
        })
        const spotifyResponseLog = spotifyResponse.join('\r\n')
        fs.appendFile('log.txt', '\n' + spotifyResponseLog, (err) => {
          if (err) throw err
        })
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
      const spotifyResponse = [
        'Command: ' + command,
        '===================================================',
        'Artist: ' + data.tracks.items[0].artists[0].name,
        'Song: ' + data.tracks.items[0].name,
        'Preview: ' + data.tracks.items[0].preview_url,
        'Album: ' + data.tracks.items[0].album.name,
        '==================================================='
      ]
      spotifyResponse.forEach(function (element) {
        console.log(element)
      })
      const spotifyResponseLog = spotifyResponse.join('\r\n')
      fs.appendFile('log.txt', '\n' + spotifyResponseLog, (err) => {
        if (err) throw err
      })
    })
  }

  if (command === 'movie-this' && userQuery === undefined) {
    request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece', function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        const movieResponse = [
          'Command: ' + command,
          '---------------------------------------------------',
          'Please include the movie title, in quotations, after the Spotify command to use this function.',
          'Here is an example response:',
          '===================================================',
          'Title: ' + JSON.parse(body).Title,
          'Year: ' + JSON.parse(body).Year,
          'IMDB rating: ' + JSON.parse(body).Ratings[0].Value,
          'Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value,
          'Production country: ' + JSON.parse(body).Country,
          'Language: ' + JSON.parse(body).Title,
          'Plot: ' + JSON.parse(body).Plot,
          'Actors: ' + JSON.parse(body).Actors,
          '==================================================='
        ]
        movieResponse.forEach(function (element) {
          console.log(element)
        })
        const movieResponseLog = movieResponse.join('\r\n')
        fs.appendFile('log.txt', '\n' + movieResponseLog, (err) => {
          if (err) throw err
        })
      }
    })
  }

  if (command === 'movie-this' && typeof (userQuery) === 'string') {
    request(`http://www.omdbapi.com/?t=${userQuery}&y=&plot=short&apikey=40e9cece`, function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        const movieResponse = [
          'Command: ' + command,
          '===================================================',
          'Title: ' + JSON.parse(body).Title,
          'Year: ' + JSON.parse(body).Year,
          'IMDB rating: ' + JSON.parse(body).Ratings[0].Value,
          'Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value,
          'Production country: ' + JSON.parse(body).Country,
          'Language: ' + JSON.parse(body).Title,
          'Plot: ' + JSON.parse(body).Plot,
          'Actors: ' + JSON.parse(body).Actors,
          '==================================================='
        ]
        movieResponse.forEach(function (element) {
          console.log(element)
        })
        const movieResponseLog = movieResponse.join('\r\n')
        fs.appendFile('log.txt', '\n' + movieResponseLog, (err) => {
          if (err) throw err
        })
      }
    })
  }

  if (command === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      const input = data.split(',')
      let command = input[0]
      let userQuery = input[1]
      nodeCommands(command, userQuery)
    })
  }
}

nodeCommands(command, userQuery)
