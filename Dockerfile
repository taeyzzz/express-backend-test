from node:10-alpine

WORKDIR /usr/app

ENV NODE_ENV=production
ENV PORT=4000

COPY package.json ./
COPY yarn.lock ./
COPY ./src ./src
COPY ./app.js ./
COPY ./server.js ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN yarn
EXPOSE 4000

CMD ["node", "server.js"]
