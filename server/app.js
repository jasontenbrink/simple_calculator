var express = require ('express');
var app = express();
var path = require('path');
var index = require('./routes/index');
var bodyParser = require('body-parser');

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

//this might screw everything up
// app.use(function (request,response, next) {
//   request.body.x = parseFloat(request.body.x);
//   request.body.y = parseFloat(request.body.y);
//   next();
// });
app.use('/',index);

app.get('/*', function(request, response){
  var file = request.params[0] || 'views/index.html';
  response.sendFile(path.join(__dirname,'./public',file));
});



app.listen(app.get('port'), function(){
  console.log('listening on port: ' + app.get('port'));
});
