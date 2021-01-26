import { css } from 'lit-element';
export const modalStyles = css`
  .mdl-wrp {
    position: fixed;
    z-index: 1;
    padding-top: 50px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 5px;
    max-height: 460px;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }
  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }
  .btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #6C6A81;
  }
  .btn:focus {
    outline: none;
  }
  .modal-nav {
    position: relative;
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(9, 1fr);
  }
  .btn:nth-of-type(1) {
    grid-column-start: 7;
  }
  .btn:nth-of-type(3) {
    position: absolute;
    right: 0;
  }
  .event-info {
    margin-top: 20px;
  }
  .item {
    margin: 10px;  
  }
  .item.detail {
    margin: 0px 0px 10px 0px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    letter-spacing: .2px;
  }
  .item.detail:nth-of-type(1) {
    font-size: 22px;
  }
  .moreEvnt {
    border: none;
    background-color: #919CD4;
    color: #E5E1E6;
    font-size: 18px;
    padding: 2px 0px 2px 4px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  .moreEvnt:nth-of-type(1) {
    background-color: transparent;
    color: #6C6A81;
    cursor: auto;
    text-align: center;
  }
  .btn-cancel,
  .btn-del {
    height: 30px;
    width: 100px;
    margin-top: 10px;
    border-radius: 5px;
    border: none;
    color: whitesmoke;
    background-color: #5F8DDA;
    cursor: pointer;
  }
  .btn-del {
    background-color: #BD3742;
  }
  h1 {
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    text-align: center;
  }
  .buttons {
    text-align: center;
  }
`;