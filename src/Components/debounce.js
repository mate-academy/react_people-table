export default function debounce(f, delay) {
  let timer;

  return function wrapper(...args) {
    clearTimeout(timer);

    timer = setTimeout(f, delay, ...args);
  };
}
