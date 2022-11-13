
//getting DOM object 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show succes outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//check required fields

function checkRequired(inputArr) {

    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            console.log(input.id);
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });

}

//get fieldName
function getFieldName(input) {
    /*we are taking the first letter and make it upper case then adding that to
    rest of the character by using slice method*/
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check password match

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match!');
    }
}

//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Event listeners
form.addEventListener('submit', function (e) {

    //here we are preventing the default function of our website
    //for example for Submit button, it wont be submitting anything anymore
    e.preventDefault();

    checkRequired([username, email, password, password2]);

    //(input, mininium length required, maxium length can be accept)
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(password2, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

    // ==> this was the old way I tired, which is pretty messy and hard to debug
    // if (username.value === '') {
    //     showError(username, 'Username is required');
    // } else {
    //     showSuccess(username);
    // }

    // if (email.value === '') {
    //     showError(email, 'Email is required');
    // } else if (!isValidEmail(email.value)) {
    //     showError(email, 'Email is not valid!');
    // }
    // else {
    //     showSuccess(email);
    // }

    // if (password.value === '') {
    //     showError(password, 'password is required');
    // } else {
    //     showSuccess(password);
    // }

    // if (password2.value === '') {
    //     showError(password2, 'confirm password is required');
    // } else {
    //     showSuccess(password2);
    // }
});