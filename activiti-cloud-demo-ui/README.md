<h1 align="center">Activiti 7 Cloud</h1>

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

