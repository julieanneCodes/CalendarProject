import { LitElement, html, css } from 'lit-element';
import { headerStyles } from '../css/header-styles';
import { url } from '../utils/utils';
import '../components/tiny-modal';

class SingleHeader extends LitElement {
  static get styles() {
    return [ headerStyles, css`
      .link {
        color: #256BA2;
        font-size: 20px;
      }
      span .link {
        position: absolute;
        bottom: 30px;
      }
    `]
  }

  static get properties() {
    return {
      appName: { type: String },
      usId: { type: Number },
      currentD: { type: Object },
      month: { type: String },
      title: { type: String },
      route: { type: String },
      viewRoute: { type: String },
      add: { type: String }
    }
  }

  constructor() {
    super();
    this.appName = 'Bethink';
    this.usId = 0;
    this.currentD = new Date();
    this.month = '';
    this.title = '';
    this.route = '';
    this.viewRoute = '';
    this.add = '';
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

  redirect(item) {
    location.href = item;
  }

  closeModal(e) {
    const modal = e.target;
    modal.style.display= e.detail;
  }

  render() {
    return html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="pseudoHeader">
          <a href="/home" class="home"><h1>${this.appName}</h1></a>
          <span class="material-icons leaf">eco</span>
          <h1 class="title col">${this.title}</h1>
          <div>
            <button class="material-icons btn" @click="${() => this.redirect(this.add)}">add_circle</button>
            <span>
              <a href="${this.route}" class="link">${this.viewRoute}</a>
            </span>
          </div>
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
      `;
  }
}
customElements.define('single-header', SingleHeader);
