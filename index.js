const express = require('express');
const http = require('http');
const routes = require('./routes')
const bodyParser = require('body-parser');

const app = express();
const port = 1250;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use( express.static('public') );

routes.loadRoutes(app);

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log('Escuchando el puerto: ' + port);
});

// const express = require('express');
// const fs = require('fs');
// const http = require('http');
// const https = require('https');
// const routes = require('./routes')
// const bodyParser = require('body-parser');

// const app = express();
// const privateKey = fs.readFileSync('/etc/ssl/private/private.key', 'utf8');
// const certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// const port = 1251;
// const portSSL = 1250;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json({ limit: '50mb', extended: true }));
// app.use( express.static('public') );

// routes.loadRoutes(app);

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(port, () => {
//   console.log('Escuchando el puerto: ' + port);
// });
// httpsServer.listen(portSSL, () => {
//   console.log('Escuchando el puerto seguro: ' + portSSL);
// });