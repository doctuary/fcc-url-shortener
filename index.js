var express = require('express');
var validUrl = require('valid-url');
var app = express();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = process.env.MONGODB_URI;      
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});


app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {    
    res.send('This is a url shortening microservice. Try passing in <this url>/shrink/:originalUrl.');
});
app.get('/shrink/:sourceUrl(*)', function(req, res) {
  let sourceUrl = req.params.sourceUrl;
  let isUri = validUrl.isUri(sourceUrl);
  if (isUri) {
    let shortId = Math.random() * 1000;
    shortId = Math.floor(0);
    shortId = shortId.toString();
    let map = {
      longUrl: sourceUrl,
      shortUrl: shortId
    }
    res.send(map);    
  } else {
    res.send(sourceUrl + " is not a valid URL.")
  }
});
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
