const express = require('express');
const route= express.Router();

let producto = [
    {id:1, nombre: "Producto 1", precio:10.99},
    {id:2, nombre: "Producto 2",precio:19.99},
    {id:3, nombre: "Producto 3", precio:5.99},
];

//Devuelve la lista de productos
route.get('/', (req,res, next)=>{
    try {
        res.json(producto);
    } catch(err) {
        next(err);
    }
});


//Buscar un prodcuto por ID
route.get('/:id',(req,res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const producto = producto.find((p)=> p.id === id);
    
        if(!producto) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        } 
        
        res.json(producto);

    } catch (err) {
        next(err)
    }
    
});

//Crear un nuevo prodcuto
route.post('/',(req,res, next)=>{
    try {
        const {nombre,precio} = req.body;

        const nuevoProducto = {
            id: producto.length + 1,
            nombre,
            precio
    };

        producto.push(nuevoProducto);
        res.status(201).json(nuevoProducto);

    } catch (err) {
        next(err);
    }
    
})

//Actualizar un producto
route.put('/:id', (req,res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const {nombre,precio}= req.body;

        const producto = producto.find((p)=> p.id===id);

        if(!producto){
            const error = new Error("Producto no encontrado");
            error.status = 404;
            throw error;
        }
        producto.nombre = nombre ||producto.nombre;
        producto.precio = precio || producto.precio;

        res.json(producto);
    
    } catch (err) {
        next(err);
    }

    

})

//Elimina un producto
route.delete('/:id',(req,res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const index= producto.findIndex((p) => p.id===id);
    
        if(index===-1){
            const error = new Error("Producto no encontrado")
            error.status = 404;
            throw error;
        } 

        const productoEliminado=producto.splice(index,1);
        res.json(productoEliminado[0]);
        
    } catch (err) {
        next(err);
    }


})

module.exports = route;