import dayjs from 'dayjs';
import { LitElement, html } from 'lit-element';
import { calendarStyles } from '../css/calendar-styles';
import { months, days } from '../utils/constants';

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
            aux: {type: Array }

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
        this.aux = [];
        this.days = 0;
        this.currentMonth = '';
        this.currentDate = new Date();
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
                timeDate: new Date(date.getFullYear(), date.getMonth(), index + 1).getTime(),
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
              timeDate: new Date(previousMonth.getFullYear(), previousMonth.getMonth() +1, previousMonthLastMonday + index ).getTime(),
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
              timeDate: new Date(date.getFullYear(), date.getMonth() +1, index + 1).getTime(),
              dayOfMonth: index + 1,
              isCurrentMonth: false
            }
          });
    }
    eventNames() {
       const divs = this.shadowRoot.querySelectorAll(".daysWrap");
        const aux = [...divs];
        //console.log(aux)
       // const arr = []
       // const events = []
        // aux.map(item=> item.append(''));
        /*aux.map(item => this.data.map(info => { 
            if(parseInt(item.id) === new Date(info.day).getTime()) {
               this.shadowRoot.getElementById(new Date(info.day).getTime().toString()).append(info.eventname);
                
               // arr.push(item)
               // events.push(info)
            } else {
                return null;
            }
        }))
        /*for(let i=0; i<arr.length;i++) {
            arr[i].append(events[i].eventname)

        }*/
        console.log(this.data);
        //console.log(aux);
        for(let i=0;i<aux.length;i++) {
            for(let x=0;x<this.data.length; x++) {
                if(aux[i].id === (new Date(this.data[x].day).getTime()).toString()) {
                    this.shadowRoot.getElementById(aux[i].id).append(this.data[x].eventname);
                } else {
                    null;
                }
            };
        };
    }

    calendar(date) {
        this.calendarDays(date);
        this.daysArray = this.currentMonthDays(date);
        this.previousMDays = this.previousMonthDays(date);
        this.nextMDays = this.nextMonthDays(date);

        this.currentMonth = this.currentDate.getMonth();
        const arr = [...this.previousMDays, ...this.daysArray, ...this.nextMDays];
        //const aux = this.eventNames(arr);
        console.log(arr)
        return html`
            <div>${months[this.currentMonth]} ${this.currentDate.getFullYear()}</div>
            <div class="calendarWrap">
                ${this.daysNames.map(day => html`<div class="namesWrap">${day}</div>`)}
               ${arr.map(item => html`<div class="daysWrap" id="${item.timeDate}">${item.dayOfMonth}</div>`)}
            </div>
        `;
    }
    auxCalendar() {
        this.currentDate = new Date();
        this.calendar(this.currentDate);
    }

    async updated() {
        await this.updateComplete;
        this.eventNames(this.currentDate);
    }

    render() {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <div class="stepperWrap">
                <button id="monthBefore" class="material-icons" @click="${this.stepper}">
                    keyboard_arrow_left
                </button>
                <button id="monthAfter" class="material-icons" @click="${this.stepper}">
                    keyboard_arrow_right
                </button>
                <button @click="${this.auxCalendar}">Back to current month</button>
            </div>
            ${this.calendar(this.currentDate)}`;
    }
}

customElements.define('calendar-component', Calendar);