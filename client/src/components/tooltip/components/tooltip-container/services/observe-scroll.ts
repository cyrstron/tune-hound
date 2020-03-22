export function observeScroll(
  elem: HTMLElement, 
  callback: () => void
): () => void {
  let observedElem: HTMLElement = elem;
  
  while (observedElem.parentElement) {
    observedElem.parentElement.addEventListener('scroll', callback);

    observedElem = observedElem.parentElement;
  }

  window.addEventListener('scroll', callback);

  return () => {
    let observedElem: HTMLElement = elem;

    while (observedElem.parentElement) {
      observedElem.parentElement.removeEventListener('scroll', callback);

      observedElem = observedElem.parentElement;
    }

    window.removeEventListener('scroll', callback);
  }
}