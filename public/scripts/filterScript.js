let inputField = document.querySelector('#textinput');
const filterButtons = document.querySelector('#filterButtonContainer');

filterButtons.addEventListener('click', (e) => {
  if (e.target.tagName != 'BUTTON') return;
  inputField.value = e.target.textContent;
});