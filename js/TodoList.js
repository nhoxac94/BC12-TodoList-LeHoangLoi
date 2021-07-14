import localStorage from "./localStorage.js";
export const TodoList = {
    todos : localStorage.get(),

   add(title) {       
        title ? this.todos = [...this.todos, {title, completed: false}] : '';   
   },
  
}