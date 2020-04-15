// Only show Deezer Artist ID select input if 'Music' is chosen as hobby.
const deezerForm = document.querySelector('div#deezerArtistId');

function showDeezer() {
    document.querySelector('#selectHobbies').addEventListener('change', function (e) {
        if (e.target.value === '5e8f0b1b34c66624801e0bb4') {
            deezerForm.style.visibility = 'visible';
        } else {
            deezerForm.style.visibility = 'hidden';
        }
    })
}

showDeezer();

// Check if confirmed password equals password
const password = document.querySelector('#password');
const cPassword = document.querySelector('#confirmPassword');

function validatePassword() {
    if (password.value == cPassword.value) {
        cPassword.style.borderColor = 'green';
        confirmPassword.setCustomValidity('');
    } else {
        cPassword.style.borderColor = '';
        confirmPassword.setCustomValidity('Passwords don\'t match');
    }
}

password.onchange = validatePassword;
cPassword.onkeyup = validatePassword;