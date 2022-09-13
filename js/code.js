const urlBase = "http://G10CONTACTMANAGER.LIVE/LAMPAPI";
const extension = "php";

let userId = 1;
let firstName = "";
let lastName = "";

function toggle() {
  document.querySelector(".forms").classList.toggle("show-signup");
}

function doLogin() {
  // userId = 0;
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
        console.log(jsonObject);
        // userId = jsonObject.id;
        // if (jsonObject.error === "No Records Found") {
        //   document.getElementById("loginResult").innerHTML =
        //     "User/Password Combination Incorrect";
        //   return;
        // }

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

function doRegister() 
{
  // get data from user
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let login = document.getElementById("login").value;
  let password = document.getElementById("createpass").value;
  let confirmPassword = document.getElementById("confirmpass").value;

  document.getElementById("loginResult").innerHTML = "";

  if (password != confirmPassword)
  {
    document.getElementById("loginResult").innerHTML = "Passwords do not match!";
  }

  // make data into a json
  let tmp = {FirstName: firstName, LastName: lastName, Login: login, Password: password};
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + '/register.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        console.log(jsonObject);
        console.log(jsonObject.error)

        if (jsonObject.error == "username already exists")
        {
          document.getElementById("loginResult").innerHTML = "Username not avaliable";
          return;
        }

        saveCookie();

        location.href = "main.html"
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("loginResult").innerHTML = err.message;
  }
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

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    // document.getElementById("userName").innerHTML =
    //   "Logged in as " + firstName + " " + lastName;
  }
}

function immediateLoad() {
  let table = "";
  let tmp = { userId: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchContacts." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        for (let i = 0; i < jsonObject.results.length; i++) {
          table += `<tr id = ${jsonObject.results[i].id}>`;
          table += "<td>" + jsonObject.results[i].id + "</td>";
          table += "<td>" + jsonObject.results[i].firstName + "</td>";
          table += "<td>" + jsonObject.results[i].lastName + "</td>";
          table += "<td>" + jsonObject.results[i].phoneNumber + "</td>";
          table += "<td>" + jsonObject.results[i].email + "</td>";
          table += "<td>" + jsonObject.results[i].address + "</td>";
          table += "<td>" + jsonObject.results[i].city + "</td>";
          table += "<td>" + jsonObject.results[i].state + "</td>";
          table += "<td>" + jsonObject.results[i].zip + "</td>";
          table +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="editBox(' +
            jsonObject.results[i].id +
            ')">Edit</button>';
          table +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            jsonObject.results[i].id +
            ')">Del</button></td>';
          table += "</tr>";
        }
        document.getElementById("mytable").innerHTML = table;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("mytable").innerHTML = err.message;
  }
}

function editBox(ID) {
  console.log(ID);
  console.log(userId);
  console.log(document.getElementById(ID));
  let thetable = document.getElementById(ID).getElementsByTagName("td");
  Swal.fire({
    title: "Edit User",
    html:
      '<input id="id" type="hidden" value=' +
      thetable[0].innerHTML +
      ">" +
      '<input id="firstName" class="swal2-input" placeholder="First" value="' +
      thetable[1].innerHTML +
      '">' +
      '<input id="lastName" class="swal2-input" placeholder="Last" value="' +
      thetable[2].innerHTML +
      '">' +
      '<input id="phoneNumber" class="swal2-input" placeholder="PhoneNumber" value="' +
      thetable[3].innerHTML +
      '">' +
      '<input id="email" class="swal2-input" placeholder="Email" value="' +
      thetable[4].innerHTML +
      '">' +
      '<input id="address" class="swal2-input" placeholder="Address" value="' +
      thetable[5].innerHTML +
      '">' +
      '<input id="city" class="swal2-input" placeholder="City" value="' +
      thetable[6].innerHTML +
      '">' +
      '<input id="state" class="swal2-input" placeholder="State" value="' +
      thetable[7].innerHTML +
      '">' +
      '<input id="zip" class="swal2-input" placeholder="Zip" value="' +
      thetable[8].innerHTML +
      '">',
    focusConfirm: false,
    showCloseButton: true,
    showCancelButton: true,
    preConfirm: () => {
      editContact(ID);
    },
  });
}

function editContact(id) {
  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const ph = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const add = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const state = document.getElementById("state").value;
  let tmp = {
    ID: id,
    userId: userId,
    firstName: fname,
    lastName: lname,
    phoneNumber: ph,
    email: email,
    address: add,
    city: city,
    zip: zip,
    state: state,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/UpdateContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // let jsonObject = JSON.parse(xhr.responseText);
        Swal.fire({
          title: "Contact Updated",
        });
        immediateLoad();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
}

function createBox() {
  Swal.fire({
    title: "Create Contact",
    html:
      '<input id="userId" type="hidden">' +
      '<input id="firstName" class="swal2-input" placeholder="First">' +
      '<input id="lastName" class="swal2-input" placeholder="Last">' +
      '<input id="phoneNumber" class="swal2-input" placeholder="Phone Number">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<input id="address" class="swal2-input" placeholder="Address">' +
      '<input id="city" class="swal2-input" placeholder="City">' +
      '<input id="zip" class="swal2-input" placeholder="Zip-Code">' +
      '<input id="state" class="swal2-input" placeholder="State(Abbreviation)">',
    focusConfirm: false,
    showCloseButton: true,
    showCancelButton: true,
    preConfirm: () => {
      createContact();
    },
  });
}

function createContact() {
  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const ph = document.getElementById("phoneNumber").value;
  const email = document.getElementById("email").value;
  const add = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const zip = document.getElementById("zip").value;
  const state = document.getElementById("state").value;
  let tmp = {
    userId: userId,
    firstName: fname,
    lastName: lname,
    phoneNumber: ph,
    email: email,
    address: add,
    city: city,
    zip: zip,
    state: state,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/AddContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // let jsonObject = JSON.parse(xhr.responseText);
        Swal.fire({
          title: "Contact Created",
        });
        immediateLoad();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
}
