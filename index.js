var Filter = {
    Elements: {
        form: document.getElementById("form"),
        tileInput: document.getElementById("tileInput"),
        textControl: document.getElementById("msg"),
        dateInput: document.getElementById("dateInput"),
        textArea: document.getElementById("textarea"),
        buttonAdd: document.getElementById("add"),
        tasksArea: document.getElementById("tasks"),
    },
    Status: {
        formValues:[],
    },
    Actions: {
        init: () => {   
            if (localStorage.getItem("task")) {
                var localStorageData =JSON.parse(localStorage.getItem("task")) || [];
                Filter.Status.formValues =localStorageData;
                Filter.Actions.appdenHtml()
            }
    

        },
        getValue: () => {
            var tastTitle = Filter.Elements.tileInput.value;
            var taskDate = Filter.Elements.dateInput.value;
            var tastDesc = Filter.Elements.textArea.value;
            var taskValues = {tastTitle, taskDate, tastDesc};
            Filter.Status.formValues.push(taskValues);
            localStorage.setItem("task", JSON.stringify(Filter.Status.formValues))
            Filter.Actions.appdenHtml()
        },
        appdenHtml: () => {
            Filter.Elements.tasksArea.innerHTML =""
            var tasks =Filter.Status.formValues;
            console.log(tasks.length)
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                var taskHtml = 
                "<div class='d-item-01'>" + 
                    "<div class='d-item-01-A'>" +
                        "<h5>" +task.tastTitle+ "</h5>" + 
                        "<span>" +task.taskDate+ "</span>" +
                    "</div>" +
                    "<div class='d-item-01-B'>" + 
                        "<p>" +task.tastDesc+ "</p>"+
                    "</div>" +
                    "<div class='d-item-01-C'>" + 
                        "<img onclick='Filter.Actions.sendTaskValue("+i+")' data-bs-toggle='modal' data-bs-target='#form' src='./images/edit.jpg'>" +
                        "<img onclick='Filter.Actions.deleteTask("+i+")' src='./images/delete.jpg'>" +
                    "</div>"
                "</div>"
                Filter.Elements.tasksArea.innerHTML += taskHtml;
            }
        },

        resetInput: () => {
            Filter.Elements.dateInput.value ="";
            Filter.Elements.tileInput.value ="";
            Filter.Elements.textArea.value  ="";
        },       

        sendTaskValue: (taskIndex) => {
            var task = Filter.Status.formValues[taskIndex];
            Filter.Elements.tileInput.value = task.tastTitle;
            Filter.Elements.dateInput.value = task.taskDate;
            Filter.Elements.textArea.value = task.tastDesc;
            Filter.Elements.buttonAdd.innerText = "Düzenle"
            Filter.Elements.buttonAdd.setAttribute("onclick", 'Filter.Actions.editTask('+taskIndex+')')
        },
        editTask: (taskIndex) => {
            var tastTitle = Filter.Elements.tileInput.value;
            var taskDate = Filter.Elements.dateInput.value;
            var tastDesc = Filter.Elements.textArea.value;
            var task = {tastTitle, taskDate, tastDesc};
            Filter.Status.formValues[taskIndex] = task;
            localStorage.setItem("task", JSON.stringify(Filter.Status.formValues[taskIndex]))
            Filter.Elements.buttonAdd.setAttribute("data-bs-dismiss", "modal");
            Filter.Actions.appdenHtml()
            Filter.Actions.resetInput()
            Filter.Elements.buttonAdd.innerText = "Ekle"

        },
        deleteTask: (taskIndex) => {
            Filter.Status.formValues.splice(taskIndex, 1);
            localStorage.setItem("task", JSON.stringify(Filter.Status.formValues))
            Filter.Actions.appdenHtml();
        }
    }
}

Filter.Actions.init();