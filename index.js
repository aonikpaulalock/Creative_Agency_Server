const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 1000
require('dotenv').config()
// Middletare
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5egy8di.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    client.connect()
    const projectsCollection = client.db("agency_creative").collection("Projects");
    const blogsCollection = client.db("agency_creative").collection("Blogs");

    app.get("/projects", async (req, res) => {
      const query = {};
      const cursor = projectsCollection.find(query);
      const result = await cursor.toArray()
      res.send(result);
    })

    // // Spacipice Id Load Inventory

    app.get("/project/:id", async (req, res) => {
      const request = req.params.id;
      const quary = { _id: new ObjectId(request) }
      const result = await projectsCollection.findOne(quary);
      res.send(result)
    })

    // Get Blogs Data
    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogsCollection.find(query);
      const result = await cursor.toArray()
      res.send(result);
    })

    // Get Blogs Details Data
    app.get("/blog/:id", async (req, res) => {
      const request = req.params.id;
      const quary = { _id: new ObjectId(request) }
      const result = await blogsCollection.findOne(quary);
      res.send(result)
    })
  } finally {
    
  }
}
run();
app.listen(port,() =>console.log("first"))