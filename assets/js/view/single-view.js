import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import '../components/calendar';
import '../components/user-header';
import '../components/calendar-modal';

class SingleView extends LitElement {
  static get styles() {
    return[css`
      .single-layout {
        display: grid;
        grid-template-columns: 1070px 120px;
      }
      .add {
        font-size: 35px;
        text-decoration: none;
        color: #256BA2;
      }
      .side-panel {
        position: relative;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(8, 1fr);
      }
      .link {
        position: relative;
      }
      .link a {
        position: absolute;
        right: 5px;
      }
      .link-view {
        color: #256BA2;
        font-size: 20px;
      }
      .modal {
        display: none;
      }
    `]
  }

  static get properties() {
    return {
      calendarData: { type: Array },
      userIdentity: { type: Number },
      title: { type: String },
      month: { type: String },
      route: { type: String },
      routeName: { type: String },
      addRoute: { type: String },
      modalInfo: { type: Array }
    }
  }

  constructor() {
    super();
    this.data = [];
    this.modalInfo = [];
    this.userIdentity = 0;
    this.title = '';
    this.month = '';
    this.route = '';
    this.routeName = '';
    this.addRoute = '';
  }

  monthInfo(e) {
    this.month = dateFormatter(e.detail).monthYear;
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

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <user-header .title="${this.title}" .usId="${this.userIdentity}" .month="${this.month}"></user-header>
      <div class="single-layout">
        <calendar-component .data="${this.calendarData}" @month-info="${this.monthInfo}" @modal-open="${this.modal}"></calendar-component>
        <div class="side-panel">
          <div class="link">
            <a href="${this.route}" class="link-view">${this.routeName}</a>
          </div>
          <div class="link">
            <a href="${this.addRoute}" class="material-icons add">add_circle</a>
          </div>
        </div>
      </div>
      <calendar-modal id="modal-window" class="modal" .eventInfo="${this.modalInfo}" @modal-display="${this.closeModal}" @more-modal="${this.modal}"></calendar-modal>
    `;
  }
}
customElements.define('single-view', SingleView);