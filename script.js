//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const authRouter = require("../routes/auth-routes");
const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/ONPA", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  senha: { type: String },
  celular: {type: String},
  endereco: {type: String},
  complemento: {type: String},
  CEP : {type : String}
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);


const AnimalSchema = new mongoose.Schema({
    nome: {type: String},
    idade : {type: Number},
    tipo : {type: String},
    raca: {type: String}
})

const Animal = mongoose.model("Animal", AnimalSchema);
//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const nome = req.body.nome;
  const senha = req.body.senha;
  const celular = req.body.celular;
  const endereco = req.body.endereco;
  const cep = req.body.cep;

  //validação de campos

  const usuario = new Usuario({
    nome: nome,
    senha: senha,
    celular: celular,
    endereco: endereco,
    cep: cep
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

const emailExists = await Usuario.findOne({senha : senha});



//rota de get de formulario
app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
