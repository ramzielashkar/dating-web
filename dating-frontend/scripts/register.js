const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const alreadyUser = document.querySelector('.already-user');
const genderInput = document.getElementById('select-gender');
const interestInput = document.getElementById('select-interest');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const locationInput = document.getElementById('location');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const loginEmailInput = document.getElementById('login-email');
const loginPassInput = document.getElementById('login-password');
const signupBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');
const signupError = document.getElementById('signup-error');
const loginError = document.getElementById('login-error');
const baseUrl = "http://127.0.0.1:8000/api";


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    console.log('error');
  }
}

function showPosition(position) {
  console.log("latitude ",position.coords.latitude);
  console.log("Longitude ",position.coords.longitude);
}
getLocation();
// function to post to an API
const postAPI = async (api_url, api_data, errorfield, api_token = null, ) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                    'Authorization' : api_token
                }
            }
        );
    }catch(error){
      if(errorfield.id == "signup-error"){
      errorfield.innerHTML="<p>Email already exists</p>";
      errorfield.classList.remove('hidden');
    }else if(errorfield.id == "login-error"){
      console.log(errorfield);
      errorfield.innerHTML="<p>Invalid login</p>";
      errorfield.classList.remove('hidden');
    }
    }
}

const addUser = async (formData) => {
  const registerUrl = `${baseUrl}/register`;
  const response = await postAPI(registerUrl, formData, signupError).then((result) => {
    console.log(result.data.data);
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user_id', result.data.data.id);
    location.replace("home.html");
    });
};

// function to login
const validateLogin = async (formData) => {
  const loginUrl = `${baseUrl}/login`;
  const response = await postAPI(loginUrl, formData, loginError).then((result) => {
    console.log(result);
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user_id', result.data.user[0].id);
    location.replace("home.html");
  });
};


// Event Listeners
alreadyUser.addEventListener('click', () => {
signupForm.classList.add('hidden');
loginForm.classList.remove('hidden');
});

signupBtn.addEventListener("click", () => {
  signupError.innerHTML="";
  let gender = genderInput.options[genderInput.selectedIndex].text;
  let interest = interestInput.options[interestInput.selectedIndex].text;
  let name = nameInput.value;
  let age = ageInput.value;
  let email = emailInput.value;
  let location = locationInput.value;
  let password = passInput.value;
  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.match(emailFormat)){
    signupError.innerHTML+="<p>Invalid Email</p>";
    signupError.classList.remove('hidden');
  }
  const passwordFormat =  /^[A-Za-z]\w{7,14}$/;
  if(!password.match(passwordFormat)){
    signupError.innerHTML+="<p>Invalid Password</p>";
  }

  if(interest == "Male"){
    interest = 1;
  }else if(interest == "Female"){
    interest =  2;
  }else{
    interest = 3;
  }
  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('location', location);
  formData.append('age', age);
  formData.append('interest_id', interest);
  formData.append('gender', gender);
  addUser(formData);
});

loginBtn.addEventListener("click", () => {
  const email = loginEmailInput.value;
  const password = loginPassInput.value;
  let formData = new FormData();
  formData.append('password', password);
  formData.append('email', email);
  validateLogin(formData);
});
