function toggle() {
  document.querySelector(".forms").classList.toggle("show-signup");
}

function doLogin() {
  location.href = "main.html";
}

function doRegister() {
  let create = document.getElementById("createpass").value;
  let confirm = document.getElementById("confirmpass").value;
  if (create != confirm)
    document.getElementById("loginResult").innerHTML =
      "Passwords do not match!";
}
