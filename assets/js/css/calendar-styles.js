import { css } from 'lit-element';
export const calendarStyles = css`
  .calendarWrap {
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
}
.calendarWrap div {
  flex: 1 0 calc(14% - 10px);
  margin: 5px;
  height: 100px;
  border: 1px solid black;
}
`;