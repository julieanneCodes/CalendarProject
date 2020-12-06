import {LitElement, html} from 'lit-element';
import { nothing } from 'lit-html';
import { calendarStyles } from '../css/calendar-styles';
import { months } from '../utils/constants';
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
            dataDays: { type: Array }

        };
    }

    constructor() {
        super();
        this.daysArray = [];
        this.months = [...months];
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
    /*modal() {
        const calendarWrap = this.shadowRoot.querySelector('.calendarWrap');
        calendarWrap.setAttribute('display', 'none');
        console.log('aaaa');
        return html`
            <div class="modal">
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                        <p>this is the text inside the modal</p>
                </div>
            </div>
        `
    }*/

    calendar(date) {
        console.log(this.data);
        this.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        this.currentMonth = this.currentDate.getMonth();
        const arr = [];
        for(let i=1; i<=this.days; i++) {
            arr.push(i);
        }
        this.daysArray = [...arr];
        return html`
            <div>${months[this.currentMonth]} ${this.currentDate.getFullYear()}</div>
            <div class="calendarWrap">
                ${this.daysArray.map((day, i) => html`
                <div @click="${this.modal}">${day}</div>
                `)}
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