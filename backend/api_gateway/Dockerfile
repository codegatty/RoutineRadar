FROM node

WORKDIR /app

COPY package.json  /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY server.js /app/server.js

ENTRYPOINT [ "node","/app/server.js" ]