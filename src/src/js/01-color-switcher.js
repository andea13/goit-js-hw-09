const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};

const DELAY = 1000;
let timerId = null;

refs.btnStartEl.addEventListener('click', () => {
  refs.btnStartEl.disabled = true;
  refs.btnStopEl.disabled = false;

  timerId = setInterval(event => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, DELAY);
});

refs.btnStopEl.addEventListener('click', () => {
  clearInterval(timerId);
  refs.btnStartEl.disabled = false;
  refs.btnStopEl.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
