/*const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://admin:password123"@cigood.j8rvu0t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//callback(new error_1.MongoServerError(document));

async function insertDocument(collection, document) {
    try {
        await client.connect();
        const db = client.db("cigood");
        const result = await db.collection(collection).insertOne(document);
        console.log(`Document inserted with _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
  
async function findDocuments(collection, query) {
  try {
    await client.connect();
    const db = client.db("cigood");
    const cursor = await db.collection(collection).find(query);
    const documents = await cursor.toArray();
    console.log(documents);
    return documents;
  } finally {
    await client.close();
  }
}
  
async function updateDocument(collection, filter, update) {
    try {
      await client.connect();
      const db = client.db("<database>");
      const result = await db.collection(collection).updateOne(filter, update);
      console.log(`Matched ${result.matchedCount} documents`);
      console.log(`Modified ${result.modifiedCount} documents`);
    } finally {
      await client.close();
    }
}
  
async function deleteDocument(collection, filter) {
    try {
      await client.connect();
      const db = client.db("<database>");
      const result = await db.collection(collection).deleteOne(filter);
      console.log(`Deleted ${result.deletedCount} documents`);
    } finally {
      await client.close();
    }
}

//const get = findDocuments("recetas", {});
  
//const document = { _descripcion: "receta de Gabo(con extra de amor)" };
//insertDocument("recetas", document);

const query = { _descripcion: { $eq: 'receta de Gabo(con extra de amor)' } };
findDocuments("recetas", query);

//const filter = { name: "John" };
//const update = { $set: { age: 31 } };
//updateDocument("users", filter, update);

//const filter = { name: "John" };
//deleteDocument("users", filter);
*/

// conection.js

export function getRecetas() {
  return new Promise((resolve, reject) => {
    const recetas = [
      {
        id: 1,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 1',
        description: 'Descripción de la receta 1',
      },
      {
        id: 2,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 3,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 4,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 5,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 6,
        image: 'https://i.blogs.es/173514/croquetas/450_1000.jpeg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
      {
        id: 7,
        image: 'https://www.elmueble.com/medio/2023/02/21/flamenquines_fb20ca82_00436126_230221105239_600x600.jpg',
        name: 'Receta 2',
        description: 'Descripción de la receta 2',
      },
    ];

    resolve(recetas);
  });
}

