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
