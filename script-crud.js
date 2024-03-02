const btnAddTask = document.querySelector('.app__button--add-task')
const formAddTask = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')

const tasks = []



btnAddTask.addEventListener('click',()=> {
    formAddTask.classList.toggle('hidden')
} )

formAddTask.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const task = {
        taskname: textArea.value
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
})
