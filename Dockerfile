FROM node:6
EXPOSE 3000


ADD activiti-cloud-demo-ui /home/node/app
WORKDIR /home/node/app

RUN npm install -g http-server
RUN npm install && npm run build && rm -rf node_modules

CMD ["http-server", "-p 3000", "dist"]
