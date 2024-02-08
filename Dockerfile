FROM node:18

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY . .

RUN yarn install

RUN ls

EXPOSE 5000

CMD [ "yarn", "start"]