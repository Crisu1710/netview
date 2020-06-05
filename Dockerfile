FROM node:alpine
MAINTAINER Robin Schneider <m2rs@posteo.de>
ENV MODE=DEV
ENV SQL_HOST=localhost
ENV SQL_PW=password
ENV SQL_USER=root
RUN npm install -g serve
WORKDIR /app
COPY start-server.sh /start-server.sh
COPY . .
RUN npm install
RUN cd client && npm install && npm run build
RUN cd ..
USER root
RUN wget -O /dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64 && \
    chmod +x /dumb-init

EXPOSE 5000
EXPOSE 3000
ENTRYPOINT ["/dumb-init", "/start-server.sh"]
