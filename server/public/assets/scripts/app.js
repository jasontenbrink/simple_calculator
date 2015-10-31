var firstNumArray = [],
    secondNumArray = [];

var isFirstNum = true;

var typeVal = "";


$(document).ready(function () {
  $('#equals').on('click',clickEqualsButton);
  $('#numberContainer').on('click', '.number', clickNumber);
  $('#operatorContainer').on('click', '.operator', clickOperator);
});

function clickEqualsButton(){
  sendCalcToServer();
  isFirstNum = true;
  console.log('data object to send is: ', new Computation(arrayToNum(firstNumArray), arrayToNum(secondNumArray), typeVal));
}
function sendCalcToServer() {
  $.ajax({
    type: 'POST',
    data: new Computation(arrayToNum(firstNumArray), arrayToNum(secondNumArray), typeVal),
    url: determineUrlFromType(),
    success: function (response) {
    $('#answer').text(response);
    }
  });
}
function determineUrlFromType() {
  var url = ''
  switch (typeVal) {
    case 'add':
      url = '/addition';
      break;
    default:
  }
  return url;
}
function clickOperator() {
  typeVal = $(this).text();
  isFirstNum = false;
}
function clickNumber() {
  if (isFirstNum) {
    firstNumArray.push( $(this).text() );
    console.log(firstNumArray);
  }else {
      secondNumArray.push( $(this).text() );
      console.log(secondNumArray);
  }
}

function Computation(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}

//utility functions
function arrayToNum(arrayOfNumbers) {
  return parseInt( arrayOfNumbers.join("") );
}
