FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /server

COPY ./server .

RUN npm install

RUN npm run generate

EXPOSE 3000

CMD ["npm", "run", "start"]
