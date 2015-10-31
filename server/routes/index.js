express = require('express');
router = express.Router();
doMath = require('../modules/doMath');


router.post('/addition', function (request, response) {
  var x = request.body.x,
      y = request.body.y,
      type = request.body.type;
  console.log(x,y,type);

  //doMath is overkill at this point because of the other routes.
  // Leaving it in for parsing because hey its there, so I'm going to use it.
  response.send( doMath(x, y, type).toString() );
});

router.post('/subtraction', function (request, response) {
  var x = request.body.x,
      y = request.body.y,
      type = request.body.type;
  console.log(x,y,type);
  response.send( doMath(x, y, type).toString() );
});
router.post('/multiplication', function (request, response) {
  var x = request.body.x,
      y = request.body.y,
      type = request.body.type;
  console.log(x,y,type);
  response.send( doMath(x, y, type).toString() );
});
router.post('/division', function (request, response) {
  var x = request.body.x,
      y = request.body.y,
      type = request.body.type;
  console.log(x,y,type);
  response.send( doMath(x, y, type).toString() );
});
module.exports = router;
