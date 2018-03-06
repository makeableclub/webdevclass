
// definition of function
function myFuncName() {
    var a = 5;
    console.log(a);
};

// use, or invocation of function
myFuncName();

function myFuncName(param) {
    console.log(param);
};

function addition(a, b, ...args) {
    // console.log( arguments );
    result = x;
    var count = arguments.length;
    var result = 0;
    for(var i=0; i<count; i++) {
        result = result + arguments[i];
    }
    // console.log("result is: " + result);
    return result;
}

function factorial(num) {
  var result = 1;
  while(num > 0 ) {
    result = result * num;
    num = num - 1;
  }

  return result;
}
factorial(5);
