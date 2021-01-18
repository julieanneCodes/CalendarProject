import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import '../components/calendar';
import '../components/tasks';
import '../components/user-header';
import '../components/calendar-modal';

class CalendarView extends LitElement {

  static get styles() {
    return [
    css`
        .wholeWrapper {
          display: flex;
          padding: 0px 15px;
        }
        .calendarWrapper {
          width: 100%;
        }
        .mty-tsk {
          margin-left: 10px;
          font-family: 'Roboto', sans-serif;
          background-color: #5F8FB4;
          color: whitesmoke;
          padding: 10px;
        }
        .tasksWrapper {
          width: 30%;
        }
        .modal {
          display: none;
        }
        .btn {
          border: none;
          background-color: transparent;
          color: #256BA2;
          font-size: 40px;
          position: absolute;
          bottom: 20px;
          right: 35px;
        }
    ` ]
  }
  static get properties() {
    return {
      calendarData: { type: Array },
      tasksData: { type: Array },
      userId: { type: Number},
      modalInfo: { type: Array },
      taskInfo: { type: Array },
      month: { type: String }
    }
  }
  constructor() {
    super();
    this.calendarData = [];
    this.tasksData = [];
    this.userId = 0;
    this.modalInfo = [];
    this.taskInfo = [];
    this.month = '';

  }

  modal(e) {
    const modal = this.shadowRoot.getElementById('modal-window');
    modal.style.display= "block";
    this.modalInfo = [e.detail];
  }

  closeModal(e) {
    const modal = e.target;
    modal.style.display= e.detail;
  }

  monthInfo(e) {
    this.month = dateFormatter(e.detail).monthYear;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <user-header .usId="${this.userId}" .month="${this.month}"></user-header>
      <div class="wholeWrapper">
        <div class="calendarWrapper">
          <calendar-component .data="${this.calendarData}" @modal-open="${this.modal}" @month-info="${this.monthInfo}">
          </calendar-component>
        </div>
        <div class="tasksWrapper">
          ${this.tasksData.length > 1 ? 
            html`<task-component .data="${this.tasksData}" @modal-open="${this.modal}"></task-component>`
            : html`<div class="mty-tsk">There's not tasks yet &#128580;</div>`}
        </div>
      </div>
      <button class="material-icons btn">add_circle</button>
      <calendar-modal class="modal" id="modal-window" @modal-display="${this.closeModal}" .eventInfo="${this.modalInfo}" @more-modal="${this.modal}"></calendar-modal>
    `;
  }
}
customElements.define('calendar-view', CalendarView);