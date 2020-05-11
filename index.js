const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({extended: true}));

// puerto de la app
const PORT = process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));

// definir la pagina principal
app.get('/',(req,res)=>{
    res.send('Hola mundo');
});

app.listen(PORT,()=>{
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})