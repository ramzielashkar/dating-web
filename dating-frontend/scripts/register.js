const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const alreadyUser = document.querySelector('.already-user');
const genderInput = document.getElementById('select-gender');
const interestInput = document.getElementById('select-interest');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const loginEmailInput = document.getElementById('login-email');
const loginPassInput = document.getElementById('login-password');
const signupBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');
const signupError = document.getElementById('signup-error');
const loginError = document.getElementById('login-error');


const addUser = (formData) => {
  console.log(formData.getAll('name'));
};


// Event Listeners
alreadyUser.addEventListener('click', () => {
signupForm.classList.add('hidden');
loginForm.classList.remove('hidden');
});

signupBtn.addEventListener("click", () => {
  signupError.innerHTML="";
  const gender = genderInput.options[genderInput.selectedIndex].text;
  const interest = interestInput.options[interestInput.selectedIndex].text;
  const name = nameInput.value;
  const email = emailInput.value;
  const location = locationInput.value;
  const password = passInput.value;
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(emailFormat)){
    signupError.innerHTML+="<p>Invalid Email</p>";
    signupError.classList.remove('hidden');
  }
  const passwordFormat =  /^[A-Za-z]\w{7,14}$/;
  if(!password.match(passwordFormat)){
    signupError.innerHTML+="<p>Invalid Password</p>";
  }

  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('location', location);
  formData.append('interest', interest);
  formData.append('gender', gender);
  addUser(formData);
});

loginBtn.addEventListener("click", () => {
  const email = loginEmailInput.value;
  const password = loginPassInput.value;
});
