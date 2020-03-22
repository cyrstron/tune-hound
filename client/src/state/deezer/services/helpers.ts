import { 
  IS_DEEZER_CONNECTED_KEY, 
  FLASH_MSG_IGNORED_KEY,
  IS_DEEZER_DISABLED_KEY,
} from "consts";
import { DeezerAdvancedQueryParams } from "../types";

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

export function getDeezerDisabledState(): boolean {
  return !!localStorage.getItem(IS_DEEZER_DISABLED_KEY) || false;
}

export function setDeezerDisabledState(isDisabled: boolean): void {
  if (isDisabled) {
    localStorage.setItem(IS_DEEZER_DISABLED_KEY, 'true');
  } else {
    localStorage.removeItem(IS_DEEZER_DISABLED_KEY);
  }
}

export function getFlashIgnoredState(): boolean {
  return !!localStorage.getItem(FLASH_MSG_IGNORED_KEY) || false;
}

export function setFlashIgnored(isIgnored: boolean): void {
  if (isIgnored) {
    localStorage.setItem(FLASH_MSG_IGNORED_KEY, 'true');
  } else {
    localStorage.removeItem(FLASH_MSG_IGNORED_KEY);
  }
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

declare global {
  interface Window {
    DZ: DeezerSdk.DZ;
    dzAsyncInit?: () => void;
  }
}

export async function mountDeezerScript(): Promise<{
  DZ: DeezerSdk.DZ,
  script: HTMLScriptElement,
  root: HTMLDivElement,
}> {
  const script = document.createElement('script');
  const root = document.createElement('div');

  root.id = 'dz-root';

  script.type = 'text/javascript';
  script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';

  const DZ = await new Promise<DeezerSdk.DZ>((res, rej) => {
    document.body.append(script);
    document.body.append(root);

    window.dzAsyncInit = () => {
      delete window.dzAsyncInit;
      script.onerror = null;

      res(window.DZ);
    }

    script.onerror = (e) => {
      delete window.dzAsyncInit;

      script.remove();
      root.remove();

      rej(e);
    };
  });

  return {
    DZ,
    script,
    root,
  };
}

export const deezerSearchOptionsKeys: {
  [key: string]: string
} = {
  track: 'track',
  artist: 'artist',
  album: 'album',
  label: 'label',
  durMin: 'dur_min',
  durMax: 'dur_max',
  bpmMin: 'bpm_min',
  bpmMax: 'bpm_max',
};

export function getAdvancedSearchString(
  props: DeezerAdvancedQueryParams = {}
): string {
  return Object.keys(props)
    .reduce<string>((queryString, propKey) => {
      const value = (props)[propKey];
      const key = deezerSearchOptionsKeys[propKey];

      if (!value) return queryString;

      const params = `${key}:"${value}"`;

      return queryString ? `${queryString} ${params}` : params;
    }, '');
}