'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect('mongodb://mdarling:test_1234@cluster0-shard-00-00-h7vvs.mongodb.net:27017,cluster0-shard-00-01-h7vvs.mongodb.net:27017,cluster0-shard-00-02-h7vvs.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majorityconfig.db.uri',
 {
   useNewUrlParser:true, 
    useUnifiedTopology: true 
  });
 mongoose.set('useCreateIndex', true);

fs.readFileSync('listings.json', 'utf8', function(err, data)
{
  if (err) throw err;

  var listings = JSON.parse(data);

  for(var i = 0; i< listings.entries.length; i++)
  {
    var newlisting = new Listing();

    newlisting.code = listings.entries[i].code;
    newlisting.name = listings.entries[i].name;
    newlisting.coordinates = listings.entries[i].coordinates;
    newlisting.address = listings.entries[i].address;

  
    newlisting.save(function(err)
    {
      if (err) throw err;
      else
        console.log('Data successfully saved');
    });
  }

});

mongoose.connection.close();
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */