# activiti-cloud-demo-ui

## Installing

To run or build the app without hassles, make sure that your machine is running Node version 8.2.0 or higher. Install required libraries by using below command.

```sh
npm install
```

## Run in development mode

```sh
npm start
```

This command compiles and starts the project in watch mode.
Browser will automatically reload upon changes.
Upon start you can navigate to `http://localhost:3000` with your preferred browser.

## Production build

```sh
npm run build
```

This command builds project in `production` mode.
All output is placed to `dist` folder and can be served from your preferred APS web server or from any other web server.
You should need no additional files outside the `dist` folder

## Test build

```sh
npm run test-single-run
```

This command runs unit test cases written in the project.

## Application settings (server-side)

All server-side application settings are stored in the `app.config.json` file.
By default the configuration file has the content similar to the following one:

```json
{
    "apiHost": "my-api-host",
    "oauth2" : {
      "host": "my-auth-api-host",
      "authPath": "/my-auth-path/auth/token",
      "clientId": "my-client-id",
      "secret": ""
    },
    "logLevel" : "trace"
}
```

You can change the API end point here and provide the OAuth parameters of your external providers.

## Application settings (server-side)

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

