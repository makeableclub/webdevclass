// when DOM is ready, setup action handler
$(document).ready(function(){
  console.log("Signup page loaded and ready.");

  // 1. login form
  $('#signup-button').on('click', function(){
      trySignup();
  });
});


// client side Functions
function trySignup() {
    let userValue = $('#username').val();
    let emailValue = $('#email').val();
    let passwordValue = $('#password').val();
    let password2 = $('#password2').val();

    if( passwordValue != password2 ) {
        alert("Two passwords do not match");
        return;
    }

    $.post('/api/auth/signup', {
        username: userValue,
        email: emailValue,
        password: passwordValue
    })
    .then(function(jwt){
        console.log(jwt);

        sessionStorage.setItem("jwt-token", jwt.token);
        sessionStorage.setItem("user-id", jwt.id);

        // redirect to main page
        window.location.href = "/index.html";
    })
    .catch(function(err){
        console.log(err)
    });
}
