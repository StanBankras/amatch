const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('test');
})

app.listen(port, () => console.log(`Server is running succesfully on port ${ port }`));