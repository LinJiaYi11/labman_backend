const corsOptions = {
    origin: ['https://victorious-pebble-0bf6fea10.3.azurestaticapps.net','https://delightful-river-0ac974110.3.azurestaticapps.net'],
    optionsSuccessStatus: 50,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204 
  }
export { corsOptions};