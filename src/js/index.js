import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";

class TodoList {
    constructor() {
        this.assignElement();
        this.addEvent();
    }

    assignElement() {
        this.inputContainerEl = document.getElementById("input-container");
        this.inputAreaEl = this.inputContainerEl.querySelector("#input-area");
        this.todoInputEl = this.inputAreaEl.querySelector("#todo-input");
        this.addBtnEl = this.inputAreaEl.querySelector("#add-btn");
        this.todoContainerEl = document.getElementById("todo-container");
        this.todoListEl = this.todoContainerEl.querySelector("#todo-list");
    }

    addEvent() {
        this.addBtnEl.addEventListener("click", this.onClickAddBtn.bind(this));
        this.todoListEl.addEventListener(
            "click",
            this.onClickTodoList.bind(this)
        );
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
        }
    }

    saveTodo(target) {
        const todoDiv = target.closest(".todo");
        todoDiv.classList.remove("edit");
        const todoInputEl = todoDiv.querySelector("input");
        todoInputEl.readOnly = true;
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
    }

    onClickAddBtn() {
        if (this.todoInputEl.value.length === 0) {
            alert("내용을 입력해 주세요");
            return;
        }

        this.createTodoElement(this.todoInputEl.value);
    }

    createTodoElement(value) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

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
    const todoList = new TodoList();
});
