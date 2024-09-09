import { Projects } from "./projects";
import { Todos } from "./todos";
import { de } from 'date-fns/locale';
import { differenceInDays, compareDesc, format, compareAsc } from 'date-fns';

export function projectManager() {
    let projectList = [];
    getInitialArray();

    function store() {
        localStorage.setItem('projectList', JSON.stringify(projectList));
    }

    function getInitialArray() {
        let storedList = JSON.parse(localStorage.getItem('projectList'));
        if (storedList) {
            storedList.forEach(project => {
                let newProject = createProject(project["name"], project["color"]);
            
                project["todoInProject"].forEach(item => {
                    let newTodo = new Todos(item["name"], item["description"], item["dueDate"], item["priority"]);
                    newProject.addTodo(newTodo); 
                });
            });
        } else {
            projectList.push(new Projects("Default", "black"));
        }
    }
    
    function newTodo(nameTodo, description, dueDate, priority, projectGroup) {
        let todo = new Todos(nameTodo, description, dueDate, priority);
        for(let item of projectList) {
            if(item.getName() === projectGroup) {
                item.addTodo(todo);
                return todo;
            }
        }
    }

    function createProject(projectName, projectColor) {
        for(let item of projectList) {
            if(item.getName() === projectName) {
                alert("Name bereits belegt!");
                return;
            }
        }
            let newProject = new Projects(projectName, projectColor);
            projectList.push(newProject); 
            return newProject;
    }

    function getProjectColor(todo) {
        for(let i = 0; i < projectList.length; i++) {
            let project = projectList[i];
            for(let projectsTodos of project.getTodos()) {
                if(projectsTodos === todo) {
                    return project.getColor();
                }
            }
        }
    }

    function getProjects(criteria) {
        let currentDate = new Date();
        let array = [];

        if(criteria === "") {
            let i = 0;
            while(i < projectList.length) {
                array.push(...projectList[i].getTodos())
                i++;
            }
            return array.sort((a,b) => compareAsc(a.getDueDate(),b.getDueDate()));
        }
        
        if(typeof criteria === 'string') {
            for(let projects of projectList) {
                if(projects.getName() === criteria) {
                    return projects.getTodos().sort((a, b) => {
                        return compareDesc(a.getDueDate(), b.getDueDate());
                    })
                }
            }
        } else {
            let i = 0;
            while(i < projectList.length) {
                let listOfTodos = projectList[i].getTodos();
                for(let todos of listOfTodos) {
                    let difference = differenceInDays(todos.getDueDate(), currentDate);
                    console.log(todos.getDueDate());
                    console.log(currentDate);
                    console.log(difference);
                    if(difference <= criteria && (difference >= 0)) {
                        array.push(todos);
                    }
                }
                i++;
            }
            return array.sort((a,b) => compareAsc(a.getDueDate(),b.getDueDate()));

        }

    }

    function getProjectName(todo) {
        for(let i = 0; i < projectList.length; i++) {
            let project = projectList[i];
            for(let projectsTodos of project.getTodos()) {
                if(projectsTodos === todo) {
                    return project.getName();
                }
            }
        }
    }

    function deleteTodo(todo) {
        for(let i = 0; i < projectList.length; i++) {
            for(let z = 0; z < projectList[i].getTodos().length; z++) {
                if(projectList[i].getTodos()[z] === todo) {
                    projectList[i].getTodos().splice(z, 1);
                }
            }
        }
    }

    return {newTodo, createProject, getProjectColor, getProjectName, deleteTodo, getProjects, store};
}