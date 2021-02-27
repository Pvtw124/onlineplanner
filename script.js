/*---------------------------------initialize everything-------------------------------------*/
//initialize cells
function listSelect(cellNum){
    let allLists = document.getElementsByClassName("list");
    if(cellNum === 0) return allLists[0];
    if(cellNum === 1) return allLists[1];
    if(cellNum === 2) return allLists[2];
    if(cellNum === 3) return allLists[4];
    if(cellNum === 4) return allLists[5];
    if(cellNum === 5) return allLists[6];
}
function setDay(dayOfWeekNum){
    let date = new Date();
    date.setDate(date.getDate()+dayOfWeekNum);
    return date.toDateString();
}
function weekdayName(listNum){
    let id = listSelect(listNum).id.split(" ")
    return id[0] //returns index 0 of id, which is weekday
}
    //give cells id of day and add respective weekday to innerHTML
for(let i = 0; i < 6; i++){
    listSelect(i).setAttribute('id', setDay(i))
    listSelect(i).innerHTML = weekdayName(i) + listSelect(i).innerHTML
}

//initialize buttons
var buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("button-wrapper");
var cancel = document.createElement("div");
cancel.classList.add("button", "cancel", "fas", "fa-window-close");
cancel.appendChild(document.createTextNode(" Cancel"));
var save = document.createElement("div");
save.classList.add("button", "save", "fas", "fa-save");
save.appendChild(document.createTextNode(" Save"));
var text = document.createElement("textarea");
text.classList.add("text-box");

var remove = document.createElement("div");
remove.classList.add("button", "remove", "fas", "fa-trash");
remove.appendChild(document.createTextNode(" Delete"));
var edit = document.createElement("div");
edit.classList.add("button", "edit", "fas", "fa-pen");
edit.appendChild(document.createTextNode(" Edit"));

//load tasks
function loadTasks(){
    for(let i = 0; i < 6; i++){ //iterate through lists
        let list = listSelect(i);
        for(let x = 0; x < localStorage.length; x++){ //iterate through local storage
            let temp = localStorage.key(x).split("/");
            let keyTask = temp[0];
            if(keyTask === listSelect(i).id){ //if task key matches list key
                //add tasks
                let child = list.querySelector(".task");
                let content = document.createElement("div");
                content.classList.add("task-box");
                content.setAttribute("id", localStorage.key(x));
                content.appendChild(document.createTextNode(localStorage[localStorage.key(x)]));
                list.insertBefore(content, child)
                console.log(localStorage[localStorage.key(x)])
                //add options
                const editIcon = document.createElement("i");
                editIcon.classList.add("fas", "fa-edit", "options");
                content.appendChild(editIcon);
            }
        }
    }
}
loadTasks()


function hasClass(elem, className){
    return elem.className.split(" ").indexOf(className) > -1;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
/*----------------------------onclick functions--------------------------------- */
//onclick task
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'task')){
        //set every taskbutton to initial to prevent bug
        let allLists = document.getElementsByClassName("list");
        for(i = 0; i<3; i++){allLists[i].querySelector(".task").style.display = "initial";}
        for(i = 4; i<7; i++){allLists[i].querySelector(".task").style.display = "initial";}
        //hide task button
        let list = e.target.parentElement;
        let child = list.querySelector(".task");
        child.style.display = "none";
        //create text-box, save, and cancel buttons
//use .focus to drop cursor on textbox when created*************************************
        text.value = '';
        buttonWrapper.appendChild(save);
        buttonWrapper.appendChild(cancel);
        list.appendChild(text);
        list.appendChild(buttonWrapper);
        text.focus() //using a ; breaks it?
    }
})

//onclick cancel
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'cancel')){
        //cancel.parent -> buttonWrapper.parent -> list
        let list = e.target.parentElement.parentElement;
        let child = list.querySelector(".task");
        //const list = e.target.parentElement;
        save.remove(); //i dont think this is needed //jk you do
        cancel.remove();
        remove.remove();
        edit.remove();
        buttonWrapper.remove();
        text.remove();
        //alert(list.children[0])
        child.style.display = "initial";
    }
})

