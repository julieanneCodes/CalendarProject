import { LitElement, html } from 'lit-element';

class Modal extends LitElement {
  render() {
    return html`
      <div id="modalWrap" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>`;
  }
}

customElements.define('modal-window', Modal);