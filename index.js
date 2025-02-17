import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

import fs from 'fs';
import express from 'express';
import proxy from './src/server/proxy.js';
import next from 'next';


// Запуск WebSocket сервера
// import startServer from './src/server/socketServer.js';

// startServer();

const dev = process.env.NODE_ENV !== 'production';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const __filename = '/etc/letsencrypt/live/monitoring.qpart.com.ua'
const __dirname = '/etc/letsencrypt/live/monitoring.qpart.com.ua'

const domian = process.env.domian;

const envFilePath = join(__dirname, 'env');
console.log(import.meta.url)
console.log('')

console.log(envFilePath)

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

if (!fs.existsSync(envFilePath)) {
    const defaultEnvData = `secret=my-secret-key
    domian=monitoring.qpart.com.ua
    botToken=5963182008:AAEAaqku-cJbC6Er7GHgYtVOZuR-8QO1fps
    chatId=672754822`;
  
    fs.writeFileSync(envFilePath, defaultEnvData);
}


const ssl_key = path.join(__dirname, 'privkey.pem');
const ssl_cert = path.join(__dirname, 'fullchain.pem');


const httpApp = express();
const httpsApp = express(); // Створення express для HTTPS

console.log(ssl_key)
console.log(ssl_cert)

const httpServer = http.createServer(httpApp);
const httpsServer = https.createServer({ key: fs.readFileSync(ssl_key), cert: fs.readFileSync(ssl_cert)}, httpsApp); // Використання express для HTTPS

// Підключення middleware проксі
// proxy(app);

httpApp.use((req, res, next) => {
    console.log('Redirecting to HTTPS');
    res.redirect('https://' + req.headers.host + req.url);
});


const staticFilesPath = '/root/dew/monitoringWebClient/out';

// Додайте middleware express.static() до вашого сервера HTTPS
httpsApp.use(express.static(staticFilesPath));


httpApp.get('/', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});


httpServer.listen(80, () => {
    console.log('HTTP server is running on port 80');
});

// Слухайте порт 443 для HTTPS
httpsServer.listen(443, () => {
    console.log('Secure server is running on port 443');
});
