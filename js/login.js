const btnSubmit = document.querySelector("#btn");
const inputUserName = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const inputRemember = document.querySelector("#remem-pass");
const alertUserName = document.querySelector("#alert-username");
const alertPassword = document.querySelector("#alert-password");
const alertWrongAccount = document.querySelector("#alert-wrong-account");
var countError = 0;
var isValidate = true;

const listAccount = [
  {
    username: "admin",
    password: "abc123",
  },
  {
    username: "user1",
    password: "abc123",
  },
  {
    username: "user2",
    password: "abc123",
  },
  {
    username: "user3",
    password: "abc123",
  },
  {
    username: "user4",
    password: "abc123",
  },
];

function validateForm(username, password) {
  alertWrongAccount.style.display = "none";
  if (username.length === 0) {
    alertUserName.style.display = "table-row";
    isValidate = false;
  } else {
    alertUserName.style.display = "none";
    isValidate = true;
  }
  if (password.length === 0) {
    alertPassword.style.display = "table-row";
    isValidate = false;
  } else {
    alertPassword.style.display = "none";
  }
}

function login(username, password) {
  for (let i = 0; i < listAccount.length; i++) {
    if (
      username === listAccount[i].username &&
      password === listAccount[i].password
    ) {
      alertWrongAccount.style.display = "none";
      return true;
    }
  }
  countError++;
  alertWrongAccount.style.display = "table-row";
  return false;
}

// save account in storage for remember
if (typeof Storage !== "undefined") {
  if (localStorage.username) {
    inputUserName.value = localStorage.username;
    inputPassword.value = localStorage.password;
  }
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let username = inputUserName.value;
  let password = inputPassword.value;
  let isRemember = inputRemember.checked;

  validateForm(username, password);
  if (isValidate && login(username, password)) {
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("username", username);
      if (isRemember) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else if (localStorage.username) {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    }
    window.location = "game.html";
  } else if (countError === 3) {
    window.location = "error.html";
  }
});
