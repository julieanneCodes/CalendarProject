import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import { modalStyles } from '../css/modal-styles';
class CalendarModal extends LitElement {
  static get styles() {
    return [ modalStyles ]
  } 

  static get properties() {
    return {
      eventInfo: { type: Array },
    }
  }

  constructor() {
    super();
    this.eventInfo = [];
  }

  closeModal() {
    const display = 'none';
    const event = new CustomEvent('modal-display', {
      detail: display,
    });
    this.dispatchEvent(event);
  }

  moreModal(item) {
    const event = new CustomEvent('more-modal', {
      detail: item,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="mdl-wrp" id="modal">
          <div class="modal-content">
          <div class="modal-nav">
            <button class="material-icons btn">edit</button>
            <button class="material-icons btn">delete_outline</button>
            <button class="material-icons btn" @click="${this.closeModal}">close</button>
          </div>
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
            `)}
          </div>    
      </div>`;
  }
}

customElements.define('calendar-modal', CalendarModal);