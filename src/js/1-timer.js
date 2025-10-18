import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = null;

//Get refs to the "Start" button
const startButton = document.querySelector('[data-start]')

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        
        const now = new Date();

        if (selectedDate.getTime() < now.getTime()) {
            
            window.alert("Please choose a date in the future");
            
            startButton.disabled = true;
            
            userSelectedDate = null;

        } else {
            userSelectedDate = selectedDate;

            startButton.disabled = false;
            
            console.log("Valid date selected:", userSelectedDate);
        }
    }
};


flatpickr("#datetime-picker", options); 

startButton.addEventListener('click', () => {
   if (userSelectedDate) {
   
       timer.start();
   }
});


const timer = {
    intervalId: null,


    start() {
        this.intervalId = setInterval(() => {
            this.deadline = userSelectedDate;
            const diff = this.deadline - Date.now();
            // if (diff <= 0) {
            //     this.stop();

            //     return
            // }
        console.log(this.deadline)
        console.log(this.convertMs(diff))

        }, 1000)
    },

    stop() {
        clearInterval(this.intervalId)
    },

    convertMs(ms) {
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

        return { 
            days, 
            hours, 
            minutes, 
            seconds };
        },
}


