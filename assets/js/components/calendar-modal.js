import { LitElement, html, css } from 'lit-element';
import { seedStyle } from '@seed-catalog/styles';
import '@seed-catalog/modal';

class CalendarModal extends LitElement {
  static get styles() {
    return [seedStyle, 
    css`
      .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      }
      .sd-icon {
        position: absolute;
        right: 5px;
        top: 5px;
      }
    `]
  } 

  render() {
    return html`
      <seed-modal centered>
      <button slot="button" class="sd-btn blue">Open Modal</button>
        <div slot="header" class="header">      
          <button class="sd-icon clear close"><i class="material-icons">close</i></button>
        </div>
        <div slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div slot="footer" class="footer">
          <button class="sd-btn blue-mate">Save</button>
        </div>
      </seed-modal>`;
  }
}

customElements.define('calendar-modal', CalendarModal);