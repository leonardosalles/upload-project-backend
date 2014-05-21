module.exports = function(app) {
    var User = require('../models/user.js');
    
    //GET - Retorna todos os objetos da base, ou seja uma lista de usuarios
    findAllUsers = function(req, res) {
        User.find(function(err, users) {
            if(!err) {
            console.log('GET /user')
                res.send(users);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //GET - Retorna um registro de usuario, caso não encontre retorna mensagem com codigo 401 - Unauthorized
    findById = function(req, res) {
        User.findById(req.params.email, function(err, upload) {
            if(!err) {
                console.log('GET /upload/' + req.params.email);
                
                //verifica se a senha enviada confere com o email enviado
                if (req.params.email.toLowerCase() === upload.id.toLowerCase() && 
                        req.params.password === upload.password) {

                    var tmpUpload = upload;
                    
                    //remove a senha para não retornar no request
                    delete tmpUpload.password;

                    res.send(tmpUpload);
                } else {
                    res.send({message: 'Usuario ou senha não conferem!', httpCode: 401});
                }
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //POST - Insere na base um registro de usuario
    addUpload = function(req, res) {
        console.log('POST');
        console.log(req.body);

        var user = new User({
            id: req.body.email,
            name: req.body.name,
            level: req.body.level,
        });

        user.save(function(err) {
            if(!err) {
                console.log('Inserido com sucesso');

            } else {
                console.log('ERROR: ' + err);
            }
        });

        res.send(user);
    };

    //PUT - Atualiza um registro ja existente - Nao sera usado apenas para explicacao
    updateUpload = function(req, res) {
        User.findById(req.params.email, function(err, user) {
            user.id   = req.body.email;
            user.name    = req.body.name;
            user.level    = req.body.level;

            user.save(function(err) {
                if(!err) {
                    console.log('Atualizado com sucesso');
                } else {
                    console.log('ERROR: ' + err);
                }

                res.send(user);
            });
        });
    }

    //DELETE - Exclui um registro da base
    deleteUpload = function(req, res) {
        User.findById(req.params.email, function(err, user) {
            user.remove(function(err) {
                if(!err) {
                    console.log('Excluido com sucesso');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
    }

    //Cria as rotas com metodos HTTP para cada funcao a ser usada
    app.get('/user', findAllUsers);
    app.get('/user/:email', findById);
    app.post('/user', addUser);
    app.put('/user/:email', updateUser);
    app.delete('/user/:email', deleteUser);
}
