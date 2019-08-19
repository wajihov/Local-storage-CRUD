var selectedRow = null;
var index;
var indexTodo;
console.log(" dans le debut ",index);

function refraishTime(){
    var localDatetime=formatDate(new Date());
    return localDatetime;
}
//pour supprimer une ligne manuellement
// items = JSON.parse(localStorage.getItem("Business"));
// items.splice(4,1);
// localStorage.setItem("Business", JSON.stringify(items));

function onConnect(){
    var login=document.getElementById("login").value;
    var passWord= document.getElementById("password").value;
    direction(login,passWord);
}

function direction(login,passWord){
    var listUsers=JSON.parse(localStorage.getItem("Utilisateur")); 
    var ValideLogin= false;
    var validePW= false;
    for(i=0; i<listUsers.length; i++){       
        if(listUsers[i].mail==login){
            ValideLogin=true;
            if(listUsers[i].password==passWord){
                validePW=true;
                var person = listUsers[i];
                localStorage.setItem("Authentif", JSON.stringify(person) );                
                window.location.href="Dashboard.html"; 
            }
        }
    }
    msgErreur(ValideLogin, validePW);
}

function msgErreur(ValideLogin, validePW){
    if(ValideLogin==false){
        var msgLogin="Login invalide";
        document.getElementById("msgLogin").innerHTML=msgLogin;                    
    }
    else {
        document.getElementById("msgLogin").innerHTML="";
    }        
    if(validePW==false){
        msgPW="Password invalide";
        document.getElementById("msgPW").innerHTML=msgPW;                   
    }
    else{
        document.getElementById("msgPW").innerHTML="";                   
    }
}

function myLoad(){
    var personne = JSON.parse(localStorage.getItem("Authentif"));    
    if(personne==null){
        window.location.href="Login.html"; 
    }
    AjouterTodo();
}

function AjouterTodo(){
    document.getElementById("FormTodo").style.display= "block";
    document.getElementById("listeTodo").style.display= "none" ;   
}

function ListeTodo(){
    document.getElementById("FormTodo").style.display= "none";
    document.getElementById("listeTodo").style.display= "block"; 
    removeTableToDo(); 
    setInterval(InsertListBussiness, 1000);
}


function removeTableToDo(){
    var tableHeaderRowCount = 1;
    var table = document.getElementById('ToDotList');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
    }
}

function InsertListBussiness(){
    removeTableToDo(); 
    document.getElementById('tableContent').innerHTML="";
    var msgAffaire;
    var PersonBusines=false;
    var affaires= JSON.parse(localStorage.getItem("Business"));
    var identifiant= JSON.parse(localStorage.getItem("Authentif"))
    if(affaires == null){
        msgAffaire="Pas des tâches ont affectés";
        alert(msgAffaire);
        ListeTodo();
    }
    else{            
        for(i=0; i<affaires.length; i++){                           
            if(identifiant.id==affaires[i].idConnect){
                PersonBusines= true;
                var table = document.getElementById("ToDotList");
                var row = table.insertRow(table.length);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = affaires[i].task;
                var cell2 = row.insertCell(1);
                cell2.innerHTML = affaires[i].dateHourAffaire;
                var cell3 = row.insertCell(2);                
                var difference2Dates=twoDates(affaires[i].dateHourAffaire);                
                cell3.innerHTML =  difference2Dates ;                                
                var cell4 = row.insertCell(3);
                cell4.innerHTML = `<a href="#" onClick="onEditTodo(this)"  >Edit</a>&nbsp;
                                <a href="#" onClick="onDeleteTodo(this)" > Delete </a>`;//${affaires[i].idConnect}
            }
        }
        if(PersonBusines== false){
                msgAffaire="Cette personne n'a pas des tâches"               
                var table = document.getElementById("ToDotList");
                var row = table.insertRow(table.length);                       
                var cell1 = row.insertCell(0);
                cell1.innerHTML = msgAffaire;
       }
    }
}

function twoDates(date){
    var todayDate=new Date();
    var ToDoDate=date.replace(" à ", " ");
    var StringToDoDate=ToDoDate.toString();
    var DateToDoDate=new Date(StringToDoDate);
    // get total seconds between the times
    var delta = (DateToDoDate - todayDate) / 1000;
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    var seconds = Math.round(delta % 60) ;  // in theory the modulus is not required

    result=days!=0? days+" j ": "";
    result+=hours!=0? (hours<10? "0"+hours: hours) + " h ": "";
    result+=minutes!=0? (minutes<10?"0"+minutes: minutes )+" min " : "";
    result+= seconds!=0? (seconds<10?"0"+seconds: seconds )+" sec ":"";
    if(days<0 || hours<0 || minutes<0 || seconds<0)
        return "Terminer";
    else
        return result;
}

