const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
// definir la pagina principal
app.get('/',(req,res)=>{
    res.send('Hola mundo');
});

app.listen(PORT,()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})