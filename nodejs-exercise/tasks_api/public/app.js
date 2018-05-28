// when DOM is ready, fetch the data from backend
var TASKS_API = {};
TASKS_API.BASE_URL = "";

$(document).ready(function(){
  console.log("DOM loaded and ready.");

  // 0. find credentials from sessionStorage
  let token = sessionStorage.getItem('jwt-token');
  let userid = sessionStorage.getItem('user-id');

  console.log( "from session storage: token=" + token + ", userid=" + userid);
  if( token == undefined || userid == undefined ) {
      // redirect to login page for signin
      window.location.href = "/login.html";
      return;
  }

  // setup BASE_URL and HEADERS for all requests done in this scope
  TASKS_API.BASE_URL = "/api/users/"+userid+"/tasks/";
  $.ajaxSetup({
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
      }
  });
  // 1. load tasks from MongodDB
  /*
  $.getJSON( TASKS_API_BASE_URL + "/tasks")
  .then(addTasks)
  .catch(function(err){
    console.log("Error on page: " + err.status);
    window.location.href = "/login.html";
  });
  */
  $.ajax({
    method: 'GET',
    url: TASKS_API.BASE_URL
  })
  .then(addTasks)
  .catch(function(err) {
    console.log(err);
    window.location.href = "/login.html";
  });



  // 2. create a new task!
  $('#taskInput').keypress(function(event){
    if(event.which === 13) {
      // console.log('done with input');
      createTask();
    }
  });

  // 3. Update
  $('.list').on('click', 'li', function(){
    updateTask($(this));
  });

  // 4. Delete
  $('.list').on('click', 'span', function(event){
    event.stopPropagation();
    removeTask($(this).parent());
  });

  $('#logout-button').on('click', function(){
      sessionStorage.removeItem("jwt-token");
      sessionStorage.removeItem("user-id");
      window.location.href = "/login.html";
  });

});


// client side Functions
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

  $.ajax({
    method: "POST",
    url: TASKS_API.BASE_URL,
    data: JSON.stringify({"name": taskName}),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })
//  $.post(TASKS_API.BASE_URL, {name: taskName})
  .then(function(task){
    console.log("added: " + task);
    addTask(task);
  })
  .catch(function(err){
    console.log(err)
  });
}

function updateTask(task) {
  var clickedId = task.data("id");
  var isDone = task.data('completed');

  console.log("clickID: " + clickedId);

  var updateUrl = TASKS_API.BASE_URL + clickedId;
  var updateData = {"completed": !isDone};

  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: JSON.stringify(updateData)
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

  var deletedUrl = TASKS_API.BASE_URL + clickedId;
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
