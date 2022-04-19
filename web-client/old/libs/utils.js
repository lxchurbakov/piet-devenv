export const getColorCode = ([color, brightness]) =>
  [String.fromCharCode(color + '1'.charCodeAt(0)), String.fromCharCode(brightness + 'a'.charCodeAt(0))].join('');
