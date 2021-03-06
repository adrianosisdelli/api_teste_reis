var mysql = require('mysql2');
var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: ''
});

connection.connect();

app.get('/livro', function (req, res){

    connection.query('select * from livro', function(err, rows, fields) {
        res.json(rows);
    });
});

app.post('/livro', function(req, res){

    var parameters = [req.body.titulo, req.body.autor, req.body.isbn, req.body.ano];
    var query = 'insert into livro (titulo, autor, isbn, ano_edicao) values (?, ?, ?, ?)';

    connection.query(query, parameters, function(err, rows, fields) {

        res.json({mensagem: 'Inserido.'});
    });

});

app.put('/livro/:id', function(req, res){

    var parameters = [req.body.titulo, req.body.autor, req.body.isbn, req.body.ano, req.params.id];
    var query = 'update livro set titulo = ?, autor = ?, isbn = ?, ano_edicao = ? where id = ?';

    connection.query(query, parameters, function(err, rows, fields) {

        res.json({mensagem: 'Atualizado.'});
    });

});

app.delete('/livro/:id', function(req, res){

    var parameters = [req.params.id];
    var query = 'delete from livro where id = ?';

    connection.query(query, parameters, function(err, rows, fields) {

        res.json({mensagem: 'Deletado.'});
    });

});

console.log('Aplicação iniciada...');
app.listen(3000);
