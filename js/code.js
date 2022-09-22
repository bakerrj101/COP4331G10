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

// function immediateLoad() {
//   let table = "";
//   let tmp = { userId: userId };
//   let jsonPayload = JSON.stringify(tmp);

//   let currentUser = firstName + " " + lastName;
//   document.getElementById(
//     "welcome"
//   ).innerHTML = `Welcome back, ${currentUser}!`;

//   let url = urlBase + "/SearchContacts." + extension;

//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//   try {
//     xhr.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         let jsonObject = JSON.parse(xhr.responseText);
//         console.log(jsonObject);
//         try {
//           for (let i = 0; i < jsonObject.results.length; i++) {
//             table += `<tr id = ${jsonObject.results[i].id}>`;
//             // table += "<td>" + jsonObject.results[i].id + "</td>";
//             table += "<td>" + jsonObject.results[i].firstName + "</td>";
//             table += "<td>" + jsonObject.results[i].lastName + "</td>";
//             table += "<td>" + jsonObject.results[i].phoneNumber + "</td>";
//             table += "<td>" + jsonObject.results[i].email + "</td>";
//             table += "<td>" + jsonObject.results[i].address + "</td>";
//             table += "<td>" + jsonObject.results[i].city + "</td>";
//             table += "<td>" + jsonObject.results[i].state + "</td>";
//             table += "<td>" + jsonObject.results[i].zip + "</td>";
//             table +=
//               '<td><button type="button" class="btn btn-outline-secondary" onclick="editBox(' +
//               jsonObject.results[i].id +
//               ')">Edit</button>';
//             table +=
//               '<button type="button" class="btn btn-outline-danger" onclick="deleteContact(' +
//               jsonObject.results[i].id +
//               ')">Del</button></td>';
//             table += "</tr>";
//           }
//           document.getElementById("mytable").innerHTML = table;
//         } catch (err) {
//           document.getElementById(
//             "mytable"
//           ).innerHTML = `<tr><td colspan="9" align="center">Add some contacts using 'Create'</td></tr>`;
//         }
//       }
//     };
//     xhr.send(jsonPayload);
//   } catch (err) {
//     document.getElementById("mytable").innerHTML = err.message;
//   }
// }

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
      '<input id="firstName" class="swal2-input" placeholder="First" value="' +
      thetable[0].innerHTML +
      '">' +
      '<input id="lastName" class="swal2-input" placeholder="Last" value="' +
      thetable[1].innerHTML +
      '">' +
      '<input id="phoneNumber" class="swal2-input" placeholder="PhoneNumber" value="' +
      thetable[2].innerHTML +
      '">' +
      '<input id="email" class="swal2-input" placeholder="Email" value="' +
      thetable[3].innerHTML +
      '">' +
      '<input id="address" class="swal2-input" placeholder="Address" value="' +
      thetable[4].innerHTML +
      '">' +
      '<input id="city" class="swal2-input" placeholder="City" value="' +
      thetable[5].innerHTML +
      '">' +
      '<input id="state" class="swal2-input" placeholder="State(Abbreviation)" value="' +
      thetable[6].innerHTML +
      '">' +
      '<input id="zip" class="swal2-input" placeholder="Zip" value="' +
      thetable[7].innerHTML +
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
      '<input id="firstName" class="swal2-input" placeholder="First" required>' +
      '<input id="lastName" class="swal2-input" placeholder="Last" required>' +
      '<input id="phoneNumber" class="swal2-input" placeholder="Phone Number" required>' +
      '<input id="email" class="swal2-input" placeholder="Email" required>' +
      '<input id="address" class="swal2-input" placeholder="Address">' +
      '<input id="city" class="swal2-input" placeholder="City">' +
      '<input id="state" class="swal2-input" placeholder="State(Abbreviation)">' +
      '<input id="zip" class="swal2-input" placeholder="Zip-Code">',
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
        searchContact(1);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("sad");
  }
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
        Swal.fire({
          title: "Contact Deleted",
        });
        searchContact();
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
  let table = "";
  let srch = document.getElementById("searchText").value;

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
          if (jsonObject.error == "No Records Found") {
            table += `<tr>`;
            table += "<td align=center colspan=9> No Records Found" + "</td>";
            table += "</tr>";
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
                '<button type="button" class="btn btn-outline-danger" onclick="deleteContact(' +
                jsonObject.results[i].id +
                ')">Del</button></td>';
              table += "</tr>";
            }
          }
          document.getElementById("mytable").innerHTML = table;
        } catch (err) {
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
