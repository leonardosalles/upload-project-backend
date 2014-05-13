//inclui algumas dependencias
var express  = require('express'),
    app      = express(),
    http     = require('http'),
    server   = http.createServer(app),
    mongoose = require('mongoose'); 

//aqui seta os heades para o front e configura onde sera feita o upload das imagens
app.configure(function () {
    app.use(express.bodyParser({keepExtensions: true, uploadDir: '/uploads' }));
    app.use(express.methodOverride());
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send("Bem vindo a API!");
});

//aqui ele carregas as rotas ou seja, serviços
routes = require('./routes/upload')(app);
routes = require('./routes/user')(app);


//aqui conecta com o banco
mongoose.connect('mongodb://localhost/upload', function(err, res) {
	if(err) {
		console.log('ERROR: ' + err);
	} else {
		console.log('Conectado!');
	}
});

//aqui ele seta a porta em que a api via rodar
server.listen(3000, function() {
    console.log("Api rodando em http://localhost:3000");
});