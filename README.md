Monitoring - фронтенд частина застосунку для контролю над віддаленими компьютерами. Ми бачимо пристрої онлайн, інформацію про їхні жорскі диски, маємо можливість керувати компьютерами, дисками, шифрувати і блокувати.
Також в проєкті знаходиться бекенд на node.js в файлі index.js

Запуск проєкта в режимі розробки:

- встановити залежності - npm install
- в файлі next.config.mjs закоментувати рядок output: 'export',
- запустити npm run dev

Запуск робочої версії:

- в файлі next.config.mjs розкоментувати рядок output: 'export',
- запустити npm run build
- файли згенеруються в папці out
- встановити веб сервер і скопіювати у відповідну папку файли з папки out
  В поточній версії ця папка знаходиться на VPS сервері за адресою '/root/dew/monitoringWebClient/public';

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

Послідовність роботи застосунка:

Вхід по паролю

layout.js підключає ReduxProvider і огортає в нього всі компоненти нащадків
page.js підключає всі основні компоненти: - отримує зі стейту devices - встановлює loading для відображення лоадера - відмальовує всі компоненти - підключає компонент з'єднання по сокет

Коли по вебсокет отримується масив інформації, вона за допомогою rtk записується в store застосунку.
SetLoading змінюється на true і замість лоадера відмальовується основний інтерфейс застосунку.
Проходимось по масиву devices відмальовуємо компоненти <DeviceUI> - відображає весь пристрій
<DeviceUI> - ключовий компонент, який відображає всі елементи, які відносяться до одного пристрою

В <DeviceUI> по масиву значень discs, який передається з page.js вімальовуються диски одного пристрою за допомогою DiskMenu, в яке через пропси передаються занчення.

<DeviceMenu> - дає можливість вимкнути або перезавантажити пристрій за допомогою функції sendDataToServer. Передаючі відповідні команди для командного рядка.

<DiskMenu> - дає інтерфейс для роботи з дисками приладу. В залежності від поточного стану надає можливість зашифрувати диск, розшифрувати диск, активувати шифрування. Для цього виводить поля з input, в який вводиться паролі.

Компонент TurnOffAll - вимикає всі компьютери за допомогою функції sendTurnOffAll() з SocketConection.js за допомогою відправлення по веб сокету socket.emit('disable', {});

SocketConection.js робить підключення по вебсокету до бекенда і виконує рядк функцій:

- sendDataToServer - відправляє emit з повідомленням 'command', топіком 'command' і текстовим рядком, який в нього передали. Цей рядок виконується на бекенді в командному рядку.

- sendNickToServer відправляє emit з повідомленням 'command' і topic 'nickname'. У функцію треба передати nikname та id прилада, щоб присвоїти йому певне ім'я

- sendTurnOffAll відправляє emit з повідомленням 'disable' і пустим обєктом, щоб вимкнути всі пристрої

- sendTelegram відправляє emit З повідомленням 'telegram і текстом, який буде відправлено в телеграм.

page.js
|
├─SocketConection
├─AppLoader
├─TurnOffAll
├─Auth
├─DeviceUI
| ├─DeviceMenu
| | ├── MenuButton 'вимкнути'
| | └── MenuButton 'перезавантажити'
| ├─DeviceInfo
| | ├── NicknameInput
| ├─DiskUI
| | ├── DiskUsageProgressBar
| | └── DiskMenuItem
| | └── DiskMenu
| ├─GraphicContainer
| | ├── ChartUI
| ├── DeviceInputForm
