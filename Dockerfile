
FROM node:current-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

CMD [ "node", "dist/app.js" ]

