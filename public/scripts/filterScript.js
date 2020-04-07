console.log('gekoppelt');
let inputField = document.querySelector('#textinput');
let filter1 = document.querySelector('#filter1');
let filter2 = document.querySelector('#filter2');

function autoFill(){
    inputField.value = filter1.textContent;
    console.log('filled');
}

function autoFill2(){
    inputField.value = filter2.textContent;
    console.log('filled');
}

filter1.addEventListener('click', autoFill);
filter2.addEventListener('click', autoFill2);