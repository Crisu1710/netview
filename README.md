# netview

## Project setup
```
cd client
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### server
```
npm install
```
### start
```
npm run dev
```

## docker-compose.yml 
```
version: '3'
services:
  netview:
    image: crisu1710/netview
    container_name: netview
    environment:
      - SQL_HOST=mysql
      - SQL_PW=PW
    ports:
      - 8200:5000
      - 3000:3000
    networks:
      - default
    restart: always
```
#### ENV
SQL_HOST=DB_IP

SQL_PW=DB_PW

SQL_USER=DB_USER

VUE_APP_BOTURL=DB_IP

### [nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers reached, watch
```
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
