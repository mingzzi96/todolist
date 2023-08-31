import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";

class Router {
    // router들을 담을 클래스 변수 생성
    routes = [];
    notFoundCallback = () => {};

    addRoute(url, callback) {
        this.routes.push({
            url,
            callback,
        });
        // 체이닝을 사용하기 위한 return
        return this;
    }

    // 추가한 router가 맞는지 확인
    checkRoute() {
        const currentRoute = this.routes.find(
            // 현재 주소창 hash 값과 route.url값을 대조하여 route를 return
            (route) => route.url === window.location.hash
        );

        if (!currentRoute) {
            this.notFoundCallback;
            return;
        }

        currentRoute.callback();
    }

    init() {
        window.addEventListener("hashchange", this.checkRoute.bind(this));
        if (!window.location.hash) {
            window.location.hash = "#/";
        }
        this.checkRoute();
    }

    setNotFound(callback) {
        this.notFoundCallback = callback;
        return this;
    }
}

class Storage {
    saveTodo(id, todoContent) {
        // localStorage에 저장된 혹은 빈값들을 todosData에 할당
        const todosData = this.getTodos();
        // todosData에 저장할 값(id, 내용, 상태)들을 넘겨 줄 값들을 준비한다.
        todosData.push({ id, content: todoContent, status: "TODO" });
        // 준비된 값들을 localStorage의 todos에 넣을거고, 객체를 반드시 string화 해서 보낸다.
        localStorage.setItem("todos", JSON.stringify(todosData));
    }
    editTodo(id, todoContent, status = "TODO") {
        const todosData = this.getTodos();
        // target todo의 index를 가져와 저장한다.
        const todoIndex = todosData.findIndex((todo) => todo.id == id);
        // 저정되어진 todo들 중에 target index와 같은 애를 가져와 저장한다.
        const targetTodoData = todosData[todoIndex];
        const editedTodoData =
            todoContent === ""
                ? // todoContent에 string이 없다면? 기존 content를 가져오기만 한뒤 status만 바꿔준다.
                  { ...targetTodoData, status }
                : // todoContent에 string 있다면? content 넣어준다.
                  { ...targetTodoData, content: todoContent };
        // 수정할 todo 영역을 삭제한 다음 거기다가 수정된 데이터를 넣어준다.
        todosData.splice(todoIndex, 1, editedTodoData);
        // 해당 값들을 다시 localStorage에 string으로 저장해 주면서 마무리.
        localStorage.setItem("todos", JSON.stringify(todosData));
    }
    deleteTodo(id) {
        const todosData = this.getTodos();
        todosData.splice(
            // todosData에서 삭제하고 싶은 id값과 같은 애를 먼저 찾아서 잘라준다
            todosData.findIndex((todo) => todo.id == id),
            1
        );
        // 잘린 상태의 todosData를 다시 string화 시켜서 localStorage에 저장해 준다.
        localStorage.setItem("todos", JSON.stringify(todosData));
    }
    getTodos() {
        // localStorage에 todos를 가져오는데 값이 null이면 빈 값 넘겨주고, 값이 있다면 string화 된 데이터를 파싱해준다.
        return localStorage.getItem("todos") === null
            ? []
            : JSON.parse(localStorage.getItem("todos"));
    }
}

class TodoList {
    constructor(storage) {
        this.initStorage(storage);
        this.assignElement();
        this.addEvent();
        this.loadSavedData();
    }

    initStorage(storage) {
        this.storage = storage;
    }

    assignElement() {
        this.inputContainerEl = document.getElementById("input-container");
        this.inputAreaEl = this.inputContainerEl.querySelector("#input-area");
        this.todoInputEl = this.inputAreaEl.querySelector("#todo-input");
        this.addBtnEl = this.inputAreaEl.querySelector("#add-btn");
        this.todoContainerEl = document.getElementById("todo-container");
        this.todoListEl = this.todoContainerEl.querySelector("#todo-list");
        this.radioAreaEl = this.inputContainerEl.querySelector("#radio-area");
        this.filterRadioBtnEls = this.radioAreaEl.querySelectorAll(
            "input[name='filter']"
        );
    }

    addEvent() {
        this.addBtnEl.addEventListener("click", this.onClickAddBtn.bind(this));
        this.todoListEl.addEventListener(
            "click",
            this.onClickTodoList.bind(this)
        );
        this.addRadioBtnEvent();
    }

    loadSavedData() {
        // storage class에 todos 데이터 있는지 없는지 판단하여 가져오는 함수 불러옴.
        const todosData = this.storage.getTodos();
        for (const todoData of todosData) {
            const { id, content, status } = todoData;
            this.createTodoElement(id, content, status);
        }
    }

    addRadioBtnEvent() {
        for (const filterRaioBtnEl of this.filterRadioBtnEls) {
            filterRaioBtnEl.addEventListener(
                "click",
                this.onClickRadioBtn.bind(this)
            );
        }
    }

    onClickRadioBtn(event) {
        const { value } = event.target;
        window.location.href = `#/${value.toLowerCase()}`;
    }

