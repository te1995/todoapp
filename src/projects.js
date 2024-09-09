export class Projects {
   todoInProject = [];
    
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    setColor(color) {
        this.color = color;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

    getTodos() {
        return this.todoInProject;
    }

    addTodo(todo) {
        this.todoInProject.push(todo);
    }

    removeTodo(obj) {
        for(let i = 0; i < this.todoInProject.length; i++) {
            if(this.todoInProject(i) == obj) {
                this.todoInProject.splice(1, 1);
            }
        }
    }


}