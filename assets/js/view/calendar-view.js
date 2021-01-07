import { LitElement, html, css } from 'lit-element';
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
          margin: 44px 0px 0px 10px;
          font-family: 'Roboto', sans-serif;
          background-color: #5F8FB4;
          color: whitesmoke;
          padding: 10px;
        }
        .tasksWrapper {
          width: 30%;
          overflow-y: auto;
        }
        .modal {
          display: none;
        }
    ` ]
  }
  static get properties() {
    return {
      calendarData: { type: Array },
      tasksData: { type: Array },
      userId: { type: Number},
      modalInfo: { type: Array }
    }
  }
  constructor() {
    super();
    this.calendarData = [];
    this.tasksData = [];
    this.userId = 0;
    this.modalInfo = [];
  }

  modal(e) {
    const modal = this.shadowRoot.getElementById('modal-window');
    modal.style.display= "block";
    this.modalInfo = [e.detail];
  }

  closeModal(e) {
    const modal = this.shadowRoot.getElementById('modal-window');
    modal.style.display= e.detail;
  }
  
  render() {
    return html`
      <user-header .usId="${this.userId}"></user-header>
      <div class="wholeWrapper">
        <div class="calendarWrapper">
          <calendar-component .data="${this.calendarData}" @modal-open="${this.modal}"></calendar-component>
        </div>
        <div class="tasksWrapper">
          ${this.tasksData.length > 1 ? 
            html`<task-component .data="${this.tasksData}"></task-component>`
            : html`<div class="mty-tsk">There's not tasks yet &#128580;</div>`}
        </div>
      </div>
      <calendar-modal class="modal" id="modal-window" @modal-display="${this.closeModal}" .eventInfo="${this.modalInfo}"></calendar-modal>
    `;
  }
}
customElements.define('calendar-view', CalendarView);