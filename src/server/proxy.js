import { createProxyMiddleware } from 'http-proxy-middleware';
import httpProxy from 'http-proxy';

const proxyMiddleware = (app) => {

    const proxy = httpProxy.createProxyServer({
        target: 'http://localhost:3000', // Адреса вашого сервера Next.js
        changeOrigin: true,
    });

    // Перехоплюємо WebSocket-запити та проксімуємо їх через створений проксі сервер
    app.use('/socket.io', (req, res) => {
        proxy.web(req, res, { target: 'ws://localhost:3000', ws: true });
    });

    app.use(
        '/',
        createProxyMiddleware({
            target: 'http://localhost:3000', // Адреса вашого сервера Next.js
            changeOrigin: true,
        })
    );
};

export default proxyMiddleware;