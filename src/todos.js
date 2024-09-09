import { format } from "date-fns";

export class Todos {    
    constructor(todoName, description, dueDate, priority) {
        this.name = todoName;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
    }

    setDescription(description) {
        this.description = description;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    getDescription() {
        return this.description;
    }

    setDueDate(dueDate) {
        this.dueDate = new Date(dueDate);
    }

    getName() {
        return this.name;
    }
    
    getDueDate() {
        return this.dueDate;
    }

    isDone() {
        return this.done;
    }

    setDone(done) {
        this.done = done;
    }

}