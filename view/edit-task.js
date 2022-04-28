const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const backto_Task = document.querySelector('.back-to-tasks')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    //getting a single tasks all in
    const { data: {SingleTask: Atask } } = await axios.get(`/tasks/${id}`)  
   console.log(typeof(Atask))  // object
    const { _id: taskID, isCompleted, name,userName,userID } = Atask
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (isCompleted) {
      taskCompletedDOM.checked = true
    }
    let htm = `<a href="Alltasks.html?user=${userName}&id=${userID}" class="btn back-link"> Back to Tasks</a>`;
    //console.log(backto_Task);
    backto_Task.innerHTML = htm;
  }
  catch (error) {
    console.log(error)
  }
}

showTask();

  editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked// wheather the checkbox is marked. Ticked-True, Unticked-False
    console.log(taskCompleted);
    const { data: { updateATask: Atask } } = await axios.patch(`tasks/${id}`,
                                                        { name: taskName,
                                                          isCompleted: taskCompleted,
      })
    console.log(Atask);
    const { _id: taskID, isCompleted, name, userID, userName } = Atask;
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (isCompleted) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  }
  catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
//Back to Task btn
