const express = require('express'); // npm i express
// O próprio express possui outras dependencias a qual ele irá colocar no node_modules 
const app = express();
const consign = require('consign');  
// consign é responsável por carregar todos os arquivos da raiz do projeto 
const database = require('./config/database');

app.database = database;


app.use(express.json()); // Sem isso app não irá reconhecer o que é recebido em formado JSON
// console.log('Express OK'); retorna apenas no terminal 
// ... é um spread que neste caso retirou tudo e colocou no req.body e jogou em user



consign()
    .then('./api') // abre tudo em api
    .then('./routes/routes.js') // abre diretamente o arquivo routes.js
    .into(app); // executa tudo acima dentro de app

const port = 3002; 
app.listen(port, (err) => { // ouvir a porta 
    if(err) console.error(err);

    console.info(`Server Runnig on http://localhost:${port}`); 
    // URI da porta
});
