var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  Firebase = require("firebase"),
  argv = require('minimist')(process.argv.slice(2)),
  followList,
  whitelistedWords;

followList = [17159397]; //wnba 
wnbaids = []

var rootRef = new Firebase('https://nbatwitterfollowers.firebaseio.com/')

// T.get('followers/ids', { screen_name: 'wnba', cursor: 1538218983924310000 },  function (err, data, response) {
//   for(var i =0; i < data.ids.length; i++){
//   	console.log(data.ids[i])
//   }
//   console.log("cursor " + data.next_cursor_str)
// })

// function getNBAFollowers(wnbaFollowers){
  
// }

// function getNextFollowers(nextCursorValue){
//   T.getNextFollowers
// }

get5000Followers(-1)

var stuffArray = [];
var count = 0;
var label = "0toamillion"

function get5000Followers(next_cursor){
  T.get('followers/ids', {screen_name: 'nba', cursor: next_cursor}, function(err, data, response){
    for(var i =0; i < data.ids.length; i++){
      console.log(data.ids[i])
  		stuffArray.push(data.ids[i])
  	}
    next_cursor = data.next_cursor
    rootRef.child(label).set(stuffArray)
    if(stuffArray%1000000===0){
     count++;
     label = toString(count) + 'million' 
     stuffArray = []
    }
    rootRef.child("next_cursor").set(next_cursor)
  	if(next_cursor === 0){
  		return
  	}
    setTimeout(function() {
    	get5000Followers(next_cursor)
    }, 60000)
  })
}

