FROM node:6
EXPOSE 3000


ADD demo-ui-client /home/node/app
WORKDIR /home/node/app

RUN npm install -g http-server
CMD ["http-server", "-p 3000"]
