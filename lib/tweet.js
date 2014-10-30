var Twit = require("twit");
var T = new Twit({
    consumer_key:         'iw5lbbutQ8waF7fl3YChuvnct'
  , consumer_secret:      'c1g6r3LuTHYpHLBLIW3lclJ582utK7XFEy6KfJ8MxAJVoYkv0i'
  , access_token:         '8976232-wjkJmo3vkIVpQFGa2PbJ0mdaluJ0SfjIZFD7arjHAn'
  , access_token_secret:  'e9ioFHa9SLNTKthZAu7thJgCRDhmuOoAop78wpIQsG5gQ'
})

//var stream = T.stream('statuses/sample',{language:'en,ja,tr,tl,in'});
console.log('sdsd');
var stream = T.stream('statuses/firehose');

console.log('after');
stream.on('tweet', function (tweet) {
  console.log(tweet);
//register();
//  var qs = {c: "metrics5", sc:tweet.lang};
  //instrumentation.incrementCounter(qs, function() {});;
});
