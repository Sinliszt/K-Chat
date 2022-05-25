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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

span_tag = "<span>&nbsp;&nbsp;&nbsp;<div class='dropdown'><img id='drop_btn' src='profile.jpg' style='width: 40px; height: 40px;'><div class='dropdown-content'><a id='logout' onclick='logout();'>Logout</a></div></div></span>";
document.getElementById("welcome").innerHTML = user_name+span_tag

function redirectToRoomName(name){
      console.log(name);
      window.location = "chat.html";
      firebase.database().ref("/").child(group).update({
        purpose: "adding room name"
    });

   localStorage.setItem("room_name", name);
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