    filterTodo(status) {
        const todoDivEls = this.todoListEl.querySelectorAll("div.todo");
        for (const todoDivEl of todoDivEls) {
            switch (status) {
                case "ALL":
                    todoDivEl.style.display = "flex";
                    break;
                case "DONE":
                    todoDivEl.style.display = todoDivEl.classList.contains(
                        "done"
                    )
                        ? "flex"
                        : "none";
                    break;
                case "TODO":
                    todoDivEl.style.display = todoDivEl.classList.contains(
                        "done"
                    )
                        ? "none"
                        : "flex";
                    break;
            }
        }
    }

    onClickTodoList(event) {
        const { target } = event;
        // 다른 버튼과 그 하위에 svg와 겹치지 않게 하기 위해서 클릭한 target과 가장 가까운 button을 찾아 btn으로 저장
        // 만약 svg가 클릭되어도 svg 상위 가장 가까운 button 태그가 방금 클릭한 btn으로써 저장되는 것임
        const btn = target.closest("button");
        if (!btn) return;
        if (btn.matches("#delete-btn")) {
            this.deleteTodo(target);
        } else if (btn.matches("#edit-btn")) {
            this.editTodo(target);
        } else if (btn.matches("#save-btn")) {
            this.saveTodo(target);
        } else if (btn.matches("#complete-btn")) {
            this.completeTodo(target);
        }
    }

    completeTodo(target) {
        const todoDiv = target.closest(".todo");
        todoDiv.classList.toggle("done");
        const { id } = todoDiv.dataset;
        this.storage.editTodo(
            id,
            "",
            todoDiv.classList.contains("done") ? "DONE" : "TODO"
        );
    }

    saveTodo(target) {
        const todoDiv = target.closest(".todo");
        todoDiv.classList.remove("edit");
        const todoInputEl = todoDiv.querySelector("input");
        todoInputEl.readOnly = true;
        const { id } = todoDiv.dataset;
        this.storage.editTodo(id, todoInputEl.value);
    }

    editTodo(target) {
        const todoDiv = target.closest(".todo");
        const todoInputEl = todoDiv.querySelector("input");
        todoInputEl.readOnly = false;
        todoInputEl.focus();
        todoDiv.classList.add("edit");
    }

    deleteTodo(target) {
        const todoDiv = target.closest(".todo ");
        todoDiv.addEventListener("transitionend", () => {
            todoDiv.remove();
        });
        todoDiv.classList.add("delete");

        // createTodoElement 메서드에서 각 div에 부여해준 data-set id 값을 가져와서 삭제한다.
        this.storage.deleteTodo(todoDiv.dataset.id);
    }

    onClickAddBtn() {
        if (this.todoInputEl.value.length === 0) {
            alert("내용을 입력해 주세요");
            return;
        }

        const id = Date.now(); // 현재 시간을 밀리세컨즈 단위로 나타내주는데 이를 id값으로 저장
        this.storage.saveTodo(id, this.todoInputEl.value);

        this.createTodoElement(id, this.todoInputEl.value);
    }

    createTodoElement(id, value, status = null) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        if (status === "DONE") {
            todoDiv.classList.add("done");
        }

        todoDiv.dataset.id = id;

        const todoContent = document.createElement("input");
        todoContent.value = value;
        todoContent.readOnly = true;
        todoContent.classList.add("todo-item");

        const fragment = new DocumentFragment();
        fragment.appendChild(todoContent);
        fragment.appendChild(
            this.createButton("complete-btn", "complete-btn", [
                "fas",
                "fa-check",
            ])
        );
        fragment.appendChild(
            this.createButton("edit-btn", "edit-btn", ["fas", "fa-edit"])
        );
        fragment.appendChild(
            this.createButton("delete-btn", "delete-btn", ["fas", "fa-trash"])
        );
        fragment.appendChild(
            this.createButton("save-btn", "save-btn", ["fas", "fa-save"])
        );
        todoDiv.appendChild(fragment);
        this.todoListEl.appendChild(todoDiv);
        this.todoInputEl.value = "";
    }

    createButton(btnId, btnClassName, iconClassName) {
        const btn = document.createElement("button");
        const icon = document.createElement("i");
        icon.classList.add(...iconClassName);
        btn.appendChild(icon);
        btn.id = btnId;
        btn.classList.add(btnClassName);
        return btn;
    }
}

// document에 DOM이 다 로드된 다음에 인스턴스 생성
document.addEventListener("DOMContentLoaded", () => {
    const router = new Router();
    const todoList = new TodoList(new Storage());
    const routerCallback = (status) => () => {
        todoList.filterTodo(status);
        document.querySelector(
            `input[type="radio"][value="${status}"]`
        ).checked = true;
    };
    router
        .addRoute("#/all", routerCallback("ALL"))
        .addRoute("#/todo", routerCallback("TODO"))
        .addRoute("#/done", routerCallback("DONE"))
        .setNotFound(routerCallback("ALL"))
        .init();
});
