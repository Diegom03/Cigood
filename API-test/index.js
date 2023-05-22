const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');

const { insertDocument, findDocuments, updateDocument, deleteDocument, deleteDocuments } = require('./mongo.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Endpoint para insertar un documento
app.post('/insert', async (req, res) => {
  const { collection, document } = req.body;
  await insertDocument(collection, document);
  res.send('Documento insertado');
});

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

// Peticion GET (1-{}): se pasa el nombre de la tabla y el id del objeto
app.get('/api/data/:tableName/:id', async (req, res) => {
  try {
    const { tableName, id } = req.params;
    console.log(tableName);
    console.log(id);

    if(id == "{}"){
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
