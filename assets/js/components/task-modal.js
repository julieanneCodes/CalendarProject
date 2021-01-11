import { LitElement, html } from 'lit-element';
import { modalStyles } from '../css/modal-styles';
import { dateFormatter } from '../utils/functions';
class TaskModal extends LitElement {
  static get styles() {
    return [modalStyles]
  }

  static get properties() {
    return {
      taskInfo: { type: Array }
    }
  }

  constructor() {
    super();
    this.taskInfo = [];
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
          <div class="modal-nav">
            <button class="material-icons btn">edit</button>
            <button class="material-icons btn">delete_outline</button>
            <button class="material-icons btn" @click="${this.closeModal}">close</button>
          </div>
            ${this.taskInfo.map(item => html`
            <div class="event-info" id="eventInfo">
              <div> 
                <div class="item">
                  <div class="item detail">
                    ${item.taskname}
                  </div>
                  <div class="item detail">
                    ${dateFormatter(item.day).display}
                  </div>
                  <div class="item detail">
                    <span class="material-icons">notes</span>
                    ${item.notes}
                  </div>
                </div>
              </div>
            </div>
            `)}
          </div>
          
      </div>
    `;
  }
}
customElements.define('task-modal', TaskModal);