//алгоритм
//1.Підключити fltapicr
//2. Прописати таймер

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const now = new Date();
let timeDifference = 0;

const refs = {
  fpEl: document.getElementById('datetime-picker'),
  timerEl: document.querySelector('.timer'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtnEl.disabled = true;

let inputTimeValue = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log((inputTimeValue = selectedDates[0].getTime()));

    if (inputTimeValue < now) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtnEl.disabled = false;
    }
  },
};

const fp = flatpickr(refs.fpEl, options);

const handleTime = () => {
  const now = new Date();
  const timeDifference = inputTimeValue - now;
  console.log(timeDifference);

  if (timeDifference >= 0) {
    const { days, hours, minutes, seconds } = convertMs(`${timeDifference}`);
    console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);

    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
  } else {
    refs.daysEl.textContent = '00';
    refs.hoursEl.textContent = '00';
    refs.minutesEl.textContent = '00';
    refs.secondsEl.textContent = '00';
  }
};

refs.startBtnEl.addEventListener('click', onClickTimerStart);

function onClickTimerStart() {
  const timer = setInterval(handleTime, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
