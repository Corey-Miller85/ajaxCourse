var dataJSON = '';
var output = document.querySelector('#output');
var taskList = document.querySelector('#taskList');


window.onload = () => {
    if (sessionStorage["tasklist"] != null) {
        dataJSON = JSON.parse(sessionStorage["tasklist"])
        buildCheckboxes(dataJSON);
    } else {
        // var data = '[{"info":"Cut Grass","status":false},{"info":"Clean Room","status":false},{"info":"Make Dinner","status":true},{"info":"Summon Demons","status":false},{"info":"End Capitalism","status":false}]';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = xhr.responseText;
                dataJSON = JSON.parse(data);
                buildCheckboxes(dataJSON);
                
            }
        };
        xhr.open('GET','http://api.myjson.com/bins/12ww83',true)
        xhr.send();
    }

    document.getElementById("myForm").addEventListener('submit', (e) => {
        e.preventDefault();
        var tempValue = document.querySelector('#myForm input[name="task"]').value;
    
        addNewItem({"info":tempValue, "status":false});
        document.querySelector('#myForm input[name="task"]').value = '';
        });
    
};

function addCheckBoxes(data,key){
    var li = document.createElement('li');
    var checkbox = document.createElement('input');
    var textInside = document.createTextNode(data.info);
    var span = document.createElement('span')
    span.innerHTML = 'X';
    span.onclick = remove;
    checkbox.type = 'checkbox';
    checkbox.value = key;
    checkbox.checked = data.status;
    checkbox.setAttribute('onchange','updateJSON()');
    li.appendChild(textInside);
    li.appendChild(checkbox);
    li.appendChild(span);
    document.querySelector('#taskList').appendChild(li);
}

function remove(event) {
    var index = this.previousElementSibling.value;
    taskList.innerHTML = "";
    dataJSON.splice(index,1);
    sessionStorage['tasklist'] = JSON.stringify(dataJSON);
    buildCheckboxes(dataJSON);
}

function addNewItem(data) {
    addCheckBoxes(data, dataJSON.length);            
    dataJSON.push(data);
    sessionStorage['tasklist'] = JSON.stringify(dataJSON);
    
}

function buildCheckboxes(data){
    for (var key in data) {  
        addCheckBoxes(data[key],key);
    }
} 

function updateJSON() {
    var key = event.target.value;
    dataJSON[key].status = event.target.checked;
    sessionStorage['tasklist'] = JSON.stringify(dataJSON);
}





