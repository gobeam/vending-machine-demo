FROM node:12.19.0-alpine3.9

RUN apk update && apk add bash

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build
