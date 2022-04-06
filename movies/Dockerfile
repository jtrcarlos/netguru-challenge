FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

#RUN npm run build

RUN mkdir ./src
COPY ./dist ./src

CMD ["node", "./src/main"]