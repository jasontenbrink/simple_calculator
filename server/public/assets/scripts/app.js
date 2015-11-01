var firstNumInts = [],
    firstNumDecimals = [];

var secondNumInts = [],
    secondNumDecimals = [];

var isFirstNum = true, //while true push to firstNum arrays, else push to second.
    isInt = true; //while true push to numInts, else push to numDecimals

var typeVal = "";

var oldAnswer = "";  //needed to add chaining calculation functionality. Not implemented yet.

$(document).ready(function () {
  $('#equals').on('click',clickEqualsButton);
  $('#numberContainer').on('click', '.number', clickNumber);
  $('#operatorContainer').on('click', '.operator', clickOperator);
  $('#dot').on('click', clickDot);
  $('#clear').on('click', clickClear);

  $("#math").animate({
    left: '45%',
    
    height: '50px',
    width: '50px',
    color: 'red'
});
});


//click listener functions
function clickClear() {
  firstNumInts = [];
  firstNumDecimals = [];
  secondNumInts = [];
  secondNumDecimals = [];
  $('#answer').text('0.00');
}
function clickDot() {
  isInt = false;
}
function clickEqualsButton(){
  sendCalcToServer();
  isFirstNum = true;
  console.log('data object to send is: ', new Computation(makeDecimalNum(firstNumInts, firstNumDecimals), makeDecimalNum(secondNumInts, secondNumDecimals), typeVal));
  firstNumInts = [];
  firstNumDecimals = [];
  secondNumInts = [];
  secondNumDecimals = [];
}
function clickOperator() {
  typeVal = $(this).text();
  isFirstNum = false;
  isInt = true;
}
function clickNumber() {
  pushDigitToNumber($(this).text());
  displayEnteredNumber();
}

//click listener helper functions

// helper for clickNumber.  Holds logic for which number in the Computation
// the clicked value should write to, as well as which side of the decimal it
// is on.
function pushDigitToNumber(digit) {
  if (isFirstNum && isInt) {
    firstNumInts.push( digit );
    console.log(firstNumInts + '.' + firstNumDecimals);
  }
  else if (isFirstNum) {
    firstNumDecimals.push(digit);
    console.log(firstNumInts + '.' + firstNumDecimals);
  }
  else if (isInt) {
    secondNumInts.push(digit);
    console.log(secondNumInts + '.' + secondNumDecimals);
  }
  else{
    secondNumDecimals.push( digit );
    console.log(secondNumInts + '.' + secondNumDecimals);
  }
}

//helper for clickNumber
function displayEnteredNumber() {
  if(isFirstNum){
    $('#answer').text(makeDecimalNum(firstNumInts,firstNumDecimals));
  } else{
    $('#answer').text(makeDecimalNum(secondNumInts,secondNumDecimals));
  }
}

//sending info to the server
function sendCalcToServer() {
  var x = makeDecimalNum(firstNumInts, firstNumDecimals),
      y = makeDecimalNum(secondNumInts, secondNumDecimals);

  $.ajax({
      type: 'POST',
      data: new Computation(x, y, typeVal),
      url: determineUrlFromType(),
      success: function (response) {
        $('#answer').text(response);
        oldAnswer = response;
        console.log(oldAnswer);
      }
  });
}
//determines url to send request to
function determineUrlFromType() {
  var url = '';
  switch (typeVal) {
    case 'add':
      url = '/addition';
      break;
    case 'subtract':
        url = '/subtraction';
        break;
    case 'multiply':
        url = '/multiplication';
        break;
    case 'divide':
        url = '/division';
        break;
    default:
  }
  return url;
}

//constructor for computation object.  Has 2 values to be computed and the
//operation to be executed on those 2 values.  In a non academic setting
//Computation would also hold the calculations for various mathematical operations
//and the operations would be done on the client side, only sending the answer
//to the server
function Computation(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}

//utility functions
function makeDecimalNum(array1, array2) {
  return parseFloat(array1.join('') + '.' + array2.join(''));
}
