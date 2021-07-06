# Stage 1

FROM node:lastest as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install npm@latest -g

RUN npm install

COPY . .

RUN npm run build #dist

FROM nginx:1.18.0-alpine
COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html
COPY ./nginx.config /etc/nginx/conf.d/default.conf