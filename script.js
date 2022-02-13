let username;
let idinterval;
let messages;
let msgHTML= document.querySelector(".messages-container");
let data_msg;
let second_data_msg;
let msgSND;
let data_persons;
let data_name_who = "Todos";
let data_type_message = "message";



function entry(){
    let first_name = document.querySelector(".login-page input");
    let see = document.querySelector(".login-page");
    see.classList.add("hidden");
    identify=first_name.value   
    sendNAME(identify);
}

function sendMSG(){
    console.log("sendMSG() diz que o user é: " + username)
    msgSND = document.querySelector(".input-box");
    console.log("sendmsg diz que a msg foi: " + msgSND.value)
    const msgpromisses = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", 
    {
        from: username,
        to: data_name_who,
        text: msgSND.value,
        type: data_type_message
    })
    msgpromisses.then(loadMSG);
    msgpromisses.catch(failure);
    msgSND.value="";
}
function sendNAME(id){
    const apiPromisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", {name:id});
    console.log("nome de usuario: "+ id)
    username = id;
    apiPromisse.then(timers);
    apiPromisse.then(keepMSG);
    loadMSG();
    apiPromisse.catch(failure)
    return;
}
function failure(erro) {
    const statusCode = erro.response.status;
    if(statusCode=="400"){
        alert("Este ID está online!");
        window.location.reload();
    }
    else{
        alert("Erro desconhecido");
        window.location.reload();
    }
}

function timers(){
    idinterval = setInterval(hello, 5000);
}
function keepMSG(){
    idinterval = setInterval(loadMSG, 3000);
}

function hello(){
    const api_promisse2 = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:username})
    api_promisse2.catch(failure);
}


function loadMSG(){
    messages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    messages.then(postMSG) ;
    messages.catch(failure);
} 


function postMSG(resposta){
    data_msg=resposta.data;
    
    if(second_data_msg==undefined){ 
        data_msg2=data_msg
        for(var i = 0;i<(data_msg.length);i++){
            if(data_msg[i].type =="status"){
                msgHTML.innerHTML +=
                `
                <li class="message-text status ">
                    <span class="hour">(${data_msg[i].time})</span>
                    <span class="person-name">${data_msg[i].from }</span>
                    <span>${data_msg[i].text }</span>
                </li>
                `
            }

            else{
                msgHTML.innerHTML +=
                `
                <li class="message-text data-identifier="message"">
                    <span class="hour">(${data_msg[i].time})</span>
                    <span class="person-name">${data_msg[i].from }</span>
                    <span>${data_msg[i].text }</span>
                </li>
                `
            }
            }
            let inScreenElement = document.querySelector("ul li:last-child");
            inScreenElement.scrollIntoView();
    }
    
    if((data_msg[99].time)!=((data_msg2[99].time))){ 
        data_msg2=data_msg;
        msgHTML.innerHTML =""
        for(var i = 0;i<(data_msg.length);i++){
        if(data_msg[i].type =="status"){
            msgHTML.innerHTML +=
            `
            <li class="message-text status ">
                <span class="hour">(${data_msg[i].time})</span>
                <span class="person-name">${data_msg[i].from}</span>
                <span>${data_msg[i].text }</span>
            </li>
            `
        }

        else if(data_msg[i].type =="message"){
            msgHTML.innerHTML +=
            `
            <li class="message-text" data-identifier="message">
                <span class="hour">(${data_msg[i].time})</span>
                <span class="person-name">${data_msg[i].from} </span>
                <p> para <span> </span></p>
                <span class="person-name"> ${data_msg[i].to} </span>
                <span>${data_msg[i].text }</span>
            </li>
            `
        }
        else if(data_msg[i].to==nome && data_msg[i].type=="private_message"){
            msgHTML.innerHTML +=
            `
            <li class="message-text private" data-identifier="message"">
                <span class="hour">(${data_msg[i].time})</span>
                <span class="person-name">${data_msg[i].from}</span>
                <p> reservadamente para  <span> </span> </p>
                <span class="person-name"> ${data_msg[i].to}</span>
                <span>${data_msg[i].text}</span>
            </li>
            `
        }
        else if(data_msg[i].from==nome && data_msg[i].type=="private_message" ){
            msgHTML.innerHTML +=
            `
            <li class="message-text private" data-identifier="message"">
                <span class="hour">(${data_msg[i].time})</span>
                <span class="person-name">${data_msg[i].from}</span>
                <p> reservadamente para  <span> </span> </p>
                <span class="person-name"> ${data_msg[i].to} </span>
                <span>${data_msg[i].text}</span>
            </li>
            `
        }
        }
        let inScreenElement = document.querySelector("ul li:last-child");
        inScreenElement.scrollIntoView();
    }
    else{ 
        console.log("Sem atualização");
    }
}

function showSideBar(){
    let sideBar = document.querySelector("aside");
    sideBar.classList.toggle("hidden")
}

function selectionType(element){
    
    let type_message = document.querySelector(".icon-check.visible");
    if(type_message!=null){
        type_message.classList.remove("visible");
    }
    element.querySelector("ion-icon.icon-check").classList.add("visible");
    if(element.className=="public"){
        dados_type_message = "message"
    }
    else{
        if(data_name_who != "Todos"){        data_type_message = "private_message"}
        else{data_type_message = "message"}
    }
    
}

function out(){
    let sideB = document.querySelector("aside");
    sideB.classList.add("hidden");
}


function selectionPerson(elemento){
    let person_div= document.querySelector("ion-icon.icon-check1.visible");
    if(person_div!=null){
        person_div.classList.remove("visible");
    }
    elemento.querySelector("ion-icon.icon-check1").classList.add("visible");
    data_name_who = elemento.querySelector("p").innerHTML;
    tipo_envio=document.querySelector("span.send-tipe");
    tipo_envio.innerHTML="Enviando para "+ data_name_who; 

}

function seeDiferent(one,two) {
    var onlyOne = one.filter(function (element, index, array) {
        if(two.indexOf(element) == -1)
            return element;
    });

    var onlyTwo = two.filter(function (element, index, array) {
        if(one.indexOf(element) == -1)
            return element;
    });

    var allDiferences = onlyOne.concat(onlyTwo);

    console.log(allDiferences);
    return allDiferences;
}