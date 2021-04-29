
  
  function init(){
  
  
  var firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
  };
  
  firebase.initializeApp(firebaseConfig);
  ref = firebase.database().ref("messages");
    firebase.database().ref("messages").on("child_added",(snapshot)=>{
        var html="";
        console.log('snapshot.val().sender', snapshot.val().sender)
    if(snapshot.val().sender ==myname){
        html += '<li class="message mine ">';
        html += '<p class="text">'+snapshot.val().message+'</p>';
        html += '<span class="time">'+ dateconverter(snapshot.val().time)+'</span>';
        html +=  '</li> ';
    
    }else{ 
        html += '<li class="message">';
        html += '<p class="text">'+snapshot.val().message+'</p>';
        html += '<span class="time">'+ dateconverter(snapshot.val().time)+'</span>';
        html += '<span class="sender">'+snapshot.val().sender+'</span>';
        html += '</li> ';
    
    }
    messages.innerHTML += html;
    messages.scroll({behavior:"smooth",top:999999999999999});

    });
} 
function chatstart (){
    myname = nameInput.value;
    console.log('myname',myname)
    if(myname.length > 0){
       
    login.classList.add("hidden");
    
    init();
    }
}

function dateconverter(stamp){
    var dt = new Date(stamp);
    var s= "0" + dt.getHours();
    var d= "0" + dt.getMinutes();
    var format = s.substr(-2) + ":" + d.substr(-2);
    return format;
}
function messageSend(){
    var msg= document.getElementById("myinput").value;
    if(msg.length > 0 ){
        ref.push().set({
            sender:myname,
            message:msg,
            time:firebase.database.ServerValue.TIMESTAMP
    
  
});
  
}
var msg= document.getElementById("myinput").value="";
}


var login=document.querySelector(".login");
var nameInput= document.getElementById("myname");
var messages = document.querySelector(".messages");
messages.innerHTML = "";
var myname ="";
var ref;