const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const nameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('Password');
const confirmPasswordInput = document.getElementById('Confirm_password');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const additionalFields = document.getElementById('additionalFields');
const signUpForm = document.getElementById('signUpForm');
const main_fields = document.getElementById('main_fields');
const Social = document.getElementById('Social');
const texttt = document.getElementById('texttt');
const createe = document.getElementById('createe');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

nextBtn.addEventListener('click', (event) => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let isValid = true;
    if (name === '') {
        isValid = false;
        nameError.style.display = 'block';
    }
    else{
        nameError.style.display = 'none';
    }

    if (email === '') {
        isValid = false;
        emailError.style.display = 'block';
        } else if (!validateEmail(email)) {
        isValid = false;
        emailError.style.display = 'block';
    }
    else{
        emailError.style.display = 'none';

    }

    if (password === '') {
        isValid = false;
        passwordError.style.display = 'block';
    } else if (!isValidPassword(password)) {
        isValid = false;
        passwordError.style.display = 'block';
    }
    else{
        passwordError.style.display = 'none';
    }
    if (confirmPassword === '') {
        isValid = false;
        confirmPasswordError.style.display = 'block';
    } else if (password !== confirmPassword) {
        isValid = false;
        confirmPasswordError.style.display = 'block';
    }
else{
    confirmPasswordError.style.display = 'none';

}
    if (isValid) {
        additionalFields.style.display = 'contents';
        nextBtn.style.display = 'none';
        main_fields.style.display = 'none';
        Social.style.display = 'none';
        texttt.style.display = 'none';
        createe.style.marginBottom = '34px';
    } else {
        event.preventDefault();
    }
});

prevBtn.addEventListener('click', () => {
    additionalFields.style.display = 'none';
    nextBtn.style.display = 'block';
    main_fields.style.display = 'contents';
    Social.style.display = 'block';
    texttt.style.display = 'block';
    createe.style.marginBottom = '0px';
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}