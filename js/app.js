const todoInput = document.querySelector("#todo-input");
const addTodoItemBtn = document.querySelector("#add-todo-item");
const todoListUl = document.querySelector("#todo-list");

let todoCollection;

const readTodoItemsFromLocalStorage = () => {
  todoCollection = JSON.parse(localStorage.getItem("todos"));

  console.log(todoCollection);

  if (todoCollection == null) {
    todoCollection = [];
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    todoCollection.forEach((todoItem) => {
      const liElement = document.createElement("li");
      const btnElement = document.createElement("button");

      liElement.id = todoItem.counter;
      liElement.innerText = todoItem.content;
      btnElement.textContent = "X";
      btnElement.id = todoItem.counter;
      btnElement.addEventListener("click", (event) => {
        removeItemFromLocalStorage(parseInt(event.target.id));
      });

      todoListUl.appendChild(liElement);
      liElement.appendChild(btnElement);
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  readTodoItemsFromLocalStorage();
});

const addItemToLocalStorage = (content, counter) => {
  let item = { content, counter };
  todoCollection.push(item);
  localStorage.setItem("todos", JSON.stringify(todoCollection));
};

const removeItemFromLocalStorage = (id) => {
  todoCollection = JSON.parse(localStorage.getItem("todos"));

  if (todoCollection == null || todoCollection.length < 1) {
    localStorage.setItem("todos", JSON.stringify([]));
    todoListUl.innerHTML = "";

    window.location.reload(true);
  }

  let newCollection = todoCollection.filter(
    (todoItem) => todoItem.counter !== id
  );

  if (newCollection.length < 1) {
    localStorage.setItem("todos", JSON.stringify([]));
    todoListUl.innerHTML = "";

    window.location.reload(true);
  }

  localStorage.setItem("todos", JSON.stringify(newCollection));

  todoListUl.innerHTML = "";

  newCollection.forEach((todoItem) => {
    const liElement = document.createElement("li");
    const btnElement = document.createElement("button");

    liElement.id = todoItem.counter;
    liElement.innerText = todoItem.content;
    btnElement.textContent = "X";
    btnElement.id = todoItem.counter;
    btnElement.addEventListener("click", (event) => {
      removeItemFromLocalStorage(parseInt(event.target.id));
    });

    todoListUl.appendChild(liElement);
    liElement.appendChild(btnElement);
  });
};

todoInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    let inputValue = todoInput.value;

    if (inputValue.length > 1) {
      let counter;
      if (todoCollection.length > 0) {
        counter = todoCollection.length;
      } else {
        counter = 0;
      }
      const liElement = document.createElement("li");
      const btnElement = document.createElement("button");
      counter++;
      liElement.id = counter;
      liElement.innerText = inputValue;
      todoListUl.appendChild(liElement);
      btnElement.textContent = "X";
      btnElement.id = counter;
      btnElement.addEventListener("click", (event) => {
        removeItemFromLocalStorage(parseInt(event.target.id));
      });

      liElement.appendChild(btnElement);
      addItemToLocalStorage(inputValue, counter);

      todoInput.value = "";

      return;
    }

    alert("Please enter valid value");
  }
});
