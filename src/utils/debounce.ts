let timeout: null | ReturnType<typeof setTimeout>;
const debounce = (func: Function, time: number) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  timeout = setTimeout(() => func(), time);
};

export default debounce;
