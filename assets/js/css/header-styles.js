import { css } from 'lit-element';
export const headerStyles = css `
  .home {
    text-decoration: none;
    font-family: 'Lobster', cursive;
  }
  .pseudoHeader {
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(7, 1fr);
    position: relative;
    align-items: center;
    padding: 0px 15px;
  }
  .btnSignIn {
    position: absolute;
    right: 15px;
  }
  .btn-sign {
    width: 70px;
    height: 30px;
    background-color: #5F8FB4;
    color: whitesmoke;
    border-radius: 5px;
    font-size: 15px;
    border: none;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
  }
  .btn-sign:focus {
    outline: none;
  }
  .leaf, .user, .menu {
    font-size: 35px;
  }
  .home, .leaf, .user, .menu {
    color: #5F8FB4;
  }
  .burger {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .burger:focus {
    outline: none;
  }
  .burgerMenu {
    position: absolute;
    right: 0;
    grid-column-start: 7;
  }
  .userWrap {
    position: relative;
  }
  .sidepanel {
    height: 0%;
    width: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: #5F8FB4;
    overflow-y: hidden;
    transition: 0.5s;
  }
  .overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .sidepanel a {
    padding: 8px;
    text-decoration: none;
    color: whitesmoke;
    display: block;
    transition: 0.3s;
  }
  .sidepanel .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
  }
  .home {
      position: relative;
  }
  .leaf {
      position: absolute;
      left: 110px;
  }
  .title {
    color: #256BA2;
    font-family: 'Libre Baskerville', serif;
    font-size: 20px;
  }
  .title.col {
    grid-column-start: 3;
  }
`;