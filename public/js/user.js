const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const passwordInput = document.getElementById('password');
 const ConfirmPasswordInput = document.getElementById('Confirm_password');
const errorMessage = document.getElementById('error_message');
 registerBtn.addEventListener('click', () => {
     container.classList.add("active");
     
 });

 loginBtn.addEventListener('click', () => {
     container.classList.remove("active");
 });

function ssss() {
  var a = document.forms["shady"]["username"].value;
  var b = document.forms["shady"]["email"].value;
  var c = document.forms["shady"]["password"].value;
  var d = document.forms["shady"]["confirm_password"].value;

 

  if (c!==d) {
    alert("Passwords do not match");
    return false;
  }

  // Additional validation or form submission logic can be added here

  return true;
}
