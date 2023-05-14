const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');

const { insertDocument, findDocuments, updateDocument, deleteDocument } = require('./mongo.js');

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

// Peticion GET: se pasa el nombre de la tabla y el id del objeto
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
