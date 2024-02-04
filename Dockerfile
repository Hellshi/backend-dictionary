FROM node:18

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY . .

RUN yarn install && yarn run build

#COPY GeoIP2-City.mmdb /var/www/api/dist/GeoIP2-City.mmdb

RUN ls

CMD [ "yarn", "start"]