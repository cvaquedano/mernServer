const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').notEmpty(),
    ],
    proyectoController.CrearProyecto
);

router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

router.put('/:id',
    auth,
    [
        check('nombre','El nombre es obligatorio').notEmpty(),
    ],
    proyectoController.actualizarProyecto
);

router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;