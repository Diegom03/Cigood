import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://admin:cigood2023@cigood.j8rvu0t.mongodb.net/?retryWrites=true&w=majority'; // Cambia localhost y 27017 con tu dirección y puerto de MongoDB
const client = new MongoClient(uri);

// Conectar a la base de datos
client.connect((err) => {
  if (err) {
    console.log('Error de conexión: ', err);
  } else {
    console.log('Conexión exitosa');
    const database = client.db('cigood');
    const collection = database.collection('recetas');
    // Realiza una consulta a tu colección
    collection.find().toArray((err, result) => {
      if (err) {
        console.log('Error al consultar la colección: ', err);
      } else {
        console.log('Resultados: ', result);
      }
    });
  }
});


/*
// Conectar a la base de datos
client.connect((err) => {
    if (err) {
      console.log('Error de conexión: ', err);
    } else {
      console.log('Conexión exitosa');
      // Aquí puedes realizar tus operaciones de base de datos
    }
});
*/
