import { 
  IS_DEEZER_CONNECTED_KEY, 
  FLASH_MSG_IGNORED_KEY,
} from "consts";

export function getDeezerConnectedState(): boolean {
  return !!localStorage.getItem(IS_DEEZER_CONNECTED_KEY) || false;
}

export function setDeezerConnectedState(isConnected: boolean): void {
  if (isConnected) {
    localStorage.setItem(IS_DEEZER_CONNECTED_KEY, 'true');
  } else {
    localStorage.removeItem(IS_DEEZER_CONNECTED_KEY);
  }
}

export function getFlashIgnoredState(): boolean {
  return !!localStorage.getItem(FLASH_MSG_IGNORED_KEY) || false;
}

export function getIsFlashEnabled() {
  let isFlashEnabled;

  try {
    isFlashEnabled = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
  } catch(exception) {
    isFlashEnabled = 'application/x-shockwave-flash' in navigator.mimeTypes && 
      typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined';
  }

  return isFlashEnabled;
}

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

      res();
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
