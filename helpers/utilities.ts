
export function useRetryWithDelay<T>(fn: () => Promise<T>, time: number) {
  let promise: null | Promise<T> = null;
  let t: number = -1;
  let delay = time / 2;

  function retry() {
    return new Promise((resolve) => {
      promise = fn();

      promise.then((res) => {
        promise = null;
        resolve(res);
      }).catch(() => {
        promise = null;
        delay *= 2;

        t = window.setTimeout(() => {
          retry().then(resolve);
        }, delay);
      });
    });
  }

  async function wrapper() {
    if (promise) {
      try {
        await promise;
      } catch (err) { /* empty */ }
    }
    clearTimeout(t);
    return retry();
  }

  return wrapper;
}
