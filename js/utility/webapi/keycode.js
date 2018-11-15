export const isArrowUp = (keyCode) => keyCode === 38;
export const isArrowDown = (keyCode) => keyCode === 40;
export const isArrowUpDown = (keyCode) => isArrowUp(keyCode) || isArrowDown(keyCode);
export const isEnter = (keyCode) => keyCode === 13;
export const isESC = (keyCode) => keyCode === 27;
