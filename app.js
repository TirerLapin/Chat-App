
// Sign up Account
let signUp = () => {
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let username = document.getElementById("username");

  localStorage.setItem("name", username.value)
  console.log(localStorage)

  if (username.value === "" || username.value === " " || username.value === undefined) {
    swal({
      text: "Please enter your username",
      icon: "warning",
    });
  } else {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        window.location = "chat.html"
        swal({
          text: "User Signed up Successfully",
          icon: "success",
        });
        console.log(result)
        username.value = "";
        email.value = "";
        password.value = "";
      })

      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal({
          text: errorMessage,
          icon: "warning",
        });
        password.value = "";
      });
  }
}



// Log In Account
let logIn = () => {
  let emailLogin = document.getElementById("emailLogin")
  let passwordLogin = document.getElementById("passwordLogin")

  firebase.auth().signInWithEmailAndPassword(emailLogin.value, passwordLogin.value)

    .then((result) => {
      window.location = "chat.html"
      swal({
        text: "User Signed up Successfully",
        icon: "success",
      });
      console.log(result)
      emailLogin.value = "";
      passwordLogin.value = "";
    })

    .catch(function (error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        text: errorMessage,
        icon: "warning",
      });
      passwordLogin.value = "";
    });

}

// Log In With Facebook
const facebookLogin = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;
    window.location = "chat.html"
    swal({
      text: "User Signed up Successfully",
      icon: "success",
    });
    var user = result.user;
    console.log(user.displayName)

  }).catch(function (error) {
    console.log(error.message)
  });
}

// Log Out
logOut = () => {
  firebase.auth().signOut()
    .then(() => {
      window.location = "index.html"
      localStorage.clear()
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        text: errorMessage,
        icon: "warning",
      });
    })
}

//Send Message
send = () => {
  var message = document.getElementById("message");
  var text = message.value

  message.value = "";

  let dbName = localStorage.getItem("name");
  if (text === "" || text === " " || text === undefined) {
    swal({
      text: "Message can't  be empty",
      icon: "warning",
    });
  } else {
    firebase.database().ref("message").push().set({
      "sender": dbName,
      "message": text
    });
  };
}


//show data
firebase.database().ref("message").on('child_added', (data) => {
  let dbName = localStorage.getItem("name");

  var li = document.createElement("li");
  var liText = document.createTextNode(data.val().message);
  li.appendChild(liText);

  var span = document.createElement("span");
  var spanText = document.createTextNode(data.val().sender)
  span.appendChild(spanText);
  li.appendChild(span);
  
  unorderedList.appendChild(li);

  if (data.val().sender === dbName) {
    span.setAttribute("class", "senderName");
  } else {
    span.setAttribute("class", "receiverName");
  }

  if (data.val().sender === dbName) {
    li.setAttribute("class", "listSender");
  } else {
    li.setAttribute("class", "listReceiver");
  }
})


