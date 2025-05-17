enum MouseButton {
  Left,
  Right,
  Middle,
}

namespace MouseButton {
  export function parse(buttons: number): Array<MouseButton> | null {
    switch (buttons) {
      case 0:
        return [];

      case 1:
        return [MouseButton.Left];

      case 2:
        return [MouseButton.Right];

      case 3:
        return [MouseButton.Left, MouseButton.Right];

      case 4:
        return [MouseButton.Middle];

      case 5:
        return [MouseButton.Left, MouseButton.Middle];

      case 6:
        return [MouseButton.Right, MouseButton.Middle];

      case 7:
        return [MouseButton.Left, MouseButton.Right, MouseButton.Middle];

      default:
        return null;
    }
  }
}

export default MouseButton;
