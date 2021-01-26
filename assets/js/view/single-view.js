import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
import '../components/calendar';
import '../components/single-header';
import '../components/calendar-modal';

class SingleView extends LitElement {
  static get styles() {
    return[css`
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
      <single-header .title="${this.title}" .viewRoute="${this.routeName}" .route="${this.route}" .usId="${this.userIdentity}" .month="${this.month}" .add="${this.addRoute}"></single-header>
      <div class="single-layout">
        <calendar-component .data="${this.calendarData}" @month-info="${this.monthInfo}" @modal-open="${this.modal}"></calendar-component>
      </div>
      <calendar-modal id="modal-window" class="modal" .eventInfo="${this.modalInfo}" @modal-display="${this.closeModal}" @more-modal="${this.modal}"></calendar-modal>
    `;
  }
}
customElements.define('single-view', SingleView);