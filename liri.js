const keys = require('./keys.js')

const Twitter = require('twitter')
const Spotify = require('node-spotify-api')
const request = require('request')

const user = new Twitter(keys)

const command = process.argv[2]

if (command === 'my-tweets') {
  var params = {screen_name: 'KennethLanza91'}
  user.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets)
      tweets.forEach(element => {
        console.log('===========')
        console.log(element.created_at)
        console.log(element.text)
        console.log('===========')
      })
    }
  })
}
