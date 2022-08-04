const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#user_password_confirm");
const meter = document.querySelector("#password-strength-meter");
const text = document.getElementById('password-strength-text');

const text2 = document.querySelector("#password-match-text");


const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


var strength = {
    0: "",
    1: "Very Weak",
    2: "So-so",
    3: "Good",
    4: "Great"
}


function validate(password) {
    let sum = 0;

    var oneDigit = new RegExp(
        "(?=.*[0-9])"
    );
    var specialChar = new RegExp(
        "(?=.*[@#$%^&+=])"
    );
    var upperCase = new RegExp(
        "(?=.*[A-Z])"
    );
    var lowerCase = new RegExp(
        "(?=.*[a-z])"
    );

    if (oneDigit.test(password)) {
        sum += 1;
    }
    if (specialChar.test(password)) {
        sum += 1;
    }
    if (upperCase.test(password)) {
        sum += 1;
    }
    if (lowerCase.test(password)) {
        sum += 1;
    }
    if (password.length > 8) {
        sum += 1;
    }
    return sum;
}


var returnedFunction2 = debounce(function pass() {
    var val = password.value;
    var result = validate(val);

    // Update the password strength meter
    meter.value = result;

    // Update the text indicator
    if (val !== "") {
        text.innerHTML = strength[result];
    } else {
        text.innerHTML = "";
    }
}, 300);

password.addEventListener('input', returnedFunction2);



var returnedFunction = debounce(function () {
    var val1 = password.value;
    var val2 = passwordConfirm.value;


    if (val1.length == 0 || val2.length == 0) {
        text2.innerHTML = "";
        passwordConfirm.setCustomValidity("");
    } else if (val1 == val2) {
        text2.innerHTML = "";
        passwordConfirm.setCustomValidity("");
    } else {
        passwordConfirm.setCustomValidity("Passwords Don't Match");
        text2.innerHTML = "Password not a match!";
    }
}, 300);


passwordConfirm.addEventListener('input', returnedFunction);



const togglePassword = document.querySelector('#togglePassword');

togglePassword.addEventListener('click', function () {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});