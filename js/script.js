const elForm = document.querySelector(".form")
const elInput = document.querySelector(".input")
const elList = document.querySelector(".list")

const elButtons = document.querySelector(".buttons")

const countAll = document.querySelector(".count-all")
const countcomp = document.querySelector(".count-comp")
const countuncomp = document.querySelector(".count-uncomp")

const buttonAll = document.querySelector(".btn-all")
const btncompleted = document.querySelector(".btn-completed")
const bntuncompleted = document.querySelector(".btn-uncompleted")

elButtons.className = "d-flex justify-content-between"
buttonAll.className = "btn btn-success"
btncompleted.className = "btn btn-info"
bntuncompleted.className = "btn btn-danger"

let todos = []

elList.addEventListener("click", evt => {
    const deleteBtnId = Number(evt.target.dataset.deleteBtnId)
    const foundTodoIndex = todos.findIndex(todo => todo.id === deleteBtnId)

    if (evt.target.matches(".delete-btn")) {
        todos.splice(foundTodoIndex, 1)

        elList.innerHTML = null
        renderTodo(todos, elList)

    } else if (evt.target.matches(".checkbox")) {
        const checkBoxId = Number(evt.target.dataset.checkBoxId)

        const foundTodo = todos.find(todo => todo.id === checkBoxId)

        foundTodo.isCompleted = !foundTodo.isCompleted

        elList.innerHTML = null
        renderTodo(todos, elList)
    }

})


buttonAll.addEventListener("click", evt =>{
    elList.innerHTML = null
    renderTodo(todos, elList)

})

btncompleted.addEventListener("click", evt => {

    const completedFilter = todos.filter(todo => todo.isCompleted)

    elList.innerHTML = null;
    renderTodo(completedFilter, elList)
})

bntuncompleted.addEventListener("click", evt => {

    const uncompletedFilter = todos.filter(todo => !todo.isCompleted)

    elList.innerHTML = null;
    renderTodo(uncompletedFilter, elList)
})


let renderTodo = function (Arr, where) {
    where.innerHTML = null
    Arr.forEach(todo => {

        countAll.textContent = todos.length

        countcomp.textContent = todos.filter(todo => todo.isCompleted).length

        countuncomp.textContent = todos.filter(todo => !todo.isCompleted).length


        const newItam = document.createElement("li")
        const newdiv = document.createElement("div")
        const newspan = document.createElement("span")
        const newCheck = document.createElement("input")
        const newDeleteBtn = document.createElement("button")

        newspan.textContent = todo.title
        newDeleteBtn.textContent = "Delete"
        newCheck.type = "checkbox"

        newItam.className = "d-flex w-100 border border-primary justify-content-between align-items-center rounded-2 ps-2 mt-2 "
        newCheck.className = "me-3  checkbox"
        newDeleteBtn.className = "delete-btn btn btn-danger"
        newdiv.className = "d-flex justify-content-between"

        newDeleteBtn.dataset.deleteBtnId = todo.id
        newCheck.dataset.checkBoxId = todo.id

        if (todo.isCompleted) {
            newCheck.checked = true;
            newspan.style.textDecoration = "line-through";
        }


        newdiv.append(newCheck)
        newdiv.append(newDeleteBtn)
        newItam.append(newspan)
        newItam.append(newdiv)
        where.append(newItam)

    });


}



elForm.addEventListener("submit", evt => {
    evt.preventDefault()

    const elInputValue = elInput.value.trim()

    const todo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: elInputValue,
        isCompleted: false
    }



    todos.push(todo)
    elInput.value = ""

    elList.innerHTML = null
    renderTodo(todos, elList)
})