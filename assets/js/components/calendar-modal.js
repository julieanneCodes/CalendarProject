import { LitElement, html} from 'lit-element';
import { dateFormatter } from '../utils/functions';
import { modalStyles } from '../css/modal-styles';
import { commonFetch, url } from '../utils/utils';

class CalendarModal extends LitElement {
  static get styles() {
    return [ modalStyles ]
  } 

  static get properties() {
    return {
      eventInfo: { type: Array },
      errorMsg : { type: String },
      deleteConfirm: { type: Object }
    }
  }

  constructor() {
    super();
    this.eventInfo = [];
    this.errorMsg = '';
    this.deleteConfirm = html``;
  }

  closeModal() {
    const display = 'none';
    this.deleteConfirm = html``;
    const event = new CustomEvent('modal-display', {
      detail: display,
    });
    this.dispatchEvent(event);
  }

  moreModal(item) {
    this.errorMsg = '';
    const event = new CustomEvent('more-modal', {
      detail: item,
    });
    this.dispatchEvent(event);
  }

  editEvent() {
    if (typeof(this.eventInfo[0].id) === 'undefined') {
      this.errorMsg = "Select an event";
    } else {
      this.closeModal();
      const event = new CustomEvent('edit-modal', {
        detail: this.eventInfo,
      });
      this.dispatchEvent(event);
    }
  }

  removeItem() {
    this.deleteConfirm = html`
      <form onsubmit="#">
        <h1>Are you sure you want to delete it?</h1>
        <div class="buttons">
          <button class="btn-del" type="submit" @click="${this.deleteItem}">Delete</button>
          <button @click="${this.closeModal}" class="btn-cancel">Cancel</button>
        </div>
      </form>
      `;
  }

  async deleteItem() {
    const itemId = this.eventInfo[0].id;

    if(typeof(this.eventInfo[0].taskname) !== 'undefined') {
      await commonFetch(`${url}/task/delete/${itemId}`, {
        method: 'DELETE',
      });
    } else {
      await commonFetch(`${url}/calendar/event/delete/${itemId}`, {
        method: 'DELETE',
      });
    }
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="mdl-wrp" id="modal">
          <div class="modal-content">
          <div class="modal-nav">
            <button class="material-icons btn" @click="${this.editEvent}">edit</button>
            <button class="material-icons btn" @click="${this.removeItem}">delete_outline</button>
            <button class="material-icons btn" @click="${this.closeModal}">close</button>
          </div>
          <div>${this.errorMsg}</div>
            ${this.eventInfo.map(item => html`
            <div class="event-info" id="eventInfo">
              <div> 
                <div class="item">
                  <div class="item detail">
                    ${item.eventname || item.taskname || item.moreEvents.map(x => html`
                      <div class="moreEvnt" @click="${() => this.moreModal(x)}">${x.eventname || x.taskname || dateFormatter(x).weekDay}
                      </div>
                      `)
                    }
                  </div>
                  <div class="item detail">
                    ${dateFormatter(item.day).display}
                    ${dateFormatter(item.time).hour}
                  </div>
                  <div class="item detail">
                    ${dateFormatter(item.secondday).display}
                    ${dateFormatter(item.secondtime).hour}
                  </div>
                  <div class="item detail">
                    ${item.notes}
                  </div>
                </div>
              </div>
            </div>
            <div>${this.deleteConfirm}</div>
            `)}
          </div>    
      </div>`;
  }
}

customElements.define('calendar-modal', CalendarModal);