 import { projectManager } from "./projectmanager";
 import { Projects } from "./projects";
 import { format } from "date-fns";

const todoForm = document.querySelector(".todoForm");
const buttonNewTodo = document.querySelector(".newTodo");
const buttonSubmitTodo = document.querySelector(".submitTodo");
let priorityCheck = document.querySelector("#priority");
let projectDropDown = document.querySelector("#projectListNewTodo");
let dateSelector = document.querySelector("#dueDate");
let descriptionText = document.querySelector("#description");
let todoNameText = document.querySelector("#todoName");
const functionManagement = projectManager();
const mainContent = document.querySelector(".content");
const buttonNewProject = document.querySelector(".buttonNewProject");
const divClassNewProject = document.querySelector(".newProject");
const submitProject = document.querySelector(".submitProject");
const projectsDiv = document.querySelector(".projectsDiv");
const duethisweek = document.querySelector(".duethisweek");
const overviewButton = document.querySelector(".overviewButton");
const dueToday = document.querySelector(".dueToday");
const buttonDefault = document.querySelector(".buttonDefault");



    export function initialize() {
        
        let projectsListFiltered = functionManagement.getProjects("");
            document.querySelector('.content').innerHTML = '<h1 class = "headingmain">Overview</h1>';
            projectsListFiltered.forEach(item => displayDivsTodo(item));
        
        buttonNewTodo.addEventListener("click", e => {
            todoForm.style.display = "flex";
        });

        window.addEventListener('beforeunload', function (event) {
            event.preventDefault();
            functionManagement.store();
        });

        buttonSubmitTodo.addEventListener("click", (e) => {
            e.preventDefault();
            
            if(dateSelector.value == 0 && todoNameText.value == "") {
                dateSelector.style.border = '2px solid red'; 
                todoNameText.style.border = '2px solid red';  
                return;
            }

            todoNameText.style.border = "";
            dateSelector.style.border = "";
            
            if(todoNameText.value == "") {
                todoNameText.style.border = '2px solid red';  
                return;
            }

            todoNameText.style.border = "";
            
            if(dateSelector.value == 0) {
                dateSelector.style.border = '2px solid red';  
                return;
            }

            dateSelector.style.border = "";

            let newTodo = functionManagement.newTodo(todoNameText.value,  descriptionText.value, dateSelector.value, priorityCheck.checked, projectDropDown.value); 
            todoForm.style.display = "none";
            descriptionText.value = "";
            todoNameText.value  = "";
            dateSelector.value = "";
            priorityCheck.checked = "";
            displayDivsTodo(newTodo);
        });

        buttonNewProject.addEventListener("click", (e) => {
            e.preventDefault();
            divClassNewProject.style.display = "flex";
        });

        submitProject.addEventListener("click", (e) => {
            e.preventDefault();
            let projectColor = document.querySelector("#projectList").value;
            let projectName = document.querySelector("#projectName").value;
            document.querySelector("#projectName").value = "";
            let newProject = functionManagement.createProject(projectName, projectColor);
            divClassNewProject.style.display = "none";
            displayProjectOnScreen(newProject);
        });

        dueToday.addEventListener("click", (e) => {
            let projectsListFiltered = functionManagement.getProjects(1);
            document.querySelector('.content').innerHTML = '<h1 class = "headingmain">Today</h1>';
            projectsListFiltered.forEach(item => displayDivsTodo(item));
        });

        duethisweek.addEventListener("click", (e) => {
            let projectsListFiltered = functionManagement.getProjects(7);
            document.querySelector('.content').innerHTML = '<h1 class = "headingmain">This Week</h1>';
            projectsListFiltered.forEach(item => displayDivsTodo(item));
        });

        overviewButton.addEventListener("click", (e) => {
            let projectsListFiltered = functionManagement.getProjects("");
            document.querySelector('.content').innerHTML = '<h1 class = "headingmain">Overview</h1>';
            projectsListFiltered.forEach(item => displayDivsTodo(item));
        });

        buttonDefault.addEventListener("click", e => {
            e.preventDefault();
            let array = functionManagement.getProjects("Default");
            document.querySelector('.content').innerHTML = `<h1 class = "headingmain">#Default</h1>`;
            array.forEach(item => displayDivsTodo(item));
        });


    }

    export function displayDivsTodo(newTodo) {        
        let newForm = document.createElement("form");
        newForm.classList.add("todoListElements");
    
    newForm.innerHTML = `
        <input type="checkbox" class="todoDone" id="todo" name="todo" value="todo">
        <div class="pleaseAlign">
            <div class="identification">
                <label class="todo">${newTodo.getName()}</label>
                <p class="projectnameHTML" style="color: ${functionManagement.getProjectColor(newTodo)}">#${functionManagement.getProjectName(newTodo)}</p>
            </div>
            <div>${format(newTodo.getDueDate(), 'dd/MM/yyyy')}</div>
        </div>
    `;

    let checkBoxDone = newForm.querySelector(".todoDone");
    checkBoxDone.addEventListener("click", (e) => {
        newForm.remove();
        functionManagement.deleteTodo(newTodo);
    });

    mainContent.appendChild(newForm);
    
    }

    export function displayProjectOnScreen(project) {        
        let newChoiceTodoForm = document.createElement("option");
        newChoiceTodoForm.value = project.getName();
        newChoiceTodoForm.textContent = "#" + project.getName();
        newChoiceTodoForm.style.color = project.getColor();
        projectDropDown.appendChild(newChoiceTodoForm);
        let newButtonSideNav = document.createElement("button");
        newButtonSideNav.textContent = "#" + project.getName();
        newButtonSideNav.style.color = project.getColor();
        newButtonSideNav.classList.add("menubuttons");
        newButtonSideNav.addEventListener("click", (e) => {
            let projectName = project.getName();
            let array = functionManagement.getProjects(projectName);
            document.querySelector('.content').innerHTML = `<h1 style = "color: ${project.getColor()}" class = "headingmain">#${projectName}</h1>`;
            array.forEach(item => displayDivsTodo(item));
        })
        projectsDiv.appendChild(newButtonSideNav);
    }


