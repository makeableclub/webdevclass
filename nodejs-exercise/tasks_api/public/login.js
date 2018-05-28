// when DOM is ready, setup action handler
$(document).ready(function(){
  console.log("Login page loaded and ready.");

  // 1. login form
  $('#login-button').on('click', function(){
      tryLogin();
  });
});


// client side Functions
function tryLogin() {
    let emailValue = $('#email').val();
    let passwordValue = $('#password').val();

    if( emailValue === undefined || emailValue.trim() === "" ) {
        alert("please input your email");
        return;
    }

    if( passwordValue === undefined || passwordValue.trim() === "" ) {
        alert("please input your password");
        return;
    }

    $.post('/api/auth/signin', {
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
