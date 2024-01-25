document.addEventListener('DOMContentLoaded', function () {
  // Array of school holiday dates (format: 'Month Day, Year')
  var holidayDates = [
    'February 10, 2024',
    'April 1, 2024',
    'June 15, 2024',
    'December 25, 2024'
  ];

  var countdownElement = document.getElementById('countdown');

  function updateCountdown() {
    var currentDate = new Date().getTime();
    var nextHolidayDate = new Date(findNextHoliday()).getTime();
    var timeRemaining = nextHolidayDate - currentDate;

    if (timeRemaining <= 0) {
      countdownElement.innerHTML = 'Enjoy the holiday!';
    } else {
      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      countdownElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
  }

  function findNextHoliday() {
    var currentDate = new Date().getTime();
    var sortedHolidays = holidayDates.map(function (date) {
      return new Date(date).getTime();
    }).sort(function (a, b) {
      return a - b;
    });

    for (var i = 0; i < sortedHolidays.length; i++) {
      if (sortedHolidays[i] > currentDate) {
        return new Date(sortedHolidays[i]);
      }
    }

    // If no future holidays are found, return the first holiday in the list
    return new Date(sortedHolidays[0]);
  }

  // Update the countdown every second
  var countdownInterval = setInterval(updateCountdown, 1000);

  // Initial countdown update
  updateCountdown();
});

