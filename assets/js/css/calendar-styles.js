import { css } from 'lit-element';
export const calendarStyles = css`
  .calendarWrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  }
  .namesWrap {
    border: none;
    text-align: center;
    height: unset;
    flex: 1 0 calc(14% - 10px);
  }
  .calendarWrap .daysWrap {
  flex: 1 0 calc(14% - 10px);
  margin: 5px;
  height: 100px;
  border: 1px solid black;
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
    height: 35px;
    width: 50px;
  }
  .btn-sm {
    height: 35px;
    background-color: #5F8FB4;
    color: whitesmoke;
    border: none;
    border-radius: 5px;
  }
`;