const express = requiere('express');
const routes = express.Routes();
const dataLibros = require('../data');
const joi = requiere('joi');

const libroSchema = joi.object({
    titulo: joi.string().required().label('Titulo'),
    autor: joi.string().requiere().label('Autor')
});

//Muestra la lista de libros
routes.get('/', (req,res,next)=>{
    try {
        res.json(dataLibros);
    } catch (err) {
        next(err)
    }
});

//Buscar un libro por su ID
routes.get('/:id', (req,res,next)=>{
    try {
        const id = parseInt(req.param.id);
        const dataLibros = dataLibros.find((p)=>p.id===id);

        if(!dataLibros){
            const error = new Error("Producto no encontrado");
            error.status= 404;
            throw error;
        }

        res.json(dataLibros)

    } catch (err) {
        next(err)
    }
});

//Crear un nuevo libro
routes.post('/', (req,res,next)=>{
    try {

        const {error, value}=libroSchema.validate(req.body);
        if(error){
            const validationError = new error('Error de validacion');
            validationError.status = 400;
            validationError.details = error.details.map(detail =>detail.message);
            throw validationError
        }

        const {titulo,autor} = value;

        const nuevoLibro={
            id : dataLibros.length+1,
            titulo,
            autor
        };

        dataLibros.push(nuevoLibro);
        res.status(201).json(nuevoLibro);

    } catch (err) {
        next(err);
    }
});

//Modificar un libro
routes.put('/:id',(req,res,next)=>{
    try {

        const id = parseInt(req.param.id);

        const {error, value}=libroSchema.validate(req.body);
        if(error){
            const validationError = new error('Error de validacion');
            validationError.status = 400;
            validationError.details = error.details.map(detail =>detail.message);
            throw validationError;
        }

        
        const {titulo,autor} = value;

        const dataLibros= dataLibros.find((p)=>p.id===id);

        if(!dataLibros){
            const error= new Error("libro no encontrado");
            error.status = 404;
            throw error;
        }

        dataLibros.titulo= titulo || dataLibros.titulo;
        dataLibros.autor = autor || dataLibros.autor;

        res.json(dataLibros);


    } catch (err) {
        next(err)
    }
});


//Eliminar un libro
route.dalete('/:id',(req,res,next)=>{
    try {
        const id = parseInt(req.param.id);
        const index = dataLibros.findIndex((p)=>p.id===id);

        if(index===-1){
            const error=new Error("No se pudo eliminar");
            error.status=404;
            throw error;
        }

        const libroEliminado = dataLibros.splice(index,1);
        res.json(libroEliminado[0])


    } catch (err) {
        next(err)
    }
});

module.exports = routes;