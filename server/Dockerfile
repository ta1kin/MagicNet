FROM node:20-alpine

WORKDIR /server

COPY ./server .

RUN npm install
RUN npm run generate
RUN npm run migrate

EXPOSE 3000

CMD ["npm", "run", "start"]
