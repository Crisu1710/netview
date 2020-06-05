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

### [nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers reached, watch
```
sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
