const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
const port = 3000;
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/static', express.static(__dirname + '/public')); 
app.use(expressLayouts)

app.get('/', (req, res) => {
  res.render('index', {page: "index"});
})

app.get('/nosotros', (req, res) => {
  res.render('about', {page: "about"});
})

app.get('/galeria', (req, res) => {
  res.render('galery', {page: "galery"});
})

app.get('/productos', (req, res) => {
  res.render('products', {page: "products"});
})

app.get('/escribenos', (req, res) => {
  res.render('chat', {page: "chat"});
})

io.on('connection', (socket) => {  
  socket.on('chat', (message) => {
    io.emit('recibido', {
      date: new Date(),
      txt: message
    })
  })
})

http.listen(port, () => console.log('listening on port 3000'));