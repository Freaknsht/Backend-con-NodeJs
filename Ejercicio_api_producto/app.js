const express = require('express');

const app = express();

app.use(express.json()); //Permite usar los JSON adentro del codigo

const port=3000;

app.get('/', (req,res)=>{ //El metodo GET muestra un mensaje o un producto
    res.send("Hola, cordobes puto!!");
});

app.post('/productos', (req,res) =>{ //El metodo post crea un producto
    //logica de creacion
    res.send("Creado correctamente");
})

app.put('/productos', (req,res) =>{
    //logica de creacion
    res.send("Prodcuto modificado correctamente"); //El put modifica un producto
})

app.get('/productos', (req,res)=>{
    const categoria = req.query.categoria; //el QUERY se utiliza para filtar o ordenar los datos de una solicitud
    const stock = req.query.stock;
    //Codigo para buscar los productos
    res.send(`La categoria que se busco fue ${categoria} y stock ${stock}`) //para utilizarlo, despues de /productos se pone un ? y lo que se busca, EJ: /productos?categoria=electronica&stock=40
})

app.get('/productos/:id', (req,res)=>{
    const id = req.params.id; //El PARAMS es del metodo Path y nos sirve para buscar un producto en particular con una id definida y unica
    //Codigo para obtener el producto con el id especifico
    res.send(`Se encontro el id "${id}"`);
})

app.post('/productos',(req,res)=>{
    const producto = req.body;
    //Codigo para guardar un nuevo producto en la base de datos o realizar operaciones relacionadas 
    res.send(`Gurdar nuevo producto: "${JSON.stringify(producto)}"`);
})

app.get('/productos',(req,res)=>{
    const authToken = req.headers('Authorization');
    //Codigo donde se valida con el token al usuario o validacions adiccionales
    res.send(`Token de autorizacio: "${authToken}"`);
})

app.listen(port, () =>{
    console.log(`Server iniciado en ${port}`);//espera peticiones para el servidor
});