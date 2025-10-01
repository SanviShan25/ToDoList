// Function to load tasks from Local Storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks() {
  const taskList = document.getElementById("taskList");
  // Get all the list items and convert the HTMLCollection to an array
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.querySelector('span').textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(taskData => {
      createTaskElement(taskData.text, taskData.completed);
    });
  }
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  // Create the task element and add it to the list
  createTaskElement(taskText, false);

  input.value = "";
  saveTasks(); // Save after adding a new task
}

// Helper function to create the actual list item structure
function createTaskElement(taskText, isCompleted) {
  const li = document.createElement("li");
  
  // 1. Create a span for the text (to easily separate it from the button)
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // 2. Apply the 'completed' class if necessary
  if (isCompleted) {
    li.classList.add("completed");
  }

  // Event listener for toggling completion (on the whole list item)
  li.addEventListener("click", function (event) {
    // Check if the click target is the delete button
    if (event.target.classList.contains('delete-btn')) return;
    
    li.classList.toggle("completed");
    saveTasks(); // Save after toggling completion
  });

  // 3. Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️"; // Using an emoji for a simple icon
  deleteBtn.classList.add("delete-btn");

  // Event listener for task deletion
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks(); // Save after deleting a task
  });

  // Append the span and the button to the list item
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  // Add the new list item to the main list
  document.getElementById("taskList").appendChild(li);
}