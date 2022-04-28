const tasksDOM = document.querySelector('.tasks')       // query selector does not returns HTMLCollection
const loadingDOM = document.querySelector('.loading-text') // direcly returns the HTML element
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const userTitle = document.getElementById('user-name');
const logoutbtn = document.querySelector('.log-out')
const params = window.location.search
const userName = new URLSearchParams(params).get('user');
const userID = new URLSearchParams(params).get('id');
console.log(userName + "++" + userID);
// Load all tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  userTitle.innerHTML = `${userName}'s To-do List `;
  try {
    const { data: tasks } = await axios.get(`/tasks/all/${userID}`)
    let { alltaskz: allTask } = tasks; //{object : array}
    console.log(allTask)
    console.log(typeof(allTask))
    if (allTask.length < 1) {
      console.log('No tasks');
      tasksDOM.innerHTML = '<h3 class="empty-list">No tasks in your Todo-list</h3>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    let AllTaskhtml = ``;
    allTask.forEach(element => {
     // console.log(typeof (element));
      const { isCompleted, _id: taskID, name } = element
      AllTaskhtml = AllTaskhtml + `<div class="single-task ${ isCompleted && 'task-completed'}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                  <!-- edit link -->
                  <a href="task.html?id=${taskID}"  class="edit-link">
                  <i class="fas fa-edit"></i>
                  </a>
                  <!-- delete btn -->
                  <button type="button" class="delete-btn" data-id="${taskID}">
                  <i class="fas fa-trash"></i>
                  </button>
                  </div>
                  </div>`;
    })
      
    tasksDOM.innerHTML = AllTaskhtml;
  }
  catch (error) {
    console.error(error);
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks();

// delete task -/tasks/:id
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  console.log(el)
  console.log(el.parentElement)
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/tasks/${id}`)
      showTasks();
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form POST
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value;

  try {
    await axios.post('/tasks/all', { name,userID, userName})
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  }
  catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})


