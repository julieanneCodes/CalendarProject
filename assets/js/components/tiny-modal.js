import { LitElement, html, css } from 'lit-element';
import { modalStyles } from '../css/modal-styles';
import { newEvent, newTask } from '../utils/utils';

class TinyModal extends LitElement {
  static get styles() {
    return[ modalStyles, css`
      .mdl-wrp {
        background-color: transparent;
        padding-top: 80px;
      }
      .modal-content {
        width: 20%;
        margin-left: 270px;
        box-shadow: 5px 10px 18px #888888;
        border: none;
      }
      .exit.btn {
        grid-column-start: 9;
      }
      .btn.op {
        background-color: #5F8DDA;
        color: whitesmoke;
        border-radius: 5px;
        height: 30px;
        width: 100%;
        margin: 5px 0px 5px 0px;
      }
    ` ];
  }

  static get properties() {
    return {

    }
  }

  constructor() {
    super();
  }
  
  closeModal() {
    const display = 'none';
    const event = new CustomEvent('modal-display', {
      detail: display,
    });
    this.dispatchEvent(event);
  }

  redirect(e) {
    const id = e.target.id;
    return id === 'event' ? location.href = newEvent : location.href = newTask;
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="mdl-wrp">
        <div class="modal-content">
          <div class="modal-nav">
            <button class="material-icons exit btn" @click="${this.closeModal}">close</button> 
          </div>
          <div class="modal-options">
            <div>
              <button class="btn op" id="event" @click="${this.redirect}">New event</button>
            </div>
            <div>
              <button class="btn op" id="task" @click="${this.redirect}">New task</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('tiny-modal', TinyModal);