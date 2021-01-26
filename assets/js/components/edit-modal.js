import { LitElement, html, css} from 'lit-element';
import { dateFormatter } from '../utils/functions';
import { modalStyles } from '../css/modal-styles';
import { commonFetch, url } from '../utils/utils';

class EditModal extends LitElement {
  static get styles() {
    return [ modalStyles, css`
      input {
        border: none;
      }
      input[type=text] {
        border-bottom: 1px solid #D9D9D6;
      }
      input[type=date] {
        margin-right: 100px;
      }
      .btn.exit {
        grid-column-start: 9;
      }
      .event-name {
        font-size: 25px;
      }
      #notes {
        font-size: 16px;
        margin-top: 10px;
      }
      button {
        height: 30px;
        width: 100px;
        margin-top: 10px;
        border-radius: 5px;
        border: none;
        color: whitesmoke;
        background-color: #5F8DDA;
        cursor: pointer;
      }
    `]
  } 

  static get properties() {
    return {
      editInfo: { type: Array },
    }
  }

  constructor() {
    super();
    this.editInfo = [];
  }

  closeModal() {
    const display = 'none';
    const event = new CustomEvent('modal-display', {
      detail: display,
    });
    this.dispatchEvent(event);
  }

  async onSubmit() {
    const name = this.shadowRoot.getElementById('name').value;
    const dayOne = this.shadowRoot.getElementById('day-one').value;
    const dayTwo = this.shadowRoot.getElementById('day-two').value;
    const timeOne = this.shadowRoot.getElementById('time-one').value;
    const timeTwo = this.shadowRoot.getElementById('time-two').value;
    const notes = this.shadowRoot.getElementById('notes').value;

    const data = {
      id: this.editInfo[0].id,
      name: name,
      fDay: dayOne,
      sDay: dayTwo,
      fTime: timeOne + ':00',
      sTime: timeTwo + ':00',
      notes: notes
    }

    const result = await commonFetch(`${url}/calendar/event/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async taskOnSubmit() {
    const name = this.shadowRoot.getElementById('name').value;
    const dayOne = this.shadowRoot.getElementById('day-one').value;
    const notes = this.shadowRoot.getElementById('notes').value;

    const data = {
      id: this.editInfo[0].id,
      name: name,
      day: dayOne,
      notes: notes
    }

    const result = await commonFetch(`${url}/task/tasking/edit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  taskEditL() {
    return this.editInfo.map(item => html`
    <div class="event-info" id="eventInfo">
      <form onsubmit=""> 
        <div class="item">
          <div class="item detail">
            <input type="text" id="name" class="event-name" value="${item.taskname}" />
          </div>
          <div class="item detail">
            <input type="date"  id="day-one" value="${dateFormatter(item.day).input}" />
          </div>
          <div class="item detail">
            <input type="text" id="notes" value="${item.notes}" />
          </div>
        </div>
        <button type="submit" @click="${this.taskOnSubmit}">Save</button>
      </form>
    </div>
    `);
  }

  calendarEditL() {
    return this.editInfo.map(item => html`
    <div class="event-info" id="eventInfo">
      <form onsubmit=""> 
        <div class="item">
          <div class="item detail">
            <input type="text" id="name" class="event-name" value="${item.eventname || item.taskname}" />
          </div>
          <div class="item detail">
            <input type="date"  id="day-one" value="${dateFormatter(item.day).input}" />
            <input type="time" id="time-one" value="${dateFormatter(item.time).hourInput}" />
          </div>
          <div class="item detail">
            <input type="date" id="day-two" value="${dateFormatter(item.secondday).input}" />
            <input type="time" id="time-two" value="${dateFormatter(item.secondtime).hourInput}" />
          </div>
          <div class="item detail">
            <input type="text" id="notes" value="${item.notes}" />
          </div>
        </div>
        <button type="submit" @click="${this.onSubmit}">Save</button>
      </form>
    </div>
    `);
  }
  render() { 
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="mdl-wrp" id="modal">
          <div class="modal-content">
          <div class="modal-nav">
            <button class="material-icons btn exit" @click="${this.closeModal}">close</button>
          </div>
          <div id="content">
            ${typeof(this.editInfo[0].taskname) !== 'undefined' ? this.taskEditL() : this.calendarEditL()}
          </div>  
          </div>    
      </div>`;
  }
}

customElements.define('edit-modal', EditModal);