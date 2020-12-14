import { css } from 'lit-element';
export const calendarStyles = css`
  .calendarWrap {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 40px;
  }
  .namesWrap {
    border: none;
    height: unset;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .daysWrap {
  height: 75px;
  position: relative;
  }
  .daysWrap {
    border: 1px solid #256BA2;
  }
  .mth-wrp {
    font-size: 20px;
    color: #256BA2;
  }
  .stp-container {
    position: relative;
  }
  .stepperWrap {
    position: absolute;
    right: 5px;
    display: inline-flex;
    align-items: center;
  }
  .btn-s {
    border: none;
    background-color: #256BA2;
    color: whitesmoke;
    border-radius: 5px;
    height: 30px;
    width: 40px;
  }
  .btn-s:focus {
    outline: none;
  }
  .btn-sm {
    height: 30px;
    background-color: #5F8FB4;
    color: whitesmoke;
    border: none;
    border-radius: 5px;
    margin: 0px 5px;
  }
  .btn-sm:focus {
    outline: none;
  }
`;