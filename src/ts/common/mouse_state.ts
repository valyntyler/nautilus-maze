interface MouseState {
  left: boolean;
  right: boolean;
  middle: boolean;
}

namespace MouseState {
  export function parse(buttons: number): MouseState {
    return {
      left: (buttons & 0b001) != 0,
      right: (buttons & 0b010) != 0,
      middle: (buttons & 0b100) != 0,
    };
  }
}

export default MouseState;
