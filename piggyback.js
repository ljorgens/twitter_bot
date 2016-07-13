var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  argv = require('minimist')(process.argv.slice(2)),
  followList,
  whitelistedWords;

followList = [3007932069, 1611709608, 2182824348, 2231915576, 1091131705, 1071790574, 280992438, 409425184, 770429666, 309179868, 286191576, 59597127, 251811933]; //WilliamsBob75, Andrew_Marcinko, BigDSoccer, magee18, bardsblond, YesThatBrooke, RobStoneONFOX, KidWeil, BMcBride20, LeanderAlphabet, TheOffsideRules, JeffreyCarlisle, Nic_Bodiford 

var statusStream = T.stream('statuses/filter', {
  follow: followList
});

statusStream.on('tweet', function(tweet) {
  if (followList.indexOf(tweet.user.id) > -1 && !tweet.retweeted_status) {
    console.log('@' + tweet.user.screen_name + ' tweeted.');
    console.log(tweet.text);
    var lowercaseTweet = tweet.text.toLowerCase();
    if (
      lowercaseTweet.indexOf('soccer') === -1 &&
      lowercaseTweet.indexOf('mls') === -1 &&
      lowercaseTweet.indexOf('usmnt') === -1 &&
      lowercaseTweet.indexOf('uswnt') === -1 &&
      lowercaseTweet.indexOf('epl') === -1 &&
      lowercaseTweet.indexOf('futbol') === -1 
      // &&
      // lowercaseTweet.indexOf('fcdallas') === -1 &&
      // lowercaseTweet.indexOf('content') === -1 &&
      // lowercaseTweet.indexOf('analytics') === -1 &&
      // lowercaseTweet.indexOf('growth') === -1 &&
      // lowercaseTweet.indexOf('startup') === -1 &&
      // lowercaseTweet.indexOf('entrepreneur') === -1 &&
      // lowercaseTweet.indexOf('blog') === -1 &&
      // tweet.user.id !== 2246032237 && //iamjtsuccess
      // tweet.user.id !== 25458378 //AskAaronLee
    ) {
      console.log('No status update. Did not pass sanity check.')
      console.log('-----');
      return;
    }
    T.post('statuses/update', {
      status: tweet.text
    }, function(err, data, response) {
      if (err) {
        console.log('Error updating status')
        console.log('-----');
        return;
      }
      notifier.notify({
        'title': '@' + tweet.user.screen_name + ' tweeted.',
        'message': tweet.text
      });
      console.log('Status updated successfully. ' + new Date())
      console.log('-----');
    });
  }
});
