document.addEventListener('DOMContentLoaded', function () {
  // Array of school holiday dates (format: 'Month Day, Year')
  var holidayDates = [
    { start: 'February 10, 2024', end: 'February 15, 2024' },
    { start: 'April 1, 2024', end: 'April 7, 2024' },
    { start: 'June 15, 2024', end: 'June 20, 2024' },
    { start: 'December 25, 2024', end: 'December 31, 2024' }
  ];

  var additionalDateRange = { start: 'January 2, 2024', end: 'January 7, 2024' };

  var countdownContainer = document.getElementById('countdown-container');

  function updateCountdowns() {
    // Clear the existing content in the container
    countdownContainer.innerHTML = '';

    // Function to calculate time remaining
    function calculateTimeRemaining(startDate, endDate) {
      var timeRemaining = endDate - startDate;
      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }

    // Function to create countdown element
    function createCountdownElement(date, timeRemaining) {
      var countdownElement = document.createElement('div');
      countdownElement.classList.add('countdown-item');

      if (timeRemaining <= 0) {
        countdownElement.innerHTML = 'Enjoy the holiday!';
      } else {
        var startDate = new Date(date.start);
        var endDate = new Date(date.end);

        countdownElement.innerHTML = '<strong>' + date.start + ' to ' + date.end + '</strong>: ' +
          'From ' + startDate.toLocaleDateString() + ' to ' + endDate.toLocaleDateString() +
          ', ' + timeRemaining.days + 'd ' + timeRemaining.hours + 'h ' + timeRemaining.minutes + 'm ' + timeRemaining.seconds + 's';
      }

      countdownContainer.appendChild(countdownElement);
    }

    // Update countdowns for school holidays
    holidayDates.forEach(function (date) {
      var startDate = new Date(date.start);
      var endDate = new Date(date.end);
      var timeRemaining = calculateTimeRemaining(new Date(), endDate);
      createCountdownElement(date, timeRemaining);
    });

    // Update countdown for additional date range
    var additionalStartDate = new Date(additionalDateRange.start);
    var additionalEndDate = new Date(additionalDateRange.end);
    var additionalTimeRemaining = calculateTimeRemaining(new Date(), additionalEndDate);
    createCountdownElement(additionalDateRange, additionalTimeRemaining);
  }

  // Update the countdowns every second
  setInterval(updateCountdowns, 1000);

  // Initial countdown update
  updateCountdowns();
});

