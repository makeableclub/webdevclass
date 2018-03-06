// function scope
var a = 5;
var c = 8;

function myFuncName(a, b) {
    var result = 1;
    result = a * b;

    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    return result;
}

function funcTwo() {
  var d = 5;
  // var c = 20;
  c = 20;
}
