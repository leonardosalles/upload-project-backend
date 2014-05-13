module.exports = function(app) {
    //aqui carrega a model para uso
    var Upload = require('../models/upload.js');

    //GET - Retorna todos os objectos da base, ou seja uma lista
    findAllUploads = function(req, res) {
        Upload.find(function(err, uploads) {
            if(!err) {
            console.log('GET /upload')
                res.send(uploads);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //GET - Retorna um registro de imagem enviada, recebe o email como parametro para busca
    findById = function(req, res) {
        Upload.findById(req.params.email, function(err, upload) {
            if(!err) {
                console.log('GET /upload/' + req.params.email);
                res.send(upload);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //POST - Insere na base um registro e salva as imagens na pasta 'uploads'
    addUpload = function(req, res, next) {
        console.log('POST');
        console.log(req.body);

        var upload = new Upload({
            email: req.body.email,
            name: req.body.name,
            image1: req.body.image1,
            image2: req.body.image2
        });

        upload.save(function(err) {
            if(!err) {
                console.log('Inserido com sucesso');

            } else {
                console.log('ERROR: ' + err);
            }
        });

        res.send(upload);
        return next()
    };

    //PUT - Atualiza um registro ja existente - Nao sera usado apenas para explicacao
    updateUpload = function(req, res) {
        Upload.findById(req.params.email, function(err, upload) {
            upload.email   = req.body.email;
            upload.name    = req.body.name;
            upload.image1    = req.body.image1;
            upload.image2    = req.body.image2;

            upload.save(function(err) {
                if(!err) {
                    console.log('Atualizado com sucesso');
                } else {
                    console.log('ERROR: ' + err);
                }

                res.send(upload);
            });
        });
    }

    //DELETE - Exclui um registro da base
    deleteUpload = function(req, res) {
        Upload.findById(req.params.email, function(err, upload) {
            upload.remove(function(err) {
                if(!err) {
                    console.log('Excluido com sucesso');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
    }

    //Cria as rotas com metodos HTTP para cada funcao a ser usada
    app.get('/upload', findAllUploads);
    app.get('/upload/:email', findById);
    app.post('/upload', addUpload);
    app.put('/upload/:email', updateUpload);
    app.delete('/upload/:email', deleteUpload);
}