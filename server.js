console.log('Server side code running.');
const express = require('express');

const app = express();

// Serve files from public directory.
app.use(express.static('public'));

app.listen(8080, () => {
  console.log('listening on 8080')
});

// Serve the home page.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})