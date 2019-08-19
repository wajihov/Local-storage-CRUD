var index;
function myLoad(){    
    AjouterUser();    
}

function AjouterUser(){
    document.getElementById("user").style.display="block";
    document.getElementById("listeUser").style.display="none";            
}

function listeUser(){
    document.getElementById("user").style.display="none";
    document.getElementById("listeUser").style.display="block";        
    removeTable();
    InsertNewLigne();
}

function SaveData(){
    if(document.getElementById("save").value=="Submit"){    
    var radios = document.getElementsByName('genderS');    
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked){      
            var ValeurSexe = radios[i].value;        
            break;
        }
    }
    var listUsers=JSON.parse(localStorage.getItem("Utilisateur"));
    if(listUsers==null) {
        listUsers=[];
    }
    var user = {
        id:Math.round(Math.random()*100),
        nom: document.getElementById("fname").value,
        prenom: document.getElementById("llast").value,
        mail: document.getElementById("lemail").value,
        password:document.getElementById("lpassword").value,
        sexe: ValeurSexe,
        country: document.getElementById("fcountry").value
    };
    listUsers.push(user);
    localStorage.setItem("Utilisateur", JSON.stringify(listUsers));    
    resetForm();
    }
    else if(document.getElementById("save").value== "Mettre à jours"){
            var listUsers=JSON.parse(localStorage.getItem("Utilisateur"));  
            var radios = document.getElementsByName('genderS');    
            for (var i = 0, length = radios.length; i < length; i++)
                {
                if (radios[i].checked)
                {      
                    var ValeurSexe = radios[i].value;        
                    break;
                }
            }
            var user = {
                id:listUsers[index].id,
                nom: document.getElementById("fname").value,
                prenom: document.getElementById("llast").value,
                mail: document.getElementById("lemail").value,
                password:document.getElementById("lpassword").value,
                sexe: ValeurSexe,
                country: document.getElementById("fcountry").value
            };            
        listUsers[index]=user;
        localStorage.setItem("Utilisateur", JSON.stringify(listUsers));
        returnAjouterPersonne();
        resetForm();
    }
    listeUser();
}

function returnAjouterPersonne(){
    document.getElementById("AjouterPersonne").innerHTML="Ajouter Personne";
    document.getElementById("save").value="Submit";
}

function resetForm(){
    document.getElementById("fname").value="";
    document.getElementById("llast").value="";
    document.getElementById("lemail").value="";
    document.getElementById("lpassword").value="";
    document.getElementById("fcountry").value=""; 
    document.getElementById("save").value="Submit"; 
    document.getElementById("AjouterPersonne").innerHTML="Ajouter Personne";
    var ele = document.getElementsByName("genderS");
    for(var i=0;i<ele.length;i++){
        ele[i].checked = true;
        break;
    }       
}

function removeTable(){
    var tableHeaderRowCount = 1;
    var table = document.getElementById('contactList');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
    }
}

function InsertNewLigne(){    
    var listUsers= JSON.parse(localStorage.getItem("Utilisateur")); 
    if(listUsers!=null)   
        console.log("taille table : ",listUsers.length);
    for(i=0; i<listUsers.length; i++){                
        var table = document.getElementById("contactList");      
        var row = table.insertRow(table.length);                       
        var cell1 = row.insertCell(0);
        cell1.innerHTML = listUsers[i].nom;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = listUsers[i].prenom;
        var cell3 = row.insertCell(2);
        cell3.innerHTML = listUsers[i].mail;
        var cell4 = row.insertCell(3);
        cell4.innerHTML = listUsers[i].sexe;
        var cell5 = row.insertCell(4);
        cell5.innerHTML = listUsers[i].country;
        var cell6 = row.insertCell(5);
        cell6.innerHTML = `<a href="#" onClick="onEdit(this)">Edit  </a>&nbsp;
                           <a href="#" onClick="onDeleteRow(this)"> Delete</a>`; //${listUsers[i].id}
    }
}

function onDeleteRow(td){
    if(confirm("Are you sure to delete this record ? ")){        
        selectedRow=td.parentElement.parentElement;
        var chNom=selectedRow.cells[0].innerHTML;
        var chPrenom=selectedRow.cells[1].innerHTML;
        var chMail=selectedRow.cells[2].innerHTML;        
        var chSexe=selectedRow.cells[3].innerHTML;
        var chCountry =selectedRow.cells[4].innerHTML;
        var listUsers=JSON.parse(localStorage.getItem("Utilisateur"));
        for(i=0; i<listUsers.length; i++){
            if(listUsers[i].nom==chNom && listUsers[i].prenom==chPrenom && listUsers[i].mail==chMail && listUsers[i].sexe== chSexe && listUsers[i].country== chCountry ){
                listUsers.splice(i,1);
                break;
            }
        }
        localStorage.setItem("Utilisateur", JSON.stringify(listUsers));            
        listeUser();
    }    
}


function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    var listUsers=JSON.parse(localStorage.getItem("Utilisateur"));
    var chNom=selectedRow.cells[0].innerHTML;
    var chPrenom=selectedRow.cells[1].innerHTML;
    var chMail=selectedRow.cells[2].innerHTML;
    var chpassword;
    var ChSexe;
    var data;
    for(i=0; i<listUsers.length; i++){
        if(listUsers[i].nom==chNom && listUsers[i].prenom==chPrenom && listUsers[i].mail==chMail){
            chpassword=listUsers[i].password;
            ChSexe= listUsers[i].sexe;
            data=listUsers[i];
            index=i;
        }
    }
    document.getElementById("fname").value= selectedRow.cells[0].innerHTML;
    document.getElementById("llast").value= selectedRow.cells[1].innerHTML;
    document.getElementById("lpassword").value= chpassword;
    document.getElementById("lemail").value= selectedRow.cells[2].innerHTML;
    document.getElementById("fcountry").value= selectedRow.cells[4].innerHTML;
    if(ChSexe=="Homme")
        document.getElementById("L_Homme").checked=true;
    else
        document.getElementById("L_Femme").checked=true;       
    document.getElementById("AjouterPersonne").innerHTML="Mettre à jours";
    document.getElementById("save").value="Mettre à jours";
    AjouterUser();
    console.log("le nom est : ",data.nom, " ", data.prenom, " ", data.mail);
}