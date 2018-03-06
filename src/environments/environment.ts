// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apis: {
    dota: 'http://a27a244ac04ec11e883ba0a272b709a6-192626952.us-east-1.elb.amazonaws.com'
  }
};
