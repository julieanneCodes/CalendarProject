import dayjs from 'dayjs';
import { LitElement, html } from 'lit-element';
import { doubleStyles } from '../css/double-styles';
import '../components/calendar';
import '../components/tasks';

class CalendarView extends LitElement {

  static get styles() {
    return [ doubleStyles ]
  }
  static get properties() {
    return {
      calendarData: { type: Array },
      tasksData: { type: Array },
    }
  }
  constructor() {
    super();
    this.calendarData = [];
    this.tasksData = [];
  }
  render() {
    return html`
      <div class="wholeWrapper">
        <div class="calendarWrapper">
          <calendar-component .data="${this.calendarData}"></calendar-component>
        </div>
        <div class="tasksWrapper">
          <task-component .data="${this.tasksData}"></task-component>
        </div>
      </div>
    `;
  }
}
customElements.define('calendar-view', CalendarView);