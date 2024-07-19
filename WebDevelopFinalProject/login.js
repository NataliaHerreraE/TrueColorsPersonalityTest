login = false;

function setInitialValues() {
  localStorage.setItem("currentName", "");
}

function getUsernameAndPassword() {
  username = $("#user-login").val();
  password = $("#password").val();

  validateLogin(username, password);
}

function validateLogin(username, password) {
  var find = false;

  if (username === "" || password === "") {
    var message = $("#message").html(
      "sorry, The username and password can not be empty"
    );
  } else {
    var inputUsername = $("#user-login").val();
    var inputPassword = $("#password").val();

    // Get the total number of stored users
    var totalUsers = parseInt(localStorage.getItem("counter")) || 0;

    // Iterate over the stored users
    for (var i = 0; i < totalUsers; i++) {
      
      // Get the data for the current user
      var storedData = JSON.parse(localStorage.getItem("data" + i));

      // Check if the data exists and if the username and password match
      if (
        storedData &&
        inputUsername === storedData.userName &&
        inputPassword === storedData.password
      ) {
        alert("Welcome " + storedData.userName);
        find = true;
        setLogin("true");
        currentName = storedData.name;
        localStorage.setItem("currentName", currentName);
        setNameUser();

        nextPage = "index.html";
        window.open(nextPage);
         window.close(this);
        break;
      }
    }

    // If the loop ends without finding a match, show an error message
    if (!find) {
      alert("Username or password invalid");
    }
  }
}

function generatePassword() {
  // List of possible characters for the password
  var possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Desired length of the password
  var passwordLength = 8;

  // Variable to store the generated password
  var generatedPassword = "";

  // Generate the random password
  for (var i = 0; i < passwordLength; i++) {
    var randomCharacter = possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
    generatedPassword += randomCharacter;
  }

  // Display the generated password in the password input field
  var generatedPassword = $("#passwordGenerated").val(generatedPassword);
}

function ShowRegister() {
  $(".register").toggle();
}

function registerNewUser() {
  // Get the current value of 'i' from localStorage
  var storedCounter = localStorage.getItem("counter");

  // Convert the value to a number or set it to 0 if it's not valid
  var i = parseInt(storedCounter) || 0;

  var nameLogin = $("#nName").val();
  var newUsername = $("#nUsername").val();
  var newPassword = $("#passwordGenerated").val();

  if (userNameValidation(newUsername)) {
    alert("sorry, this username already exits");
  } else {
    var data = {
      name: nameLogin,
      userName: newUsername,
      password: newPassword,
    };

    // Use the current value of 'i' as part of the key in localStorage
    localStorage.setItem("data" + i, JSON.stringify(data));

    // Increment 'i' for the next time
    i++;

    // Save the new value of 'i' in localStorage
    localStorage.setItem("counter", i);
    alert("User created successfully");
    alert("Welcome " + data.name);
    find = true;
    setLogin("true");
    currentName = data.name;
    localStorage.setItem("currentName", data.name);
    setNameUser();

    nextPage = "index.html";
    window.open(nextPage);
     window.close(this);

    
    /*$("#nName").val("");
    $("#nUsername").val("");
    $("#passwordGenerated").val("");*/
  }
}

function userNameValidation(username) {
  var inputUsername = username;
  var currentName = "";

  // Get the total number of stored users
  var totalUsers = parseInt(localStorage.getItem("counter")) || 0;

  // Iterate over the stored users
  for (var i = 0; i < totalUsers; i++) {
    // Get the data for the current user
    var storedData = JSON.parse(localStorage.getItem("data" + i));

    // Check if the data exists and if the username matches
    if (storedData && inputUsername === storedData.userName) {
      return true;
    }
  }

  return false;
}

function activateButton() {
  if (username.trim() === "" || password.trim() === "") {
    $("#btn-form").prop("disabled", true);
  } else {
    $("#btn-form").prop("disabled", false);
  }
}

function validateLoginQ() {
  var login = localStorage.getItem("login");

  if (login == "false") {
    alert("Sorry, you need to be logged in to take the test.");
    return login;
  }

  return login;
}

function setLogin(value) {
  localStorage.setItem("login", value);

  login = value;
}

function setNameUser() {
  $("#login").text("Log out").addClass("logged-in-username");

  // var segundoElemento = $('#miLista li:eq(1)');
}
