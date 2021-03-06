
FROM node:current-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/app.js" ]

