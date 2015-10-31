function doMath(x,y,type) {
  x = parseFloat(x);
  y = parseFloat(y);
  var result = 0;
  switch (type) {
    case 'add':
    result = x+y;
      break;
    case 'subtract':
    result = x-y;
      break;
    default:
  }
  return result;
}



module.exports = doMath;
