let clickedDate = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const dateInput = document.getElementById('date');
const eventContainer = document.getElementById('eventContainer');
const detailsContainer = document.getElementById('eventDetails');
const title = document.getElementById('title');
const start = document.getElementById('start');
const end = document.getElementById('end');
const select = document.getElementById('select');
const desc = document.getElementById('desc');
const inputs = [title, start, end, desc];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/////////////////////// functions

function openAddEvent(date) {
  clicked = date;
  dateInput.innerText = date;

  const eventOnDay = events.find((e) => e.date === clicked);

  if (eventOnDay) {
    eventContainer.style.display = 'none';
    detailsContainer.style.display = 'block';
    openEventDetails(eventOnDay);
  } else {
    detailsContainer.style.display = 'none';
    eventContainer.style.display = 'block';
  }
}

function openEventDetails(event) {
  console.log(event);
  document.getElementById('titleDt').innerText = 'Title : ' + event.title;
  document.getElementById('startDt').innerText = 'Start : ' + event.startTime;
  document.getElementById('endDt').innerText = 'End : ' + event.endTime;
  document.getElementById('dateDt').innerText = 'Date : ' + event.date;
  document.getElementById('typeDt').innerText = 'Type : ' + event.type;
  document.getElementById('descDt').innerText = 'Description : ' + event.description;
}

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

  calendar.innerHTML = '';

  for (let i = 1; i <= emptyDays + daysInJanuary; i++) {
    const daySquare = document.createElement('div');

    daySquare.classList.add('day');

    const dateString = `${i - emptyDays}/${month + 1}/${year}`;

    if (i > emptyDays) {
      daySquare.innerText = i - emptyDays;

      const eventOnDay = events.find((e) => e.date === dateString);

      if (eventOnDay) {
        const eventBubble = document.createElement('div');
        eventBubble.classList.add('event');
        eventBubble.innerText =
          eventOnDay.title.length > 20 ? eventOnDay.title.substring(0, 20) + '...' : eventOnDay.title;
        if (eventOnDay.type === 'Meeting') eventBubble.style.backgroundColor = '#22333b';
        if (eventOnDay.type === 'Call') eventBubble.style.backgroundColor = '#5e503f';
        if (eventOnDay.type === 'Out of office') eventBubble.style.backgroundColor = '#5f0f40';
        daySquare.append(eventBubble);
      }

      daySquare.addEventListener('click', () => openAddEvent(dateString));
    } else {
      daySquare.classList.add('empty');
    }

    calendar.appendChild(daySquare);
  }
}

function addEvent() {
  console.log('click');
  if (!checkIfEventValid()) return;
  const event = {
    title: title.value,
    date: dateInput.value,
    startTime: start.value,
    endTime: end.value,
    type: select.options[select.selectedIndex].text,
    description: desc.value,
  };
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
  closeAddEvent();
}

function checkIfEventValid() {
  if (!title.value) return;
  if (!start.value) return;
  if (!end.value) return;
  if (start.value > end.value) return;
  return true;
}

function closeAddEvent() {
  console.log('closed');
  eventContainer.style.display = 'none';
  detailsContainer.style.display = 'none';
  clearInputs();
  clickedDate = null;
  render();
}

function clearInputs() {
  inputs.forEach((i) => {
    i.value = '';
  });
}

function deleteEvent() {
  console.log('deleting');
  events = events.filter((e) => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeAddEvent();
}

function initButtons() {
  document.getElementById('add').addEventListener('click', () => addEvent());
  document.getElementById('close').addEventListener('click', () => closeAddEvent());

  document.getElementById('deleteDt').addEventListener('click', () => deleteEvent());
  document.getElementById('closeDt').addEventListener('click', () => closeAddEvent());
}

initButtons();
render();
