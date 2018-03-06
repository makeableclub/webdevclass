

$("input").keypress(function(event){
  console.log("key pressed: " + event.which);
});
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

$("button").click(function(){
  alert("you click a button");
});

$("#submit").on('click', function(){
  console.log("click to submit");
});

$("input[type='text']").on('click', function(){
  alert("click on text input");
});

$("h1").on('click', function(){
  $(this).css("color", "purple");
})

$("button").on("mouseenter", function(){
  $(this).css("font-weight", "bold");
});

$("button").on("mouseleave", function(){
  $(this).css("color", "red");
});

$("button").click( function(){
  var imgurl = $("input").val();
  $("img").attr("src", imgurl);
});
