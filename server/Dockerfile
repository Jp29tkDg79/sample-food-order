FROM node:alpine

ENV TZ=Asia/Tokyo

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]