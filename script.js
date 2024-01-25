document.addEventListener('DOMContentLoaded', function () {
  // Set the target date for the countdown (format: 'Month Day, Year')
  var targetDate = new Date('January 1, 2025').getTime();

  var countdownElement = document.getElementById('countdown');

  // Update the countdown every second
  var countdownInterval = setInterval(function () {
    var currentDate = new Date().getTime();
    var timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = 'Happy New Year!';
    } else {
      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      countdownElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
  }, 1000);
});

