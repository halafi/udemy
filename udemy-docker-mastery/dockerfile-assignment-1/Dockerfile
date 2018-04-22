FROM node:6-alpine

EXPOSE 3000

RUN apk add --no-cache tini
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json package.json

RUN npm install && npm cache clean

COPY . .

CMD [ "/sbin/tini", "--", "node", "./bin/www" ]