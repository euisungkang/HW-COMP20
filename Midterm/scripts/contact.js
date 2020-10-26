// Input Validation
validateForm = () => {
  const email = document.getElementById("email");
  const emailValue = document.forms["contact"]["email"].value
  const subject = document.forms["contact"]["subject"].value
  const body = document.forms["contact"]["body"].value
  console.log(email);
  console.log(subject);
  console.log(body);

  email.addEventListener("input", (event) => {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("Please enter a valid email address");
    } else {
      email.setCustomValidity("");
    }
  })
  if (subject == null || subject == "", body == null || body == "", 
      emailValue == null || emailValue == "") {
    alert("Please Fill All Fields");
    return false;
  }
}
