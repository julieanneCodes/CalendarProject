import { LitElement, html, css } from 'lit-element';
import { commonFetch, url, noFound} from '../utils/utils';
import '../components/searcher-component';

class SearcherView extends LitElement {
  static get styles() {
    return css`
      .modal {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      userIde: { type: Number },
      modalInfo: { type: Array },
      requestData: { type: Array }
    }
  }

  constructor() {
    super();
    this.userIde = 0;
    this.modalInfo = [];
    this.requestData = [];
  }

  modal(e) {
     this.modalInfo = [e.detail];
  }

  async getData(e) {
    const result = await commonFetch(`${url}/search?event=${e.detail.data}&userIde=${this.userIde}`, {method: 'GET'});

    if (result.length > 1) {
      const more = {
        moreEvents: [{'eventname': result.length + ' events'}, ...result]
      };
      this.modalInfo = [more];

    } else if (result.length === 0) {
      this.modalInfo = [{'eventname': noFound}];
    } else {
      this.modalInfo = [...result];
    }
    const modal = this.shadowRoot.getElementById('modal-window');
    modal.style.display= e.detail.style;
  }

  closeModal(e) {
    const modal = e.target;
    modal.style.display= e.detail;
  }

  render() {
    return html`
      <searcher-component .userIden="${this.userIde}" @search-open="${this.getData}"></searcher-component>
      <calendar-modal class="modal" id="modal-window" @modal-display="${this.closeModal}" @more-modal="${this.modal}" .eventInfo="${this.modalInfo}"></calendar-modal>
    `;
  }
}
customElements.define('searcher-view', SearcherView);