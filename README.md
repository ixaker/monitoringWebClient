<h3>Создание службы для приложения:</h3>

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
    
 <hr>