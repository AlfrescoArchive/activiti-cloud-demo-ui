FROM node:carbon

WORKDIR /home/node/app
RUN npm install -g http-server
COPY . .

ARG BASE_HREF_ARG="/"


ENV BASE_HREF=${BASE_HREF_ARG}
RUN [ "sh", "-c","echo BASEHREF=$BASE_HREF"]
RUN [ "sh", "-c","echo BASE_HREF_ARG=$BASE_HREF_ARG"]

RUN [ "sh", "-c","npm install && npm run build -- --base-href $BASE_HREF --deploy-url $BASE_HREF && rm -rf node_modules" ]
RUN chmod +x cmd.sh


EXPOSE 3000

CMD ["/home/node/app/cmd.sh"]
