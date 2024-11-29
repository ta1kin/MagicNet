FROM node:20-alpine

WORKDIR /client

COPY ./client .

RUN npm install
RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
