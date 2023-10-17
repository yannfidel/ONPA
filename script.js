const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost/cadastrousuario.html', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conexão bem-sucedida com o MongoDB');
});

// Definir um modelo de usuário usando Mongoose
const UsuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    celular: String,
    endereco: String
    // Adicione os outros campos aqui
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Configurar o middleware para analisar o corpo da solicitação
app.use(bodyParser.urlencoded({ extended: false }));

// Rota para processar o envio do formulário
app.post('/cadastro', (req, res) => {
    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        celular: req.body.celular,
        endereco: req.body.endereco
        // Preencha os outros campos aqui
    });

    // Salvar o usuário no MongoDB
    novoUsuario.save((err) => {
        if (err) {
            console.error('Erro ao salvar o usuário:', err);
            res.sendStatus(500);
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.redirect('/');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});