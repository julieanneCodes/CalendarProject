import { css } from 'lit-element';
export const calendarStyles = css`
  .calendarWrap {
  display: grid;
  min-height: 450px;
  max-height: 451px;
  grid-template-columns: repeat(7, 1fr);
  }
  .namesWrap {
    border: none;
    height: unset;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .daysWrap {
  min-height: 60px;
  position: relative;
  padding: 5px 5px 0px 5px;
  border: 1px solid #D9D9D6;
  overflow-y: hidden;
  }
  .eventWrap {
    color: whitesmoke;
    background-color: #5F8DDA;
    border-radius: 5px;
    cursor: pointer;
    padding: 2px 0px 2px 4px;
    margin-top: 2px;
  }
  .evenMore {
    background-color: #C6C4D2;
    color: #6C6A81;
  }
  .mth-wrp {
    font-size: 20px;
    color: #256BA2;
  }
  .stepperWrap {
    position: absolute;
    right: 320px;
    top: 25px;
    display: inline-flex;
    align-items: center;
  }
  .btn-s {
    border: none;
    color: #256BA2;
    background-color: transparent;
    border-radius: 5px;
    height: 30px;
    width: 40px;
    cursor: pointer;
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
    cursor: pointer;
  }
  .btn-sm:focus {
    outline: none;
  }
`;