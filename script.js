const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

let isAnyError = 0;

// Show input error message
function displayError(input, message) {
  isAnyError += 1;
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    displayError(input, 'Email is not valid');
  }
}

// Check email is valid
function checkPhone(input) {
  const re = /^\d{10}$/;
  if(parseInt(input.value) === 1234567890) {
    displayError(input, 'Phone number is too common');
  }
  else if (input.value.length === 10 && (re.test(parseInt(input.value)))) {
    showSuccess(input)
  } else{
    displayError(input, 'Phone number is not valid');
  }
}

// Check input length
function checkLength(input, min) {
  if (input.value.length < min) {
    displayError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check input length
function checkPassword(input) {
  if(input.value === username.value){
    displayError(input,'Password cannot be same as full name')
  }
  else if(input.value.toLowerCase() === 'password'){
    displayError(input,'Password is not strong');
  }
  else if (input.value.length < 8) {
    displayError(
      input,
      `${getFieldName(input)} must be at least 8 characters`
    );
  }
  else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if(!input1.value){
    displayError(input2, 'Please enter password above');
  }
  else if (input1.value !== input2.value) {
    displayError(input2, 'Passwords do not match');
  }
  else{
    showSuccess(input2);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
    checkLength(username, 5);
    checkEmail(email);
    checkPhone(phone);
    checkPassword(password);
    checkPasswordsMatch(password, confirmPassword);
  
  if(isAnyError === 0){
    const successRedirect = 'welcome.html?name=' + encodeURIComponent(username.value);
    window.location.href = successRedirect;
  }
  isAnyError = 0
});
