function addtaskList() {
    const inputTask = document.getElementById('input').value;
    if (inputTask.trim() === "") {
        alert("Please enter some text!");
        return;
    }
    const taskList = document.getElementById('taskList')
    const templateItem = document.getElementById('templateItem');
    const newItem = templateItem.cloneNode(true);
    newItem.removeAttribute('id', 'style');
    const newTask = newItem.querySelector('.task-text');
    newTask.textContent = inputTask;
    taskList.appendChild(newItem);
    document.getElementById('input').value = "";
    updateProgress();
    saveData();
}

function deletetaskList(button) {
    const taskItem = button.closest('li');
    taskItem.remove();
    updateProgress()
    saveData();
}
function updateProgress() {
    console.log("clicked");
    const checkboxs = document.querySelectorAll('input[type="checkbox"]');
    const checkedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked');
    const total = checkboxs.length-1;
    const checked = checkedCheckboxs.length;
    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
    console.log(percentage);
    const progressBar = document.getElementById('progress-fill');
    progressBar.style.width = percentage + '%';
    document.getElementById("percentage").innerHTML = percentage + "%";
    
    saveData();
}

function checkStatus(element) {
  if (element.checked) {
    updateProgress();
  }else{
    updateProgress();
  }
}

function saveData() {
  const allTasks = document.querySelectorAll('#taskList li:not(#templateItem)');
  const alltasksArray = [];
  allTasks.forEach(taskLi => {
    const text = taskLi.querySelector('.task-text').textContent;
    const isChecked = taskLi.querySelector('input[type="checkbox"]').checked;

    alltasksArray.push({name: text, completed: isChecked});
  })
  localStorage.setItem('savedTasks', JSON.stringify(alltasksArray));
}

function loadData(){
  const savedData = localStorage.getItem('savedTasks');
  if(savedData){
    const taskArray = JSON.parse(savedData);
    taskArray.forEach(task => {
    const taskList = document.getElementById('taskList')
    const templateItem = document.getElementById('templateItem');
    const newItem = templateItem.cloneNode(true);
    newItem.removeAttribute('id', 'style');
    const newtaskText = newItem.querySelector('.task-text');
    newtaskText.textContent = task.name;
    const checkBox = newItem.querySelector('input[type="checkbox"]');
    checkBox.checked = task.completed;

    taskList.appendChild(newItem);
    });
    updateProgress();
  }
}

loadData();
