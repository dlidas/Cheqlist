//KEY
//c = task container
//t = task title
//pc = progress bar container
//p = progress bar
//d = task checkbox
//s = subtask list container
//st = subtask list item container
//b = add subtask button
//x = checkbox

//Global variables
let taskList = [];
let totalTasks = 0;

function addElement(elementName, elementType, elementId, elementClass, elementOnClick, elementInnerHTML, elementParent) {
    elementName = document.createElement(elementType);
    elementName.id = elementId;
    elementName.className = elementClass;
    if (elementOnClick != "n/a") {
        elementName.onclick = elementOnClick;    
    }
    if (elementInnerHTML != "n/a") {
        elementName.innerText = elementInnerHTML;    
    }
    document.getElementById(elementParent).appendChild(elementName);
}

class Task {
    constructor() {
        this.ID = totalTasks;
        this.title = "";
        this.subTasks = [];
        this.subTaskCount = 0;
        this.completedSubTasks = 0;
        this.progress = 0;
        this.create();
        this.setTitle;
    } 

    create() {
        //create container
        (() => addElement("taskContainer", "div", ("c" + this.ID), "task", "n/a", "n/a","content"))();
        //create title
        (() => addElement("titleSpan", "span", ("t" + this.ID), "title", this.setTitle, prompt("New task:", "Task " + totalTasks),("c" + this.ID)))();
        //create progress bar
        (() => addElement("progressContainer", "div", ("pc" + this.ID), "progressContainer", "n/a", "n/a",("c" + this.ID)))();
        //create progress
        (() => addElement("progress", "div", ("p" + this.ID), "progressBar", "n/a", "n/a",("pc" + this.ID)))();
        //create subcontainer
        (() => addElement("subTaskContainer", "ul", ("s" + this.ID), "subTask", "n/a", "n/a",("c" + this.ID)))();
        //create add subtask button
        (() => addElement("addSubTaskButton", "button", ("b" + this.ID), "subTaskButton", this.newSubTask, "ADD SUBTASK",("c" + this.ID)))();
    }
    
    setTitle() {
        let currentTask = taskList[this.id.slice(1) - 1];
        let oldTitle = currentTask.title;
        currentTask.title = prompt("Rename:", oldTitle); 
        document.getElementById("t" + currentTask.ID).innerHTML = currentTask.title;  
    }

    newSubTask() {
        let currentTask = taskList[this.id.slice(1) - 1];
        currentTask.subTasks.push(new SubTask(currentTask.subTaskCount, currentTask.ID));
        currentTask.subTaskCount++;
        currentTask.subTasks[currentTask.subTaskCount-1].updateProgress("noCaller");
    }
}

class SubTask {
    constructor(index, parentID) {
        this.ID = index;
        this.parentID = parentID;
        this.title = prompt("New subtask:", "Subtask " + (index + 1));
        this.complete = false;
        this.create();
        this.updateProgress;
    }

    setTitle() {
        let currentTask = taskList[this.id.slice(1,2) - 1];
        let currentSubTask = currentTask.subTasks[this.id.slice(3)];
        let oldTitle = currentSubTask.title;
        currentTask.title = prompt("Rename:", oldTitle); 
        document.getElementById("t" + currentTask.ID + "-" + currentSubTask.ID).innerHTML = currentTask.title;  
    }

    create() {
        (() => addElement("subTaskContainer", "li", ("st" + this.parentID + "-" + this.ID), "subTask", "n/a", "n/a", ("s" + this.parentID)))();
        (() => addElement("subTaskTitle", "span", ("t" + this.parentID + "-" + this.ID), "subTask", this.setTitle, this.title, ("st" + this.parentID + "-" + this.ID)))();
        (() => addElement("checkBox", "button", ("x" + this.parentID + "-" + this.ID), "checkBox", this.updateProgress, "n/a", ("st" + this.parentID + "-" + this.ID)))();
    }

    updateProgress(caller) {   
        
        let currentTask;
        let currentSubTask;

        if (caller == "noCaller") {
            currentTask = taskList[this.parentID - 1];
            currentSubTask = currentTask.subTasks[this.ID];
            
            currentTask.progress = ((currentTask.completedSubTasks / currentTask.subTaskCount) * 100);
        }
        else {
            currentTask = taskList[this.id.slice(1,2) - 1];
            currentSubTask = currentTask.subTasks[this.id.slice(3)]; 
            
            if (currentSubTask.complete == false) {
                currentSubTask.complete = true;
                this.style = "background-color: cornflowerblue";
                currentTask.completedSubTasks++;
                currentTask.progress += ((1 / currentTask.subTaskCount) * 100);
            }
            else {
                currentSubTask.complete = false;
                this.style = "background-color: light-grey";
                currentTask.completedSubTasks--;
                currentTask.progress -= ((1 / currentTask.subTaskCount) * 100);
            }
        }
                  
        document.getElementById("p" + currentTask.ID).style = "width: " + currentTask.progress + "%; height: inherit; background-color: cornflowerblue;";
        
    }
}

function newTask() {
    totalTasks++;
    taskList.push(new Task);    
}