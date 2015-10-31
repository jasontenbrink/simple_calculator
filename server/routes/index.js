express = require('express');
router = express.Router();
doMath = require('../modules/doMath');


router.post('/addition', function (request, response) {
  var x = parseInt(request.body.x),
      y = parseInt(request.body.y),
      type = request.body.type;

  

  console.log(x,y,type);

  response.send( doMath(x,y,type).toString() );
});


module.exports = router;
