/**
 * @fileoverview
 * Servidor Express para renderizar una aplicación Angular Universal
 * (SSR) y servir archivos estáticos.
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

/**
 * Crea y configura el servidor Express para servir la aplicación Angular.
 * @returns {express.Express} La instancia del servidor Express.
 */
export function app(): express.Express {
  const server = express();
  
  // Ruta del directorio donde se encuentran los archivos estáticos
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  
  // Ruta del directorio donde se encuentran los archivos del navegador
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  
  // Ruta del archivo HTML de la aplicación
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Inicialización del motor de renderizado Angular Universal
  const commonEngine = new CommonEngine();

  // Configuración del motor de vistas como HTML
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Configuración para servir archivos estáticos (JS, CSS, etc.)
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // Manejo de todas las rutas regulares con el motor Angular Universal
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Renderizado en el servidor con Angular
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

/**
 * Inicia el servidor en el puerto configurado.
 */
function run(): void {
  const port = process.env['PORT'] || 4000;

  // Arranca el servidor Node
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
