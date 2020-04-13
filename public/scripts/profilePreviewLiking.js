const likeButton = document.querySelector('#like-button');
const main = document.querySelector('main');

likeButton.addEventListener('click', (e) => {
  e.preventDefault();
  const id = e.target.parentNode.firstChild.nextSibling.value;
  // Used axios to send data from clientside to backend, as it's very lightweight and cleaner/easier in use than Fetch API
  return axios.post('/like', {
    id: id,
    js: true
  })
  .then((res) => {
    if (res.request.status == 201) {
      e.target.textContent = 'Like this user';
    } else if (res.data.match == true) {
      e.target.textContent = 'Dislike this user';
      renderMatch(res.data.otherUser, res.data.chat);
    } else {
      e.target.textContent = 'Dislike this user';
    }
  })
  .catch(err => console.error(err));
})

function renderMatch(otherUser, chat) {
  const matchContainer = document.createElement('SECTION');
  matchContainer.setAttribute('id', 'match');
  matchContainer.innerHTML = `
    <h1>It's a match!</h1>
    <div class="wrapper">
      <img src="/uploads/profile-pictures/${ otherUser._id }">
      <div>
        <p class="name">${ otherUser.firstName } ${ otherUser.lastName }</p>
        <p class="age">${ otherUser.age } years old</p>
      </div>
    </div>
    <div class="wrapper">
      <a class="chat" href="/chat/${ chat }">Go to the chat</a>
      <a class="close">Close popup</a>
    </div>
  `
  main.appendChild(matchContainer);
  matchContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
      main.removeChild(matchContainer);
    }
  })
}