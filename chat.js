var firebaseConfig = {
  apiKey: "AIzaSyCTtal94lL--GPHqEuihPfCet3zz_NmzA0",
  authDomain: "k-chat-5e540.firebaseapp.com",
  databaseURL: "https://k-chat-5e540-default-rtdb.firebaseio.com",
  projectId: "k-chat-5e540",
  storageBucket: "k-chat-5e540.appspot.com",
  messagingSenderId: "906162007265",
  appId: "1:906162007265:web:3b0ea5e398ec8639911ba0",
};
firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

span_tag = "<span>&nbsp;&nbsp;&nbsp;<div class='dropdown'><img id='drop_btn' src='profile.jpg' style='width: 40px; height: 40px;'><div class='dropdown-content'><a id='logout' onclick='logout();'>Logout</a></div></div></span>";
document.getElementById("welcome").innerHTML = user_name+span_tag

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    console.log(firebase_message_id);
	console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like']
    name_tag = "<h4> "+ name +"</h4>";
    message_tag = "<h4 style='padding: 5px; color: grey;'>" + message + "</h4>";
    like_button ="<button class='button' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)' class='btn btn-warning'";
    span_tag = "<span>Like: "+ like +"</span></button><hr>";

   row = name_tag + message_tag +like_button + span_tag;       
   document.getElementById("output").innerHTML += row;

 } });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes  
    });
}

function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location = "index.html";
}