nest-cli.json edit
{ "sourceRoot": "server" }


tsconfig.json
add to compilerOptions {
    "rootDir": "./src",
    "jsx": "react"
}


npm i webpack -D
npm i webpack-cli -D
    webpack.config.js::
    const path = require('path');
    
    module.exports = {
        mode: "production",
        entry: './src/client/App.tsx',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                }
            ]
        }
    };


npm i react -D
npm i react-dom -D


nginx settings
create folder config

nginx.conf::
    user nginx;
    worker_processes 1;
    pid /run/nginx.pid;
    
    events {
        worker_connections 512;
    }
    
    http {
        sendfile off;
        keepalive_timeout 10;
        server_tokens off;
    
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
    
        access_log /var/log/nginx/access.log;
        error_log  /var/log/nginx/error.log;
    
        include /etc/nginx/conf.d/*.conf;
    }

vhost.conf::
    upstream backend {
        server host.docker.internal:3000;
    }
    
    server {
    	listen 80;
    	server_name 127.0.0.1;
    	root /www/public;
    
    	location / {
    		try_files $uri @backend;
    	}
    
    	location @backend {
    		proxy_pass http://backend;
    		proxy_set_header X-Real-IP $remote_addr;
    		proxy_set_header Host $host;
    		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    	}
    }

mac
docker build -t 1.0.0 . && docker run -p 80:80 -p 443:443 -v `pwd`:/www/ --name nginx-nest-react 1.0.0

win
docker build -t 1.0.0 . && docker run -p 80:80 -p 443:443 -v `your-folder`:/www/ --name nginx-nest-react 1.0.0

