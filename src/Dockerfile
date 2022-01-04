FROM node:16.13.1
ENV NODE_ENV=production

EXPOSE 3000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build

RUN npm install -g serve

CMD serve -s build