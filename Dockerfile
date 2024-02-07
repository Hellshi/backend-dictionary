FROM node:18

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

COPY . .

RUN yarn install --frozen-lockfile && yarn run build


RUN ls

CMD [ "yarn", "start"]