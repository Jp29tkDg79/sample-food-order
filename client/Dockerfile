FROM node:alpine

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV TZ=Asia/Tokyo

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]