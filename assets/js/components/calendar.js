import dayjs from 'dayjs';
import { LitElement, html } from 'lit-element';
import { calendarStyles } from '../css/calendar-styles';
import { months, days } from '../utils/constants';
import { dateFormatter } from '../utils/functions';

const weekday = require('dayjs/plugin/weekday');
const weekOfYear = require('dayjs/plugin/weekOfYear');

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

class Calendar extends LitElement {
    static get styles() {
        return [calendarStyles]
    }
    static get properties() {
        return {
            daysArray: { type: Array },
            days: { type: Number },
            currentDate: { type: Object },
            currentMonth: { type: String },
            data: { type: Array },
            daysNames: { type: Array },
            previousMDays: { type: Array },
            nextMDays: { type: Array },
        };
    }

    constructor() {
        super();
        this.daysArray = [];
        this.previousMDays = [];
        this.nextMDays = [];
        this.months = [...months];
        this.daysNames = [...days];
        this.data = [];
        this.days = 0;
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
    }

    stepper(e){
        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();
        if(e.target.id === 'monthBefore') {
            this.calendar(new Date(year, month -1));
            this.currentDate = new Date(year, month -1);
        }
        if(e.target.id === 'monthAfter') {
            this.calendar(new Date(year, month +1));
            this.currentDate = new Date(year, month +1);
        }
    }
    
    calendarDays(date) {
        return this.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
       
    }
    currentMonthDays(date) {
        return [...Array(this.calendarDays(date))].map((day, index) => {
            return {
                date: new Date(date.getFullYear(), date.getMonth(), index + 1),
                dayOfMonth: index + 1,
                isCurrentMonth: true,
            };
        });
    }

    getWeekday(date) {
        return dayjs(date).weekday();
    }

    previousMonthDays(date) {
        const firstMonthDay = this.getWeekday(this.daysArray[0].date);
        const previousMonth = new Date(date.getFullYear(), date.getMonth() -1);
        
        const previousMonthDaysN = firstMonthDay ? firstMonthDay - 1 : 6;
        const previousMonthLastMonday = dayjs(this.daysArray[0].date).subtract(previousMonthDaysN, "day").date();

        return [...Array(previousMonthDaysN)].map((day, index) => {    
            return {
              date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), previousMonthLastMonday + index ),
              dayOfMonth: previousMonthLastMonday + index,
              isCurrentMonth: false
            };
          });


    }

    nextMonthDays(date) {
        const aux = [...this.daysArray];
        const last = aux.pop();
        const lastDay = this.getWeekday(last.date);
        const daysFromNextMonth = lastDay ? 7 - lastDay : lastDay;

        return [...Array(daysFromNextMonth)].map((day, index) => {
            return {
              date: new Date(date.getFullYear(), date.getMonth() +1, index + 1),
              dayOfMonth: index + 1,
              isCurrentMonth: false
            }
          });
    }
    
    dateExists(item) {

        const events = this.data.filter(x => dateFormatter(x.day).databased == item.date.getTime());
        return events.length > 0  ? events : [];
    }

    calendar(date) {
        this.daysArray = this.currentMonthDays(date);
        this.previousMDays = this.previousMonthDays(date);
        this.nextMDays = this.nextMonthDays(date);

        const arr = [...this.previousMDays, ...this.daysArray, ...this.nextMDays];
        return html`
            <div class="mth-wrp">${months[this.currentMonth]} ${this.currentDate.getFullYear()}</div>
            <div class="calendarWrap">
                ${this.daysNames.map(day => html`<div class="namesWrap">${day}</div>`)}
               ${arr.map(item => html`
                    <div class="daysWrap" id="">
                        ${item.dayOfMonth}
                        ${this.dateExists(item).map(x => 
                            html`<div class="eventWrap" @click="${this.openModal}">${x.eventname || x.taskname}</div>
                        `)}
                    </div>
                `)}
            </div>
        `;
    }

    auxCalendar() {
        this.currentDate = new Date();
        this.calendar(this.currentDate);
    }

    render() {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <div class="stp-container">
                <div class="stepperWrap">
                    <button id="monthBefore" class="material-icons btn-s" @click="${this.stepper}">
                        keyboard_arrow_left
                    </button>
                    <button @click="${this.auxCalendar}" class="btn-sm">Back to ${months[this.currentMonth]}</button>
                    <button id="monthAfter" class="material-icons btn-s" @click="${this.stepper}">
                        keyboard_arrow_right
                    </button>
                </div>
            </div>
            ${this.calendar(this.currentDate)}`;
    }
}
customElements.define('calendar-component', Calendar);