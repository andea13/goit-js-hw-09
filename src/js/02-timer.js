//алгоритм
//1.Підключити fltapicr
//2. Прописати таймер

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const now = new Date();
// let nowInMS = now.getTime();
// console.log(nowInMS);

let timeDifference = 0;
let inputTimeValue = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log((inputTimeValue = selectedDates[0]));
  },
};

const refs = {
  fpEl: document.getElementById('datetime-picker'),
  timerEl: document.querySelector('.timer'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

// console.log(refs.startBtnEl);
// console.log(refs.daysEl);
// console.log(refs.hoursEl);
// console.log(refs.minutesEl);
// console.log(refs.secondsEl);

const fp = flatpickr(refs.fpEl, options);

refs.fpEl.addEventListener('input', event => {
  const selectedDates = event.target.value;
  console.log(selectedDates);
});

const attachToElement = ({ daysEl, hoursEl, minutesEl, secondsEl }) => {
  const timeLeftValue = `${daysEl}d ${hoursEl}h ${minutesEl}m ${secondsEl}s`;
  refs.timerEl.textContent = timeLeftValue;
};

attachToElement(refs.timerEl, {
  daysEl,
  hoursEl,
  minutesEl,
  secondsEl,
});
