import { LitElement, html} from 'lit-element';
import {searcherStyles } from '../css/searcher-styles';

class SearcherComponent extends LitElement {
  static get styles() {
    return[ searcherStyles ]
  }

  static get properties() {
    return {
      userIden: { type: Number}
    }
  }

  constructor() {
    super();
    this.userIden = 0;
  }

  search() {
    const query = this.shadowRoot.getElementById('search').value;

    const event = new CustomEvent('search-open', {
      detail: {
        data: query.toLowerCase(),
        style: 'block'
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div class="searcher">
        <div class="npt-wrp">
          <input type="text" id="search" class="form-controll" name="calendarName" placeholder="task or event name..."/>
        </div>
        <div class="btn-wrp">
          <button type="submit" class="searcherB material-icons glass" id="sButton" @click="${this.search}">search</button>
        </div>
      </div>
    `;
  }
}
customElements.define('searcher-component', SearcherComponent);