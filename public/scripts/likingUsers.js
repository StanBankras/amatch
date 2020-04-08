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
            console.log(res);
            if (res.request.status == 201) {
                e.target.classList.remove('active');
            } else if (res.data.match == true) {
                e.target.classList.add('active');
                console.log('its a match');
            } else {
                e.target.classList.add('active');
            }
        })
        .catch(err => console.error(err));
    });
});