import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
class CalendarModal extends LitElement {
  static get styles() {
    return [ 
    css`
      .mdl-wrp {
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
      }
      .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        animation-name: animatetop;
        animation-duration: 0.4s
      }
      @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
      }
      .btn {
        border: none;
        background-color: transparent;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
      }
      .btn:focus {
        outline: none;
      }
      .event-info {
        margin-top: 20px;
      }
      .item {
        margin: 10px;
      }
    `]
  } 

  static get properties() {
    return {
      eventInfo: { type: Array }
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

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="mdl-wrp" id="modal">
          <div class="modal-content">
            <button class="material-icons btn" @click="${this.closeModal}">close</button>
            ${this.eventInfo.map(item => html`
            <div class="event-info">
              <div>
                <div>Event name:</div>
                <div class="item">${item.eventname}</div>
              </div>
              <div>
                <div>Date:</div>
                <div class="item">${dateFormatter(item.day).display}</div>
              </div>
              <div>
                <div>Time:</div>
                <div class="item">${dateFormatter(item.time).hour}</div>
              </div>
              <div>
                <div>Notes:</div>
                <div class="item">${item.notes}</div>
              </div>
            </div>
            `)}
          </div>
      </div>`;
  }
}

customElements.define('calendar-modal', CalendarModal);