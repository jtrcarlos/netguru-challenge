FROM node:14.15-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "./dist/main"]