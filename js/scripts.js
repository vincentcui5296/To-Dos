var activeTodos = [];
var completedTodos = [];
const inputNames = ["taskName", "startTime", "endTime"];

var submit = document.querySelector("button");
submit.addEventListener("click", function () {
    var inputs = document.querySelectorAll(".add-todos input");
    addTask(inputs);
});

function addTask(inputNodes) {
    var todo = {};

    for (var i = 0; i < inputNodes.length; i++) {
        todo[inputNames[i]] = inputNodes[i].value;
    }

    if (findItems(todo, activeTodos) >= 0)
        return;

    activeTodos.push(todo);


    // sort by endTime.
    activeTodos.sort(function(x, y) {
        if (x.endTime > y.endTime)
            return 1;
        else if (x.endTime < y.endTime)
            return -1;
        else
            return 0;
    });

    showItems(activeTodos, "active-todos");
}


function showItems(todos, flag) {
    var ul = document.querySelector("." + flag);
    ul.innerHTML = "";

    for (var todo in todos) {
        var li = document.createElement("li");
        if (flag === "active-todos") {
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            li.appendChild(checkbox);
    
            checkbox.addEventListener("click", function() {
                if (this.checked) {
                    li = this.parentElement;
    
                    var task = {};
                    task[inputNames[0]] = li.children[1].textContent;;
                    task[inputNames[1]] = li.children[2].value;
                    task[inputNames[2]] = li.children[3].value;
                    activeTodos.splice(findItems(task, activeTodos), 1);
                    showItems(activeTodos, "active-todos");
                    completedTodos.push(task);
                    showItems(completedTodos, "completed-todos");
                }
            });
        }

    
        var label = document.createElement("label");
        label.textContent = todos[todo].taskName;
        li.appendChild(label);

        var span = document.createElement("span");
        span.textContent = formatTime(todos[todo].startTime);
        span.value = todos[todo].startTime;
        li.appendChild(span);

        span = document.createElement("span");
        span.textContent = formatTime(todos[todo].endTime);
        span.value = todos[todo].endTime;
        li.appendChild(span);
    
        if (flag === "active-todos") {
            var editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            li.appendChild(editBtn);
    
            editBtn.addEventListener("click", function() {
                var li = this.parentElement;
    
                var input = document.createElement("input");
                input.value = li.children[1].textContent;
    
                var labelStartTime = document.createElement("label");
                labelStartTime.textContent = "Start Time";
    
                var startTime = document.createElement("input");
                startTime.setAttribute("type", "datetime-local");
                startTime.value = li.children[2].value;
    
                var labelEndTime = document.createElement("label");
                labelEndTime.textContent = "End Time";
    
                var endTime = document.createElement("input");
                endTime.setAttribute("type", "datetime-local");
                endTime.value = li.children[3].value;
    
                var button = document.createElement("button");
                button.textContent = "Change";
    
                var task = {};
                task[inputNames[0]] = input.value;
                task[inputNames[1]] = startTime.value;
                task[inputNames[2]] = endTime.value;
                activeTodos.splice(findItems(task, activeTodos), 1);
    
                li.innerHTML = "";
                li.appendChild(input);
                li.appendChild(labelStartTime);
                li.appendChild(startTime);
                li.appendChild(labelEndTime);
                li.appendChild(endTime);
                li.appendChild(button);
        
                button.addEventListener("click", function() {
                    addTask(button.parentElement.querySelectorAll("input"));
                });
            });
        }

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        li.appendChild(deleteBtn);
    
        ul.appendChild(li);
    
        deleteBtn.addEventListener("click", function () {
            li = this.parentElement;

            var task = {};
            task[inputNames[0]] = li.children[1].textContent;;
            task[inputNames[1]] = li.children[2].value;
            task[inputNames[2]] = li.children[3].value;
            if (flag === "active-todos") {
                activeTodos.splice(findItems(task, activeTodos), 1);
                showItems(activeTodos, "active-todos");
            } else if (flag === "completed-todos") {
                completedTodos.splice(findItems(task, completedTodos), 1);
                showItems(completedTodos, "completed-todos");
            }

        });
    }
}


function formatTime(dateTimestr) {
    var dateTime = new Date(dateTimestr);
    return dateTime.getFullYear() + "-" +
           (dateTime.getMonth() + 1) + "-" +
           dateTime.getDate() + " " +
           dateTime.getHours() + ":" +
           dateTime.getMinutes();
}

function findItems(item, items) {
    for (var i = 0; i < items.length; i++) {
        if ((item.taskName === items[i].taskName) &&
            (item.startTime === items[i].startTime) &&
            (item.endTime === items[i].endTime))
            return i;
    }
    return -1;
}
