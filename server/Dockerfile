FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run build   # doit générer dist/server.js

EXPOSE 5000

CMD ["node","dist/server.js"]