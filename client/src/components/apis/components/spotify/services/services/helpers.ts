export async function mountSpotifyScript(): Promise<HTMLScriptElement> {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = 'https://sdk.scdn.co/spotify-player.js';

  await new Promise((resolve, reject) => {
    document.body.append(script);

    script.onerror = (e) => {
      delete script.onerror;

      script.remove();
      reject(e);
    };
    window.onSpotifyWebPlaybackSDKReady = () => {
      delete window.onSpotifyWebPlaybackSDKReady;

      resolve();
    }

  });

  return script;
}