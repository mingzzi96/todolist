
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';



function ___$insertStylesToHeader(css) {
  if (!css) {
    return
  }
  if (typeof window === 'undefined') {
    return
  }

  const style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css
}

require('@fortawesome/fontawesome-free/js/all.min.js');

___$insertStylesToHeader("* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: skyblue;\n  color: white;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 600px;\n  margin: auto;\n  padding: 0.5rem;\n  font-size: 2rem;\n}\n\n.input-container {\n  height: 300px;\n  display: flex;\n  align-items: center;\n  width: 600px;\n  margin: auto;\n  padding: 0.5rem;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n.input-container .input-area {\n  display: flex;\n  width: 600px;\n}\n.input-container .input-area .todo-input {\n  padding: 0.5rem;\n  font-size: 2rem;\n  border: none;\n  background: white;\n  width: 100%;\n}\n.input-container .input-area .todo-btn {\n  padding: 0.5rem;\n  font-size: 2rem;\n  border: none;\n  background: white;\n  color: white;\n  background: green;\n  cursor: pointer;\n}\n\n.todo-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.todo-container .todo-list {\n  width: 600px;\n}\n.todo-container .todo-list .todo {\n  margin: 0.5rem;\n  background: white;\n  font-size: 1.5rem;\n  color: black;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: 1s ease;\n}\n.todo-container .todo-list .todo .todo-item {\n  flex-grow: 1;\n  border: none;\n  font-size: 1.5rem;\n  outline: none;\n  padding: 0rem 0.5rem;\n  overflow-x: scroll;\n  white-space: nowrap;\n}\n.todo-container .todo-list .todo.delete {\n  transform: translateX(10rem);\n  opacity: 0;\n}\n.todo-container .todo-list .todo.done {\n  text-decoration: line-through;\n  opacity: 0.5;\n}\n.todo-container .todo-list .todo .todo-item::-webkit-scrollbar {\n  display: none;\n}\n.todo-container .todo-list .todo .delete-btn {\n  background: red;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .complete-btn {\n  background: blue;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .edit-btn {\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n}\n.todo-container .todo-list .todo .save-btn {\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  background: black;\n  color: white;\n  border: none;\n  padding: 1rem;\n  cursor: pointer;\n  font-size: 1rem;\n  display: none;\n}\n.todo-container .todo-list .todo.edit .complete-btn,\n.todo-container .todo-list .todo.edit .edit-btn,\n.todo-container .todo-list .todo.edit .delete-btn {\n  display: none;\n}\n.todo-container .todo-list .todo.edit .save-btn {\n  display: block;\n}\n\n.input-container .radio-area {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n}\n.input-container .radio-area input[type=radio] {\n  width: 0;\n  height: 0;\n  position: absolute;\n  left: -9999px;\n}\n.input-container .radio-area input[type=radio] + label {\n  padding: 0.8em 1.6em;\n  background-color: #fff;\n  cursor: pointer;\n  color: black;\n  transition: 0.2s;\n}\n.input-container .radio-area input[type=radio]:checked + label {\n  background-color: #b700ff;\n  color: #fff;\n  border-color: #b700ff;\n}\n\n@media (max-width: 800px) {\n  .input-container {\n    width: 100%;\n  }\n  .input-container .input-area,\n  .input-container .radio-area {\n    width: 100%;\n  }\n  .todo-container .todo-list {\n    width: 100%;\n  }\n}");

let a = 2;
let b = 5;
console.log(a+b);
//# sourceMappingURL=bundle.js.map
