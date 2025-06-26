import { createProxyMiddleware } from "http-proxy-middleware";
import httpProxy from "http-proxy";

const proxyMiddleware = (app) => {
  const dotenv_port = process.env.NEXT_PUBLIC_DOTENV_API_PORT;
  const proxy = httpProxy.createProxyServer({
    target: "http://localhost:3000", // Адреса вашого сервера Next.js
    changeOrigin: true,
  });

  // Перехоплюємо WebSocket-запити та проксімуємо їх через створений проксі сервер
  app.use("/socket.io", (req, res) => {
    proxy.web(req, res, { target: `ws://localhost:${dotenv_port}`, ws: true });
  });

  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3000", // Адреса вашого сервера Next.js
      changeOrigin: true,
    })
  );
};

export default proxyMiddleware;
