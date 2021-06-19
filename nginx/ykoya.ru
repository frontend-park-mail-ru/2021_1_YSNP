server {
        server_name ykoya.ru www.ykoya.ru;
        access_log /var/log/nginx/ykoya/access.log;
        error_log /var/log/nginx/ykoya/error.log;

    location / {
        root /home/ubuntu/frontend_2021_1_YSNP/dist;
        try_files $uri /index.html;
    }

    location /api/v1 {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/v1/chat/ws {
      proxy_pass http://localhost:8080;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        root /home/ubuntu/backend_2021_1_YSNP;
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/ykoya.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/ykoya.ru/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.ykoya.ru) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = ykoya.ru) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;
        server_name ykoya.ru www.ykoya.ru;
    return 404; # managed by Certbot
}