//
// 10 x 10 multiplication table, properly formatted
//
for(var a=1; a<=10; a++) {
    var line = "";
    var spaces = "";
    for(var b=1; b<=10; b++) {
        var v = a * b;
        // add spaces for proper formatting
        if( v < 10 ) {
          spaces = "   ";
        }
        else if( v < 100 ) {
          spaces = "  ";
        }
        else {
          spaces = " "
        }
        line = line + spaces + v;
    }
    console.log( line );
}

//
// Bonus: turn above program into a function that takes a number N
// so that you can produce N x N multiplication table
//
