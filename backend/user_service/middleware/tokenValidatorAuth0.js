const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://RoutineRadorUserAuth/',
    issuerBaseURL: 'https://dev-4jfiy6jgo6zsib84.us.auth0.com/',
    tokenSigningAlg: 'RS256',
  });


  module.exports=jwtCheck