var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  argv = require('minimist')(process.argv.slice(2)),
  followList,
  whitelistedWords;

followList = [17159397]; //wnba 
wnbaids = []


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

function get5000Followers(next_cursor){
	console.log(next_cursor)
  T.get('followers/ids', {screen_name: 'wnba', cursor: next_cursor}, function(err, data, response){
   //  for(var i =0; i < data.ids.length; i++){
  	// 	console.log(data.ids[i])
  	// }
  	console.log(err)
  	next_cursor = data.next_cursor
  	console.log(data.next_cursor_str)
  	console.log(next_cursor)
  	if(next_cursor === 0){
  		return
  	}
    setTimeout(function(next_cursor) {
    	get5000Followers(next_cursor)
    }, 60000)
  })
}
1538222739933726200
1538222739933726200
