import { css } from 'lit-element';
export const calendarStyles = css`
  .calendarWrap {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  }
  .namesWrap {
    border: none;
    height: unset;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .daysWrap {
  height: 70px;
  position: relative;
  padding: 5px 5px 0px 5px;
  border: 1px solid #D9D9D6;
  overflow-y: hidden;
  }
  .eventWrap {
    color: whitesmoke;
    background-color: #5F8FB4;
    border-radius: 5px;
    cursor: pointer;
    padding: 4px 0px 4px 4px;
  }
  .mth-wrp {
    font-size: 20px;
    color: #256BA2;
  }
  .stepperWrap {
    position: absolute;
    right: 320px;
    top: 30px;
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