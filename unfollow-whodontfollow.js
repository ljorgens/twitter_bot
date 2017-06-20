var T = require('./index.js'),
  argv = require('minimist')(process.argv.slice(2)),
  stopId = argv['stopId'] || -1; //348336389 = omgisarcasm
  
T.get('followers/ids', {
  screen_name: 'sqwadfan',
}, function(err, data, response) {
  var followersIds = data.ids
  unfollowThoseThatArentFollowingUs(followersIds)
});

function unfollowThoseThatArentFollowingUs(followersIds) {
  T.get('friends/ids', {
    screen_name: 'sqwadfan',
    // count: 2000
  }, function(err, data, response) {
    var peopleIFollow = data.ids
    for(var i = 0; i < peopleIFollow.length; i++){
      if(followersIds.indexOf(peopleIFollow[i]) === -1){
        // setTimeout(function(){
          T.post('friendships/destroy', {
          user_id: peopleIFollow[i]
        }, function(err, data, response) {
          if(err) {
            console.log(err);
            error = true;
          } else {
            console.log('Unfollowed'); 
          }
        });
        // }, 1000 * i);
      }
    }
  });
}