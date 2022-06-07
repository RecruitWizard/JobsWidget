FROM node:16.15.1
ENV NODE_ENV=production

EXPOSE 80

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build

RUN npm install -g serve

CMD serve -p 80 -s build