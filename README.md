ope# activiti-cloud-demo-ui

For local development:

* run application [in minikube](https://activiti.gitbooks.io/activiti-7-developers-guide/content/getting-started/minikube.html)
* usual `npm install` then `npm start`

For Docker, you can customise using the following environment variables:
* ACT_GATEWAY_URL (defaults to http://localhost:8080)
* ACT_IDM_URL (defaults to http://localhost:8081/openid-connect/token)

For example:
```
docker build activiti/activiti-cloud-demo-ui .
docker run -p 3000:3000 -d -e "ACT_GATEWAY_URL=http://gw:30080" -e "ACT_IDM_URL=http://idm:30081/auth/token" activiti/activiti-cloud-demo-ui
```
