import { LitElement, html, css } from 'lit-element';
import { commonFetch, url, noFound} from '../utils/utils';
import '../components/searcher-component';
import '../components/edit-modal';

class SearcherView extends LitElement {
  static get styles() {
    return css`
      .modal, .edit {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      userIde: { type: Number },
      modalInfo: { type: Array },
      requestData: { type: Array },
      editInfo: { type: Array }
    }
  }

  constructor() {
    super();
    this.userIde = 0;
    this.modalInfo = [];
    this.requestData = [];
    this.editInfo = [];
  }

  modal(e) {
     this.modalInfo = [e.detail];
  }

  edit(e){
    const modal = this.shadowRoot.getElementById('edit-window');
    modal.style.display = 'block';
    this.editInfo = e.detail;
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
      <calendar-modal class="modal" id="modal-window" @modal-display="${this.closeModal}" @more-modal="${this.modal}" .eventInfo="${this.modalInfo}" @edit-modal="${this.edit}"></calendar-modal>
      <edit-modal class="edit" id="edit-window" .editInfo="${this.editInfo}"></edit-modal>
    `;
  }
}
customElements.define('searcher-view', SearcherView);