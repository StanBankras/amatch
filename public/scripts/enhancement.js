const main = document.querySelector('#content');
const section = document.createElement('section');
section.setAttribute('id', 'viewed-matches')
section.innerHTML = `
  <div>
    <h2>Viewed matches</h2>
    <ul>
    </ul>
  </div>
`;

main.appendChild(section);