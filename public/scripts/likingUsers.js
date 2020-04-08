const likeHearts = document.querySelectorAll('.hearts button');

likeHearts.forEach((heart) => {
  heart.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.match;
    // Used axios to send data from clientside to backend, as it's very lightweight and cleaner/easier in use than Fetch API
    return axios.post('/like', {
      id: id,
      js: true
    })
    .then((res) => {
      if (res.request.status == 201) {
        e.target.classList.remove('active');
      } else if (res.data.match == true) {
        e.target.classList.add('active');
        renderMatch(res.data.otherUser, res.data.chat);
      } else {
        e.target.classList.add('active');
      }
    })
    .catch(err => console.error(err));
  });
});

function renderMatch(otherUser, chat) {
  const matchContainer = document.createElement('SECTION');
  matchContainer.setAttribute('id', 'match');
  matchContainer.innerHTML = `
    <h1>It's a match!</h1>
    <div class="wrapper">
      <img src="${ otherUser.profilePicture }">
      <div>
        <p class="name">${ otherUser.firstName } ${ otherUser.lastName }</p>
        <p class="age">${ otherUser.age } years old</p>
      </div>
    </div>
    <a href="/chat/${ chat }">Go to the chat</a>
  `
  main.appendChild(matchContainer);
}