// when DOM is ready, fetch the data from backend
$(document).ready(function(){
  console.log("DOM loaded and ready.");

  // 1. load tasks from MongodDB
  $.getJSON("/api/tasks")
  .then(addTasks)
  // .then(function(data){
  //    console.log(data);
  //  })
  .catch(function(err){
    console.log(err);
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
    // event.stopPropagation();
    removeTask($(this).parent());
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
