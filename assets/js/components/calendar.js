import dayjs from 'dayjs';
import {LitElement, html} from 'lit-element';
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
            months: { type: Array },
            data: { type: Array },
            dataYears: { type: Array },
            dataMonths: { type: Array },
            dataDays: { type: Array },
            daysNames: { type: Array }

        };
    }

    constructor() {
        super();
        this.daysArray = [];
        this.months = [...months];
        this.daysNames = [...days];
        this.data = [];
        this.dataDays = [];
        this.dataYears = [];
        this.dataMonths = [];
        this.days = 0;
        this.currentMonth = '';
        this.currentDate = new Date();
    }

    init() {
        
        this.data.forEach(element => {
            this.dataMonths.push(new Date(element['day']).getMonth());
            this.dataYears.push(new Date(element['day']).getFullYear());
            this.dataDays.push(new Date(element['day']).getDate());
        });
        console.log(this.dataMonths);
        console.log(this.dataDays);
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
    
    calendar(date) {
        this.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        // const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.currentMonth = this.currentDate.getMonth();
        const arr = [];
        arr.length = 42;
        console.log(arr)
        /*const arrTwo = [];
        for(let i=1; i<=num; i++) {
            arr.push(i);
        }
        for(let x=1;x<=this.days;x++) {
            arrTwo.push(x);
        }
        this.daysArray = [...arrTwo];*/
        return html`
            <div>${months[this.currentMonth]} ${this.currentDate.getFullYear()}</div>
            <div class="calendarWrap">
                ${this.daysNames.map(day => html`<div class="namesWrap">${day}</div>`)}
                <!-- ${arr.map((day,i)=> html`
                <div class="daysWrap" id=${day}></div>
                `)} -->
            </div>
        `;
    }
    auxCalendar() {
        this.currentDate = new Date();
        this.calendar(this.currentDate);
    }
    async firstUpdated() {
        await this.updateComplete;
        this.init();
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