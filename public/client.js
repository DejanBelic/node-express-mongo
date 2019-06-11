console.log('Client side running.');
const button = document.getElementById('myButton');
button.addEventListener('click', function (event) {
  console.log('button was clicked')

  fetch('/clicked', {
    method:"POST"
  })
    .then(response => {
      if (response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error)
    })
});