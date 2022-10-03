const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const alreadyUser = document.querySelector('.already-user');




// Event Listeners
alreadyUser.addEventListener('click', () => {
signupForm.classList.add('hidden');
loginForm.classList.remove('hidden');
});
