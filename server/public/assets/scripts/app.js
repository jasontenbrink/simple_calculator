var compArray = [];

var typeVal = "";


$(document).ready(function () {
  $('#equals').on('click',clickEqualsButton);
  $('#numberContainer').on('click', '.number', clickNumber);
  $('#operatorContainer').on('click', '.operator', clickOperator);
});

function clickEqualsButton(){
  sendCalcToServer();
  console.log('data object to send is: ', new Computation(compArray[0],compArray[1], typeVal));
}
function sendCalcToServer() {
  $.ajax({
    type: 'POST',
    data: new Computation(compArray[0],compArray[1], typeVal),
    url: '/addition',
    success: function (response) {
    $('#answer').text(response);
    }
  });
}
function clickOperator() {
  typeVal = $(this).text();
}
function clickNumber() {
  compArray.push(parseInt( $(this).text() ));
  console.log(compArray);
  //push to compArray[]

}

function Computation(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
}
function a(argument) {
  // body...
}
