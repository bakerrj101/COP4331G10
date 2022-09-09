const urlBase = "http://G10CONTACTMANAGER.LIVE/LAMPAPI";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

function toggle() {
  document.querySelector(".forms").classList.toggle("show-signup");
}

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;

  document.getElementById("loginResult").innerHTML = "";

  let tmp = { login: login, password: password };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        console.log(jsonObject);
        console.log(jsonObject.error);
        if (jsonObject.error === "No Records Found") {
          document.getElementById("loginResult").innerHTML =
            "User/Password Combination Incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        location.href = "main.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doRegister() {
  let create = document.getElementById("createpass").value;
  let confirm = document.getElementById("confirmpass").value;
  if (create != confirm)
    document.getElementById("registerResult").innerHTML =
      "Passwords do not match!";
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}