function onEditTodo(td){
    selectedRow=td.parentElement.parentElement;
    var listAffaires=JSON.parse(localStorage.getItem("Business"));
    var personne = JSON.parse(localStorage.getItem("Authentif"));             
    var chToDo=selectedRow.cells[0].innerHTML;
    var chDateTime=selectedRow.cells[1].innerHTML;
    var chIdIdentifiant= personne.id;
    for(i=0; i<listAffaires.length;i++){
        if(listAffaires[i].task==chToDo && listAffaires[i].idConnect==chIdIdentifiant){
            indexTodo=i;
        }
    }
    document.getElementById("fTodo").value=selectedRow.cells[0].innerHTML;
    document.getElementById("myDatetimeField").value=selectedRow.cells[1].innerHTML;
    document.getElementById("AjouterAffaire").innerHTML="Mettre à jours";
    document.getElementById("saveToDo").value="Mettre à jours";
    AjouterTodo();
}

function onDeleteTodo(td){
    if(confirm("Are you sure to delete this row?")){
        selectedRow=td.parentElement.parentElement;        
        var listAffaires=JSON.parse(localStorage.getItem("Business"));
        var personne = JSON.parse(localStorage.getItem("Authentif"));                     
        var chToDo=selectedRow.cells[0].innerHTML;
        var chDateTime=selectedRow.cells[1].innerHTML;
        var chIdUser=personne.id;
        for(i=0; i<listAffaires.length;i++){                        
            if(listAffaires[i].task==chToDo && listAffaires[i].idConnect==chIdUser){                                          
                listAffaires.splice(i,1);
                break;
            }
        }
        localStorage.setItem("Business", JSON.stringify(listAffaires));
        ListeTodo();
    }
}


window.addEventListener("load", function() {
    
    var now = new Date();
    var utcString = now.toISOString().substring(0,19);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();    
    localDatetime = year + "-" +
                      (month < 10 ? "0" + month.toString() : month) + "-" +
                      (day < 10 ? "0" + day.toString() : day) + " à " +
                      (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                      (minute < 10 ? "0" + minute.toString() : minute) +
                      utcString.substring(16,19);
    var datetimeField = document.getElementById("myDatetimeField");
    datetimeField.value = localDatetime;
});

function formatDate(dateFormater){
    var utcString = dateFormater.toISOString().substring(0,19);
    var year = dateFormater.getFullYear();
    var month = dateFormater.getMonth() + 1;
    var day = dateFormater.getDate();
    var hour = dateFormater.getHours();
    var minute = dateFormater.getMinutes();
    var second = dateFormater.getSeconds();
    var localDatetime = year + "-" +
                      (month < 10 ? "0" + month.toString() : month) + "-" +
                      (day < 10 ? "0" + day.toString() : day) + " à " +
                      (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                      (minute < 10 ? "0" + minute.toString() : minute) +
                      utcString.substring(16,19);
    //var datetimeField = document.getElementById("myDatetimeField");
    return localDatetime;
}

function resetTodo(){
    document.getElementById("fTodo").value="";
    document.getElementById("myDatetimeField").value= refraishTime();
    document.getElementById("AjouterAffaire").innerHTML="Ajouter Todo";
    document.getElementById("saveToDo").value="Submit";
}

function saveToDo(){
    var today= new Date();
    var msgSaveTodo=null;
    var datetime=formatDate(today);
    if(document.getElementById("saveToDo").value== "Submit"){ 
        console.log("dans Ajouter TODO");
        var dateEntrer= document.getElementById("myDatetimeField").value;        
        if(datetime<dateEntrer){
            console.log("Date accepter");            
            var toDo= JSON.parse(localStorage.getItem("Business"));
            var personne = JSON.parse(localStorage.getItem("Authentif"));             
            if(toDo==null){
                toDo=[];
            }            
            affaire = {
                idConnect:personne.id,
                task: document.getElementById("fTodo").value,
                dateHourAffaire: document.getElementById("myDatetimeField").value                
            };
            toDo.push(affaire);
            localStorage.setItem("Business", JSON.stringify(toDo));
            document.getElementById("idMsgToDo").innerHTML="";
        } else {   
            msgSaveTodo="Date innacceptable";
            console.log(msgSaveTodo);
            document.getElementById("idMsgToDo").innerHTML=msgSaveTodo;
        }
    }else if(document.getElementById("saveToDo").value == "Mettre à jours"){
        var listAffaires=JSON.parse(localStorage.getItem("Business"));                          
        var affaire = {
                idConnect:listAffaires[indexTodo].idConnect,
                task:document.getElementById("fTodo").value,
                dateHourAffaire:document.getElementById("myDatetimeField").value                
        };            
        listAffaires[indexTodo]=affaire;
        localStorage.setItem("Business", JSON.stringify(listAffaires));
        returnAjouterToDo();
        resetTodo();
    }
    if(msgSaveTodo==null){
        ListeTodo();
        resetTodo();
    }
    else{
        AjouterTodo();
    }
}

function returnAjouterToDo(){
    document.getElementById("AjouterAffaire").innerHTML="Ajouter ";
    document.getElementById("saveToDo").value="Submit";
}

function onDisconect(){        
    localStorage.removeItem('Authentif');
    window.location.href="Login.html";
}