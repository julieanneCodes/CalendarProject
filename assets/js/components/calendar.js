import { data } from 'jquery';
import {LitElement, html} from 'lit-element';
import { calendarStyles } from '../css/calendar-styles';
class Calendar extends LitElement {
    static get styles() {
        return [calendarStyles]
    }
    static get properties() {
        return {
            daysArray: {type: Array},
            days: {type: Number},
            currentDate: {type: Object},
            data: {type: Array}
        };
    }

    constructor() {
        super();
        this.daysArray = [];
        this.data = [];
        this.days = 0;
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
    calendar(date) {
        console.log(this.data);
        this.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        for(let i=1; i<=this.days; i++) {
            this.daysArray.push(i);
        }
        return html`
            <div class="calendarWrap">
                ${this.daysArray.map(day => html`
                <div>${day}</div>
                `)}
            </div>
        `;
    }
    render() {
        return html`
            <div class="stepperWrap">
                <button id="monthBefore" @click="${this.stepper}">a</button>
                <button id="monthAfter" @click="${this.stepper}">b</button>
            </div>
            ${this.calendar(this.currentDate)}`;
    }
}

customElements.define('calendar-component', Calendar);