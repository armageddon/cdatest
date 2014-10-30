var metrics, IncrementCounter;
mongo = require("./mongo");
metrics = require('metrics');
config = require("./config");
constants = require("./constants");
moment = require("moment");
numbers = require("numbers");
var metricsServer = new metrics.Server(9092);
counter1 = new metrics.Counter;
metricsServer.addMetric('c.counter1', counter1);

var incrementCounter = function(params, callback) {
  iddoc = {_id : timeSlice(moment.utc())};
  var subcollectionkey = "a." + params.sc;
  console.log(subcollectionkey);

  upsertdoc = {$set: {l: moment.utc().format("X")}, $inc: {c : 1/*,"a." + params.sc; : 1*/}};
  upsertdoc["$inc"][subcollectionkey] = 1;
	console.log(upsertdoc);
  return mongo.upsert(params.c, iddoc,upsertdoc, callback);//callback(constants.http.OK,"Success!");
};


var timeSlice = function(mom) {
  var basedate =  moment.utc(new Date(2010, 1, 1));
  var currentdate = mom;
  var seconds = currentdate.diff(basedate,'seconds');
  console.log(mom.format());
  console.log(Math.floor(seconds/5)*5);
  return Math.floor(seconds/5)*5;
}

exports.incrementCounter = incrementCounter;
