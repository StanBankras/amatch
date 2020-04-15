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

// Clears the select options
function clearSelect() {
    var select = document.querySelector('select#deezerArtistId');
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        select.options[i] = null;
    }
}
// Source: https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box

// Filters if the age 24 is in the ages of the artists, if yes, count the length (3) and fill options with artists that are 24 years old.
function checkAge() {
    document.querySelector('#age').addEventListener('change', function (e) {
        function isBigEnough(value) {
            return value == e.target.value;
        }
        const filtered = [24, 39, 54, 29, 33, 28, 24, 27, 24].filter(isBigEnough);

        console.log(filtered)

        let artists1 = ['Dua Lipa', 'Post Malon', 'Snelle', 'Justin Bieber'];

        let artistsIDs = [8706544, 7543848, 7990708];

        var sel = document.querySelector('select#deezerArtistId');
        if (filtered.includes(24))
            for (var i = 0; i < filtered.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = artists1[i];
                opt.value = artistsIDs[i];
                sel.appendChild(opt);
            } else {
                clearSelect();
                console.log('Je bent niet oud genoeg!');
        }
    })
}

checkAge();

// Source: https://stackoverflow.com/questions/11255219/use-a-javascript-array-to-fill-up-a-drop-down-select-box/11255259