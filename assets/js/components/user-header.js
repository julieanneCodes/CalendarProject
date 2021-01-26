import { LitElement, html, css } from 'lit-element';
import { headerStyles } from '../css/header-styles';
import { url } from '../utils/utils';
import '../components/tiny-modal';

class UserHeader extends LitElement {
  static get styles() {
    return [ headerStyles ]
  }

  static get properties() {
    return {
      appName: { type: String },
      usId: { type: Number },
      currentD: { type: Object },
      month: { type: String },
      title: { type: String },
      display: { type: String }
    }
  }

  constructor() {
    super();
    this.appName = 'Bethink';
    this.usId = 0;
    this.currentD = new Date();
    this.month = '';
    this.title = 'Calendar & Tasks';
    this.display = 'block';
   }

  menu(e) {
    console.log(e.currentTarget.classList.value);
    const burgerMenu = this.shadowRoot.getElementById('burgerMenu');
    if ( e.target.id === 'open-brg' ) {
      burgerMenu.style.height = '100%';
    }
    if ( e.target.id === 'close-brg') {
      burgerMenu.style.height = '0%';
    }
  }
  tinyModal() {
    const modal = this.shadowRoot.getElementById('modal');
    modal.style.display = 'block';
  }

  closeModal(e) {
    const modal = e.target;
    modal.style.display= e.detail;
  }

  async firstUpdated() {
    await this.updateComplete;
    const button = this.shadowRoot.getElementById('del');
    button.style.display = this.display;
  }

  render() {
    return html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="pseudoHeader">
          <a href="/home" class="home"><h1>${this.appName}</h1></a>
          <span class="material-icons leaf">eco</span>
          <h1 class="title col">${this.title}</h1>
          <button class="material-icons btn" @click="${this.tinyModal}" id="del">add_circle</button>
          <h1 class="title">${this.month}</h1>
          <div class="burgerMenu">
            <button class="burger material-icons menu" id="open-brg" @click="${this.menu}">menu</button>
          </div>
        </div>
        <div id="burgerMenu" class="sidepanel">
          <a href="javascript:void(0)" class="closebtn material-icons" id="close-brg" @click="${this.menu}">clear</a>
          <div class="overlay-content">
            <a href="${url}/user/${this.usId}/edit">Account Settings</a>
            <a href="${url}/logout">Logout</a>
          </div>
        </div>
        <tiny-modal id="modal" class="tiny-modal" @modal-display="${this.closeModal}"></tiny-modal>
    `;
  }
}
customElements.define('user-header', UserHeader);
