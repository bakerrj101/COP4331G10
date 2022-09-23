const urlBase = "http://G10CONTACTMANAGER.LIVE/LAMPAPI";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";
let table = "";

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
  console.log("started");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        userId = jsonObject.id;
        if (jsonObject.error === "No Records Found") {
          document.getElementById("loginName").classList.add("err");
          document.getElementById("loginPassword").classList.add("err");
          document.getElementById("lErr").innerHTML =
            "*User/Password Combination Incorrect*";
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
  // get data from user
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  let login = document.getElementById("login").value;
  let password = document.getElementById("createpass").value;
  let confirmPassword = document.getElementById("confirmpass").value;

  document.getElementById("registerResult").innerHTML = "";

  let validFirstName = check("firstName", "cFirstName");
  let validLastName = check("lastName", "cLastName");
  let validLogin = check("login", "cLogin");
  let validPass = check("createpass", "cPass");
  let validConfirmPass = check("confirmpass", "cConfirm");

  if (
    !validFirstName ||
    !validLastName ||
    !validLogin ||
    !validPass ||
    !validConfirmPass
  ) {
    if (password != confirmPassword) {
      document.getElementById("createpass").classList.add("err");
      document.getElementById("confirmpass").classList.add("err");
      document.getElementById("cConfirm").innerHTML =
        "*Passwords do not match*";
    } else if (password == confirmPassword && validPass) {
      document.getElementById("createpass").classList.remove("err");
      document.getElementById("confirmpass").classList.remove("err");
      document.getElementById("cConfirm").innerHTML = "";
    }
    return;
  }

  // make data into a json
  let tmp = {
    firstName: firstName,
    lastName: lastName,
    login: login,
    password: password,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/register." + extension;

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

        if (jsonObject.error == "username already exists") {
          document.getElementById("login").classList.add("err");
          document.getElementById("cLogin").innerHTML =
            "*Username not avaliable*";
          return;
        } else {
          document.getElementById("firstName").classList.remove("err");
          document.getElementById("cFirstName").innerHTML = "";
        }

        saveCookie();

        location.href = "main.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("registerResult").innerHTML = err.message;
  }
}

