var MongoClient, collections, config, constants, runQuery;

MongoClient = require("mongodb").MongoClient;

config = require("./config");

constants = require("./constants");


exports.connect = connect = function(collection, query) {
  var conf;
  conf = config.getConf().mongodb;
  return MongoClient.connect("mongodb://"+conf.replicaset+"/"+conf.db, function(err, db) {
    var mongoCollection;
    mongoCollection = db!= null ? db.collection(collection) : void 0;
    return query(err,mongoCollection, function() {
      return db.close();
    });
  });
}


exports.upsert=upsert=function(collection,iddoc,upsertdoc,callback) {
  return connect(collection, function(err, c, close) {	
    if(err) {
      return callback(constants.http.INTERNAL_ERROR,err);
    }
    return c.update(iddoc, upsertdoc,{upsert:true}, function(insertErr,docs) {
      close();
      if(!insertErr) {
        return callback(constants.http.CREATED, "yep");
//	return callback(constants.http.CREATED, {id:docs != null ? docs[0]._id : void 0 });
      } else {
        return callback(constants.http.INTERNAL_ERROR, insertErr);
      }
    });
  });
};

exports.get=get=function(collection, querydoc, callback) {
  console.log("get");
  return connect(collection, function(err, c, close) {
    if(err) {
      return callback(constants.http.INTERNAL_ERROR, err);
    }
    return c.find(querydoc).toArray(function(queryErr, docs) {   
      console.log(docs);
      console.log("find");
      close();
      var vals = [];
      if(!queryErr) {
      for(var i = 0; i < docs.length; i++) {
	vals.push({x: docs[i]._id, y: docs[i].c});
      }
      var retdoc = [{values:vals,key: "top", color: '#ff7f0e'}];  
      return callback(constants.http.OK, retdoc);
      } else {
        return callback(constants.http.INTERNAL_ERROR, queryErr);
      }
    });
  });
};
