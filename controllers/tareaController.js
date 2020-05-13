const Tarea = require('../models/Tareas');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.CrearTarea = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        const proyecto = await Proyecto.findById(req.body.proyecto);
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.obtenerTareas = async (req, res) =>{

    try {

        const proyecto = await Proyecto.findById(req.body.proyecto);
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }


        const Tareas = await Tarea.find({proyecto : req.body.proyecto}).sort({creado: -1});;

        res.json({Tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarTarea = async (req, res) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    try {

        const {nombre, estado, proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'})
        }

        const nuevaTarea={};

        nuevaTarea.nombre = nombre;
        if(estado) nuevaTarea.estado = estado;

        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id }, {$set : nuevaTarea}, {new: true});

        res.json({tarea});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarTarea = async (req, res) =>{


    try
    {
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrado'});
        }


        await Tarea.findOneAndRemove({_id: req.params.id });

        res.json({msg: 'Tarea Eliminada'});

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');
    }

}