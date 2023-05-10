import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const delayValue = document.querySelector("input[name = 'delay']");
  const amountValue = document.querySelector("input[name = 'amount']");
  const stepValue = document.querySelector("input[name = 'step']");
  for (let i = 1; i <= amountValue.value; i += 1) {
    createPromise(i, +delayValue.value + stepValue.value * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
