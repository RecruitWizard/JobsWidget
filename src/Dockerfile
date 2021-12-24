FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["src/package.json", "src/package-lock.json*", "./"]

RUN npm install --production

COPY ./src .

CMD [ "node", "server.js" ]