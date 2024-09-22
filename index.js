const http = require('http');
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
require('dotenv').config();


//Exportando Minhas rotas
const connection = require("./database/database")
const ProdutoController = require("./src/Controller/ProdutoController")
const CategoriaController = require("./src/Controller/CategoriaController")

// arquivos staticos
app.use(express.static(__dirname + "/public/"));




// Body Parser Formulários
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.listen(process.env.PORT || 3000, () => {
    console.log("Server On....")
  
});

// banco de dados
connection
    .authenticate()
    .then(() => {
        // console.log("Conectado ao banco")
    }).catch((erro) => {
        console.log(erro)
    })



//Usando Rotas 

app.use("/", ProdutoController)
app.use("/", CategoriaController)