//localStorage instructions
    //let key = (test.getMonth()+1).toString() + "/" + test.getDate().toString() + "/" + test.getFullYear().toString() + "/" + Date.now().toString() + "." + test.getMilliseconds().toString();
    //let value = text inside text box
    //each weekday cell will get a month/day/year, and will be assigned a matching month/day/year key value pair from localStorage (each time page is refreshed?)
    //when you press save, text box text is saved to localStorage. Should that be the end of the function? another function to build text box?



//onclick save
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'save')){
        //create task
            //save.parent -> buttonWrapper.parent -> list
        let list = e.target.parentElement.parentElement;
        let child = list.querySelector(".task");
        if(text.value != ''){
            let date = new Date();
            let key = list.id + "/" + Date.now().toString() + "." + date.getMilliseconds().toString();
            localStorage.setItem(key, text.value);
            console.log(localStorage);
            //add task box
            const content = document.createElement("div");
            content.classList.add("task-box");
            content.setAttribute("id", key);
            content.appendChild(document.createTextNode(text.value));
            list.insertBefore(content, child);
            //add options
            const editIcon = document.createElement("i");
            editIcon.classList.add("fas", "fa-edit", "options");
            content.appendChild(editIcon);
            text.value = '';
        }
        //remove edit stuff
        save.remove();
        cancel.remove();
        buttonWrapper.remove();
        text.remove();
        child.style.display = "initial";
    }
})

//enter saves as well
text.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        //create task
            //save.parent -> buttonWrapper.parent -> list
            let list = e.target.parentElement;
            let child = list.querySelector(".task");
            if(text.value != ''){
                let date = new Date();
                let key = list.id + "/" + Date.now().toString() + "." + date.getMilliseconds().toString();
                localStorage.setItem(key, text.value);
                console.log(localStorage);
                //add task box
                const content = document.createElement("div");
                content.classList.add("task-box");
                content.setAttribute("id", key);
                content.appendChild(document.createTextNode(text.value));
                list.insertBefore(content, child);
                //add options
                const editIcon = document.createElement("i");
                editIcon.classList.add("fas", "fa-edit", "options");
                content.appendChild(editIcon);
                text.value = '';
            }
            //remove edit stuff
            save.remove();
            cancel.remove();
            buttonWrapper.remove();
            text.remove();
            child.style.display = "initial";
    }
});

//onclick options
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'options')){
        //options.parent -> task-box.parent -> list
        let list = e.target.parentElement.parentElement;
        let taskBar = list.querySelector(".task");

        taskBar.style.display = "none";
        save.remove();
        buttonWrapper.appendChild(edit);
        buttonWrapper.appendChild(remove);
        buttonWrapper.appendChild(cancel);
        //list.appendChild(buttonWrapper);
        list.insertBefore(buttonWrapper, e.target.parentElement)
        taskBox = e.target.parentElement;
    }
})

//onclick edit
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'edit')){
        //edit.parent -> buttonWrapper.parent -> list
        let list = e.target.parentElement.parentElement;
        let child = list.querySelector(".task");
        child.style.display = "none";
        edit.remove();
        remove.remove();
        cancel.remove(); //eventually include cancel
        buttonWrapper.appendChild(save);
        //buttonWrapper.appendChild(cancel);
        //add textarea with text from task
        text.value = taskBox.textContent;
        list.insertBefore(text, buttonWrapper);
        taskBox.remove();
        //remove old from localStorage
        localStorage.removeItem(taskBox.id);
        
    }
})

//onclick delete
document.addEventListener('click', function(e){
    if(hasClass(e.target, 'remove')){
        //remove.parent -> buttonWrapper.parent -> list
        let list = e.target.parentElement.parentElement;
        let child = list.querySelector(".task");
        child.style.display = "initial";
        taskBox.remove();
        edit.remove();
        remove.remove();
        buttonWrapper.remove();
        //remove from localStorage
        localStorage.removeItem(taskBox.id);
        
        
    }
})


/*-----------------------------------------------------------------------------*/






        
