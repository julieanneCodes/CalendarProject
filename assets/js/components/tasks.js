import { LitElement, html, css } from 'lit-element';
import { dateFormatter } from '../utils/functions';
class Tasks extends LitElement {
  static get styles() {
    return css`
      .tasksWrapper {
        margin: 44px 0px 0px 10px;
      }
      .tsk-item {
        background-color: #5F8FB4;
        color: whitesmoke;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
      }
      .dateWrap {
        font-size: 18px;
      }

    `;
  }

  static get properties() {
    return {
      data: { type: Array }
    }
  }

  constructor() {
    super();
    this.data= [];
  }

  render() {
    return html`
      <div class="tasksWrapper">
        ${this.data.map(item => html`
          <div class="tsk-item">
            <div class="dateWrap">${dateFormatter(item.day).default}</div>
            <div class="nameWrap">${item.taskname}</div>
          </div>
          `)}
      </div>
    `;
  }

}
customElements.define('task-component', Tasks)