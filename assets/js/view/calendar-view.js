import { LitElement, html } from 'lit-element';
import '../components/calendar.js';
import '../components/modal.js';
class CalendarView extends LitElement {
  static get properties() {
    return {
      calendarData: { type: Array }
    };
  }

  constructor() {
    super();
    this.calendarData = [];
  }

  render() {
    return html`
      <calendar-component .data="${this.calendarData}"></calendar-component>
      <modal-window></modal-window>
    `;
  }
}

customElements.define('calendar-view', CalendarView);