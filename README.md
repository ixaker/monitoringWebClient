Monitoring - фронтенд частина застосунку для контролю над віддаленими компьютерами. Ми бачимо пристрої онлайн, інформацію про їхні жорскі диски, маємо можливість керувати компьютерами, дисками, шифрувати і блокувати.

Запуск проєкта в режимі розробки:
- встановити залежності - npm install
- в файлі next.config.mjs закоментувати рядок  output: 'export',
- запустити npm run dev

Запуск робочої версії:
- в файлі next.config.mjs розкоментувати рядок  output: 'export',
- запустити npm run build
- файли згенеруються в папці out
- встановити веб сервер і скопіювати у відповідну папку файли з папки out

Власний веб сервер:
- запуск в режиму розробки - npm servstart
- в режимі роботи - запустити службу на Linux
- папка для завантаження робочих файлів - public

Створення служби додатку для Linux

    sudo nano /etc/systemd/system/monitoringWebClient.service

    [Unit]
    Description=monitoringWebClient
    After=network.target
    
    [Service]
    Type=simple
    WorkingDirectory=/root/dew/monitoringWebClient
    ExecStart=/usr/bin/node index.js
    Restart=always
    RestartSec=10
    
    [Install]
    WantedBy=multi-user.target

    sudo systemctl daemon-reload
    sudo systemctl enable monitoringWebClient
    sudo systemctl start monitoringWebClient
    sudo systemctl disable monitoringWebClient
    sudo systemctl stop monitoringWebClient
    sudo systemctl restart monitoringWebClient
    
 