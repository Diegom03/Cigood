const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');

const { insertDocument, findDocuments, updateDocument, deleteDocument, deleteDocuments } = require('./mongo.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Endpoint para buscar documentos
app.get('/find', async (req, res) => {
  const { collection, query } = req.query;
  const documents = await findDocuments(collection, query);
  res.send(documents);
});

// Endpoint para actualizar un documento
app.put('/update', async (req, res) => {
  const { collection, filter, update } = req.body;
  await updateDocument(collection, filter, update);
  res.send('Documento actualizado');
});

// Endpoint para eliminar un documento
app.delete('/delete', async (req, res) => {
  const { collection, filter } = req.body;
  await deleteDocument(collection, filter);
  res.send('Documento eliminado');
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor iniciado en el puerto 3000'));


// Inserta un producto en la despensa mediante el buscador
app.get('/api/insert/producto/:tableName/:producto/:usuario', async (req, res) => {
  try {
    const { tableName, producto} = req.params;

    // Convertir el objeto JSON producto a un objeto JavaScript
    const productoObj = JSON.parse(producto);

    // Crear un nuevo objeto ingrediente con los valores necesarios
    const ingrediente = {
      _id: new ObjectId(), // Generar un nuevo _id autogenerado
      _producto: productoObj._producto,
      _nombre: productoObj._nombre,
      _usuario: "Diego28"
    };

    console.log(ingrediente);

    await insertDocument(tableName, ingrediente);
    res.send('Documento insertado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


// Peticion GET (1-{}): se pasa el nombre de la tabla y el id del objeto
app.get('/api/data/:tableName/:id', async (req, res) => {
  try {
    const { tableName, id } = req.params;
    console.log(tableName);
    console.log(id);

    if (id == "{}") {
      const query = {};
      const documents = await findDocuments(tableName, query);
      console.log(documents);
      res.send(documents);

    } else {
      const query = { _id: new ObjectId(id) };
      const documents = await findDocuments(tableName, query);
      console.log(documents);
      res.send(documents);
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// Peticion GET (1-{}): devuelve la receta que tenga los filtros seleccionados
app.get('/api/filters/:tableName/:filter', async (req, res) => {
  try {
    const { tableName, filter } = req.params;
    console.log(tableName);
    console.log(filter);

    const query = { _filtros: { $in: filter.split(",").map(Number) } };
    const documents = await findDocuments(tableName, query);
    console.log(documents);
    res.send(documents);

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


// Peticion DELETE (1-{}): se pasa el nombre de la tabla y el id(s) del objeto(s) a borrar
app.get('/api/delete/:tableName/:id', async (req, res) => {
  try {
    const { tableName, id } = req.params;

    if (id == "{}") {
      const query = {};
      await deleteDocument(tableName, query);

    } else {
      const query = { _producto: { $in: id.split(",").map(Number) } };
      console.log(query); // Imprimir el valor de query
      await deleteDocuments(tableName, query);
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


// Peticion GET y DELETE que borra de la despensa los ingredientes utilizados
app.get('/api/despensa/:id', async (req, res) => {
  try {
    const { id } = req.params;

    //Obtiene la receta
    let query = { _id: new ObjectId(id) };
    const receta = await findDocuments("recetas", query);
    console.log(receta);

    //Borra los productos utilizados de la despensa
    console.log(receta[0]._ingredientes);
    query = { _producto: { $in: receta[0]._ingredientes } };
    const borrado = await deleteDocuments("ingredientes", query);

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


// Verifica el login de usuario
app.get('/api/login/:tableName/:user/:password', async (req, res) => {
  try {
    const { tableName, user, password } = req.params;

    //Obtiene el usuario
    let query = { name: user, pass: password };
    const usuario = await findDocuments(tableName, query);
    console.log(usuario);
    res.send(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
