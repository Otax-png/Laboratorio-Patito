const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const publico = path.join(__dirname, "../public");

//require('dotenv').config()


const { dirname } = require('path')
    // !important! 
    // you need to install the following libraries |express|ejs|[dotenv > if required]
    // or run this command >> npm i express ejs dotenv 

//app.set('view engine', 'engine')

app.use(express.static(publico))

//mysqul 
const mysqlhost = process.env.MYSQLHOST || '192.168.1.25';
const mysqluser = process.env.MYSQLUSER || "prueba";
const mysqlpass = process.env.MYSQLPASS || "prueba";

//paquete
const mysql = require('mysql');
//conexión
const con = mysql.createConnection({
    host: mysqlhost,
    user: mysqluser,
    password: mysqlpass
});

//prueba
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected! :P hola a todos");
});

/**** mysql */

console.log(`serving ${publico}`);

app.get('/api/saludo', async(req, res) => {
    console.log("entrando /api/saludo");

    await setTimeout(() => {

        console.log("entrando2 . . . .");

        const con2 = mysql.createConnection({
            host: mysqlhost,
            user: mysqluser,
            password: mysqlpass
        });
        //prueba
        con2.connect(function(err) {
            if (err) {
                console.log("error");
                return res.status(503).json({ status: "not conected" });
            } else {
                console.log("not error");
                return res.status(202).json({ status: " todo bien" });
            }

        });

    }, 2500);
})


app.get('/', (req, res) => {
    console.log("desplegando html");
    res.sendFile(path.join(__dirname, "../html/index.html"));
});

//edn points

app.listen(port, () => console.log(`listening on http://localhost:${port}`));


app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/imagenes', express.static(__dirname + 'public/imagenes'))


app.get('/login', (req, res) => {
    console.log("hola")

    res.status(201).sendFile(path.join(__dirname, '../html/login.html'))

})

app.get('/Consulta', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../html/Consulta_paciente.html'))

})
app.get('/Subir', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../html/subirDatos.html'))

})
app.get('/registrar', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../html/registrar.html'))

})

app.get('/registrar-cliente', (req, res) => {

    res.status(201).sendFile(path.join(__dirname, '../html/registroCliente.html'))

})
app.listen(port, () => console.log('> Server is up and running on port : ' + port))