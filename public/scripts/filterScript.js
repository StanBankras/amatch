console.log('gekoppelt');
let inputField = document.querySelector('#textinput');

//Alle button namen in een arary
//Loop er overheen en laad de juiste button

//bron: https://repl.it/@timmy_i_chen/EnchantingSilverTerabyte
function queryChanger(autofillText) {
    inputField.value = autofillText;
  }

const autofiller = ['Lezen', 'Muziek', 'Outdoor', 'Koken', 'Dansen', 'Sport', 'Gamen', 'Fotografie', 'Huisdieren', 'DIY', 'Instagram', 'Films', 'Development', 'Festivals'];

autofiller.forEach(autofillText => document
    .getElementById(autofillText)
    .addEventListener('click', () => queryChanger(autofillText))
);