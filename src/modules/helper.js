export function symbolCollapse(current, target) {
  return (
    current.offsetLeft < target.offsetLeft + target.offsetWidth &&
    current.offsetLeft + current.offsetWidth > target.offsetLeft &&
    current.offsetTop < target.offsetTop + target.offsetHeight &&
    current.offsetTop + current.offsetHeight > target.offsetTop
  );
}

export function frameCollapse(current, target) {
  return (
    current.offsetLeft < target.clientLeft ||
    current.offsetLeft + current.offsetWidth > target.clientWidth ||
    current.offsetTop < target.clientTop ||
    current.offsetTop + current.offsetHeight > target.clientHeight
  );
}