function check(fieldId, eFieldId) {
  var valid = true,
    error = "",
    field = "";

  field = document.getElementById(fieldId);
  error = document.getElementById(eFieldId);

  if (!field.checkValidity()) {
    valid = false;
    field.classList.add("err");
    error.innerHTML = "*Must contain at least 1 character*";
  } else {
    field.classList.remove("err");
    error.innerHTML = "";
  }
  return valid;
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
    // let currentUser = firstName+" "+lastName;
    // document.getElementById("welcome").innerHTML =
    //   `Welcome back, ${currentUser}!`;
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
      // '<input id="id" type="hidden" value=' +
      // thetable[0].innerHTML +
      // ">" +
      '<label for="firstName" class="input-description">**First Name:</label>'+
      '<input id="firstName" class="swal2-input" placeholder="First" value="' +
      thetable[0].innerHTML +
      '">' +
      '<div id="createFirst" class="emsg"></div>' +
      '<label for="lastName" class="input-description">**Last Name:</label>'+
      '<input id="lastName" class="swal2-input" placeholder="Last" value="' +
      thetable[1].innerHTML +
      '">' +
      '<div id="createLast" class="emsg"></div>' +
      '<label for="phoneNumber" class="input-description">Phone Number:</label>'+
      '<input id="phoneNumber" class="swal2-input" placeholder="PhoneNumber" value="' +
      thetable[2].innerHTML +
      '">' +
      '<label for="email" class="input-description">Email:</label>'+
      '<input id="email" class="swal2-input" placeholder="Email" value="' +
      thetable[3].innerHTML +
      '">' +
      '<label for="address" class="input-description">Address:</label>'+
      '<input id="address" class="swal2-input" placeholder="Address" value="' +
      thetable[4].innerHTML +
      '">' +
      '<label for="city" class="input-description">City:</label>'+
      '<input id="city" class="swal2-input" placeholder="City" value="' +
      thetable[5].innerHTML +
      '">' +
      '<label for="state" class="input-description">State(Abbreviation):</label>'+
      '<input id="state" class="swal2-input" placeholder="State(Abbreviation)" value="' +
      thetable[6].innerHTML +
      '">' +
      '<label for="zip" class="input-description">Zip-Code:</label>'+
      '<input id="zip" class="swal2-input" placeholder="Zip" value="' +
      thetable[7].innerHTML +
      '">'+
      '<div class="input-description">** denotes required fields</div>',
    focusConfirm: false,
    showCloseButton: true,
    showDenyButton: true,
    denyButtonText: "Cancel",
    preConfirm: () => {
      let validFName = check("firstName", "createFirst");
      let validLName = check("lastName", "createLast");
      if (validFName && validLName) {
        editContact(ID);
      } else {
        return false;
      }
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
        searchContact(1);
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
      '<label for="firstName" class="input-description">**First Name:</label>'+
      '<input id="firstName" class="swal2-input" placeholder="First" required minlength="1">' +
      '<div id="createFirst" class="emsg"></div>' +
      '<label for="lastName" class="input-description">**Last Name:</label>'+
      '<input id="lastName" class="swal2-input" placeholder="Last" required minlength="1">' +
      '<div id="createLast" class="emsg"></div>' +
      '<label for="phoneNumber" class="input-description">Phone Number:</label>'+
      '<input id="phoneNumber" class="swal2-input" placeholder="Phone Number" required>' +
      '<label for="email" class="input-description">Email:</label>'+
      '<input id="email" class="swal2-input" placeholder="Email" required>' +
      '<label for="address" class="input-description">Address:</label>'+
      '<input id="address" class="swal2-input" placeholder="Address">' +
      '<label for="city" class="input-description">City:</label>'+
      '<input id="city" class="swal2-input" placeholder="City">' +
      '<label for="state" class="input-description">State(Abbreviation):</label>'+
      '<input id="state" class="swal2-input" placeholder="State(Abbreviation)">' +
      '<label for="zip" class="input-description">Zip-Code:</label>'+
      '<input id="zip" class="swal2-input" placeholder="Zip-Code">'+
      '<div class="input-description">** denotes required fields</div>',
    focusConfirm: false,
    showCloseButton: true,
    showDenyButton: true,
    denyButtonText: "Cancel",
    preConfirm: () => {
      let validFName = check("firstName", "createFirst");
      let validLName = check("lastName", "createLast");
      if (validFName && validLName) {
        createContact();
      } else {
        return false;
      }
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
        searchContact(1);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
}

function deleteBox(id) {
  Swal.fire({
    title: "Are you sure you want to delete contact?",
    focusConfirm: false,
    showDenyButton: true,
    confirmButtonText: "Confirm",
    denyButtonText: "Cancel",
    preConfirm: () => {
      deleteContact(id);
    },
  });
}

function deleteContact(id) {
  let tmp = { userId: userId, ID: id };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/delete." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        searchContact(1);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function searchContact(page) {
  console.log("reached search");
  let srch = document.getElementById("searchText").value;
  if (page == 1) table = "";
  console.log(page);

  let tmp = { search: srch, UserID: userId, pageNumber: page };
  let jsonPayload = JSON.stringify(tmp);

  let currentUser = firstName + " " + lastName;
  document.getElementById(
    "welcome"
  ).innerHTML = `Welcome back, ${currentUser}!`;

  let url = urlBase + "/InputSearchContactsLazzyLoading." + extension;

  console.log("reached search");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        try {
          if (jsonObject.error == "No Records Found" && srch != "") {
            document.getElementById(
              "mytable"
            ).innerHTML = `<tr><td colspan="9" align="center">No Records Found</td></tr>`;

            // table += `<tr>`;
            // table += "<td align=center colspan=9> No Records Found" + "</td>";
            // table += "</tr>";
          } else {
            for (let i = 1; i < jsonObject.results.length; i++) {
              table += `<tr id = ${jsonObject.results[i].id}>`;
              // table += "<td>" + jsonObject.results[i].id + "</td>";
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
                '<button type="button" class="btn btn-outline-danger" onclick="deleteBox(' +
                jsonObject.results[i].id +
                ')">Del</button></td>';
              table += "</tr>";
            }
          }
          document.getElementById("mytable").innerHTML = table;
        } catch (err) {
          if (table == "")
            document.getElementById(
              "mytable"
            ).innerHTML = `<tr><td colspan="9" align="center">Add some contacts using 'Create'</td></tr>`;
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
}
