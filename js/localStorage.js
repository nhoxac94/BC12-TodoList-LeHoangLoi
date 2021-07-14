const LOCAL_STORAGE_KEY = 'TODO_LIST';
export default {
    get() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    },
    set(todolist) {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todolist)); 
    }
}