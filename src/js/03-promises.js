import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
  form: document.querySelector('form'),
}

refs.form.addEventListener('submit', onClickButtonCreate)

function onClickButtonCreate(event) {
  event.preventDefault();

  const delay = refs.form.elements.delay.value
  const step = refs.form.elements.step.value
  const amount = refs.form.elements.amount.value

  let time = Number(delay)
  for (let position = 1; position <= amount; position += 1) {   
    createPromise(position, time)
    time += Number(step);
  } 
}

function createPromise(position, delay) {
  const promice = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay });
      } else {
        reject({position, delay });
      }
    }, Number(delay));   
  });

  promice
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);         
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);         
    console.log(`❌ Rejected promise ${position} in ${delay}ms`); 
  });
}