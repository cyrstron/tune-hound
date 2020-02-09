export async function mountDeezerScript() {
  const script = document.createElement('script');
  const root = document.createElement('div');

  root.id = 'dz-root';

  script.type = 'text/javascript';
  script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';

  await new Promise((res, rej) => {
    document.body.append(script);
    document.body.append(root);

    window.dzAsyncInit = () => {
      delete window.dzAsyncInit;
      script.onerror = null;

      setTimeout(res, 1000);
    }

    script.onerror = (e) => {
      delete window.dzAsyncInit;

      script.remove();
      root.remove();

      rej(e);
    };
  });

  return {
    script,
    root,
  };
}

export function checkFlashEnabled() {
  let isFlashEnabled;

  try {
    isFlashEnabled = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
  } catch(exception) {
    isFlashEnabled = 'application/x-shockwave-flash' in navigator.mimeTypes && 
      typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined';
  }

  return isFlashEnabled;
}