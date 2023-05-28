const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://admin:password123ab@cigood.j8rvu0t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//callback(new error_1.MongoServerError(document));

async function insertDocument(collection, producto) {
  try {
    await client.connect();
    const db = client.db("cigood");
    const result = await db.collection(collection).insertOne(producto);
    console.log(`Documento insertado con _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
  
async function findDocuments(collection, query) {
  try {
    await client.connect();
    const db = client.db("cigood");
    console.log('Me he conectado');
    const cursor = await db.collection(collection).find(query);
    const documents = await cursor.toArray();
    return documents;
  } finally {
    await client.close();
  }
}
  
async function updateDocument(collection, filter, update) {
    try {
      await client.connect();
      const db = client.db("cigood");
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
      const db = client.db("cigood");
      const result = await db.collection(collection).deleteMany(filter);
      console.log(`Deleted ${result.deletedCount} documents`);
    } finally {
      await client.close();
    }
}

async function deleteDocuments(collection, filter) {
  try {
    await client.connect();
    const db = client.db("cigood");
    const result = await db.collection(collection).deleteMany(filter);
    console.log(`Eliminados ${result.deletedCount} productos`);
  } finally {
    await client.close();
  }
}

module.exports = {
    insertDocument,
    findDocuments,
    updateDocument,
    deleteDocument,
    deleteDocuments
};
  