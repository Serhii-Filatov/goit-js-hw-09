import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notify.failure('Please choose a date in the future', {position: 'center-top'});         
        }

        if (selectedDates[0] >= new Date()) {
            refs.btnStart.removeAttribute('disabled')
        }
    },
};

const fp = flatpickr("#datetime-picker", options);

refs.btnStart.addEventListener('click', onClickButtonStart)

function onClickButtonStart() {
    refs.btnStart.toggleAttribute('disabled')    

    const intrvalId = setInterval(() => {
        const dateFromUserUnix = fp.selectedDates[0].getTime()
        const todayUnix = new Date().getTime()
        const timeToEventUnex = dateFromUserUnix - todayUnix

        const objDate = convertMs(timeToEventUnex)
        const {
            days,
            hours,
            minutes,
            seconds,
        } = objDate

        //draw markup
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);

        const sum = days + hours + minutes + seconds;
        if (sum === 0) {
            Notify.info('Congratulations! The time has come!', {position: 'center-top'});
            clearInterval(intrvalId)
        }
    }, 1000)    
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    if (value >= 10) {
        return value
    }

    return String(value).padStart(2, '0')    
}