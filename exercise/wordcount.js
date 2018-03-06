// How google analyze your page?
var learn = "Come here to learn the essential fundamentals about electronic circuit, boards, sensors, and the programming language. Also learn some of the best practices, with tricks and tips from experienced maker.";
var imagine = "Now it is your turn to let your imagination fly! Think about what project you can build with the newfound skills. Then learn to turn your project ideas into feasible building blocks.";
var make = "Let's acquire necessary components for building out functional blocks, and work together to construct and program the electronics to make your ideas come alive.";
var share = "Share what you've learned and made, share the joy of making! Let other people be inspired!";

var p1 = (learn + " " + imagine + " " + make + " " + share)
  .toLowerCase().split(" ");

// get all words, and calculate the counts for each words
var wordMap = {};
for( var i=0; i<p1.length; i++) {
  var word = p1[i];
  if( wordMap[word] ) {
    wordMap[word]++;
  }
  else {
    wordMap[word] = 1;
  }
}

// sort the word counts, according to the word;
var sortedKey = Object.keys(wordMap).sort();
var sortedArray = []
sortedKey.forEach(function(ele){
  sortedArray.push([ele, wordMap[ele]]);
});
console.log(sortedArray);

// sort the word counts, according to the frequency
var sortable = [];
for(var any in wordMap) {
  sortable.push([any, wordMap[any]]);
}
sortable.sort(function(a,b){
  return b[0][0] > a[0][0];
});
console.log(sortable);
