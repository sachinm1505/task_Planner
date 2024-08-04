// script.js

document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const calendarDays = document.querySelector('.calendar-days');
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.getElementById('closeModal');
    const saveEvent = document.getElementById('saveEvent');
    const eventText = document.getElementById('eventText');
    const eventTime = document.getElementById('eventTime');
    const eventList = document.getElementById('events');

    let currentDate = new Date();
    let selectedDate = null;
    const events = {};

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        const today = new Date();
        const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

        monthYear.innerHTML = date.toLocaleDateString('en-us', { month: 'long', year: 'numeric' });

        calendarDays.innerHTML = '';

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.innerHTML += `<div></div>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dateString = `${year}-${month}-${i}`;
            const isToday = dateString === todayString;
            calendarDays.innerHTML += `<div class="${isToday ? 'today' : ''}" data-date="${dateString}">${i}</div>`;
        }

        document.querySelectorAll('.calendar-days div[data-date]').forEach(day => {
            day.addEventListener('click', () => {
                const selectedDateValue = new Date(day.dataset.date);
                if (selectedDateValue >= today) {
                    selectedDate = day.dataset.date;
                    eventModal.style.display = 'block';
                }
            });
        });
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    closeModal.addEventListener('click', () => {
        eventModal.style.display = 'none';
        eventText.value = '';
        eventTime.value = '';
    });

    saveEvent.addEventListener('click', () => {
        if (eventText.value && eventTime.value && selectedDate) {
            const eventDetails = {
                text: eventText.value,
                time: eventTime.value
            };
            if (!events[selectedDate]) {
                events[selectedDate] = [];
            }
            events[selectedDate].push(eventDetails);
            updateEventList();
            eventModal.style.display = 'none';
            eventText.value = '';
            eventTime.value = '';
        }
    });

    function updateEventList() {
        eventList.innerHTML = '<h3>Events:</h3><ul id="events"></ul>';
        const eventsUl = document.getElementById('events');
        for (const [date, eventArray] of Object.entries(events)) {
            eventArray.forEach(event => {
                const eventItem = document.createElement('li');
                eventItem.textContent = `${date}: ${event.text} at ${event.time}`;
                eventsUl.appendChild(eventItem);
            });
        }
    }

    renderCalendar(currentDate);
});
