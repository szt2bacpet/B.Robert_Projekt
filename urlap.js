const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const birthdate = document.getElementById('birthdate');

const acceptedPassword = 'jelszo'; // Előre megadott rettentően kreatív jelszó

// Hibaüzenetek megjelenítése
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

}

// Sikeres kitöltés jelzése
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Felhasználónév formátum ellenőrzése
function checkUsername(input) {
    const re = /^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/;
    if (re.test(input.value.trim())) {
        showSucces(input);
    } else {
        showError(input, 'A felhasználónevet helytelenül adta meg.');
    }
}

// Email formátum ellenőrzése
function checkEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input.value.trim())) {
        showSucces(input);
    } else {
        showError(input, 'Az email cím érvénytelen');
    }
}

// Születési dátum formátum ellenőrzése
function checkBirthdate(input) {
    const re = /^(19[0-9]{2}|20[0-2]{2}|2023)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if (re.test(input.value.trim())) {
        showSucces(input);
    } else {
        showError(input, 'Érvénytelen születési dátum. (ÉÉÉÉ-HH-NN)');
    }
}

// Kitöltési kötelezettség ellenőrzése
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} kitöltése kötelező`);
        } else {
            showSucces(input);
        }
    });
}

// Bemeneti mező hosszának ellenőrzése
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} legalább ${min} karakter hosszú kell legyen`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} legfeljebb ${max} karakter hosszú lehet`
        );
    } else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input
        .id
        .charAt(0)
        .toUpperCase() + input
        .id
        .slice(1);
}

//Eseményfigyelők
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password]);
    checkEmail(email);
    checkBirthdate(birthdate);

    if (password.value === acceptedPassword) {
        showSucces(password);
    } else {
        showError(password, 'Invalid password');
    }
    checkUsername(username);
    if (!username.parentElement.classList.contains('error') && !email.parentElement.classList.contains('error') && !password.parentElement.classList.contains('error') && !birthdate.parentElement.classList.contains('error')) {
        window.location.href = 'urlap.html';
    }
});