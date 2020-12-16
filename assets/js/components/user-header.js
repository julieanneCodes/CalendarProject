import { LitElement, html, css } from 'lit-element';
import { headerStyles } from '../css/header-styles';
class UserHeader extends LitElement {
  static get styles() {
    return [ headerStyles ]
  }

  static get properties() {
    return {
      appName: { type: String },
      usId: { type: Number },
    }
  }

  constructor() {
    super();
    this.appName = 'Bethink';
    this.usId = 0;
   }

  menu(e) {
    console.log(e.currentTarget.classList.value);
    const burgerMenu = this.shadowRoot.getElementById('burgerMenu');
    if(e.target.id === 'open-brg' ) {
      burgerMenu.style.height = '100%';
    }
    if(e.target.id === 'close-brg') {
      burgerMenu.style.height = '0%';
    }
  }
  render() {
    return html`
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="pseudoHeader">
          <a href="/home" class="home"><h1>${this.appName}</h1></a>
          <span class="material-icons leaf">eco</span>
          <h1 class="title">Calendar & Tasks</h1>
                <div class="burgerMenu">
                    <button class="burger material-icons menu" id="open-brg" @click="${this.menu}">menu</button>
                </div>
        </div>
        <div id="burgerMenu" class="sidepanel">
          <a href="javascript:void(0)" class="closebtn material-icons" id="close-brg" @click="${this.menu}">clear</a>
          <div class="overlay-content">
            <a href="user/${this.usId}/edit">Account Settings</a>
            <a href="logout">Logout</a>
          </div>
        </div>
    `;
  }
}
customElements.define('user-header', UserHeader);
