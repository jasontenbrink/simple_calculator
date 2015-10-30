var express = require ('express');
var app = express();
var path = require('path');
app.set("port", process.env.PORT || 3000);

app.get('/*', function(request, response){
  var file = request.params[0] || 'index.html';
  //response.sendFile(path.join(__dirname,file));
  response.send('hi');
});

app.listen(app.get('port'), function(){
  console.log('listening on port: ' + app.get('port'));
});
