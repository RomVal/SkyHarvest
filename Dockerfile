# Використовуємо базовий образ Node.js
FROM node:20.10-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]