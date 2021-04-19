export function calcCssRatio(width, height) {
  return `${((height / width) * 100).toFixed(2)}%`;
}
