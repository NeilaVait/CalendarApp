let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
console.log(calendar);

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/////////////////////// functions

function render() {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInJanuary = new Date(year, month + 1, 0).getDate();
  const januaryFirst = new Date(year, month, 1);
  const dateString = januaryFirst.toLocaleDateString('en-lt', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const emptyDays = weekdays.indexOf(dateString.split(', ')[0]);

  for (let i = 1; i <= emptyDays + daysInJanuary; i++) {
    const daySquare = document.createElement('div');

    daySquare.classList.add('day');

    if (i > emptyDays) {
      daySquare.innerText = i - emptyDays;
      daySquare.addEventListener('click', () => console.log('click'));
    } else {
      daySquare.classList.add('empty');
    }

    calendar.appendChild(daySquare);
  }
}

render();
