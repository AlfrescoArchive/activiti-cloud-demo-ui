FROM node:6
EXPOSE 3000

ADD activiti-cloud-demo-ui /home/node/app
WORKDIR /home/node/app

RUN npm install -g http-server
RUN npm install && npm run build && rm -rf node_modules
RUN ACT_GATEWAY_URL=${ACT_GATEWAY_URL:-http://localhost:8080} && \
    ACT_IDM_URL=${ACT_IDM_URL:-http://localhost:8081/openid-connect/token} && \
    ACT_IDM_BASE_URL=$(echo $ACT_IDM_URL | cut -d / -f 1,2,3) && \
    echo ACT_GATEWAY_URL=$ACT_GATEWAY_URL && \
    echo ACT_IDM_URL=$ACT_IDM_URL && \
    echo ACT_IDM_BASE_URL=$ACT_IDM_BASE_URL && \
    sed -e "s@http://activiti-cloud-sso-idm-kub:30080@${ACT_GATEWAY_URL}@g" \
        -e "s@http://activiti-cloud-sso-idm-kub:30081@${ACT_IDM_BASE_URL}@g" \
        -e "s@/auth/realms/springboot/protocol/openid-connect/token@/${ACT_IDM_URL#*://*/}@g" -i dist/app.config.json

CMD ["http-server", "-p 3000", "dist"]
