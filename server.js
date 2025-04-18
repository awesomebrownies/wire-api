const express = require('express'),
  cookieParser = require('cookie-parser'),
  log = require('morgan'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  upload = multer(),
  app = express(),
  {createServer} = require('node:http');

PORT = process.env.PORT || 3000,
NODE_ENV = process.env.NODE_ENV || 'development';

const httpServer = createServer(app);
app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(cors());
app.use(log('tiny'));

app.use(express.json());

app.use(express.text());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(upload.array());
app.use(express.static('public'));
app.use(cookieParser());


const io = require('socket.io')(httpServer, {path: '/client/socket.io'});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`, args);
  });
  socket.on('msg', (data) => {
    console.log('msg event received:', data);
  });
});

module.exports = { app, io, httpServer };

require('./routes')(app);

app.use((req, res, next) => {
  res.status(404).send({ status: 404, error: 'Not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  res.status(status).send({ status, error: msg });
});

httpServer.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
  );
});