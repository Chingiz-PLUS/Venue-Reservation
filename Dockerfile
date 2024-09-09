FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./src/index.js


EXPOSE 3001

CMD ["npm", "start"]
