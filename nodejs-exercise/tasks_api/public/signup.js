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
    let password2 = $('#password2').val();

    if( passwordValue != password2 ) {
        alert("Two passwords do not match");
        return;
    }

    $.post('/api/auth/signuup', {
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

// display tasks to the page
function addTasks(tasks) {
  tasks.forEach(function(task){
    addTask(task);
  });
}

function addTask(task) {
  // var newTask = $('<li class="task">' + task.name + '</li>');
  var newItem = $('<li class="task">' + task.name + '<span>X</span></li>');
  // var newItem = $('<li class="task">' + task.name + '</li>');
  newItem.data("id", task._id);
  newItem.data("completed", task.completed);

  if (task.completed) {
    newItem.addClass("done");
  }
  $('.list').append(newItem);
}




function createTask() {
  var taskName = $('#taskInput').val();
  if( taskName === "") {
    return;
  }
  // console.log(taskName);
  $.post('/api/tasks', {name: taskName})
  .then(function(task){
    // $('#taskInput').val('');
    addTask(task);
  })
  .catch(function(err){
    console.log(err)
  });
}

function updateTask(task) {
  var clickedId = task.data("id");
  var isDone = task.data('completed');

  var updateUrl = '/api/tasks/' + clickedId;
  var updateData = {completed: !isDone};

  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedData){
    // console.log("updated: ", updatedData);
    task.toggleClass('done');
    task.data('completed', !isDone);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function removeTask(task) {
  console.log("span is clicked");
  // var clickedId = $(this).parent().data("id");
  var clickedId = task.data("id");
  console.log(clickedId);
  // $(this).parent().remove();  // -- UI side
  var deletedUrl = '/api/tasks/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deletedUrl
  })
  .then(function(data){
    task.remove();
  })
  .catch(function(err) {
    console.log(err);
  });
}
