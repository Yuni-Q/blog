import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Flappy = () => {
  useEffect(() => {
    const buildUrl = 'Build';
    const loaderUrl = buildUrl + '/web.loader.js';
    const config: any = {
      dataUrl: buildUrl + '/web.data',
      frameworkUrl: buildUrl + '/web.framework.js',
      codeUrl: buildUrl + '/web.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'DefaultCompany',
      productName: 'FlappyClone',
      productVersion: '1.0',
    };

    const container: any = document.querySelector('#unity-container');
    const canvas: any = document.querySelector('#unity-canvas');
    const loadingBar: any = document.querySelector('#unity-loading-bar');
    const progressBarFull: any = document.querySelector(
      '#unity-progress-bar-full',
    );
    const fullscreenButton: any = document.querySelector(
      '#unity-fullscreen-button',
    );
    const mobileWarning: any = document.querySelector('#unity-mobile-warning');

    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = 'unity-mobile';
      // Avoid draining fillrate performance on mobile devices,
      // and default/override low DPI mode on mobile browsers.
      config.devicePixelRatio = 1;
      mobileWarning.style.display = 'block';
      setTimeout(() => {
        mobileWarning.style.display = 'none';
      }, 5000);
    } else {
      canvas.style.width = '960px';
      canvas.style.height = '600px';
    }
    loadingBar.style.display = 'block';

    const script = document.createElement('script');
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + '%';
      })
        .then((unityInstance) => {
          loadingBar.style.display = 'none';
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        })
        .catch((message) => {
          alert(message);
        });
    };
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Unity WebGL Player | FlappyClone</title>
        <link rel="shortcut icon" href="TemplateData/favicon.ico" />
        <link rel="stylesheet" href="TemplateData/style.css" />
      </Helmet>
      <body>
        <div id="unity-container" className="unity-desktop">
          <canvas id="unity-canvas" width="960" height="600"></canvas>
          <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
              <div id="unity-progress-bar-full"></div>
            </div>
          </div>
          <div id="unity-mobile-warning">
            WebGL builds are not supported on mobile devices.
          </div>
          <div id="unity-footer">
            <div id="unity-webgl-logo"></div>
            <div id="unity-fullscreen-button"></div>
            <div id="unity-build-title">FlappyClone</div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Flappy;