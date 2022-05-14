FROM node:16-alpine

EXPOSE 9000

WORKDIR /opt/server

ADD ./dist/main.js /opt/server/main.js

ENV NODE_ENV production

CMD ["node", "main.js"]
