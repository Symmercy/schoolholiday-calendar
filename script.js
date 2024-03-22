document.addEventListener('DOMContentLoaded', function () {
  // Mapping of Croatian month names to their numeric values
  var croatianMonths = {
    'Siječnja': 0,
    'Veljače': 1,
    'Ožujka': 2,
    'Travnja': 3,
    'Svibnja': 4,
    'Lipnja': 5,
    'Srpnja': 6,
    'Kolovoza': 7,
    'Rujna': 8,
    'Listopada': 9,
    'Studenog': 10,
    'Prosinca': 11
  };

  // Array of school holiday dates (format: 'Day Month Year' in Croatian)
  var holidayDates = [
    { start: '19. Veljače 2024', end: '23. Veljače 2024' },
    { start: '28. Ožujka 2024', end: '5. Travnja 2024' }
  ];

  var countdownContainer = document.getElementById('countdown-container');
  var header = document.createElement('h1');
  header.textContent = '2023/2024 Školska godina Countdown Timer';
  countdownContainer.appendChild(header);

  var themeSwitcher = document.getElementById('theme-switcher');
  var themeStyle = document.getElementById('theme-style');

  themeSwitcher.addEventListener('click', function () {
    if (themeStyle.getAttribute('href') === 'styles.css') {
      themeStyle.setAttribute('href', 'dark-theme.css');
    } else {
      themeStyle.setAttribute('href', 'styles.css');
    }
  });

  function updateCountdowns() {
    // Clear the existing content in the container
    countdownContainer.innerHTML = '';

    // Function to convert Croatian date string to a JavaScript Date object
    function convertCroatianDate(dateString) {
      var parts = dateString.split(' ');
      var day = parseInt(parts[0], 10);
      var month = croatianMonths[parts[1]];
      var year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }

    // Function to calculate time remaining
    function calculateTimeRemaining(startDate, endDate) {
    var timeRemaining;
    if (startDate.getTime() < endDate.getTime()) {
      
        // Calculate time remaining until the end of the holidays
        timeRemaining = endDate.getTime() - startDate.getTime();
    } else {
        // Calculate time remaining until the end of the holidays in the next year
        endDate.setFullYear(endDate.getFullYear() + 1);
        timeRemaining = endDate.getTime() - startDate.getTime();
    }
    
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
        countdownElement.innerHTML = 'Uživajte u praznicima!';
      } else {
        var startDate = convertCroatianDate(date.start);
        var endDate = convertCroatianDate(date.end);

        countdownElement.innerHTML = '<strong>' + date.start + ' do ' + date.end + '</strong>: ' +
          'Od ' + startDate.toLocaleDateString('hr-HR') + ' do ' + endDate.toLocaleDateString('hr-HR') +
          ', ' + timeRemaining.days + 'd ' + timeRemaining.hours + 'h ' + timeRemaining.minutes + 'm ' + timeRemaining.seconds + 's';
      }

      countdownContainer.appendChild(countdownElement);
    }

    // Sort holidayDates array based on the start date (ascending order)
    holidayDates.sort(function (a, b) {
      return convertCroatianDate(a.start) - convertCroatianDate(b.start);
    });

    // Update countdowns for school holidays
    holidayDates.forEach(function (date) {
      var startDate = convertCroatianDate(date.start);
      var endDate = convertCroatianDate(date.end);
      var timeRemaining = calculateTimeRemaining(new Date(), startDate); // Changed to calculate until the beginning of holidays
      createCountdownElement(date, timeRemaining);
    });
  }

  // Update the countdowns every second
  setInterval(updateCountdowns, 1000);

  // Initial countdown update
  updateCountdowns();
});
