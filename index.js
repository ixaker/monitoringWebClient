import http from "http";
import https from "https";
import { join } from "path";
import path from "path";
import fs from "fs";
import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const dotenv_domain = process.env.NEXT_PUBLIC_DOTENV_DOMAIN;
const dotenv_secret_key = process.env.DOTENV_SECRET_KEY;
const dotenv_chat_id = process.env.DOTENV_CHAT_ID;
const dotenv_bottoken = process.env.DOTENV_BOTTOKEN;

const __dirname = `/etc/letsencrypt/live/${dotenv_domain}`;

const envFilePath = join(__dirname, "env");
console.log(import.meta.url);
console.log("");

console.log(envFilePath);

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

if (!fs.existsSync(envFilePath)) {
  const defaultEnvData = `DOTENV_SECRET_KEY=${dotenv_secret_key}
DOTENV_BOTTOKEN=${dotenv_bottoken}
DOTENV_CHAT_ID=${dotenv_chat_id}
NEXT_PUBLIC_DOTENV_DOMAIN=${dotenv_domain}`;

  fs.writeFileSync(envFilePath, defaultEnvData);
}

const ssl_key = path.join(__dirname, "privkey.pem");
const ssl_cert = path.join(__dirname, "fullchain.pem");

const httpApp = express();
const httpsApp = express(); // Створення express для HTTPS

console.log(ssl_key);
console.log(ssl_cert);

const httpServer = http.createServer(httpApp);
const httpsServer = https.createServer(
  { key: fs.readFileSync(ssl_key), cert: fs.readFileSync(ssl_cert) },
  httpsApp
); // Використання express для HTTPS

// Підключення middleware проксі
// proxy(app);

httpApp.use((req, res) => {
  console.log("Redirecting to HTTPS");
  res.redirect("https://" + req.headers.host + req.url);
});

const staticFilesPath = "/root/dew/monitoringWebClient/out";

// Додайте middleware express.static() до вашого сервера HTTPS
httpsApp.use(express.static(staticFilesPath));

httpApp.get("/", (res) => {
  res.sendFile(path.join(staticFilesPath, "index.html"));
});

httpServer.listen(80, () => {
  console.log("HTTP server is running on port 80");
});

// Слухайте порт 443 для HTTPS
httpsServer.listen(443, () => {
  console.log("Secure server is running on port 443");
});
