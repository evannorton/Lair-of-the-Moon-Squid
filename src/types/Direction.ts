enum XDirection {
  Left = "left",
  Right = "right",
}
enum YDirection {
  Down = "down",
  Up = "up",
}
type Direction = XDirection | YDirection;

export default Direction;
export { XDirection, YDirection };
